const cron = require('node-cron');
const { Op } = require('sequelize');
const { models } = require('../database/index');
const sequelize = require('../database/index');
const { successLog, errorLog } = require('./loggers');
const { deleteOfflineObject, uploadTemplateJsonTOS3, storeOfficeRemarksToS3 } = require('./s3');
const { getTemplateStructureDetail, getRemarkStructureDetail, getRemarkStructureDetailForAnOffice } = require('./utils');

cron.schedule('*/60 * * * * *', async () => {
  try {
    successLog('Cron job started', 'Job started successfully');

    // remove duplicate entry of inspectors (if any)
    const inspectors = await models.order_inspector.findAll({
      include: {
        model: models.order_inspector,
        as: 'duplicateInspector',
        on: {
          '$order_inspector.inspector_reference_id$': { [Op.col]: 'duplicateInspector.inspector_reference_id' },
          '$order_inspector.scheduledOrderId$': { [Op.col]: 'duplicateInspector.scheduledOrderId' },
          // '$order_inspector.is_primary$': { [Op.col]: 'duplicateInspector.is_primary' },
          '$order_inspector.order_inspector_id$': { [Op.ne]: { [Op.col]: 'duplicateInspector.order_inspector_id' } },
        },
        required: true,
        orderBy: [['updatedAt', 'DESC']],
      },
      orderBy: [['createdAt', 'ASC']],
    });

    if (inspectors.length !== 0) {
      const duplicateInspectorIds = [];
      inspectors[1].duplicateInspector.forEach((inspector) => {
        duplicateInspectorIds.push(inspector.orderInspectorId);
      });

      await models.order_inspector.destroy({
        where: {
          orderInspectorId: duplicateInspectorIds,
        },
        force: true,
      });
    }

    // remove duplicate entry of services (if any)
    const services = await models.order_service.findAll({
      include: {
        model: models.order_service,
        as: 'duplicateService',
        on: {
          '$order_service.service_reference_id$': { [Op.col]: 'duplicateService.service_reference_id' },
          '$order_service.scheduledOrderId$': { [Op.col]: 'duplicateService.scheduledOrderId' },
          '$order_service.order_service_id$': { [Op.ne]: { [Op.col]: 'duplicateService.order_service_id' } },
        },
        required: true,
        orderBy: [['updatedAt', 'DESC']],
      },
      orderBy: [['createdAt', 'ASC']],
    });

    if (services.length !== 0) {
      const duplicateServiceIds = [];
      services[0].duplicateService.forEach((service) => {
        duplicateServiceIds.push(service.orderServiceId);
      });

      await models.order_service.destroy({
        where: {
          orderServiceId: duplicateServiceIds,
        },
        force: true,
      });
    }

    await deleteOfflineObject();

    successLog('Cron job ended', 'Job ended successfully');
  } catch (e) {
    errorLog('Cron job', `Something went wrong:${e}`);
  }
});

