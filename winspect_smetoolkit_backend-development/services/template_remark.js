const { Op } = require('sequelize');
const { models } = require('../database/index');
const { handleKnownErrors, NotFoundError, BadRequestError } = require('../helpers/error');
const messages = require('../helpers/messages');
const sequelize = require('../database/index');
const { paginate } = require('../helpers/utils');
const {
  addRemarkToPublishedTemplateES,
  editPublishedTemplateRemarkES,
  deletePublishedTemplateRemarkES,
} = require('../helpers/externalApi/search');
const { getUploadURLForTemplateRemarkImage } = require('../helpers/s3');

const listRemark = async (req) => {
  const {
    templateSubCategoryId,
    remarkType,
    officeIds,
    pageIndex,
    pageSize,
    type,
    sort,
    search,
    start,
    end,
  } = req.query;

  try {
    const templateSubCategory = await models.template_subcategory.findOne({
      where: { templateSubCategoryId },
      include: {
        model: models.template_category,
        required: true,
        include: {
          model: models.template,
          required: true,
        },
      },
    });

    if (!templateSubCategory) {
      throw new Error(messages.templateSubCategory.TEMPLATE_SUB_CATEGORY_NOT_FOUND);
    }

    const isDraftTemplate = templateSubCategory.template_category.template.isDraft;

    let orderBy = [['createdAt', 'DESC']];
    if (sort === 'Most Used') {
      orderBy = isDraftTemplate
        ? [[{ model: models.template_remark, as: 'oldTemplateRemark' }, 'totalFrequency', 'DESC']]
        : [['totalFrequency', 'DESC']];
    } else if (sort === 'Least Used') {
      orderBy = isDraftTemplate
        ? [[{ model: models.template_remark, as: 'oldTemplateRemark' }, 'totalFrequency', 'ASC']]
        : [['totalFrequency', 'ASC']];
    } else if (sort === 'Recently Added') {
      orderBy = [['createdAt', 'DESC']];
    }

    const frequencyInclude = {
      model: models.template_remark_frequency,
      required: false,
      include: {
        model: models.office,
        attributes: ['officeId', 'name', 'manager', 'companyKey'],
        required: false,
      },
    };

    const userInclude = {
      model: models.user,
      attributes: ['userId', 'displayName', 'officeId'],
      required: false,
      include: {
        model: models.office,
        attributes: ['officeId', 'manager'],
        required: false,
      },
    };

    const baseWhere = {
      templateSubCategoryId,
      type,
      remarkType,
      ...(search && {
        [Op.or]: [
          { remark: { [Op.like]: `%${search}%` } },
          { title: { [Op.like]: `%${search}%` } },
        ],
      }),
      ...(start && end && {
        createdAt: { [Op.between]: [start, end] },
      }),
    };

    const officeFilter = officeIds
      ? {
          officeId: {
            [Op.in]: officeIds.split(','),
          },
        }
      : null;

    const params = isDraftTemplate
      ? {
          attributes: { exclude: ['totalFrequency'] },
          where: baseWhere,
          include: [
            {
              model: models.template_remark,
              as: 'oldTemplateRemark',
              attributes: ['templateRemarkId', 'oldTemplateRemarkId', 'totalFrequency', 'remarkType'],
              include: officeFilter
                ? [{ ...frequencyInclude, where: officeFilter }]
                : [frequencyInclude],
            },
            userInclude,
          ],
          ...paginate(pageIndex, pageSize),
          order: orderBy,
        }
      : {
          where: baseWhere,
          include: officeFilter
            ? [{ ...frequencyInclude, where: officeFilter }, userInclude]
            : [frequencyInclude, userInclude],
          ...paginate(pageIndex, pageSize),
          order: orderBy,
        };

    const [remarks, remarkTypeCount] = await Promise.all([
      models.template_remark.findAndCountAll(params),
      models.template_remark.findAll({
        attributes: ['type', [sequelize.fn('COUNT', sequelize.col('type')), 'count']],
        where: {
          templateSubCategoryId,
          remarkType,
        },
        group: ['type'],
      }),
    ]);

    const commonCountFilter = {
      templateSubCategoryId,
      ...(search && {
        [Op.or]: [
          { remark: { [Op.like]: `%${search}%` } },
          { title: { [Op.like]: `%${search}%` } },
        ],
      }),
    };

    const [templateRemarkCount, customRemarkCount] = await Promise.all([
      models.template_remark.count({
        where: {
          ...commonCountFilter,
          remarkType: 'Template',
        },
      }),
      models.template_remark.count({
        where: {
          ...commonCountFilter,
          remarkType: 'Custom',
        },
      }),
    ]);

    return {
      remarks,
      remarkTypeCount,
      templateRemarkCount,
      customRemarkCount,
    };
  } catch (e) {
    throw new Error(e.message);
  }
};


