const { Op } = require('sequelize');
const { models } = require('../database/index');
const sequelize = require('../database/index');
const { handleKnownErrors, NotFoundError, BadRequestError } = require('../helpers/error');
const messages = require('../helpers/messages');
const { storeOfficeRemarksToS3 } = require('../helpers/s3');
const { getRemarkStructureDetailForAnOffice } = require('../helpers/utils');

const listOffices = async (req) => {
  const { masterTemplateId, searchKey } = req.query;
  try {
    const templateIds = await models.template
      .findAll({
        where: {
          masterTemplateId,
        },
      })
      .then((res) => res.map((el) => el.templateId));

    if(searchKey){
      // search by office name, manager name, company key
      const offices = await models.office.findAll({
        where: {
          isActive: 1,
          [Op.or]: [
            {
              city: { [Op.like]: `%${searchKey}%`},
            }, 
            {
              manager: { [Op.like]: `%${searchKey}%`}
            },
            {
              companyKey: { [Op.like]: `%${searchKey}%`},
            }
          ]
        },
        include: {
          model: models.office_template,
          required: false,
          where: {
            templateId: templateIds,
          },
        },
      });

      return offices;

    } else  {
      const offices = await models.office.findAll({
        where: {
          isActive: 1
        },
        include: {
          model: models.office_template,
          required: false,
          where: {
            templateId: templateIds,
          },
        },
      });

      return offices;
    }
    
  } catch (e) {
    throw new Error(e.message);
  }
};

const listOfficesWithTemplateAccess = async ( req ) => {
  const { searchKey } = req.query;
  const updatedSearchKey = searchKey ? searchKey : "";

  try {
    const templateList = await models.template.findAll({
      where: {
        isActive: 1,
        isDraft: 0,
      },
    });

    const templateIdList = templateList.map(el => el.templateId);
    

    const templates = templateList.reduce((acc, current, index)=>{
      if(current && current.templateId){
        acc[current.templateId] = current;
      }
      return acc;
    }, {})

    const masterTemplateList = await models.master_template.findAll({
      attributes: ["masterTemplateId", "name"],
      include: {
        model: models.service,
        attributes: ['serviceId', 'serviceName'],
      }
    });

    const masterTemplates = masterTemplateList.reduce((acc, current, index)=>{
      if(current && current.masterTemplateId){
        acc[current.masterTemplateId] = current;
      }
      return acc;
    }, {})
    
    let offices = {};

    if(searchKey) {
      offices = await models.office.findAll({
        where: {
          isActive: 1,
          [Op.or]: [
            {
              city: { [Op.like]: `%${searchKey}%`},
            }, 
            {
              manager: { [Op.like]: `%${searchKey}%`}
            },
            {
              companyKey: { [Op.like]: `%${searchKey}%`},
            }
          ]
        },
        include: {
          attributes: ["templateId"],
          model: models.office_template,
          required: true,
          where: {
            templateId: templateIdList,
          },
        },
      });  
    } else {
      offices = await models.office.findAll({
        where: {
          isActive: 1
        },
        include: {
          attributes: ["templateId"],
          model: models.office_template,
          required: true,
          where: {
            templateId: templateIdList,
          },
        },
      });  
    }

    let updatedOffice = [];

    offices.forEach(office => {
      const templateData = [];
      office.office_templates.forEach(office_template => {
        const data = {};
        data.template = templates[office_template.templateId];
        data.masterTemplate = masterTemplates[data.template.masterTemplateId];
        templateData.push(data);
      })
      const updateOfficeData = {
        office: office,
        templateData
      }
      updatedOffice.push(updateOfficeData);
    })


    return updatedOffice;
  } catch (e) {
    throw new Error(e.message);
  }
}

