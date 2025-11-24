const Joi = require('joi');

const listSubCategoriesValidation = {
  querySchema: Joi.object({
    templateCategoryId: Joi.string().required(),
  }),
};

const subcategoryDetailValidation = {
  querySchema: Joi.object({
    templateSubCategoryId: Joi.string().required(),
  }),
};

const addSubCategoryValidation = {
  bodySchema: Joi.object({
    templateCategoryId: Joi.string().required(),
    name: Joi.string().required(),
    isGeneral: Joi.boolean(),
  }),
};

const editSubCategoryValidation = {
  bodySchema: Joi.object({
    templateCategoryId: Joi.string().required(),
    templateSubCategoryId: Joi.string().required(),
    name: Joi.string().optional(),
    isGeneral: Joi.boolean(),
    print: Joi.boolean().optional(),
  }),
};

const deleteSubCategoryValidation = {
  bodySchema: Joi.object({
    templateCategoryId: Joi.string().required(),
    templateSubCategoryId: Joi.string().required(),
  }),
};

const reorderSubCategoryValidation = {
  bodySchema: Joi.object({
    newOrderSequence: Joi.number().integer().min(1).required(),
    templateCategoryId: Joi.string().required(),
    templateSubCategoryId: Joi.string().required(),
  }),
};

const copyPubSubCategoryToDraftValidation = {
  bodySchema: Joi.object({
    copyFromPubTemplateId: Joi.string().required(),
    copyFromSubCategoryIds: Joi.array().items(Joi.string()).required(),
    copyToDraftCategoryId: Joi.string().required(),
  }),
};

const reorderAllSubCategoryValidation = {
  bodySchema: Joi.object({
    templateCategoryId: Joi.string().required(),
    subCategoryData: Joi.array()
      .items(
        Joi.object({
          templateSubCategoryId: Joi.string().required(),
          orderNumber: Joi.number().integer().required(),
        })
      )
      .required(),
  }),
};

module.exports = {
  listSubCategoriesValidation,
  subcategoryDetailValidation,
  addSubCategoryValidation,
  editSubCategoryValidation,
  deleteSubCategoryValidation,
  reorderSubCategoryValidation,
  copyPubSubCategoryToDraftValidation,
  reorderAllSubCategoryValidation,
};
