const Joi = require('joi');

const listCategoriesValidation = {
  querySchema: Joi.object({
    templateId: Joi.string().required(),
  }),
};

const addCategoryValidation = {
  bodySchema: Joi.object({
    templateId: Joi.string().required(),
    iconImageKey: Joi.string().required(),
    name: Joi.string().required(),
  }),
};

const editCategoryValidation = {
  bodySchema: Joi.object({
    templateId: Joi.string().required(),
    templateCategoryId: Joi.string().required(),
    iconImageKey: Joi.string().optional(),
    name: Joi.string().optional(),
    print: Joi.boolean().optional(),
  }),
};

const deleteCategoryValidation = {
  bodySchema: Joi.object({
    templateId: Joi.string().required(),
    templateCategoryId: Joi.string().required(),
  }),
};

const getPresignedUrlToUploadIconForCategoryValidation = {
  querySchema: Joi.object({
    templateId: Joi.string().required(),
    type: Joi.string().valid('jpeg', 'png').required(),
  }),
};

const reorderCategoryValidation = {
  bodySchema: Joi.object({
    newOrderSequence: Joi.number().integer().min(1).required(),
    templateCategoryId: Joi.string().required(),
    templateId: Joi.string().required(),
  }),
};

const copyPubCategoryToDraftValidation = {
  bodySchema: Joi.object({
    copyFromPubTemplateId: Joi.string().required(),
    copyFromCategoryIds: Joi.array().items(Joi.string()).required(),
    copyToDraftTemplateId: Joi.string().required(),
  }),
};

const reorderAllCategoryValidation = {
  bodySchema: Joi.object({
    templateId: Joi.string().required(),
    categoryData: Joi.array()
      .items(
        Joi.object({
          templateCategoryId: Joi.string().required(),
          orderNumber: Joi.number().integer().required(),
        })
      )
      .required(),
  }),
};

module.exports = {
  listCategoriesValidation,
  addCategoryValidation,
  editCategoryValidation,
  deleteCategoryValidation,
  getPresignedUrlToUploadIconForCategoryValidation,
  reorderCategoryValidation,
  copyPubCategoryToDraftValidation,
  reorderAllCategoryValidation,
};