const addRemark = async (req) => {
  const { templateSubCategoryId, remark, title, type } = req.body;
  const { id } = req.smeUser;
  try {
    // check if template
    const templateSubCategory = await models.template_subcategory.findOne({
      where: {
        templateSubCategoryId,
      },
      include: {
        model: models.template_category,
        include: {
          model: models.template,
        },
      },
    });

    if (!templateSubCategory) {
      throw new Error(messages.templateSubCategory.TEMPLATE_SUB_CATEGORY_NOT_FOUND);
    }

    let createdRemark;

    if (templateSubCategory.template_category.template.isDraft) {
      createdRemark = await models.template_remark.create({
        remark,
        title,
        type,
        templateSubCategoryId,
        createdBySme: id,
        updatedBySme: id,
        lastUpdatedAt: new Date(),
      });
    } else {
      createdRemark = await sequelize.transaction(async (t) => {
        // create about for a template
        const createdRemark = await models.template_remark.create(
          {
            remark,
            title,
            type,
            templateSubCategoryId,
            createdBySme: id,
            updatedBySme: id,
            lastUpdatedAt: new Date(),
          },
          { transaction: t }
        );

        const paramsData = {
          templateId: templateSubCategory.template_category.templateId,
          templateRemarkId: createdRemark.templateRemarkId,
          title,
          remark,
          remarkCategory: type,
          remarkType: 'template',
          templateCategoryName: templateSubCategory.template_category.name,
          templateCategoryId: templateSubCategory.template_category.templateCategoryId,
          templateSubCategoryName: templateSubCategory.name,
          templateSubCategoryId: templateSubCategory.templateSubCategoryId,
        };

        // append to elastic search
        await addRemarkToPublishedTemplateES(paramsData);

        return createdRemark;
      });
    }

    return createdRemark;
  } catch (e) {
    throw new Error(e.message);
  }
};

const editRemark = async (req) => {
  const { templateRemarkId, templateSubCategoryId, remark, title, isFavourite } = req.body;
  const { id } = req.smeUser;
  try {
    // check if template
    const templateSubCategory = await models.template_subcategory.findOne({
      where: {
        templateSubCategoryId,
      },
      include: {
        model: models.template_category,
        include: {
          model: models.template,
        },
      },
    });

    if (!templateSubCategory) {
      throw new Error(messages.templateSubCategory.TEMPLATE_SUB_CATEGORY_NOT_FOUND);
    }

    // if (!templateSubCategory.template_category.template.isDraft) {
    //   throw new Error('Cannot Make changes to published template');
    // }

    const remarkExist = await models.template_remark.findOne({
      where: {
        templateRemarkId,
        templateSubCategoryId,
      },
    });

    if (!remarkExist) {
      throw new Error(messages.templateRemark.TEMPLATE_REMARK_NOT_FOUND);
    }

    let updatedRemark;

    if (templateSubCategory.template_category.template.isDraft) {
      updatedRemark = await remarkExist.update({
        remark: remark || remarkExist.remark,
        title: title || remarkExist.title,
        isFavourite: isFavourite === false ? false : isFavourite === true ? true : remarkExist.isFavourite,
        updatedBySme: id,
        lastUpdatedAt: remark || title ? new Date() : remarkExist.lastUpdatedAt,
      });
    } else {
      updatedRemark = await sequelize.transaction(async (t) => {
        // create about for a template
        const updatedRemark = await remarkExist.update({
          remark: remark || remarkExist.remark,
          title: title || remarkExist.title,
          isFavourite: isFavourite === false ? false : isFavourite === true ? true : remarkExist.isFavourite,
          updatedBySme: id,
          lastUpdatedAt: remark || title ? new Date() : remarkExist.lastUpdatedAt,
        });

        const paramsData = {
          templateId: templateSubCategory.template_category.templateId,
          templateRemarkId,
          title,
          remark,
        };

        // append to elastic search
        await editPublishedTemplateRemarkES(paramsData);

        return updatedRemark;
      });
    }

    return updatedRemark;
  } catch (e) {
    throw new Error(e.message);
  }
};

const deleteRemark = async (req) => {
  const { templateRemarkId, templateSubCategoryId } = req.body;
  try {
    // check if template
    const templateSubCategory = await models.template_subcategory.findOne({
      where: {
        templateSubCategoryId,
      },
      include: {
        model: models.template_category,
        include: {
          model: models.template,
        },
      },
    });

    if (!templateSubCategory) {
      throw new Error(messages.templateSubCategory.TEMPLATE_SUB_CATEGORY_NOT_FOUND);
    }

    // if (!templateSubCategory.template_category.template.isDraft) {
    //   throw new Error('Cannot Make changes to published template');
    // }

    const remarkExist = await models.template_remark.findOne({
      where: {
        templateRemarkId,
        templateSubCategoryId,
      },
    });

    if (!remarkExist) {
      throw new Error(messages.templateRemark.TEMPLATE_REMARK_NOT_FOUND);
    }

    let deletedRemark;

    if (templateSubCategory.template_category.template.isDraft) {
      deletedRemark = await remarkExist.destroy();
    } else {
      deletedRemark = await sequelize.transaction(async (t) => {
        // create about for a template
        const deletedRemark = await remarkExist.destroy();

        const paramsData = {
          templateId: templateSubCategory.template_category.templateId,
          templateRemarkId,
        };

        // append to elastic search
        await deletePublishedTemplateRemarkES(paramsData);

        return deletedRemark;
      });
    }

    return deletedRemark;
  } catch (e) {
    throw new Error(e.message);
  }
};

