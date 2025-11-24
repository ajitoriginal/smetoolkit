const { Op } = require('sequelize');
const sequelize = require('../database/index');
const { models } = require('../database/index');
const { handleKnownErrors, BadRequestError, NotFoundError } = require('../helpers/error');
const { invokeTemplateS3LambdaAsync, invokeCreateDraftTemplateLambda } = require('../helpers/lambda');
const messages = require('../helpers/messages');
const { getUploadURLForTemplate, getUploadURLForTemplateImage, uploadTemplateJsonTOS3, storeOfficeRemarksToS3 } = require('../helpers/s3');
const { paginate, createDefaultDisclosures, splitArray, getTemplateStructureDetail, getRemarkStructureDetail } = require('../helpers/utils');
const { uploadToSearchRepository } = require('../helpers/externalApi/search');

const createDraftTemplate = async (req) => {
  const { masterTemplateId, version, iconImageKey, preBuilttemplateId } = req.body;
  const { id } = req.smeUser;
  try {
    // check if masterTemplate exists
    const masterTemplate = await models.master_template.findByPk(masterTemplateId);

    if (!masterTemplate) {
      throw new NotFoundError(messages.masterTemplate.MASTER_TEMPLATE_NOT_FOUND);
    }
    // transaction
    const newTemplate = await sequelize.transaction(async (t) => {
      // create template
      const [newTemplate, created] = await models.template.findOrCreate({
        where: {
          masterTemplateId,
          version,
        },
        defaults: {
          masterTemplateId,
          version,
          // jsonStructure: 'new',
          iconImageKey,
          createdBySme: id,
          updatedBySme: id,
          iconImageLocation: iconImageKey ? process.env.S3_Location : null,
        },
        transaction: t,
      });

      if (created === false) {
        throw new BadRequestError('Template already exists');
      }

      if (preBuilttemplateId) {
        // check if published template Exists (doesn't need to be latest one)
        const preBuiltTemplateExists = await models.template.findOne({
          where: {
            isDraft: 0,
            templateId: preBuilttemplateId,
          },
          include: [
            {
              model: models.template_category,
              attributes: [
                'templateCategoryId',
                'orderNumber',
                'iconImageLocation',
                'iconImageKey',
                'name',
                'templateId',
                'print',
                'oldTemplateCategoryId',
              ],
              required: false,
              include: {
                model: models.template_subcategory,
                attributes: [
                  'templateSubCategoryId',
                  'orderNumber',
                  'isGeneral',
                  'name',
                  'templateCategoryId',
                  'print',
                  'oldTemplateSubCategoryId',
                  'noOfCopies',
                ],
                required: false,
                include: [
                  {
                    model: models.template_subcategory_reminder,
                    attributes: ['description', 'templateSubCategoryId', 'oldTemplateReminderId'],
                    required: false,
                  },
                  {
                    model: models.template_remark,
                    attributes: [
                      'templateRemarkId',
                      'remark',
                      'type',
                      'title',
                      'isFavourite',
                      'totalFrequency',
                      'remarkType',
                      'hide',
                      'oldTemplateRemarkId',
                      'customRemarkAddedByUser',
                    ],
                    required: false,
                    // include: {
                    //   model: models.template_remark_image,
                    //   attributes: ['templateRemarkImageId', 'orderNumber', 'templateRemarkId', 'templateImageId'],
                    //   required: false,
                    //   include: {
                    //     model: models.template_image,
                    //     attributes: [
                    //       'templateImageId',
                    //       'imageTitle',
                    //       'originalImageKey',
                    //       'reportImageKey',
                    //       'location',
                    //       'thumbImageKey',
                    //       'uploadStatus',
                    //     ],
                    //     required: false,
                    //   },
                    // },
                  },
                  {
                    model: models.template_about,
                    attributes: [
                      'templateAboutId',
                      'aboutTitle',
                      'isMultiSelect',
                      'orderNumber',
                      'templateSubCategoryId',
                      'oldTemplateAboutId',
                    ],
                    required: false,
                    include: [
                      {
                        model: models.template_about_value,
                        attributes: [
                          'templateAboutValueId',
                          'value',
                          'orderNumber',
                          'templateAboutId',
                          'oldTemplateAboutValueId',
                        ],
                        required: false,
                        include: {
                          model: models.template_about_value_note,
                          attributes: [
                            'templateAboutValueNoteId',
                            'note',
                            'templateAboutValueId',
                            'oldTemplateValueNoteId',
                          ],
                          required: false,
                        },
                      },
                    ],
                  },
                ],
              },
            },
          ],
          transaction: t,
        });

        if (!preBuiltTemplateExists) {
          throw new NotFoundError('Template not found');
        }

        // Clone the template categories, subcategories, and related information
        const clonedCategories = await Promise.all(
          preBuiltTemplateExists.template_categories.map(async (category) => {
            const clonedCategory = await models.template_category.create(
              {
                orderNumber: category.orderNumber,
                iconImageLocation: category.iconImageLocation,
                iconImageKey: category.iconImageKey,
                name: category.name,
                templateId: newTemplate.templateId,
                print: category.print,
                oldTemplateCategoryId: category.templateCategoryId,
                createdBySme: id,
                updatedBySme: id,
              },
              { transaction: t }
            );

            const clonedSubCategories = await Promise.all(
              category.template_subcategories.map(async (subCategory) => {
                const clonedSubCategory = await models.template_subcategory.create(
                  {
                    orderNumber: subCategory.orderNumber,
                    name: subCategory.name,
                    isGeneral: subCategory.isGeneral,
                    templateCategoryId: clonedCategory.templateCategoryId,
                    print: subCategory.print,
                    oldTemplateSubCategoryId: subCategory.templateSubCategoryId,
                    noOfCopies: subCategory.noOfCopies,
                    createdBySme: id,
                    updatedBySme: id,
                  },
                  { transaction: t }
                );

                // Clone the template remarks
                await Promise.all(
                  subCategory.template_subcategory_reminders.map(async (reminder) => {
                    await models.template_subcategory_reminder.create(
                      {
                        description: reminder.description,
                        templateSubCategoryId: clonedSubCategory.templateSubCategoryId,
                        oldTemplateReminderId: reminder.templateSubCategoryReminderId,
                        createdBySme: id,
                        updatedBySme: id,
                      },
                      { transaction: t }
                    );
                  })
                );

                // Clone the template remarks
                await Promise.all(
                  subCategory.template_remarks.map(async (remark) => {
                    const clonedRemark = await models.template_remark.create(
                      {
                        remark: remark.remark,
                        type: remark.type,
                        title: remark.title,
                        isFavourite: remark.isFavourite,
                        templateSubCategoryId: clonedSubCategory.templateSubCategoryId,
                        oldTemplateRemarkId: remark.templateRemarkId,
                        totalFrequency: remark.totalFrequency,
                        remarkType: remark.remarkType, // TODO - discuss and should be to Template
                        hide: remark.hide,
                        customRemarkAddedByUser: remark.customRemarkAddedByUser,
                        createdBySme: id,
                        updatedBySme: id,
                      },
                      { transaction: t }
                    );

                    // await Promise.all(
                    //   remark.template_remark_images.map(async (remarkImage) => {
                    //     const clonedTemplateImage = await models.template_image.create(
                    //       {
                    //         originalImageKey: remarkImage.template_image.originalImageKey,
                    //         imageTitle: remarkImage.template_image.imageTitle,
                    //         thumbImageKey: remarkImage.template_image.thumbImageKey,
                    //         reportImageKey: remarkImage.template_image.reportImageKey,
                    //         location: remarkImage.template_image.location,
                    //         templateId: newTemplate.templateId,
                    //         uploadStatus: remarkImage.template_image.uploadStatus,
                    //       },
                    //       { transaction: t }
                    //     );

                    //     const clonedTemplateRemarkImage = await models.template_remark_image.create(
                    //       {
                    //         // Copy necessary attributes from original subcategory image
                    //         orderNumber: remarkImage.orderNumber,
                    //         templateRemarkId: clonedRemark.templateRemarkId,
                    //         templateImageId: clonedTemplateImage.templateImageId,
                    //       },
                    //       {
                    //         transaction: t,
                    //       }
                    //     );
                    //   })
                    // );
                  })
                );

                // Clone the template abouts and related values and notes
                await Promise.all(
                  subCategory.template_abouts.map(async (about) => {
                    const clonedAbout = await models.template_about.create(
                      {
                        aboutTitle: about.aboutTitle,
                        isMultiSelect: about.isMultiSelect,
                        orderNumber: about.orderNumber,
                        templateSubCategoryId: clonedSubCategory.templateSubCategoryId,
                        oldTemplateAboutId: about.templateAboutId,
                        createdBySme: id,
                        updatedBySme: id,
                      },
                      { transaction: t }
                    );

                    // if (about.architectural_type !== null) {
                    //   const clonedArchitecturalType = await models.architectural_type.create(
                    //     {
                    //       templateAboutId: clonedAbout.templateAboutId,
                    //       templateId: newTemplate.templateId,
                    //     },
                    //     { transaction: t }
                    //   );
                    // }

                    // Clone the template about values and notes
                    await Promise.all(
                      about.template_about_values.map(async (aboutValue) => {
                        const clonedAboutValue = await models.template_about_value.create(
                          {
                            value: aboutValue.value,
                            orderNumber: aboutValue.orderNumber,
                            templateAboutId: clonedAbout.templateAboutId,
                            oldTemplateAboutValueId: aboutValue.templateAboutValueId,
                            createdBySme: id,
                            updatedBySme: id,
                          },
                          { transaction: t }
                        );

                        await Promise.all(
                          aboutValue.template_about_value_notes.map(async (note) => {
                            await models.template_about_value_note.create(
                              {
                                note: note.note,
                                templateAboutValueId: clonedAboutValue.templateAboutValueId,
                                oldTemplateValueNoteId: note.templateAboutValueNoteId,
                                createdBySme: id,
                                updatedBySme: id,
                              },
                              { transaction: t }
                            );
                          })
                        );
                      })
                    );

                    return clonedAbout;
                  })
                );

                return clonedSubCategory;
              })
            );

            return clonedCategory;
          })
        );

        await newTemplate.update(
          {
            requireAttachment: preBuiltTemplateExists.requireAttachment,
            requireRemark: preBuiltTemplateExists.requireRemark,
            hasToc: preBuiltTemplateExists.hasToc,
            hasLocation: preBuiltTemplateExists.hasLocation,
            hasDefinition: preBuiltTemplateExists.hasDefinition,
            hasDisclosure: preBuiltTemplateExists.hasDisclosure,
            oldTemplateId: preBuilttemplateId,
          },
          { transaction: t }
        );

        const templateDefinitions = await models.template_definition.findAll({
          where: { templateId: preBuilttemplateId },
        });

        // Clone the template definitions
        if (templateDefinitions.length > 0) {
          const clonedDefinitions = await Promise.all(
            templateDefinitions.map(async (definition) => {
              const clonedDefinitions = await models.template_definition.create(
                {
                  orderNumber: definition.orderNumber,
                  title: definition.title,
                  description: definition.description,
                  templateId: newTemplate.templateId,
                  oldTemplateDefinitionId: definition.templateDefinitionId,
                  createdBySme: id,
                  updatedBySme: id,
                },
                { transaction: t }
              );
            })
          );
        }

        const templateLocations = await models.template_location.findAll({ where: { templateId: preBuilttemplateId } });

        // Clone the template definitions
        if (templateLocations.length > 0) {
          const clonedLocations = await Promise.all(
            templateLocations.map(async (location) => {
              const clonedLocations = await models.template_location.create(
                {
                  location: location.location,
                  templateId: newTemplate.templateId,
                  oldTemplateLocationId: location.templateLocationId,
                  createdBySme: id,
                  updatedBySme: id,
                },
                { transaction: t }
              );
            })
          );
        }

        const templateDisclosures = await models.template_disclosure.findAll({
          where: { templateId: preBuilttemplateId },
        });

        // Clone the template disclosures
        if (templateDisclosures.length > 0) {
          const clonedDisclosures = await Promise.all(
            templateDisclosures.map(async (disclosure) => {
              const clonedDisclosure = await models.template_disclosure.create(
                {
                  // orderNumber: disclosure.orderNumber,
                  // title: disclosure.title,
                  description: disclosure.description ? disclosure.description : '',
                  // show: disclosure.show,
                  templateId: newTemplate.templateId,
                  oldTemplateDisclosureId: disclosure.templateDisclosureId,
                  createdBySme: id,
                  updatedBySme: id,
                },
                { transaction: t }
              );
            })
          );
        }
        // else {
        //   // create default
        //   const templateDisclosureArray = [
        //     { title: 'Not A Warranty', orderNumber: 1, templateId: newTemplate.templateId },
        //     { title: 'Inspection Notice', orderNumber: 2, templateId: newTemplate.templateId },
        //     { title: 'Disclaimer', orderNumber: 3, templateId: newTemplate.templateId },
        //   ];
        //   await models.template_disclosure.bulkCreate(templateDisclosureArray, { transaction: t });
        // }
      }
      // else {
      //   // create default

      //   const templateDisclosureArray = [
      //     { title: 'Not A Warranty', orderNumber: 1, templateId: newTemplate.templateId },
      //     { title: 'Inspection Notice', orderNumber: 2, templateId: newTemplate.templateId },
      //     { title: 'Disclaimer', orderNumber: 3, templateId: newTemplate.templateId },
      //   ];
      //   await models.template_disclosure.bulkCreate(templateDisclosureArray, { transaction: t });
      // }

      return newTemplate;
    });

    return newTemplate;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const publishedTemplatesList = async (req) => {
  const { masterTemplateId } = req.query;
  try {
    // check if service exist
    const masterTemplateExist = await models.master_template.findByPk(masterTemplateId);

    if (!masterTemplateExist) {
      throw new NotFoundError(messages.masterTemplate.MASTER_TEMPLATE_NOT_FOUND);
    }

    const templates = await models.template.findAll({
      where: {
        isDraft: 0,
        masterTemplateId,
      },
      include: [
        {
          model: models.master_template,
          include: {
            model: models.service,
          },
        },
        {
          model: models.sme_user,
          as: 'publishedBy', // This alias is used to differentiate between createdBySme and publishedBySme
          attributes: ['smeUserId', 'first', 'last', 'email'],
        },
        {
          model: models.sme_user,
          as: 'createdBy', // Another alias for createdBySme
          attributes: ['smeUserId', 'first', 'last', 'email'],
        },
        {
          model: models.office_template,
          attributes: ['officeTemplateId'],
          required: false,
          include: {
            model: models.office,
            attributes: ['officeId', 'officeRefId', 'name', 'companyKey', 'isActive'],
            required: false,
          },
        },
      ],
      order: [['version', 'DESC']],
    });

    return templates;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const draftTemplatesList = async (req) => {
  const { pageIndex, pageSize } = req.query;
  try {
    const draftTemplates = await models.template.findAndCountAll({
      where: {
        isDraft: 1,
        isActive: 0,
      },
      include: [
        {
          model: models.master_template,
          include: {
            model: models.service,
          },
        },
        {
          model: models.sme_user,
          as: 'createdBy',
          attributes: ['smeUserId', 'first', 'last', 'email'],
        },
      ],
      order: [['updatedAt', 'DESC']],
      ...paginate(pageIndex, pageSize),
    });

    return draftTemplates;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const getPresignedUrlToUploadImageForTemplateIcon = async (req) => {
  const { masterTemplateId, version, type } = req.query;
  try {
    // check if service exists
    const masterTemplateExists = await models.master_template.findByPk(masterTemplateId);

    if (!masterTemplateExists) {
      throw new NotFoundError(messages.masterTemplate.MASTER_TEMPLATE_NOT_FOUND);
    }

    const uploadURL = await getUploadURLForTemplate(masterTemplateExists.name, version, type);

    return uploadURL;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const publishTemplate = async (req) => {
  const { templateId } = req.body;
  const { id } = req.smeUser;
  try {
    // check if template
    const template = await models.template.findOne({
      where: {
        templateId,
      },
      include: {
        model: models.master_template,
        include: {
          model: models.service,
        },
      },
    });

    if (!template) {
      throw new NotFoundError(messages.template.TEMPLATE_NOT_FOUND);
    }

    if (!template.isDraft) {
      throw new BadRequestError('Cannot Make changes to published template');
    }

    if (template.hasDefinition) {
      // check if there's a definition
      const definition = await models.template_definition.findOne({ where: { templateId } });
      if (!definition) {
        // throw new BadRequestError('Definition is required!');
      }
    }

    if (template.hasDisclosure) {
      // check if there's a definition
      const disclosure = await models.template_disclosure.findOne({ where: { templateId } });
      if (!disclosure) {
        throw new BadRequestError('Disclosure is required!');
      }
    }

    await sequelize.transaction(async (t) => {
      await models.template.update(
        {
          isActive: 0,
        },
        {
          where: {
            isActive: 1,
            masterTemplateId: template.masterTemplateId,
          },
        },
        { transaction: t }
      );

      // get all remarks for this template, update total frequency as of published
      // and create frequency and similarity out of published copied
      const draftTemplateRemarks = await models.template_remark.findAll({
        include: [
          {
            model: models.template_subcategory,
            attributes: [],
            required: true,
            include: {
              model: models.template_category,
              where: {
                templateId,
              },
              attributes: [],
              required: true,
            },
          },
          {
            model: models.template_remark,
            as: 'oldTemplateRemark',
            attributes: ['templateRemarkId', 'totalFrequency', 'remarkType'],
            required: false,
            include: [
              {
                model: models.template_remark_frequency,
                // as: 'OldFrequencies',
                required: false,
              },
              {
                model: models.template_remark_similarity,
                // as: 'OldSimilarities',
                required: false,
              },
            ],
          },
        ],
      });

      for (const draftRemark of draftTemplateRemarks) {
        if (draftRemark.hide) {
          await draftRemark.destroy({ transaction: t });
          continue;
        }

        const oldRemark = draftRemark.oldTemplateRemark;

        if (oldRemark) {
          // Update totalFrequency based on the associated oldTemplateRemarkId
          draftRemark.totalFrequency = oldRemark.totalFrequency;

          // Copy rows for template_frequencies with new IDs
          for (const frequency of oldRemark.template_remark_frequencies) {
            const newFrequency = { ...frequency.toJSON() }; // Copy the frequency data
            delete newFrequency.templateRemarkFrequencyId;
            newFrequency.templateRemarkId = draftRemark.templateRemarkId; // Set the new remark ID
            await models.template_remark_frequency.create(newFrequency, { transaction: t });
          }

          // Copy rows for template_remark_similarity with new IDs
          if (oldRemark.remarkType === 'Custom') {
            if (oldRemark.template_remark_similarity) {
              const similarity = oldRemark.template_remark_similarity;
              const newSimilarity = { ...similarity.toJSON() }; // Copy the similarity data
              delete newSimilarity.templateRemarkSimilarityId; // Remove the old ID

              newSimilarity.templateRemarkId = draftRemark.templateRemarkId; // Set the new remark ID

              if (similarity.nearestTemplateRemarkId) {
                // check if remark exist in draft template
                const nearestTemplateRemarkIdInDraft = await models.template_remark.findOne({
                  where: {
                    oldTemplateRemarkId: similarity.nearestTemplateRemarkId,
                  },
                  include: {
                    model: models.template_subcategory,
                    attributes: [],
                    required: true,
                    include: {
                      model: models.template_category,
                      where: {
                        templateId,
                      },
                      attributes: [],
                      required: true,
                    },
                  },
                });

                newSimilarity.nearestTemplateRemarkId = nearestTemplateRemarkIdInDraft
                  ? nearestTemplateRemarkIdInDraft.templateRemarkId
                  : null;
              }

              if (similarity.nearestRemarkId) {
                // check if remark exist in draft template
                const nearestRemarkIdInDraft = await models.template_remark.findOne({
                  where: {
                    oldTemplateRemarkId: similarity.nearestRemarkId,
                  },
                  include: {
                    model: models.template_subcategory,
                    attributes: [],
                    required: true,
                    include: {
                      model: models.template_category,
                      where: {
                        templateId,
                      },
                      attributes: [],
                      required: true,
                    },
                  },
                });
                newSimilarity.nearestRemarkId = nearestRemarkIdInDraft ? nearestRemarkIdInDraft.nearestRemarkId : null;
              }

              if (newSimilarity.nearestTemplateRemarkId || newSimilarity.nearestRemarkId) {
                await models.template_remark_similarity.create(newSimilarity, { transaction: t });
              }
            }
          }

          // Save the updated draft remark
          await draftRemark.save({ transaction: t });
        }
      }

      // // update template and mark it as active
      await template.update(
        {
          isDraft: 0,
          isActive: 1,
          publishedBySme: id,
          updatedBySme: id,
          initialPublishedAt: template.initialPublishedAt ? template.initialPublishedAt : Date.now(),
          publishedAt: Date.now(),
        },
        { transaction: t }
      );

      // fetch all offices for a master template
      const officeIds = await models.office
        .findAll({
          include: {
            model: models.office_template,
            required: true,
            include: {
              model: models.template,
              required: true,
              include: {
                model: models.master_template,
                where: {
                  masterTemplateId: template.masterTemplateId,
                },
                required: true,
              },
            },
          },
        })
        .then((res) => res.map((el) => el.officeId));

      // provide all published templates for a service
      const publishedTemplates = await models.template
        .findAll({
          where: {
            masterTemplateId: template.masterTemplateId,
            isDraft: 0,
          },
          attributes: ['templateId', 'hasDefinition', 'hasDisclosure'],
          transaction: t,
        })
        .then((res) =>
          res.map((el) => ({
            templateId: el.templateId,
            hasDefinition: el.hasDefinition,
            hasDisclosure: el.hasDisclosure,
          })));

      console.log('office started');

      const promises = officeIds.flatMap((officeId) =>
        publishedTemplates.map((template) =>
          models.office_template.findOrCreate({
            where: { officeId, templateId: template.templateId },
            defaults: {
              officeId,
              templateId: template.templateId,
              showDefinition: template.hasDefinition,
              showDisclosure: template.hasDisclosure,
              createdBySme: id,
            },
            transaction: t,
          })));

      await Promise.all(promises);

      console.log('office ended');

      const templateJsonKey = await uploadTemplateStructureToS3({templateId, t});

      const s3OfficeUploadResults = await uploadOfficeRemarkDataToS3({templateId, t})

      const templateData = await getTemplateDetail({ templateId, t });
      // // Convert the JSON data to a string
      const jsonContent = JSON.stringify(templateData);
      const { Key } = await uploadTemplateJsonTOS3(
        jsonContent,
        template.master_template.name,
        template.version,
        `${template.templateId}_${new Date().getTime()}`
      );
      await template.update(
        {
          jsonKey: Key,
          templateJsonKey,
          templateJsonUpdatedAt: Date.now(),
          // jsonStructure: 'new',
        },
        { transaction: t }
      );

      await Promise.all(
        s3OfficeUploadResults.map(({ officeId, templateId, remarkJsonKey, remarkJsonUpdatedAt }) => {
          return models.office_template.update(
            { remarkJsonKey, remarkJsonUpdatedAt },
            { where: {  officeId, templateId }, transaction: t }
          );
        })
      );
      
      await uploadToSearchRepository(templateData, Key);
    });

    // await invokeTemplateS3LambdaAsync(templateId);
    return template;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const rollbackToPreviousPublishedTemplate = async (req) => {
  const { templateId } = req.body;
  const { id } = req.smeUser;
  try {
    // check if template
    const template = await models.template.findByPk(templateId);

    if (!template) {
      throw new Error(messages.template.TEMPLATE_NOT_FOUND);
    }

    if (template.isDraft) {
      throw new Error('Template should be published!');
    }

    if (template.isActive) {
      throw new Error('Template is already active!');
    }

    // make other template inactive and then update this to active
    await sequelize.transaction(async (t) => {
      await models.template.update(
        {
          isActive: 0,
        },
        {
          where: {
            isActive: 1,
            masterTemplateId: template.masterTemplateId,
          },
        },
        { transaction: t }
      );

      // update template and mark it as active
      await template.update(
        {
          isDraft: 0,
          isActive: 1,
          publishedBySme: id,
          updatedBySme: id,
          initialPublishedAt: template.initialPublishedAt ? template.initialPublishedAt : Date.now(),
          publishedAt: Date.now(),
        },
        { transaction: t }
      );

      // fetch all offices for a service
      const officeIds = await models.office
        .findAll({
          include: {
            model: models.office_template,
            required: true,
            include: {
              model: models.template,
              required: true,
              include: {
                model: models.master_template,
                where: {
                  masterTemplateId: template.masterTemplateId,
                },
                required: true,
              },
            },
          },
        })
        .then((res) => res.map((el) => el.officeId));

      // provide all published templates for a service
      const publishedTemplateIds = await models.template
        .findAll({
          where: {
            masterTemplateId: template.masterTemplateId,
            isDraft: 0,
          },
          transaction: t,
        })
        .then((res) => res.map((el) => el.templateId));

      await Promise.all(
        await officeIds.map(async (officeId) => {
          // provide access to each published template (for a service)
          await publishedTemplateIds.map(async (templateId) => {
            const officeTemplate = await models.office_template.findOrCreate({
              where: { officeId, templateId },
              defaults: { officeId, templateId },
              transaction: t,
            });
            return officeTemplate;
          });
        })
      );
    });

    return template;
  } catch (e) {
    throw new Error(e.message);
  }
};

const getTemplateDetail = async (data) => {
  const { templateId, t } = data.query ? data.query : data;
  try {
    const template = await models.template.findOne({
      where: {
        templateId,
      },
      transaction: t,
    });

    // Fetch template categories
    console.log('Fetching template categories');
    const templateCategories = await models.template_category.findAll({
      where: { templateId: template.templateId },
      transaction: t,
    });

    console.log('Template categories fetched');

    if (template) {
      // Fetch subcategories and related data for each category incrementally
      for (const category of templateCategories) {
        console.log(`Fetching subcategories for category ${category.templateCategoryId}`);
        const subcategories = await models.template_subcategory.findAll({
          where: { templateCategoryId: category.templateCategoryId },
          transaction: t,
        });

        console.log(`Subcategories fetched for category ${category.templateCategoryId}`);

        for (const subcategory of subcategories) {
          console.log(`Fetching details for subcategory ${subcategory.templateSubCategoryId}`);

          const reminders = await models.template_subcategory_reminder.findAll({
            where: { templateSubCategoryId: subcategory.templateSubCategoryId },
            transaction: t,
          });

          const remarks = await models.template_remark.findAll({
            where: { templateSubCategoryId: subcategory.templateSubCategoryId },
            include: [
              {
                model: models.template_remark_frequency,
                required: false,
              },
              // {
              //   model: models.template_remark_image,
              //   required: false,
              //   include: {
              //     model: models.template_image,
              //     required: false,
              //   }
              // },
              // {
              //   model: models.office_excluded_remark,
              //   required: false,
              // },
              // {
              //   model: models.office_included_remark,
              //   required: false,
              // }
            ],
            transaction: t,
          });

          const abouts = await models.template_about.findAll({
            where: { templateSubCategoryId: subcategory.templateSubCategoryId },
            include: [
              {
                model: models.template_about_value,
                required: false,
                include: {
                  model: models.template_about_value_note,
                  required: false,
                },
              },
            ],
            transaction: t,
          });

          console.log(`Details fetched for subcategory ${subcategory.templateSubCategoryId}`);

          subcategory.setDataValue('template_subcategory_reminders', reminders);
          subcategory.setDataValue('template_remarks', remarks);
          subcategory.setDataValue('template_abouts', abouts);
        }

        category.setDataValue('template_subcategories', subcategories);
      }

      const masterTemplate = await models.master_template.findOne({
        where: { masterTemplateId: template.masterTemplateId },
        include: {
          model: models.service,
        },
      });
      const template_definitions = await models.template_definition.findAll({ where: { templateId } });
      const template_disclosures = await models.template_disclosure.findAll({ where: { templateId } });
      const template_locations = await models.template_location.findAll({ where: { templateId } });
      const user = await models.sme_user.findOne({
        where: { smeUserId: template.createdBySme },
        attributes: ['smeUserId', 'first', 'last', 'email'],
      });

      template.setDataValue('master_template', masterTemplate);
      template.setDataValue('template_definitions', template_definitions);
      template.setDataValue('template_disclosures', template_disclosures);
      template.setDataValue('template_locations', template_locations);
      template.setDataValue('user', user);
    }
    template.setDataValue('template_categories', templateCategories);

    return template;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const updateDraftTemplate = async (req) => {
  const { templateId, requireRemark, requireAttachment, hasToc, hasLocation, hasDefinition, hasDisclosure } = req.body;
  const { id } = req.smeUser;
  try {
    // check if template
    const template = await models.template.findByPk(templateId);

    if (!template) {
      throw new Error(messages.template.TEMPLATE_NOT_FOUND);
    }

    if (!template.isDraft) {
      throw new Error('Cannot Make changes to published template');
    }

    await template.update({
      requireRemark: requireRemark === false ? false : requireRemark === true ? true : template.requireRemark,
      requireAttachment:
        requireAttachment === false ? false : requireAttachment === true ? true : template.requireAttachment,
      hasToc: hasToc === false ? false : hasToc === true ? true : template.hasToc,
      hasLocation: hasLocation === false ? false : hasLocation === true ? true : template.hasLocation,
      hasDefinition: hasDefinition === false ? false : hasDefinition === true ? true : template.hasDefinition,
      hasDisclosure: hasDisclosure === false ? false : hasDisclosure === true ? true : template.hasDisclosure,
      updatedBySme: id,
    });

    return template;
  } catch (e) {
    throw new Error(e.message);
  }
};

const listTemplateDisclosures = async (req) => {
  const { templateId } = req.query;
  try {
    const templateDisclosures = await models.template_disclosure.findOne({
      where: {
        templateId,
      },
      // order: [['orderNumber', 'ASC']],
    });

    return templateDisclosures;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const editDisclosure = async (req) => {
  const { templateDisclosureId, description } = req.body;
  const { id } = req.smeUser;
  try {
    const templateDisclosure = await models.template_disclosure.findOne({
      where: {
        templateDisclosureId,
      },
      include: {
        model: models.template,
        required: true,
      },
    });

    if (!templateDisclosure) {
      throw new NotFoundError(messages.templateDisclosure.TEMPLATE_DISCOLSURE_NOT_FOUND);
    }

    // if (!templateDisclosure.template.isDraft) {
    //   throw new BadRequestError('Cannot Make changes to published template');
    // }

    if (!templateDisclosure.template.hasDisclosure) {
      throw new BadRequestError('Disclosure is turned off for this service!');
    }

    await templateDisclosure.update({
      // title: title || templateDisclosure.title,
      description: description || templateDisclosure.description,
      updatedBySme: id,
      // show: show === false ? false : show === true ? true : templateDisclosure.show,
    });

    return templateDisclosure;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const listDefinitions = async (req) => {
  const { templateId } = req.query;
  try {
    const templateDefinitions = await models.template_definition.findAll({
      where: {
        templateId,
      },
      order: [['orderNumber', 'ASC']],
    });

    return templateDefinitions;
  } catch (e) {
    handleKnownErrors(e);
  }
};


const reorderDefinitions = async (req) => {
  const { definitionData, templateDefinitionId, templateId } = req.body;
  const { id } = req.smeUser;

  try {
    // check if template exits
    const template = await models.template.findByPk(templateId);
    if (!template) {
      throw new NotFoundError(messages.template.TEMPLATE_NOT_FOUND);
    }

    const templateDefinition = await models.template_definition.findOne({
      where:{
        templateDefinitionId: templateDefinitionId,
        templateId: templateId
      }
    });


    if (!templateDefinition) {
      throw new NotFoundError(messages.templateDefinition.TEMPLATE_DEFINITION_NOT_FOUND);
    }

    for (const { orderNumber, templateDefinitionId } of definitionData) {
      const item = await models.template_definition.findByPk(templateDefinitionId);

      item.orderNumber = orderNumber;
      item.updatedBySme = id;
      await item.save();

    }

    return;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const editDefinition = async (req) => {
  const { templateDefinitionId, title, description } = req.body;
  const { id } = req.smeUser;
  try {
    const templateDefinition = await models.template_definition.findOne({
      where: {
        templateDefinitionId,
      },
      include: {
        model: models.template,
        required: true,
      },
    });

    if (!templateDefinition) {
      throw new NotFoundError(messages.templateDefinition.TEMPLATE_DEFINITION_NOT_FOUND);
    }

    // if (!templateDefinition.template.isDraft) {
    //   throw new BadRequestError('Cannot Make changes to published template');
    // }

    if (!templateDefinition.template.hasDefinition) {
      throw new BadRequestError('Definition is turned off for this service!');
    }

    await templateDefinition.update({
      title: title || templateDefinition.title,
      description: description || templateDefinition.description,
      updatedBySme: id,
    });

    return templateDefinition;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const removeDefinition = async (req) => {
  const { templateDefinitionId } = req.body;
  try {
    const templateDefinition = await models.template_definition.findOne({
      where: {
        templateDefinitionId,
      },
      include: {
        model: models.template,
        required: true,
      },
    });

    if (!templateDefinition) {
      throw new NotFoundError(messages.templateDefinition.TEMPLATE_DEFINITION_NOT_FOUND);
    }

    // if (!templateDefinition.template.isDraft) {
    //   throw new BadRequestError('Cannot Make changes to published template');
    // }

    if (!templateDefinition.template.hasDefinition) {
      throw new BadRequestError('Definition is turned off for this service!');
    }

    let deletedDefinition;

    await sequelize.transaction(async (t) => {
      deletedDefinition = await templateDefinition.destroy({ transaction: t });

      // Get all categories in the template
      const allDefinitions = await models.template_definition.findAll({
        where: {
          templateId: templateDefinition.templateId,
        },
        order: [['orderNumber', 'ASC']],
        transaction: t,
      });

      const deletedDefinitionOrderNumber = deletedDefinition.orderNumber;

      // Shift the order numbers of the remaining categories
      for (const definition of allDefinitions) {
        if (
          definition.templateDefinitionId !== templateDefinitionId
          && definition.orderNumber > deletedDefinitionOrderNumber
        ) {
          await definition.update(
            {
              orderNumber: definition.orderNumber - 1,
            },
            { transaction: t }
          );
        }
      }
    });

    return templateDefinition;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const addDefinition = async (req) => {
  const { title, description, templateId } = req.body;
  const { id } = req.smeUser;
  try {
    // check if template
    const template = await models.template.findByPk(templateId);

    if (!template) {
      throw new NotFoundError(messages.template.TEMPLATE_NOT_FOUND);
    }

    // if (!template.isDraft) {
    //   throw new BadRequestError('Cannot Make changes to published template');
    // }

    if (!template.hasDefinition) {
      throw new BadRequestError('Definition is turned off for this service!');
    }

    // check if categories already exist
    const definitions = await models.template_definition.findAll({
      where: {
        templateId,
      },
      order: [['orderNumber', 'DESC']],
    });

    let orderNumber = 1;

    if (definitions.length > 0) {
      orderNumber = definitions[0].orderNumber + 1;
    }

    // create category for a template
    const createdDefintion = await models.template_definition.create({
      templateId,
      title,
      description,
      orderNumber,
      createdBySme: id,
      updatedBySme: id,
    });

    return createdDefintion;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const storePublishedTemplateJsonInS3 = async (req) => {
  const { templateId } = req.body;

  try {
    const template = await models.template.findOne({
      where: {
        templateId,
      },
      include: {
        model: models.master_template,
      },
    });

    if (!template) {
      throw new NotFoundError(messages.template.TEMPLATE_NOT_FOUND);
    }

    const templateData = await getTemplateDetail({ templateId });
    // Convert the JSON data to a string
    const jsonContent = JSON.stringify(templateData);
    const { Key } = await uploadTemplateJsonTOS3(
      jsonContent,
      template.master_template.name,
      template.version,
      `${template.templateId}_${new Date().getTime()}`
    );
    // await template.update({
    //   jsonKey: Key,
    // });
    // await uploadToSearchRepository(templateData, Key);

    return;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const addDisclousre = async (req) => {
  const { description, templateId } = req.body;
  const { id } = req.smeUser;
  try {
    // check if template
    const template = await models.template.findByPk(templateId);

    if (!template) {
      throw new NotFoundError(messages.template.TEMPLATE_NOT_FOUND);
    }

    // if (!template.isDraft) {
    //   throw new BadRequestError('Cannot Make changes to published template');
    // }

    if (!template.hasDisclosure) {
      throw new BadRequestError('Disclosure is turned off for this service!');
    }

    // create category for a template
    const createdDisclosure = await models.template_disclosure.findOrCreate({
      where: {
        templateId,
      },
      defaults: {
        templateId,
        description,
        createdBySme: id,
        updatedBySme: id,
      },
    });

    return createdDisclosure;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const updateServiceMapping = async (req) => {
  try {
    const allTemplates = await models.template.findAll({
      where: {
        serviceId: {
          [Op.ne]: null,
        },
      },
    });

    for (const template of allTemplates) {
      const service = await models.service.findOne({ where: { serviceId: template.serviceId } });

      template.update({
        masterTemplateId: service.masterTemplateId,
      });
    }

    return;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const listMasterTemplates = async (req) => {
  const { pageIndex, pageSize } = req.query;
  try {
    const masterTemplates = await models.master_template.findAndCountAll({
      where:{
        show: 1,
      },
      attributes: ['masterTemplateId', 'name'],
      distinct: true,
      include: [
        {
          model: models.template,
          where: {
            isActive: 1,
            isDraft: 0,
          },
          required: false,
          include: [
            {
              model: models.sme_user,
              as: 'publishedBy', // This alias is used to differentiate between createdBySme and publishedBySme
              attributes: ['smeUserId', 'first', 'last', 'email'],
            },
            {
              model: models.sme_user,
              as: 'createdBy', // Another alias for createdBySme
              attributes: ['smeUserId', 'first', 'last', 'email'],
            },
            {
              model: models.office_template,
              attributes: ['officeTemplateId'],
              required: false,
              include: {
                model: models.office,
                attributes: ['officeId', 'officeRefId', 'name', 'companyKey', 'isActive'],
                required: false,
              },
            },
          ],
        },
        {
          model: models.service,
          attributes: ['serviceId', 'serviceName'],
        },
      ],
      order: [[models.template, 'publishedAt', 'DESC']],
      ...paginate(pageIndex, pageSize),
    });

    return masterTemplates;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const listTemplatesForAMasterTemplate = async (req) => {
  const { masterTemplateId } = req.query;
  try {
    const templates = await models.template.findAll({
      attributes: ['templateId', 'version', 'isActive', 'isDraft', 'masterTemplateId'],
      where: {
        masterTemplateId,
      },
    });

    return templates;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const updateElasticSearchStatus = async (req) => {
  const { templateId, availableOnES } = req.body;
  try {
    const template = await models.template.findOne({
      attributes: ['templateId', 'version', 'isActive', 'isDraft', 'masterTemplateId'],
      where: {
        templateId,
      },
    });

    if (!template) {
      throw new NotFoundError(messages.template.TEMPLATE_NOT_FOUND);
    }

    if (template.isDraft) {
      throw new BadRequestError('Oops cannot change the ES status of a draft version');
    }

    await template.update({
      availableOnES: availableOnES === false ? false : availableOnES === true ? true : template.availableOnES,
    });

    return template;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const templateInfo = async (req) => {
  const { templateId } = req.query;
  try {
    const template = await models.template.findOne({
      where: {
        templateId,
      },
      include: {
        model: models.template,
        as: 'oldTemplate',
        required: false,
        include: {
          model: models.master_template,
          required: true,
        },
      },
    });

    if (template) {
      const masterTemplate = await models.master_template.findOne({
        where: { masterTemplateId: template.masterTemplateId },
        include: {
          model: models.service,
        },
      });

      const user = await models.sme_user.findOne({
        where: { smeUserId: template.createdBySme },
        attributes: ['smeUserId', 'first', 'last', 'email'],
      });

      const templateCheckId = template.isDraft ? template.oldTemplateId : template.templateId;
      // all reports
      const inProgressReports = await models.report.count({
        where: {
          templateId: templateCheckId,
          isSent: 0,
        },
      });

      template.setDataValue('masterTemplate', masterTemplate);
      template.setDataValue('user', user);
      template.setDataValue('inProgressReports', inProgressReports);
    }

    return template;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const copyTemplateData = async (req) => {
  const { masterTemplateId, copyLocation, copyToTemplateId, copyDefinition, copyDisclosure, preBuilttemplateId } = req.body;
  const { id } = req.smeUser;
  try {
    // check if masterTemplate exists
    const masterTemplate = await models.master_template.findByPk(masterTemplateId);

    if (!masterTemplate) {
      throw new NotFoundError(messages.masterTemplate.MASTER_TEMPLATE_NOT_FOUND);
    }
    // transaction
    const copyToTemplate = await sequelize.transaction(async (t) => {
      // create template
      const copyToTemplate = await models.template.findOne({
        where: {
          templateId: copyToTemplateId,
          isDraft: 1,
        },
        transaction: t,
      });

      if (!copyToTemplate) {
        throw new NotFoundError('Template Not Found!');
      }

      if (preBuilttemplateId) {
        // check if published template Exists
        const preBuiltTemplateExists = await models.template.findOne({
          where: {
            // isDraft: 0,
            templateId: preBuilttemplateId,
          },
          transaction: t,
        });

        if (!preBuiltTemplateExists) {
          throw new NotFoundError('Template not found');
        }

        if (copyDefinition) {
          const templateDefinitions = await models.template_definition.findAll({
            where: { templateId: preBuilttemplateId },
          });

          // Clone the template definitions
          if (templateDefinitions.length > 0) {
            const clonedDefinitions = await Promise.all(
              templateDefinitions.map(async (definition) => {
                const clonedDefinitions = await models.template_definition.create(
                  {
                    orderNumber: definition.orderNumber,
                    title: definition.title,
                    description: definition.description,
                    templateId: copyToTemplate.templateId,
                    oldTemplateDefinitionId: definition.templateDefinitionId,
                    createdBySme: id,
                    updatedBySme: id,
                  },
                  { transaction: t }
                );
              })
            );
          }
        }

        if (copyLocation) {
          const templateLocations = await models.template_location.findAll({ where: { templateId: preBuilttemplateId } });

          // Clone the template definitions
          if (templateLocations.length > 0) {
            const clonedLocations = await Promise.all(
              templateLocations.map(async (location) => {
                const clonedLocations = await models.template_location.create(
                  {
                    location: location.location,
                    templateId: copyToTemplate.templateId,
                    oldTemplateLocationId: location.templateLocationId,
                    createdBySme: id,
                    updatedBySme: id,
                  },
                  { transaction: t }
                );
              })
            );
          }
        }

        if (copyDisclosure) {
          const templateDisclosures = await models.template_disclosure.findAll({
            where: { templateId: preBuilttemplateId },
          });

          // Clone the template disclosures
          if (templateDisclosures.length > 0) {
            const clonedDisclosures = await Promise.all(
              templateDisclosures.map(async (disclosure) => {
                const clonedDisclosure = await models.template_disclosure.create(
                  {
                    description: disclosure.description ? disclosure.description : '',
                    templateId: copyToTemplate.templateId,
                    oldTemplateDisclosureId: disclosure.templateDisclosureId,
                    createdBySme: id,
                    updatedBySme: id,
                  },
                  { transaction: t }
                );
              })
            );
          }
        }
      }
      return copyToTemplate;
    });

    return copyToTemplate;
  } catch (e) {
    handleKnownErrors(e);
  }
};


const uploadTemplateStructureToS3 = async (data)=>{
  const { templateId, t } = data.body ? data.body : data;
  try{

    const templateData = await getTemplateStructureDetail(templateId, t);

    const jsonContent = JSON.stringify(templateData);
      const { Key } = await uploadTemplateJsonTOS3(
        jsonContent,
        templateData.dataValues.master_template.name,
        templateData.version,
        `${templateData.templateId}__structure_${new Date().getTime()}`
      );

    return Key
  }catch(e){
    handleKnownErrors(e);
  }
}

const uploadOfficeRemarkDataToS3 = async (data)=>{
  const { templateId, t } = data.body ? data.body : data;
  try{

    const template = await models.template.findOne({
      where:{
        templateId
      },
      include: {
        model: models.master_template,
      },
    });

    const officeRemarkDataArray = await getRemarkStructureDetail(templateId, t);


    const s3UploadResults = await storeOfficeRemarksToS3(
      officeRemarkDataArray,
      templateId,
      template.master_template.name,
      template.version,
    );

    return s3UploadResults;
  }catch(e){
    handleKnownErrors(e);
  }
}

const storeJsonInBulk = async (req)=>{
  const { templateIds, type } = req.body;
  try{

      return await sequelize.transaction(async (t) => {
        if (type === "Template") {
          return await Promise.all(
            templateIds.map(async (templateId) => {
              try {
                const templateData = await getTemplateStructureDetail(templateId, t);
                const jsonContent = JSON.stringify(templateData);
    
                const { Key } = await uploadTemplateJsonTOS3(
                  jsonContent,
                  templateData.dataValues.master_template.name,
                  templateData.version,
                  `${templateData.templateId}__structure_${Date.now()}`
                );
    
                await models.template.update(
                  { templateJsonKey: Key, templateJsonUpdatedAt: new Date() },
                  { where: { templateId }, transaction: t }
                );
    
                console.log(`Uploaded template structure for templateId: ${templateId}`);
                return { templateId, s3Key: Key };
              } catch (error) {
                console.error(`Error uploading template structure for templateId: ${templateId}`, error);
                return { templateId, error: error.message };
              }
            })
          );
        }
    
        if (type === "Remark") {
          return await Promise.all(
            templateIds.map(async (templateId) => {
              try {
                const template = await models.template.findOne({
                  where: { templateId },
                  include: { model: models.master_template },
                  transaction: t,
                });
    
                const officeRemarkDataArray = await getRemarkStructureDetail(templateId, t);
    
                const s3UploadResults = await storeOfficeRemarksToS3(
                  officeRemarkDataArray,
                  templateId,
                  template.master_template.name,
                  template.version
                );
    
                await Promise.all(
                  s3UploadResults.map(({ officeId, templateId, remarkJsonKey, remarkJsonUpdatedAt }) => {
                    return models.office_template.update(
                      { remarkJsonKey, remarkJsonUpdatedAt },
                      { where: {  officeId, templateId }, transaction: t }
                    );
                  })
                );;
    
                console.log(`Uploaded office remarks for templateId: ${templateId}`);
                return { templateId, s3UploadResults };
              } catch (error) {
                console.error(` Error uploading office remarks for templateId: ${templateId}`, error);
                return { templateId, error: error.message };
              }
            })
          );
        }
      }); 

  }catch(e){
    handleKnownErrors(e);
  }
}

const migrateDefaults = async (req) => {
  const { templateIds } = req.body;

  try {
    await sequelize.transaction(async (transaction) => {
      for (const templateId of templateIds) {
        console.log(`Processing templateId: ${templateId}`);

        const subcategories = await models.template_subcategory.findAll({
          include: {
            model: models.template_category,
            attributes: [],
            where: { templateId },
          },
          transaction,
        });

        if (subcategories.length === 0) {
          console.log(`No subcategories found for templateId: ${templateId}`);
          continue;
        }

        const remarks = await models.template_remark.findAll({
          where: {
            templateSubCategoryId: subcategories.map((s) => s.templateSubCategoryId),
            isFavourite: 1,
          },
          transaction,
        });

        if (remarks.length === 0) {
          console.log(`No remarks found for templateId: ${templateId}`);
          continue;
        }

        const templateRemarks = remarks.filter((r) => r.remarkType === "Template");
        const allOffices = await models.office.findAll({ attributes: ["officeId"], transaction });

        for (const remark of templateRemarks) {
          for (const { officeId } of allOffices) {
            const isExcluded = await models.office_excluded_remark.findOne({
              where: { officeId, templateRemarkId: remark.templateRemarkId },
              transaction,
            });

            if (!isExcluded) {
              const [record, created] = await models.template_remark_frequency.findOrCreate({
                where: { templateRemarkId: remark.templateRemarkId, officeId },
                defaults: {
                  frequency: 0,
                  myRemark: 1,
                  isDefault: 1,
                },
                transaction,
              });

              if (!created) {
                await record.update({ isDefault: 1, myRemark: 1 }, { transaction });
              }
            }
          }
        }

        const customRemarks = remarks.filter((r) => r.remarkType === "Custom");

        for (const remark of customRemarks) {
          const includedOffices = await models.office_included_remark.findAll({
            attributes: ["officeId"],
            where: { templateRemarkId: remark.templateRemarkId },
            transaction,
          });

          for (const { officeId } of includedOffices) {
            const [record, created] = await models.template_remark_frequency.findOrCreate({
              where: { templateRemarkId: remark.templateRemarkId, officeId },
              defaults: {
                frequency: 0,
                myRemark: 1,
                isDefault: 1,
              },
              transaction,
            });

            if (!created) {
              await record.update({ isDefault: 1, myRemark: 1 }, { transaction });
            }
          }
        }
      }
    });

    return
  } catch (e) {
    handleKnownErrors(e);
  }
};

const listTemplateImages = async (req) => {
  const { templateId } = req.query;
  try {
    const templateImages = await models.template_image.findAll({
      where: {
        templateId
      }
    });

    return templateImages;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const getMultipleUrlsToUploadTemplateImages = async (req) => {
  const { templateId, images } = req.body;
  try {
    const template = await models.template.findOne({
      where: { templateId },
      include: {
        model: models.master_template,
        required: true
      }
    });

    if (!template) {
      throw new NotFoundError(messages.template.TEMPLATE_NOT_FOUND);
    }

    const uploadUrls = await Promise.all(
      images.map(async (image) => {
        const uploadData = await getUploadURLForTemplateImage(
          template.master_template.name, 
          template.version, 
          image.imageTitle,
          Date.now()
        );

        return {
          imageTitle: image.imageTitle,
          uploadURL: uploadData.uploadURL,
          Key: uploadData.Key
        };
      })
    );

    return uploadUrls;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const uploadMultipleTemplateImages = async (req) => {
  const { templateId, images } = req.body;
  try {
    const template = await models.template.findByPk(templateId);

    if (!template) {
      throw new NotFoundError(messages.template.TEMPLATE_NOT_FOUND);
    }

    const templateImages = await sequelize.transaction(async (t) => {
      const createdImages = await Promise.all(
        images.map(async (image) => {
          const templateImage = await models.template_image.create({
            templateId,
            // imageTitle: image.imageTitle || 'Untitled',
            originalImageKey: image.imageKey,
            location: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/`,
            uploadStatus: 'pending'
          }, { transaction: t });

          return templateImage;
        })
      );

      return createdImages;
    });

    return templateImages;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const deleteMultipleTemplateImages = async (req) => {
  const { templateImageIds } = req.body;

  try {
    // Validate all template images exist before deletion
    const existingImages = await models.template_image.findAll({
      where: {
        templateImageId: templateImageIds,
      },
    });

    if (existingImages.length === 0) {
      throw new NotFoundError('No template images found for the provided IDs');
    }

    if (existingImages.length !== templateImageIds.length) {
      throw new NotFoundError('Some template images were not found');
    }

    // Perform bulk deletion with transaction to ensure atomicity
    const result = await sequelize.transaction(async (t) => {
      // First delete related template_remark_images
      const remarkImagesDeletedCount = await models.template_remark_image.destroy({
        where: {
          templateImageId: templateImageIds,
        },
        transaction: t,
      });

      // Then delete template images
      const imagesDeletedCount = await models.template_image.destroy({
        where: {
          templateImageId: templateImageIds,
        },
        transaction: t,
      });

      return { 
        imagesDeletedCount, 
        remarkImagesDeletedCount,
        message: `Successfully deleted ${imagesDeletedCount} template images and ${remarkImagesDeletedCount} related template remark images` 
      };
    });

    return result;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const getTermAndCondition = async (req) => {
  try {
    const termAndCondition = await models.term_and_condition.findOne();

    return termAndCondition ? termAndCondition : null;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const updateATermAndCondition = async (req) => {
  const { terms_and_condition_id, description } = req.body;
  try {
    const termAndCondition = await models.term_and_condition.findByPk(terms_and_condition_id);

    if (!termAndCondition) {
      throw new NotFoundError('T&C Not Found!');
    }

    termAndCondition.description = description;
    const updatedTermAndCondition = await termAndCondition.save();

    return {
      updatedTermAndCondition,
      message: 'T&C updated Successfully'
    };
  } catch (e) {
    handleKnownErrors(e);
  }
};

const manageSummaryRemark = async (req) => {
  const { templateRemarkId, addToSummary, officeId } = req.body;
  // const { officeId } = req.user;

  try {
    const remark = await models.template_remark.findByPk(templateRemarkId);

    if (!remark) {
      throw new BadRequestError('Remark not found');
    }

    const record = await sequelize.transaction(async (transaction) => {
      // Find or create frequency record for this remark and office
      let record = await models.template_remark_frequency.findOne({
        where: { templateRemarkId, officeId },
        transaction,
      });

      if (!record) {
        // Create a new frequency record
        record = await models.template_remark_frequency.create({
          templateRemarkId,
          officeId,
          frequency: 0,
          myRemark: 1,
          isDefault: false,
          addToSummary: addToSummary !== undefined ? addToSummary : (remark.type === 'Issue' ? true : false),
          officeStatus: remark.type === 'Issue' ? 'Repairs Recommended' : remark.type,
        }, { transaction });

      } else {
        // Update existing record
        const updateData = { addToSummary };

        // Auto-set addToSummary to true if type is 'Issue' or office_status is 'Repairs Recommended' and addToSummary wasn't explicitly set to false
        if ((remark.type === 'Issue') && addToSummary !== false) {
          updateData.addToSummary = true;
        }

        await record.update(updateData, { transaction });
      }

      return record;
    });

    return record;
  } catch (e) {
    handleKnownErrors(e);
  }
};

module.exports = {
  createDraftTemplate,
  publishedTemplatesList,
  draftTemplatesList,
  getPresignedUrlToUploadImageForTemplateIcon,
  publishTemplate,
  rollbackToPreviousPublishedTemplate,
  getTemplateDetail,
  updateDraftTemplate,
  listTemplateDisclosures,
  editDisclosure,
  listDefinitions,
  editDefinition,
  removeDefinition,
  addDefinition,
  storePublishedTemplateJsonInS3,
  addDisclousre,
  updateServiceMapping,
  listMasterTemplates,
  listTemplatesForAMasterTemplate,
  updateElasticSearchStatus,
  templateInfo,
  copyTemplateData,
  reorderDefinitions,
  uploadTemplateStructureToS3,
  uploadOfficeRemarkDataToS3,
  storeJsonInBulk,
  migrateDefaults,
  listTemplateImages,
  getMultipleUrlsToUploadTemplateImages,
  uploadMultipleTemplateImages,
  deleteMultipleTemplateImages,
  getTermAndCondition,
  updateATermAndCondition,
  manageSummaryRemark
};
