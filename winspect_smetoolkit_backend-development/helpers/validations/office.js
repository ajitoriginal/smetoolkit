const Joi = require('joi');

const officeAccessValidation = {
  bodySchema: Joi.object({
    officeIds: Joi.array().items(Joi.string()).required(),
    serviceId: Joi.string().required(),
  }),
};

const officeRemoveAccessValidation = {
  bodySchema: Joi.object({
    officeIds: Joi.array().items(Joi.string()).required(),
    serviceId: Joi.string().required(),
  }),
};

const listOfficesValidation = {
  querySchema: Joi.object({
    masterTemplateId: Joi.string().required(),
    searchKey: Joi.string().optional()
  }),
};

const listOfficesWithTemplatesValidation = {
  querySchema: Joi.object({
    searchKey: Joi.string().optional()
  }),
};

const templateAccessValidation = {
  bodySchema: Joi.object({
    officeIds: Joi.array().items(Joi.string()).required(),
    masterTemplateId: Joi.string().required(),
  }),
};

const templateAccessOneOfficeValidation = {
  bodySchema: Joi.object({
    removeTemplateList: Joi.array().items(Joi.string()).required(),
    masterTemplateIds: Joi.array().items(Joi.string()).required(),
    officeId: Joi.string().required(),
  }),
};

const removeTemplateAccessValidation = {
  bodySchema: Joi.object({
    officeIds: Joi.array().items(Joi.string()).required(),
    masterTemplateId: Joi.string().required(),
  }),
};

const listOfficesMappedWithRemarkValidation = {
  querySchema: Joi.object({
    templateRemarkId: Joi.string().required(),
    templateSubCategoryId: Joi.string().required(),
  }),
};

const mapOfficeWithDefaultRemarkValidation = {
  bodySchema: Joi.object({
    templateRemarkId: Joi.string().required(),
    templateSubCategoryId: Joi.string().required(),
    officeIds: Joi.array().items(Joi.string()).required(),
  }),
};

const bulkMapOfficeWithDefaultRemarkValidation = {
  bodySchema: Joi.object({
    templateRemarkData: Joi.array().items(
      Joi.object({
        templateRemarkId: Joi.string().required(),
        // templateSubCategoryId: Joi.string().required(),
        officeIds: Joi.array().items(Joi.string()).required(),
      })
    ).required(),
  }),
};

const getUsersByOfficeIdValidation = {
  bodySchema: Joi.object({
    officeId: Joi.string().required(),
  }),
};

module.exports = {
  officeAccessValidation,
  officeRemoveAccessValidation,
  listOfficesValidation,
  templateAccessValidation,
  removeTemplateAccessValidation,
  listOfficesMappedWithRemarkValidation,
  mapOfficeWithDefaultRemarkValidation,
  bulkMapOfficeWithDefaultRemarkValidation,
  templateAccessOneOfficeValidation,
  listOfficesWithTemplatesValidation,
  getUsersByOfficeIdValidation
};