// 0 6 * * *
cron.schedule("0 6 * * *", async () => {
  try {
    successLog("Daily Cron job started", "Checking for template updates...");

    const activeTemplates = await models.template.findAll({
      where: { isActive: 1 },
      attributes: ["templateId", "templateJsonUpdatedAt"],
    });

    const relatedTables = [
      { model: models.template_category, fk: "templateId" },
      { model: models.template_subcategory, fk: "templateCategoryId", joinModel: models.template_category }, 
      { model: models.template_subcategory_reminder, fk: "templateSubCategoryId", joinModel: models.template_subcategory },
      { model: models.template_about, fk: "templateSubCategoryId", joinModel: models.template_subcategory },
      { model: models.template_about_value, fk: "templateAboutId", joinModel: models.template_about },
      { model: models.template_about_value_note, fk: "templateAboutValueId", joinModel: models.template_about_value },
      { model: models.template_location, fk: "templateId" },
      { model: models.template_definition, fk: "templateId" },
      { model: models.template_disclosure, fk: "templateId" },
    ];

    const templatesToUpdate = [];


    for (const template of activeTemplates) {
      const { templateId, templateJsonUpdatedAt } = template;
      let latestUpdateTime = templateJsonUpdatedAt || new Date(0);


      for (const table of relatedTables) {
        let latestRecord;

        if (table.joinModel) {
          if (table.joinModel === models.template_category) {
         
            latestRecord = await table.model.findOne({
              include: {
                model: models.template_category,
                attributes: [],
                where: { templateId }
              },
              attributes: ["updatedAt"],
              order: [["updatedAt", "DESC"]],
            });
          } else if (table.joinModel === models.template_subcategory) {
            // Case: Related via template_subcategory → template_category → template
            latestRecord = await table.model.findOne({
              include: {
                model: models.template_subcategory,
                attributes: [],
                include: {
                  model: models.template_category,
                  attributes: [],
                  where: { templateId }
                },
              },
              attributes: ["updatedAt"],
              order: [["updatedAt", "DESC"]],
            });
          } else if (table.joinModel === models.template_about) {
            // Case: Related via template_about → template_subcategory → template_category → template
            latestRecord = await table.model.findOne({
              include: {
                model: models.template_about,
                attributes: [],
                include: {
                  model: models.template_subcategory,
                  attributes: [],
                  include: {
                    model: models.template_category,
                    attributes: [],
                    where: { templateId }
                  },
                },
              },
              attributes: ["updatedAt"],
              order: [["updatedAt", "DESC"]],
            });
          } else if (table.joinModel === models.template_about_value) {
            // Case: Related via template_about_value → template_about → template_subcategory → template_category → template
            latestRecord = await table.model.findOne({
              include: {
                model: models.template_about_value,
                attributes: [],
                include: {
                  model: models.template_about,
                  attributes: [],
                  include: {
                    model: models.template_subcategory,
                    attributes: [],
                    include: {
                      model: models.template_category,
                      attributes: [],
                      where: { templateId }
                    },
                  },
                },
              },
              attributes: ["updatedAt"],
              order: [["updatedAt", "DESC"]],
            });
          } else {
            // Normal single-level join
            latestRecord = await table.model.findOne({
              include: {
                model: table.joinModel,
                attributes: [],
                where: { templateId },
              },
              attributes: ["updatedAt"],
              order: [["updatedAt", "DESC"]],
            });
          }
        } else {
          // Directly linked tables (with templateId as FK)
          latestRecord = await table.model.findOne({
            where: { [table.fk]: templateId },
            attributes: ["updatedAt"],
            order: [["updatedAt", "DESC"]],
          });
        }

        if (latestRecord && latestRecord.updatedAt > latestUpdateTime) {
          latestUpdateTime = latestRecord.updatedAt;
        }
      }

      if (latestUpdateTime > templateJsonUpdatedAt) {
        templatesToUpdate.push(templateId);
      }
    }

    if (templatesToUpdate.length === 0) {
      successLog("No templates needed updates", "All template JSONs are up-to-date.");
      return;
    }

    await sequelize.transaction(async (t) => {
      for (const templateId of templatesToUpdate) {
        try {

          const templateData = await getTemplateStructureDetail(templateId, t);
          const jsonContent = JSON.stringify(templateData);

          // Upload to S3
          const { Key } = await uploadTemplateJsonTOS3(
            jsonContent,
            templateData.dataValues.master_template.name,
            templateData.version,
            `${templateId}__structure_${Date.now()}`
          );

          await models.template.update(
            { templateJsonKey: Key, templateJsonUpdatedAt: new Date() },
            { where: { templateId }, transaction: t }
          );

          console.log(`Template JSON updated on S3 & DB for templateId: ${templateId}`);
        } catch (error) {
          console.error(`Error processing templateId: ${templateId}`, error);
        }
      }
    });

    successLog("Daily Cron job ended", "Template updates completed.");
  } catch (e) {
    errorLog("Daily Cron job", `Something went wrong: ${e.message}`);
  }
});