const listFavouriteRemark = async (req) => {
  const { templateId } = req.query;

  try {
    const favouriteRemarks = await models.template_remark.findAll({
      where: {
        isFavourite: 1,
      },
      include: {
        model: models.template_subcategory,
        attributes: ['templateSubCategoryId', 'name'],
        required: true,
        include: {
          model: models.template_category,
          attributes: ['templateCategoryId', 'name'],
          required: true,
          where: {
            templateId,
          },
        },
      },
    });

    return favouriteRemarks;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const updateRemarkFrequency = async (req) => {
  const { templateRemarkId, frequency, totalFrequency, officeId, myRemark, esTimestamp, htmlRemark, type, addToSummary } = req.body;
  try {
    const remarkExists = await models.template_remark.findOne({
      where: {
        templateRemarkId,
      },
    });

    if (!remarkExists) {
      throw new NotFoundError('Remark not found');
    }

    const officeExists = await models.office.findOne({
      where: {
        officeId,
      },
    });

    if (!officeExists) {
      throw new NotFoundError('Office not found');
    }

    await sequelize.transaction(async (t) => {
      // Published remark
      const [publishedRemarkOfficeFrequency, publishedRemarkFrequencyCreated] = await models.template_remark_frequency.findOrCreate({
        where: {
          officeId,
          templateRemarkId,
        },
        defaults: {
          officeId,
          templateRemarkId,
          frequency,
          myRemark: myRemark !== undefined ? myRemark : false,
          esTimestamp : new Date(esTimestamp),
          htmlRemark,
          addToSummary: addToSummary !== undefined ? addToSummary : false,
        },
        transaction: t,
      });

      if (publishedRemarkFrequencyCreated === false) {
        await publishedRemarkOfficeFrequency.update(
          {
            frequency,
            myRemark: myRemark === false ? false : myRemark === true ? true : publishedRemarkOfficeFrequency.myRemark,
            esTimestamp: new Date(esTimestamp),
            htmlRemark: htmlRemark !== undefined ? htmlRemark : publishedRemarkOfficeFrequency.htmlRemark,
          },
          { transaction: t }
        );
      }

      await remarkExists.update(
        {
          totalFrequency,
        },
        { transaction: t }
      );
    });

    return;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const addCustomRemark = async (req) => {
  const { remark, title, frequency, officeId, type, totalFrequency, myRemark = false, addToDefault, esTimestamp, officeStatus, oldRemarkId, addToSummary } = req.body;
  const { templateSubCategoryId, customRemarkAddedByUser, htmlRemark } = req.body;

  try {
    const userExist = await models.user.findOne({
      where: {
        userId: customRemarkAddedByUser,
      },
      include: {
        model: models.office,
        where: {
          officeId,
        },
      },
    });

    if (!userExist) {
      throw new NotFoundError('User not found');
    }

    const templateSubCategory = await models.template_subcategory.findOne({
      where: {
        templateSubCategoryId,
      },
    });

    if (!templateSubCategory) {
      throw new NotFoundError(messages.templateSubCategory.TEMPLATE_SUB_CATEGORY_NOT_FOUND);
    }

    // check if any draft template Exist for this subcategory
    const draftTemplateSubCategory = await await models.template_subcategory.findOne({
      where: {
        oldTemplateSubCategoryId: templateSubCategory.templateSubCategoryId,
      },
    });

    const publishedtemplateCustomRemark = await sequelize.transaction(async (t) => {
      // custom remark
      const publishedtemplateCustomRemark = await models.template_remark.create(
        {
          remark,
          title,
          totalFrequency,
          type,
          templateSubCategoryId,
          remarkType: 'Custom',
          totalFrequency,
          customRemarkAddedByUser,
          isFavourite : addToDefault ? 1 : 0,
          lastUpdatedAt: new Date(),
        },
        { transaction: t }
      );

      if (draftTemplateSubCategory) {
        const newFrequencyRecord = await models.template_remark.create(
          {
            remark,
            title,
            totalFrequency,
            type,
            templateSubCategoryId: draftTemplateSubCategory.templateSubCategoryId,
            oldTemplateRemarkId: publishedtemplateCustomRemark.templateRemarkId,
            remarkType: 'Custom',
            totalFrequency,
            customRemarkAddedByUser,
            isFavourite : addToDefault ? 1 : 0,
            lastUpdatedAt: new Date(),
          },
          { transaction: t }
        );

        if(oldRemarkId){
          // check if any image exist for that
          const imageExist = await models.template_remark_image.findOne({
            include:{
              model: models.template_remark_frequency,
              attributes: ['templateRemarkFrequencyId'],
              where:{
                templateRemarkId : oldRemarkId,
                officeId,                
              }
            }
          })

          if(imageExist){
            await models.template_remark_image.update(
              {
                templateRemarkFrequencyId: newFrequencyRecord.templateRemarkFrequencyId,
              },                            
              {
              where:{
                templateRemarkFrequencyId: imageExist.template_remark_frequency.templateRemarkFrequencyId,
              },
            },
            { transaction: t }
            )
          }
        }
      }

      if (frequency >= 0) {
        // create frequency
        await models.template_remark_frequency.create(
          {
            officeId,
            templateRemarkId: publishedtemplateCustomRemark.templateRemarkId,
            frequency,
            myRemark,
            esTimestamp: new Date(esTimestamp),
            isDefault : addToDefault ? 1 : 0,
            officeStatus,
            htmlRemark,
            addToSummary: addToSummary !== undefined ? addToSummary : false
          },
          { transaction: t }
        );
      }

      return publishedtemplateCustomRemark;
    });

    return publishedtemplateCustomRemark;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const hideRemarks = async (req) => {
  const { remarkIds, templateSubCategoryId } = req.body;
  const { id } = req.smeUser;
  try {
    // check if template
    const templateSubCategory = await models.template_subcategory.findOne({
      where: {
        templateSubCategoryId,
      },
      include: {
        model: models.template_category,
        include: {
          model: models.template,
        },
      },
    });

    if (!templateSubCategory) {
      throw new NotFoundError(messages.templateSubCategory.TEMPLATE_SUB_CATEGORY_NOT_FOUND);
    }

    if (!templateSubCategory.template_category.template.isDraft) {
      throw new BadRequestError('Cannot Make changes to published template');
    }

    const remarkExists = await models.template_remark.findAll({
      where: {
        templateRemarkId: remarkIds,
        templateSubCategoryId,
        hide: 0,
      },
    });

    if (remarkExists.length === 0 || remarkExists.length !== remarkIds.length) {
      throw new NotFoundError('Remark Not Found');
    }

    await models.template_remark.update(
      { hide: 1, updatedBySme: id },
      {
        where: {
          templateRemarkId: remarkIds,
        },
      }
    );
  } catch (e) {
    handleKnownErrors(e);
  }
};

const recoverRemarks = async (req) => {
  const { remarkIds, templateSubCategoryId } = req.body;
  const { id } = req.smeUser;
  try {
    // check if template
    const templateSubCategory = await models.template_subcategory.findOne({
      where: {
        templateSubCategoryId,
      },
      include: {
        model: models.template_category,
        include: {
          model: models.template,
        },
      },
    });

    if (!templateSubCategory) {
      throw new Error(messages.templateSubCategory.TEMPLATE_SUB_CATEGORY_NOT_FOUND);
    }

    if (!templateSubCategory.template_category.template.isDraft) {
      throw new Error('Cannot Make changes to published template');
    }

    const remarkExists = await models.template_remark.findAll({
      where: {
        templateRemarkId: remarkIds,
        templateSubCategoryId,
        hide: 1,
      },
    });

    if (remarkExists.length === 0 || remarkExists.length !== remarkIds.length) {
      throw new NotFoundError('Remark Not Found');
    }

    await models.template_remark.update(
      { hide: 0, updatedBySme: id },
      {
        where: {
          templateRemarkId: remarkIds,
        },
      }
    );
  } catch (e) {
    handleKnownErrors(e);
  }
};

const getTemplateGroupRemarks = async (req) => {
  const { nearestTemplateRemarkId, isDraft } = req.query;
  try {
    // check if template

    let templateSimilarityRemarks = [];

    if (isDraft === 'True') {
      templateSimilarityRemarks = await models.template_remark_similarity.findAll({
        where: {
          nearestTemplateRemarkId,
        },
        include: {
          model: models.template_remark,
          attributes: ['totalFrequency'],

          include: [
            {
              model: models.template_remark,
              where: { remarkType: 'Custom' },
              as: 'newTemplateRemark',
              required: true,
              include: {
                model: models.user,
                attributes: ['userId', 'officeId'],
                required: false,
                include: {
                  model: models.office,
                  attributes: ['officeId', 'manager'],
                  required: true,
                },
              },
            },
            {
              model: models.template_remark_frequency,
              required: false,
              include: {
                model: models.office,
                attributes: ['officeId', 'name', 'manager', 'companyKey'],
                required: false,
              },
            },
          ],
        },
      });
    } else {
      templateSimilarityRemarks = await models.template_remark_similarity.findAll({
        where: {
          nearestTemplateRemarkId,
        },
        include: {
          model: models.template_remark,
          // attributes: ['totalFrequency'],
          where: { remarkType: 'Custom' },
          required: true,
          include: [
            {
              model: models.template_remark_frequency,
              required: false,
              include: {
                model: models.office,
                attributes: ['officeId', 'name', 'manager', 'companyKey'],
                required: false,
              },
            },
            {
              model: models.user,
              attributes: ['userId', 'officeId'],
              required: false,
              include: {
                model: models.office,
                attributes: ['officeId', 'manager'],
                required: true,
              },
            },
          ],
        },
      });
    }

    return templateSimilarityRemarks;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const changeRemarkType = async (req) => {
  const { customRemarkIds } = req.body;
  const { id } = req.smeUser;
  try {
    const customRemarks = await models.template_remark.findAll({
      where: {
        remarkType: 'Custom',
        templateRemarkId: customRemarkIds,
      },
    });

    if (customRemarkIds.length === 0 || customRemarkIds.length !== customRemarks.length) {
      throw new NotFoundError('Remarks Not Found!');
    }

    await sequelize.transaction(async (transaction) => {
      // delete all office mapping before moving
      // await models.office_included_remark.destroy({
      //   where: {
      //     templateRemarkId: customRemarkIds,
      //   },
      //   transaction,
      // });

      // update to template
      await models.template_remark.update(
        { remarkType: 'Template', updatedBySme: id },
        {
          where: {
            templateRemarkId: customRemarkIds,
          },
          transaction,
        }
      );
    });

    return;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const remarkOfficeList = async (req) => {
  const { templateId } = req.query;

  try {
    const template = await models.template.findOne({ where: { templateId } });

    if (!template) {
      throw new NotFoundError(messages.template.TEMPLATE_NOT_FOUND);
    }

    const remarkResults = await models.template_remark.findAll({
      include: {
        model: models.template_subcategory,
        attributes: [],
        include: {
          model: models.template_category,
          attributes: [],
          where: { templateId },
        },
      },
    });

    const templateRemarkIds = remarkResults
      .map((el) => {
        if (template.isDraft && el.oldTemplateRemarkId) return el.oldTemplateRemarkId;
        if (!template.isDraft && el.templateRemarkId) return el.templateRemarkId;
        return null;
      })
      .filter(Boolean);

    if (templateRemarkIds.length === 0) {
      return [];
    }

    const offices = await models.office.findAll({
      include: {
        model: models.template_remark_frequency,
        attributes: [],
        where: {
          templateRemarkId: templateRemarkIds,
        },
        required: true,
      },
    });

    return offices;
  } catch (e) {
    handleKnownErrors(e);
  }
};


const copyPubRemarkToDraft = async (req) => {
  const { copyFromPubTemplateId, copyFromRemarkIds, copyToDraftSubCategoryId } = req.body;
  try {
    const pubTemplate = await models.template.findOne({
      where: {
        templateId: copyFromPubTemplateId,
      },
    });

    if (!pubTemplate) {
      throw new NotFoundError(messages.template.TEMPLATE_NOT_FOUND);
    }

    if (pubTemplate.isDraft) {
      throw new BadRequestError('Cannot copy from draft template');
    }

    // check if draft subcategory exist
    const draftSubCategory = await models.template_subcategory.findOne({
      where: {
        templateSubCategoryId: copyToDraftSubCategoryId,
      },
      include: {
        model: models.template_category,
        attributes: ['templateCategoryId'],
        include: {
          model: models.template,
          attributes: ['templateId'],
          where: {
            isDraft: 1,
          },
        },
      },
    });

    if (!draftSubCategory) {
      throw new NotFoundError(messages.templateSubCategory.TEMPLATE_SUB_CATEGORY_NOT_FOUND);
    }

    const copyFromRemark = await models.template_remark.findAll({
      where: {
        templateRemarkId: copyFromRemarkIds,
      },
    });

    // Clone the subcategories, and related information
    const clonedRemarks = await sequelize.transaction(async (t) => {
      // Clone the template abouts and related values and notes
      const clonedRemarks = await Promise.all(
        copyFromRemark.map(async (remark) => {
          const clonedRemark = await models.template_remark.create(
            {
              remark: remark.remark,
              type: remark.type,
              title: remark.title,
              isFavourite: remark.isFavourite,
              templateSubCategoryId: copyToDraftSubCategoryId,
              oldTemplateRemarkId: remark.templateRemarkId,
              totalFrequency: remark.totalFrequency,
              remarkType: remark.remarkType,
              hide: remark.hide,
              customRemarkAddedByUser: remark.customRemarkAddedByUser,
              lastUpdatedAt: new Date(),
            },
            { transaction: t }
          );
          return clonedRemark;
        })
      );
      return clonedRemarks;
    });

    return clonedRemarks;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const getPresignedUrlToUploadRemarkImage = async (req) => {
  const { templateId, randomId } = req.query;
  try {
    // check if template
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

    // if (!template.isDraft) {
    //   throw new BadRequestError('Cannot Make changes to published template');
    // }

    const uploadURL = await getUploadURLForTemplateRemarkImage(template.master_template.name, template.version, randomId);

    return uploadURL;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const storeImagePath = async (data) => {
  const { originalImageKey, uploadStatus, templateId } = data.body ? data.body : data;

  try {
    const template = await models.template.findOne({
      where: {
        templateId,
      },
    });

    if (!template) {
      throw new Error(messages.template.TEMPLATE_NOT_FOUND);
    }

    // if (!template.isDraft) {
    //   throw new Error('Cannot Make changes to published template');
    // }

    const image = await sequelize.transaction(async (t) => {
      const templateImage = await models.template_image.create(
        {
          originalImageKey,
          templateId,
          uploadStatus,
          templateId,
        },
        { transaction: t }
      );

      // const templateRemarkImage = await models.template_remark_image.create(
      //   {
      //     orderNumber,
      //     templateRemarkId,
      //     templateImageId: templateImage.templateImageId,
      //   },
      //   { transaction: t }
      // );

      return { ...templateImage.dataValues };
    });

    return image;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const removeImage = async (req) => {
  const { templateRemarkImageId } = req.body;

  try {
    const templateRemarkImageExist = await models.template_remark_image.findOne({
      where: {
        templateRemarkImageId,
      },
      // include: {
      //   model: models.template_remark,
      //   attributes: ['templateRemarkId'],
      //   include: {
      //     model: models.template_subcategory,
      //     attributes: ['templateSubCategoryId'],
      //     include: {
      //       model: models.template_category,
      //       attributes: ['templateCategoryId', 'templateId'],
      //     },
      //   },
      // },
    });

    if (!templateRemarkImageExist) {
      throw new NotFoundError('Template Remark Image Not Found');
    }

    // Transaction
    await sequelize.transaction(async (t) => {
      await templateRemarkImageExist.destroy({ transaction: t });

      // await models.template_image.destroy({
      //   where: {
      //     templateImageId: templateRemarkImageExist.templateImageId,
      //   },
      //   transaction: t,
      // });
    });
  } catch (e) {
    handleKnownErrors(e);
  }
};

const imageUpdateStatus = async (req) => {
  const { originalImageKey, uploadStatus, thumbImageKey, reportImageKey } = req.body;

  try {
    const templateImage = await models.template_image.findOne({
      where: {
        originalImageKey
      },
      attributes: ['templateImageId', 'originalImageKey', 'uploadStatus', 'thumbImageKey', 'reportImageKey']
    });

    if (!templateImage) {
      console.log('Template Image Not Found');
    } else {
      await templateImage.update({
        uploadStatus,
        thumbImageKey: thumbImageKey || templateImage.thumbImageKey,
        reportImageKey: reportImageKey || templateImage.reportImageKey,
      });
    }

    return templateImage;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const updateBulkRemarkFrequency = async (req) => {
  const { templateRemarkData } = req.body;

  try {
    await sequelize.transaction(async (t) => {
      const templateRemarkIds = [...new Set(templateRemarkData.map((data) => data.templateRemarkId))];
      const officeIds = [...new Set(templateRemarkData.map((data) => data.officeId))];

      // Check if all template remarks exist
      const remarks = await models.template_remark.findAll({
        where: {
          templateRemarkId: templateRemarkIds,
        },
        transaction: t,
      });

      if (remarks.length !== templateRemarkIds.length) {
        throw new NotFoundError('One or more remarks not found');
      }

      // Check if all offices exist
      const offices = await models.office.findAll({
        where: {
          officeId: officeIds,
        },
        transaction: t,
      });

      if (offices.length !== officeIds.length) {
        throw new NotFoundError('One or more offices not found');
      }

      // Prepare bulk updates
      const remarkUpdates = [];
      const frequencyUpdates = [];

      // Create a mapping from templateRemarkId to type for easy lookup
      const remarkTypeMap = remarks.reduce((map, remark) => {
        map[remark.templateRemarkId] = remark.type;
        return map;
      }, {});

      for (const data of templateRemarkData) {
        const { templateRemarkId, frequency, totalFrequency, officeId, myRemark, esTimestamp, officeStatus, htmlRemark, addToSummary } = data;
        const remarkType = remarkTypeMap[templateRemarkId];

        // Update or create the remark frequency
        const [remarkFrequency, created] = await models.template_remark_frequency.findOrCreate({
          where: { officeId, templateRemarkId },
          defaults: {
            officeId,
            templateRemarkId,
            frequency,
            myRemark: myRemark !== undefined ? myRemark : false,
            esTimestamp: new Date(esTimestamp),
            officeStatus,
            htmlRemark,
            addToSummary: addToSummary !== undefined ? addToSummary : false
          },
          transaction: t,
        });

        if (!created) {
          frequencyUpdates.push(
            models.template_remark_frequency.update(
              { frequency, 
                esTimestamp: new Date(esTimestamp),
                ...(myRemark !== undefined && { myRemark }),
                ...(officeStatus !== undefined && { officeStatus }),
                ...(htmlRemark !== undefined && { htmlRemark }),
              },  
              {
                where: { officeId, templateRemarkId },
                transaction: t,
              }
            )
          );
        }

        // Prepare remark update for total frequency
        remarkUpdates.push(
          models.template_remark.update(
            { totalFrequency },
            {
              where: { templateRemarkId },
              transaction: t,
            }
          )
        );
      }

      // Execute bulk updates
      await Promise.all([...frequencyUpdates, ...remarkUpdates]);
    });

    return;
  } catch (e) {
    handleKnownErrors(e);
  }
};


const updateRemarkFromEs = async (req) => {
  const { templateRemarkId, remark, title, officeId, defaultAction, defaultValue, frequency, myRemark, officeStatus, type, htmlRemark, oldRemarkId, addToSummary} = req.body;

  try {
    const existingRemark = await models.template_remark.findOne({
      where: {
        templateRemarkId,
      },
    });

    if (!existingRemark) {
      throw new NotFoundError('Remark Not Found');
    }

    // check if any draft template Exist for this subcategory
    const draftTemplateRemark = await models.template_remark.findOne({
      where: {
        oldTemplateRemarkId: templateRemarkId,
      },
    });

    const updatedRemark = await sequelize.transaction(async (t) => {
      // custom remark
      const updatedRemark = await existingRemark.update(
        {
          remark: remark || existingRemark.remark,
          title: title || existingRemark.title,
          lastUpdatedAt: remark || title ? new Date() : existingRemark.lastUpdatedAt,
        },
        { transaction: t }
      );

      if (draftTemplateRemark) {
        await draftTemplateRemark.update(
          {
            remark: remark || existingRemark.remark,
            title: title || existingRemark.title,
            lastUpdatedAt: remark || title ? new Date() : existingRemark.lastUpdatedAt,
          },
          { transaction: t }
        );
      }

      if (defaultAction) {
        // First, fetch the remark to obtain its templateSubCategoryId.
        const remark = await models.template_remark.findByPk(templateRemarkId, { transaction: t });
        if (!remark) {
          throw new BadRequestError('Remark not found');
        }
        const templateSubCategoryId = remark.templateSubCategoryId;
      
        // Helper function: Compute next order number within the same subcategory.
        const getNextOrderNumber = async () => {
          const lastRecord = await models.template_remark_frequency.findOne({
            where: {
              officeId,
              defaultOrderNumber: { [Op.ne]: null },
            },
            include: [{
              model: models.template_remark,
              where: { templateSubCategoryId },
            }],
            order: [['defaultOrderNumber', 'DESC']],
            transaction: t,
          });
          return lastRecord ? lastRecord.defaultOrderNumber + 1 : 1;
        };
      
        if (defaultValue) { // Add as default.
          const nextOrderNumber = await getNextOrderNumber();
          const [record, created] = await models.template_remark_frequency.findOrCreate({
            where: {
              templateRemarkId,
              officeId,
            },
            defaults: {
              frequency: frequency ? frequency : 0,
              myRemark: myRemark === false ? false : myRemark === true ? true : 1,
              templateRemarkId,
              officeId,
              isDefault: true,
              officeStatus,
              htmlRemark,
              defaultOrderNumber: nextOrderNumber,
              addToSummary: addToSummary !== undefined ? addToSummary : false
            },
            transaction: t,
          });
      
          if (!created) {
            await record.update({
              isDefault: true,
              defaultOrderNumber: await getNextOrderNumber(),
              htmlRemark: htmlRemark !== undefined ? htmlRemark : record.htmlRemark,
              officeStatus: officeStatus ? officeStatus : record.officeStatus,
            }, { transaction: t });
          }

          if(oldRemarkId){
            // check if any image exist for that
            const imageExist = await models.template_remark_image.findOne({
              include:{
                model: models.template_remark_frequency,
                attributes: ['templateRemarkFrequencyId'],
                where:{
                  templateRemarkId : oldRemarkId,
                  officeId,                
                }
              }
            })
  
            if(imageExist){
              await models.template_remark_image.update(
                {
                  templateRemarkFrequencyId: newFrequencyRecord.templateRemarkFrequencyId,
                },                            
                {
                where:{
                  templateRemarkFrequencyId: imageExist.template_remark_frequency.templateRemarkFrequencyId,
                },
              },
              { transaction: t }
              )
            }
          }
      
        } else { // Remove as default.
          const [record, created] = await models.template_remark_frequency.findOrCreate({
            where: {
              templateRemarkId,
              officeId,
            },
            defaults: {
              frequency: 0,
              myRemark: 1,
              templateRemarkId,
              officeId,
              isDefault: false,
              officeStatus,
              htmlRemark,
              defaultOrderNumber: null,
              addToSummary: addToSummary !== undefined ? addToSummary : false
            },
            transaction: t,
          });
      
          if (!created) {
            await record.update({
              isDefault: false,
              defaultOrderNumber: null,
              htmlRemark: htmlRemark !== undefined ? htmlRemark : record.htmlRemark,
              officeStatus: officeStatus ? officeStatus : record.officeStatus,
            }, { transaction: t });
          }
        }       
      }
    });

    return updatedRemark;
  } catch (e) {
    handleKnownErrors(e);
  }
};


const deleteRemarkFromES = async (req) => {
  const { templateRemarkId, templateSubCategoryId } = req.body;
  try {
    // check if template
    const templateSubCategory = await models.template_subcategory.findOne({
      where: {
        templateSubCategoryId,
      },
      attributes: ['templateSubCategoryId'],
      include: {
        model: models.template_category,
        attributes: ['templateId'],
        include: {
          model: models.template,
          attributes: ['isDraft']
        },
      },
    });

    if (!templateSubCategory) {
      throw new Error(messages.templateSubCategory.TEMPLATE_SUB_CATEGORY_NOT_FOUND);
    }

    const remarkExist = await models.template_remark.findOne({
      where: {
        templateRemarkId,
      },
    });

    if (!remarkExist) {
      throw new Error(messages.templateRemark.TEMPLATE_REMARK_NOT_FOUND);
    }

    let deletedRemark;

    if (templateSubCategory.template_category.template.isDraft) {
      deletedRemark = await remarkExist.destroy();
    } else {
      deletedRemark = await sequelize.transaction(async (t) => {
        // create about for a template
        const deletedRemark = await remarkExist.destroy();

        return deletedRemark;
      });
    }

    return deletedRemark;
  } catch (e) {
   handleKnownErrors(e);
  }
};

const assignDefaultOrderNumber = async (req) => {
  const { templateIds } = req.body;

  try {
    return await sequelize.transaction(async (t) => {
      await Promise.all(
        templateIds.map(async (templateId) => {
          const subcategories = await models.template_subcategory.findAll({
            include: {
              model: models.template_category,
              attributes: [],
              where: { templateId },
            },
            transaction: t,
          });

          const officesTemplates = await models.office_template.findAll({
            where: { templateId },
            attributes: ["officeId"],
            transaction: t,
          });

          for (const officeTemplate of officesTemplates) {
            const officeId = officeTemplate.officeId;

            for (const subcategory of subcategories) {
              console.log(
                `Fetching details for subcategory ${subcategory.templateSubCategoryId}, office ${officeId}`
              );

              const remarks = await models.template_remark.findAll({
                where: {
                  templateSubCategoryId: subcategory.templateSubCategoryId,
                  "$template_remark_frequencies.is_default$": true,
                  "$template_remark_frequencies.officeId$": officeId,
                },
                include: [
                  {
                    model: models.template_remark_frequency,
                    required: false,
                    where: { officeId },
                  },
                ],
                transaction: t,
              });

              console.log(
                `Updating default_order_number for subcategory ${subcategory.templateSubCategoryId}, office ${officeId}`
              );

              const sortedFrequencies = remarks
                .flatMap((remark) => remark.template_remark_frequencies)
                .sort((a, b) => b.frequency - a.frequency);

              await Promise.all(
                sortedFrequencies.map(async (frequency, index) => {
                  await models.template_remark_frequency.update(
                    { defaultOrderNumber: index + 1 },
                    { where: { templateRemarkFrequencyId: frequency.templateRemarkFrequencyId }, transaction: t }
                  );
                })
              );
            }
          }
        })
      );
    });
  } catch (e) {
    handleKnownErrors(e);
  }
};


const assignDefaultOfficeStatus = async (req) => {
  const { templateIds } = req.body;

  try {
    return await sequelize.transaction(async (t) => {
      await Promise.all(
        templateIds.map(async (templateId) => {
          const subcategories = await models.template_subcategory.findAll({
            include: {
              model: models.template_category,
              attributes: [],
              where: { templateId },
            },
            transaction: t,
          });

          const officesTemplates = await models.office_template.findAll({
            where: { templateId },
            attributes: ["officeId"],
            transaction: t,
          });

          for (const officeTemplate of officesTemplates) {
            const officeId = officeTemplate.officeId;

            for (const subcategory of subcategories) {
              console.log(
                `Fetching details for subcategory ${subcategory.templateSubCategoryId}, office ${officeId}`
              );

              const remarks = await models.template_remark.findAll({
                where: {
                  templateSubCategoryId: subcategory.templateSubCategoryId,
                  "$template_remark_frequencies.officeId$": officeId,
                },
                include: [
                  {
                    model: models.template_remark_frequency,
                    required: false,
                    where: { officeId },
                  },
                ],
                transaction: t,
              });

              console.log(
                `Updating office_status for subcategory ${subcategory.templateSubCategoryId}, office ${officeId}`
              );

              await Promise.all(
                remarks.map(async (remark) => {

                  if (!remark.template_remark_frequencies || remark.template_remark_frequencies.length === 0) {
                    return;
                  }

                  const templateStatus = ['Functional', 'Informational', 'Limitation', 'Not Inspected'];

                  let officeStatus = templateStatus.includes(remark.type) ? remark.type : 'Repairs Recommended';

                  await models.template_remark_frequency.update(
                    { officeStatus },
                    { where: { templateRemarkFrequencyId: remark.template_remark_frequencies[0].templateRemarkFrequencyId }, transaction: t }
                  );
                })
              );
            }
          }
        })
      );
    });
  } catch (e) {
    handleKnownErrors(e);
  }
};

const addBulkCustomRemarks = async (req) => {
  const {
    remarks,
    officeId,
    templateSubCategoryId,
    customRemarkAddedByUser,
  } = req.body;

  try {
    const [userExist, templateSubCategory] = await Promise.all([
      models.user.findOne({
        where: {
          userId: customRemarkAddedByUser,
        },
        include: {
          model: models.office,
          where: { officeId },
        },
      }),
      models.template_subcategory.findOne({
        where: { templateSubCategoryId },
      }),
    ]);

    if (!userExist) throw new NotFoundError('User not found');
    if (!templateSubCategory) throw new NotFoundError(messages.templateSubCategory.TEMPLATE_SUB_CATEGORY_NOT_FOUND);

    const result = await sequelize.transaction(async (t) => {

      const templateRemarkPayload = remarks.map((r) => ({
        remark: r.remark,
        title: r.title,
        type: r.type,
        totalFrequency: r.totalFrequency,
        templateSubCategoryId,
        remarkType: 'Custom',
        customRemarkAddedByUser,
        isFavourite: r.addToDefault ? 1 : 0,
        lastUpdatedAt: new Date(),
      }));

      const createdRemarks = await models.template_remark.bulkCreate(templateRemarkPayload, {
        transaction: t,
        returning: true,
      });

      const frequencyPayload = createdRemarks.flatMap((created, idx) => {
        const input = remarks[idx];
        if (input.frequency >= 0) {
          return [{
            officeId,
            templateRemarkId: created.templateRemarkId,
            frequency: input.frequency,
            myRemark: input.myRemark ?? false,
            esTimestamp: new Date(input.esTimestamp),
            isDefault: input.addToDefault ? 1 : 0,
            officeStatus: input.officeStatus,
            htmlRemark: input.htmlRemark,
            addToSummary: input.addToSummary !== undefined ? input.addToSummary : false
          }];
        }
        return [];
      });

      if (frequencyPayload.length > 0) {
        await models.template_remark_frequency.bulkCreate(frequencyPayload, {
          transaction: t,
        });
      }

      return createdRemarks;
    });

    return result;
  } catch (e) {
    handleKnownErrors(e);
  }
};


module.exports = {
  listRemark,
  addRemark,
  editRemark,
  deleteRemark,
  listFavouriteRemark,
  updateRemarkFrequency,
  addCustomRemark,
  hideRemarks,
  recoverRemarks,
  getTemplateGroupRemarks,
  changeRemarkType,
  remarkOfficeList,
  copyPubRemarkToDraft,
  getPresignedUrlToUploadRemarkImage,
  storeImagePath,
  removeImage,
  imageUpdateStatus,
  updateBulkRemarkFrequency,
  updateRemarkFromEs,
  deleteRemarkFromES,
  assignDefaultOrderNumber,
  assignDefaultOfficeStatus,
  addBulkCustomRemarks,
};