const serviceAccess = async (req) => {
  const { officeIds, serviceId } = req.body;
  const { id } = req.smeUser;
  try {
    const serviceExist = await models.service.findOne({
      where: {
        serviceId,
      },
      include: {
        model: models.template,
        where: {
          isDraft: 0,
        },
        required: false,
      },
    });

    if (!serviceExist) {
      throw new Error(messages.service.SERVICE_NOT_FOUND);
    }

    if (serviceExist.templates.length === 0) {
      throw new Error('Cannot associate to a service with no published templates');
    }

    // check if offices exist
    const offices = await models.office.findAll({
      where: {
        officeId: officeIds,
      },
    });

    if (officeIds.length !== offices.length) {
      throw new Error(messages.office.OFFICE_NOT_FOUND);
    }

    // provide access to all published templates for a service
    const publishedTemplateIds = await models.template
      .findAll({
        where: {
          serviceId,
          isDraft: 0,
        },
      })
      .then((res) => res.map((el) => el.templateId));

    // Transaction
    await sequelize.transaction(async (t) => {
      // Fetch the officeTemplateIds before deletion
      const officeTemplateIds = await models.office_template
        .findAll({
          attributes: ['officeTemplateId'], // Fetch only the 'id' attribute (the primary key)
          where: {
            templateId: { [Op.in]: publishedTemplateIds },
            officeId: { [Op.notIn]: officeIds },
          },
          transaction: t,
        })
        .then((res) => res.map((el) => el.officeTemplateId));

      if (officeTemplateIds.length !== 0) {
        // delete
        await models.office_template.destroy({
          where: {
            templateId: { [Op.in]: publishedTemplateIds },
            officeId: { [Op.notIn]: officeIds },
          },
          returning: true, // Add the returning option to get the IDs of the deleted records
          transaction: t,
        });

        // User templates
        const userTemplateIds = await models.user_template
          .findAll({
            attributes: ['userTemplateId'],
            where: {
              officeTemplateId: officeTemplateIds,
            },
            transaction: t,
          })
          .then((res) => res.map((el) => el.userTemplateId));

        await models.user_template.destroy({
          where: {
            officeTemplateId: officeTemplateIds,
          },
          transaction: t,
        });

        // User templates
        const userTemplateCategoryIds = await models.user_template_category
          .findAll({
            attributes: ['userTemplateCategoryId'],
            where: {
              userTemplateId: userTemplateIds,
            },
            transaction: t,
          })
          .then((res) => res.map((el) => el.userTemplateCategoryId));

        await models.user_template_category.destroy({
          where: {
            userTemplateId: userTemplateIds,
          },
          transaction: t,
        });

        // User templates subcategory
        await models.user_template_subcategory
          .findAll({
            attributes: ['userTemplateSubCategoryId'],
            where: {
              userTemplateCategoryId: userTemplateCategoryIds,
            },
            transaction: t,
          })
          .then((res) => res.map((el) => el.userTemplateCategoryId));

        await models.user_template_subcategory.destroy({
          where: {
            userTemplateCategoryId: userTemplateCategoryIds,
          },
          transaction: t,
        });
      }

      await Promise.all(
        await officeIds.map(async (officeId) => {
          // provide access to each published template (for a service)
          await publishedTemplateIds.map(async (templateId) => {
            const officeTemplate = await models.office_template.findOrCreate({
              where: { officeId, templateId },
              defaults: { officeId, templateId, createdBySme: id },
              transaction: t,
            });
            return officeTemplate;
          });
        })
      );
    });

    return;
  } catch (e) {
    throw new Error(e.message);
  }
};