// 0 7 * * *
cron.schedule("0 7 * * *", async () => {
  try {
    successLog("Daily Cron job started", "Checking for remark updates...");

    const activeTemplates = await models.template.findAll({
      attributes: ["templateId"],
      where: { isActive: true },
    });

    const activeTemplateIds = activeTemplates.map(({ templateId }) => templateId);
    if (activeTemplateIds.length === 0) {
      successLog("No active templates found.");
      return;
    }

    for (const templateId of activeTemplateIds) {
      console.log(`Processing templateId: ${templateId}`);

      const officeTemplates = await models.office_template.findAll({
        attributes: ["officeId", "remarkJsonUpdatedAt"],
        where: { templateId },
      });

      if (officeTemplates.length === 0) {
        console.log(`No offices found for templateId: ${templateId}`);
        continue;
      }

      for (const { officeId, remarkJsonUpdatedAt } of officeTemplates) {
        let needsUpdate = false;

        const remarkCount = await models.template_remark.count({
          where: { 
            updatedAt: { 
              [Op.gt]: remarkJsonUpdatedAt 
            },
            [Op.or]: [
              { remarkType: "Template" },
              {
                "$template_remark_frequencies.my_remark$": true,
                "$template_remark_frequencies.officeId$": officeId,
              },
            ],
          },
          include: [
            {
              model: models.template_subcategory,
              attributes: [],
              include: {
                model: models.template_category,
                attributes: [],
                where: { templateId },
              },
            },
          ],
        });

        if (remarkCount > 0) {
          needsUpdate = true;
        }

        if (!needsUpdate) {
          const remarkFrequencyCount = await models.template_remark_frequency.count({
            where: {
              updatedAt: { [Op.gt]: remarkJsonUpdatedAt },
              officeId,
              [Op.or]: [{ myRemark: true }, { isDefault: true }],
            },
            include: [
              {
                model: models.template_remark,
                attributes: [],
                include: {
                  model: models.template_subcategory,
                  attributes: [],
                  include: {
                    model: models.template_category,
                    attributes: [],
                    where: { templateId },
                  },
                },
              },
            ],
          });

          if (remarkFrequencyCount > 0) {
            needsUpdate = true;
          }
        }

        if (!needsUpdate) {
          const remarkImageCount = await models.template_remark_image.count({
            where: { updatedAt: { [Op.gt]: remarkJsonUpdatedAt } },
            include: [
              {
                model: models.template_remark_frequency,
                where:{
                  officeId
                },
                attributes:[],
                include:{
                  model: models.template_remark,
                  attributes: [],
                  include: {
                    model: models.template_subcategory,
                    attributes: [],
                    include: {
                      model: models.template_category,
                      attributes: [],
                      where: { templateId },
                    },
                  },
               },
              },
            ],
          });

          if (remarkImageCount > 0) {
            needsUpdate = true;
          }
        }

        if (needsUpdate) {
          await sequelize.transaction(async (t) => {
            try {
              const officeRemarkDataArray = await getRemarkStructureDetailForAnOffice(templateId, officeId, t); //TODO

              if(officeRemarkDataArray && officeRemarkDataArray.length > 0){
              const s3UploadResults = await storeOfficeRemarksToS3(
                officeRemarkDataArray,
                templateId,
                officeId
              );

              await models.office_template.update(
                {
                  remarkJsonKey: s3UploadResults[0].remarkJsonKey,
                  remarkJsonUpdatedAt: new Date(),
                },
                { where: { officeId, templateId }, transaction: t }
              );

              console.log(`Office JSON updated on S3 & DB for officeId: ${officeId}, templateId: ${templateId}`);
            }
            } catch (error) {
              console.error(`Error processing officeId: ${officeId}, templateId: ${templateId}`, error);
            }
          });
        }
      }
    }

    successLog("Daily Cron job ended", "Office remark updates completed.");
  } catch (e) {
    errorLog("Daily Cron job", `Something went wrong: ${e.message}`);
  }
});