const templateAccess = async (req) => {
  const { officeIds, masterTemplateId } = req.body;
  const { id } = req.smeUser;
  try {
    const masterTemplateExist = await models.master_template.findOne({
      where: { masterTemplateId },
      include: {
        model: models.template,
        where: { isDraft: 0 },
        required: false,
      },
    });

    if (!masterTemplateExist) {
      throw new NotFoundError(messages.masterTemplate.MASTER_TEMPLATE_NOT_FOUND);
    }

    if (masterTemplateExist.templates.length === 0) {
      throw new BadRequestError('Cannot associate to a service with no published templates');
    }

    const offices = await models.office.findAll({
      where: { officeId: officeIds },
    });

    if (officeIds.length !== offices.length) {
      throw new NotFoundError(messages.office.OFFICE_NOT_FOUND);
    }

    // Fetch all published templateIds for the master template
    const publishedTemplateIds = masterTemplateExist.templates.map((el) => el.templateId);

    await sequelize.transaction(async (t) => {
      // Fetch officeTemplateIds to be deleted
      const officeTemplateIds = await models.office_template
        .findAll({
          attributes: ['officeTemplateId'],
          where: {
            templateId: { [Op.in]: publishedTemplateIds },
            officeId: { [Op.notIn]: officeIds },
          },
          transaction: t,
        })
        .then((res) => res.map((el) => el.officeTemplateId));

      if (officeTemplateIds.length !== 0) {
        await models.office_template.destroy({
          where: {
            officeTemplateId: { [Op.in]: officeTemplateIds },
          },
          transaction: t,
        });
      }

      // Provide access to each published template
      await Promise.all(
        officeIds.map(async (officeId) => {
          await Promise.all(
            publishedTemplateIds.map(async (templateId) => {
              const [officeTemplate] = await models.office_template.findOrCreate({
                where: { officeId, templateId },
                defaults: { officeId, templateId, createdBySme: id },
                transaction: t,
              });

              
              const template = await models.template.findOne({
                where: { templateId, isActive: true },
              });

              // Check if remarkJsonKey exists; if not, create JSON in background
              if (template && !officeTemplate.remarkJsonKey) {
                // Background process (no await)
                (async () => {
                  const officeRemarkData = await getRemarkStructureDetailForAnOffice(templateId, officeId);

                  if (officeRemarkData  && officeRemarkData.length > 0) {
                    const s3UploadResults = await storeOfficeRemarksToS3(
                      officeRemarkData,
                      templateId,
                      officeId
                    );

                    // Update the office_template record with S3 details
                    await officeTemplate.update(
                      {
                        remarkJsonKey: s3UploadResults[0].remarkJsonKey,
                        remarkJsonUpdatedAt: new Date(),
                      }
                    );

                    console.log(`JSON created for officeId: ${officeId}, templateId: ${templateId}`);
                  }
                })();
              }
            })
          );
        })
      );
    });

    return;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const templateAccessForOneOffice = async (req) => {
  const { officeId, masterTemplateIds, removeTemplateList } = req.body;
  const { id } = req.smeUser;
  try {
    // Combine both lists to validate all requested master templates
    const allMasterTemplateIds = [...masterTemplateIds, ...removeTemplateList];
    const masterTemplates = await models.master_template.findAll({
      where: { masterTemplateId: allMasterTemplateIds },
      include: {
        model: models.template,
        where: { isDraft: 0 },
        required: false,
      },
    });

    if (masterTemplates.length !== allMasterTemplateIds.length) {
      throw new NotFoundError(messages.masterTemplate.MASTER_TEMPLATE_NOT_FOUND);
    }

    masterTemplates.forEach((masterTemplate) => {
      if (!masterTemplate.templates || masterTemplate.templates.length === 0) {
        throw new BadRequestError(
          `Cannot associate to a service with no published templates for templateId ${masterTemplate.masterTemplateId}`
        );
      }
    });

    // Validate that the office exists
    const officeExists = await models.office.findOne({
      where: { officeId },
    });
    if (!officeExists) {
      throw new NotFoundError(messages.office.OFFICE_NOT_FOUND);
    }

    // -------------------------------
    // Remove access for templates in removeTemplateList
    // -------------------------------
    await Promise.all(
      removeTemplateList.map(async (masterTemplateId) => {
        // Fetch published templateIds for the master template
        const publishedTemplateIds = (await models.template.findAll({
          where: { masterTemplateId, isDraft: 0 },
        })).map((el) => el.templateId);

        await sequelize.transaction(async (t) => {
          // Find office_template IDs to be deleted
          const officeTemplateIds = (await models.office_template.findAll({
            attributes: ['officeTemplateId'],
            where: {
              templateId: { [Op.in]: publishedTemplateIds },
              officeId,
            },
            transaction: t,
          })).map((el) => el.officeTemplateId);

          if (officeTemplateIds.length) {
            await models.office_template.destroy({
              where: {
                officeTemplateId: { [Op.in]: officeTemplateIds },
              },
              transaction: t,
            });
          }
        });
      })
    );

    // -------------------------------
    // Provide access for templates in masterTemplateIds
    // -------------------------------
    await sequelize.transaction(async (t) => {
      await Promise.all(
        masterTemplateIds.map(async (masterTemplateId) => {
          const publishedTemplateIds = (await models.template.findAll({
            where: { masterTemplateId, isDraft: 0 },
          })).map((el) => el.templateId);

          await Promise.all(
            publishedTemplateIds.map(async (templateId) => {
              const [officeTemplate] = await models.office_template.findOrCreate({
                where: { officeId, templateId },
                defaults: { officeId, templateId, createdBySme: id },
                transaction: t,
              });

              const template = await models.template.findOne({
                where: { templateId, isActive: true },
                include:{
                  model: models.master_template,
                  required:true
                }
              });

              // If the template is active and remarkJsonKey is not set, fetch the remark details.
              // If no remarks are found, default to an empty JSON object.
              if (template && !officeTemplate.remarkJsonKey) {
                let officeRemarkData = await getRemarkStructureDetailForAnOffice(templateId, officeId, t);
                
                if (!officeRemarkData) {
                  officeRemarkData = [{ officeId, remarks: [] }];
                } else if (!Array.isArray(officeRemarkData)) {
                  officeRemarkData = [officeRemarkData];
                }
                
                const s3UploadResults = await storeOfficeRemarksToS3(
                  officeRemarkData,
                  templateId,
                  template.master_template.name,
                  template.version,
                );
                await officeTemplate.update(
                  {
                    remarkJsonKey: s3UploadResults[0].remarkJsonKey,
                    remarkJsonUpdatedAt: new Date(),
                  },
                  { transaction: t }
                );
                console.log(`JSON created for officeId: ${officeId}, templateId: ${templateId}`);
              }              
            })
          );
        })
      );
    });

    return;
  } catch (e) {
    handleKnownErrors(e);
  }
};




const removeServiceAccess = async (req) => {
  const { serviceId, officeIds } = req.body;
  
  try {
    const serviceExist = await models.service.findOne({
      where: {
        serviceId,
      },
      include: {
        model: models.template,
        where: {
          isDraft: 0,
        },
        required: false,
      },
    });

    if (!serviceExist) {
      throw new Error(messages.service.SERVICE_NOT_FOUND);
    }

    if (serviceExist.templates.length === 0) {
      throw new Error('No templates found!');
    }

    // check if offices exist
    const offices = await models.office.findAll({
      where: {
        officeId: officeIds,
      },
    });

    if (officeIds.length !== offices.length) {
      throw new Error(messages.office.OFFICE_NOT_FOUND);
    }

    // remove office templates

    // all published templates for a service
    const publishedTemplateIds = await models.template
      .findAll({
        where: {
          serviceId,
          isDraft: 0,
        },
      })
      .then((res) => res.map((el) => el.templateId));

    // transaction
    await sequelize.transaction(async (transaction) => {
      // Fetch the officeTemplateIds before deletion
      const officeTemplateIds = await models.office_template
        .findAll({
          attributes: ['officeTemplateId'], // Fetch only the 'id' attribute (the primary key)
          where: {
            templateId: { [Op.in]: publishedTemplateIds },
            officeId: { [Op.in]: officeIds },
          },
          transaction,
        })
        .then((res) => res.map((el) => el.officeTemplateId));

      // delete
      await models.office_template.destroy({
        where: {
          templateId: { [Op.in]: publishedTemplateIds },
          officeId: { [Op.in]: officeIds },
        },
        returning: true, // Add the returning option to get the IDs of the deleted records
        transaction,
      });

      // User templates
      const userTemplateIds = await models.user_template
        .findAll({
          attributes: ['userTemplateId'],
          where: {
            officeTemplateId: officeTemplateIds,
          },
          transaction,
        })
        .then((res) => res.map((el) => el.userTemplateId));

      await models.user_template.destroy({
        where: {
          officeTemplateId: officeTemplateIds,
        },
        transaction,
      });

      // User templates
      const userTemplateCategoryIds = await models.user_template_category
        .findAll({
          attributes: ['userTemplateCategoryId'],
          where: {
            userTemplateId: userTemplateIds,
          },
          transaction,
        })
        .then((res) => res.map((el) => el.userTemplateCategoryId));

      await models.user_template_category.destroy({
        where: {
          userTemplateId: userTemplateIds,
        },
        transaction,
      });

      // User templates subcategory
      await models.user_template_subcategory
        .findAll({
          attributes: ['userTemplateSubCategoryId'],
          where: {
            userTemplateCategoryId: userTemplateCategoryIds,
          },
          transaction,
        })
        .then((res) => res.map((el) => el.userTemplateCategoryId));

      await models.user_template_subcategory.destroy({
        where: {
          userTemplateCategoryId: userTemplateCategoryIds,
        },
        transaction,
      });
    });

    return;
  } catch (e) {
    throw new Error(e.message);
  }
};

const removeTemplateAccess = async (req) => {
  const { masterTemplateId, officeIds } = req.body;
  try {
    const masterTemplateExist = await models.master_template.findOne({
      where: {
        masterTemplateId,
      },
      include: {
        model: models.template,
        where: {
          isDraft: 0,
        },
        required: false,
      },
    });

    if (!masterTemplateExist) {
      throw new NotFoundError(messages.masterTemplate.MASTER_TEMPLATE_NOT_FOUND);
    }

    if (masterTemplateExist.templates.length === 0) {
      throw new NotFoundError('No templates found!');
    }

    // check if offices exist
    const offices = await models.office.findAll({
      where: {
        officeId: officeIds,
      },
    });

    if (officeIds.length !== offices.length) {
      throw new NotFoundError(messages.office.OFFICE_NOT_FOUND);
    }

    // remove office templates

    // all published templates for a service
    const publishedTemplateIds = await models.template
      .findAll({
        where: {
          masterTemplateId,
          isDraft: 0,
        },
      })
      .then((res) => res.map((el) => el.templateId));

    // transaction
    await sequelize.transaction(async (transaction) => {
      // Fetch the officeTemplateIds before deletion
      const officeTemplateIds = await models.office_template
        .findAll({
          attributes: ['officeTemplateId'], // Fetch only the 'id' attribute (the primary key)
          where: {
            templateId: { [Op.in]: publishedTemplateIds },
            officeId: { [Op.in]: officeIds },
          },
          transaction,
        })
        .then((res) => res.map((el) => el.officeTemplateId));

      // delete
      await models.office_template.destroy({
        where: {
          templateId: { [Op.in]: publishedTemplateIds },
          officeId: { [Op.in]: officeIds },
        },
        returning: true, // Add the returning option to get the IDs of the deleted records
        transaction,
      });

      // User templates
      const userTemplateIds = await models.user_template
        .findAll({
          attributes: ['userTemplateId'],
          where: {
            officeTemplateId: officeTemplateIds,
          },
          transaction,
        })
        .then((res) => res.map((el) => el.userTemplateId));

      await models.user_template.destroy({
        where: {
          officeTemplateId: officeTemplateIds,
        },
        transaction,
      });

      // User templates
      const userTemplateCategoryIds = await models.user_template_category
        .findAll({
          attributes: ['userTemplateCategoryId'],
          where: {
            userTemplateId: userTemplateIds,
          },
          transaction,
        })
        .then((res) => res.map((el) => el.userTemplateCategoryId));

      await models.user_template_category.destroy({
        where: {
          userTemplateId: userTemplateIds,
        },
        transaction,
      });

      // User templates subcategory
      await models.user_template_subcategory
        .findAll({
          attributes: ['userTemplateSubCategoryId'],
          where: {
            userTemplateCategoryId: userTemplateCategoryIds,
          },
          transaction,
        })
        .then((res) => res.map((el) => el.userTemplateCategoryId));

      await models.user_template_subcategory.destroy({
        where: {
          userTemplateCategoryId: userTemplateCategoryIds,
        },
        transaction,
      });
    });

    return;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const listOfficesMappedWithRemark = async (req) => {
  const { templateRemarkId, templateSubCategoryId } = req.query;

  try {
    const remarkExist = await models.template_remark.findOne({
      where: {
        templateRemarkId,
        templateSubCategoryId,
      },
      include:{
        model: models.template_remark_frequency,
        where:{
          isDefault:1,
        },
        attributes: ['officeId', 'isDefault'],
        required: true,
      },
      attributes: ['templateRemarkId', 'remarkType', 'isFavourite']
    });

    if (!remarkExist) {
      throw new NotFoundError(messages.templateRemark.TEMPLATE_REMARK_NOT_FOUND);
    }

    // if (!remarkExist.isFavourite) {
    //   throw new NotFoundError('This is not a default remark!');
    // }

    let officeIds = remarkExist.template_remark_frequencies.map((record)=>{
      return record.officeId
    });

    // if (remarkExist.remarkType === 'Template') {
    //   // if template then excluded
    //   officeParams = {
    //     model: models.office_excluded_remark,
    //     where: {
    //       templateRemarkId
    //     },
    //     required: false,
    //   };
    // } else if (remarkExist.remarkType === 'Custom') {
    //   officeParams = {
    //     model: models.office_included_remark,
    //     where: {
    //       templateRemarkId
    //     },
    //     required: false
    //   };
    // }

    const offices = await models.office.findAll({
      where: {
        isActive: 1,
        officeId: officeIds
      },
    });

    return offices;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const mapOfficeWithDefaultRemark = async (req) => {
  const { templateRemarkId, templateSubCategoryId, officeIds } = req.body;

  try {

    throw new BadRequestError('Cannot make changes to default on admin Panel!');


    // const remarkExist = await models.template_remark.findOne({
    //   where: {
    //     templateRemarkId,
    //     templateSubCategoryId,
    //   },
    //   attributes: ['templateRemarkId', 'remarkType', 'isFavourite'],
    // });

    // if (!remarkExist) {
    //   throw new NotFoundError(messages.templateRemark.TEMPLATE_REMARK_NOT_FOUND);
    // }

    // if (!remarkExist.isFavourite) {
    //   throw new NotFoundError('This is not a default remark!');
    // }

    // // Check if offices exist
    // const offices = await models.office.findAll({
    //   where: {
    //     officeId: officeIds,
    //   },
    // });

    // if (officeIds.length !== offices.length) {
    //   throw new NotFoundError(messages.office.OFFICE_NOT_FOUND);
    // }

    // const upsertParam = officeIds.map((officeId) => ({ officeId, templateRemarkId }));

    // await sequelize.transaction(async (transaction) => {
    //   if (remarkExist.remarkType === 'Template') {
    //     // Delete other office mappings for that remark
    //     await models.office_excluded_remark.destroy({
    //       where: {
    //         officeId: {
    //           [Op.notIn]: officeIds,
    //         },
    //         templateRemarkId,
    //       },
    //       transaction,
    //     });

    //     // Use findOrCreate instead of bulkCreate
    //     for (const param of upsertParam) {
    //       await models.office_excluded_remark.findOrCreate({
    //         where: { officeId: param.officeId, templateRemarkId: param.templateRemarkId },
    //         defaults: param,
    //         transaction,
    //       });
    //     }
    //   } else if (remarkExist.remarkType === 'Custom') {
    //     // Delete other office mappings for that remark
    //     await models.office_included_remark.destroy({
    //       where: {
    //         officeId: {
    //           [Op.notIn]: officeIds,
    //         },
    //         templateRemarkId,
    //       },
    //       transaction,
    //     });

    //     // Use findOrCreate instead of bulkCreate
    //     for (const param of upsertParam) {
    //       await models.office_included_remark.findOrCreate({
    //         where: { officeId: param.officeId, templateRemarkId: param.templateRemarkId },
    //         defaults: param,
    //         transaction,
    //       });
    //     }
    //   }
    // });

    return;
  } catch (e) {
    handleKnownErrors(e);
  }
};


const bulkMapOfficeWithDefaultRemark = async (req) => {
  const { templateRemarkData } = req.body;

  try {

    throw new BadRequestError('Cannot make changes to default on admin Panel!');


    // await sequelize.transaction(async (transaction) => {
    //   for (const { templateRemarkId, officeIds } of templateRemarkData) {
    //     const remarkExist = await models.template_remark.findOne({
    //       where: {
    //         templateRemarkId,
    //       },
    //       attributes: ['templateRemarkId', 'remarkType', 'isFavourite'],
    //     });

    //     if (!remarkExist) {
    //       throw new NotFoundError(messages.templateRemark.TEMPLATE_REMARK_NOT_FOUND);
    //     }

    //     if (!remarkExist.isFavourite) {
    //       throw new NotFoundError('This is not a default remark!');
    //     }

    //     // Check if offices exist
    //     const offices = await models.office.findAll({
    //       where: {
    //         officeId: officeIds,
    //       },
    //     });

    //     if (officeIds.length !== offices.length) {
    //       throw new NotFoundError(messages.office.OFFICE_NOT_FOUND);
    //     }

    //     const upsertParam = officeIds.map((officeId) => ({ officeId, templateRemarkId }));

    //     if (remarkExist.remarkType === 'Template') {
    //       // Delete other office mappings for that remark
    //       await models.office_excluded_remark.destroy({
    //         where: {
    //           officeId: {
    //             [Op.notIn]: officeIds,
    //           },
    //           templateRemarkId,
    //         },
    //         transaction,
    //       });

    //       // Use findOrCreate instead of bulkCreate
    //       for (const param of upsertParam) {
    //         await models.office_excluded_remark.findOrCreate({
    //           where: { officeId: param.officeId, templateRemarkId: param.templateRemarkId },
    //           defaults: param,
    //           transaction,
    //         });
    //       }
    //     } else if (remarkExist.remarkType === 'Custom') {
    //       // Delete other office mappings for that remark
    //       await models.office_included_remark.destroy({
    //         where: {
    //           officeId: {
    //             [Op.notIn]: officeIds,
    //           },
    //           templateRemarkId,
    //         },
    //         transaction,
    //       });

    //       // Use findOrCreate instead of bulkCreate
    //       for (const param of upsertParam) {
    //         await models.office_included_remark.findOrCreate({
    //           where: { officeId: param.officeId, templateRemarkId: param.templateRemarkId },
    //           defaults: param,
    //           transaction,
    //         });
    //       }
    //     }
    //   }
    // });

    return;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const getUsersByOfficeId = async (req) => {
  const { officeId } = req.body;
  try {
    const office = await models.office.findOne({
      where: {
        officeId,
        isActive: 1,
      },
    });

    if (!office) {
      throw new NotFoundError(messages.office.OFFICE_NOT_FOUND);
    }

    const users = await models.user.findAll({
      where: {
        officeId,
        isActive: 1,
      },
      attributes: [
        'userId',
        'userRefId',
        'username',
        'displayName',
        'license',
        'licenseType',
        'photoUrl',
        'isActive',
        'isSuperAdmin',
        'isTempPassword',
        'termAccepted',
        'showWelcome',
        'showClosure'
      ],
    });

    return users;
  } catch (e) {
    handleKnownErrors(e);
  }
};

module.exports = {
  listOffices,
  serviceAccess,
  removeServiceAccess,
  templateAccess,
  removeTemplateAccess,
  listOfficesMappedWithRemark,
  mapOfficeWithDefaultRemark,
  bulkMapOfficeWithDefaultRemark,
  listOfficesWithTemplateAccess,
  templateAccessForOneOffice,
  getUsersByOfficeId
};
