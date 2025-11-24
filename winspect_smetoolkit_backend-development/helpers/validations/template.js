const Joi = require('joi');

const createDraftTemplateValidation = {
  bodySchema: Joi.object({
    masterTemplateId: Joi.string().required(),
    version: Joi.number()
      .positive()
      .required()
      .custom((value, helpers) => {
        if (/^\d+(\.\d{1,2})?$/.test(value)) {
          return value;
        }
        return helpers.message('Version must have up to 2 decimal places only.');
      }),
    iconImageKey: Joi.string().required(),
    preBuilttemplateId: Joi.string().optional(),
  }),
};

const publishedTemplatesListValidation = {
  querySchema: Joi.object({
    masterTemplateId: Joi.string().required(),
  }),
};

const draftTemplatesListValidation = {
  querySchema: Joi.object({
    pageIndex: Joi.number().integer().min(0).required(),
    pageSize: Joi.number().integer().min(1).required(),
  }),
};

const getPresignedUrlToUploadImageForTemplateIconValidatiom = {
  querySchema: Joi.object({
    masterTemplateId: Joi.string().required(),
    version: Joi.number().precision(2).positive().required(),
    type: Joi.string().valid('jpeg', 'png').required(),
  }),
};

const addOrEditCategoryValidation = {
  bodySchema: Joi.object({
    templateId: Joi.string().required(),
    iconImageKey: Joi.string().required(),
    name: Joi.string().required(),
  }),
};

const publishTemplateValidation = {
  bodySchema: Joi.object({
    templateId: Joi.string().required(),
  }),
};

const republishTemplateValidation = {
  bodySchema: Joi.object({
    templateId: Joi.string().required(),
  }),
};

const getTemplateDetailValidation = {
  querySchema: Joi.object({
    templateId: Joi.string().required(),
  }),
};

const updateDraftTemplateValidation = {
  bodySchema: Joi.object({
    templateId: Joi.string().required(),
    requireRemark: Joi.boolean(),
    requireAttachment: Joi.boolean(),
    hasToc: Joi.boolean(),
    hasLocation: Joi.boolean(),
    hasDefinition: Joi.boolean(),
    hasDisclosure: Joi.boolean(),
  }),
};

const listTemplateDisclosuresValidation = {
  querySchema: Joi.object({
    templateId: Joi.string().required(),
  }),
};

const editDisclosureValidation = {
  bodySchema: Joi.object({
    templateDisclosureId: Joi.string().required(),
    // title: Joi.string(),
    // show: Joi.boolean(),
    description: Joi.string(),
  }),
};

const listDefinitionsValidation = {
  querySchema: Joi.object({
    templateId: Joi.string().required(),
  }),
};

const reorderDefinitionsValidation = {
  bodySchema: Joi.object({
    templateDefinitionId: Joi.string().required(),
    templateId: Joi.string().required(),
    definitionData: Joi.array().items(
      Joi.object({
        templateDefinitionId: Joi.string().required(),
        orderNumber: Joi.number().required(),
      })
    ),
  }),
};

const editDefinitionValidation = {
  bodySchema: Joi.object({
    templateDefinitionId: Joi.string().required(),
    title: Joi.string(),
    description: Joi.string(),
  }),
};

const removeDefinitionValidation = {
  bodySchema: Joi.object({
    templateDefinitionId: Joi.string().required(),
  }),
};

const addDefinitionValidation = {
  bodySchema: Joi.object({
    templateId: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string(),
  }),
};

const storeJSONValidation = {
  bodySchema: Joi.object({
    templateId: Joi.string().required(),
  }),
};

const addDisclosureValidation = {
  bodySchema: Joi.object({
    templateId: Joi.string().required(),
    description: Joi.string().required(),
  }),
};

const listMasterTemplatesValidation = {
  querySchema: Joi.object({
    pageIndex: Joi.number().integer().min(0).required(),
    pageSize: Joi.number().integer().min(1).required(),
  }),
};

const listTemplatesForAMasterTemplateValidation = {
  querySchema: Joi.object({
    masterTemplateId: Joi.string().required(),
  }),
};

const updateElasticSearchStatusValidation = {
  bodySchema: Joi.object({
    templateId: Joi.string().required(),
    availableOnES: Joi.boolean().required(),
  }),
};

const copyTemplateDataValidation = {
  bodySchema: Joi.object({
    masterTemplateId: Joi.string().required(),
    copyToTemplateId: Joi.string().required(),
    preBuilttemplateId: Joi.string().required(),
    copyLocation: Joi.boolean().optional(),
    copyDefinition: Joi.boolean().optional(),
    copyDisclosure: Joi.boolean().optional(),
  }),
};

const storeJsonInBulkValidation = {
  bodySchema: Joi.object({
    templateIds: Joi.array().items(Joi.string()).required(),
    type: Joi.string().valid('Template', 'Remark').required(),
  }),
};

const migrateDefaultValidation = {
  bodySchema: Joi.object({
    templateIds: Joi.array().items(Joi.string()).required(),
  }),
};

const listTemplateImagesValidation = {
  querySchema: Joi.object({
    templateId: Joi.string().required(),
  }),
};

const getMultipleTemplateImageUploadUrlsValidation = {
  bodySchema: Joi.object({
    templateId: Joi.string().required(),
    images: Joi.array().items(
      Joi.object({
        imageTitle: Joi.string().required(),
      })
    ).min(1).max(10).required(),
  }),
};

const uploadMultipleTemplateImagesValidation = {
  bodySchema: Joi.object({
    templateId: Joi.string().required(),
    images: Joi.array().items(
      Joi.object({
        imageTitle: Joi.string().optional(),
        imageKey: Joi.string().required(),
      })
    ).min(1).max(10).required(),
  }),
};

const deleteMultipleTemplateImagesValidation = {
  bodySchema: Joi.object({
    templateImageIds: Joi.array().items(Joi.string().required()).min(1).required(),
  }),
};

const manageSummaryValidation = {
  bodySchema: Joi.object({
    templateRemarkId: Joi.string().required(),
    officeId: Joi.string().required(),
    addToSummary: Joi.boolean().required(),
  }),
};

module.exports = {
  createDraftTemplateValidation,
  publishedTemplatesListValidation,
  getPresignedUrlToUploadImageForTemplateIconValidatiom,
  addOrEditCategoryValidation,
  draftTemplatesListValidation,
  publishTemplateValidation,
  republishTemplateValidation,
  getTemplateDetailValidation,
  updateDraftTemplateValidation,
  listTemplateDisclosuresValidation,
  editDisclosureValidation,
  listDefinitionsValidation,
  editDefinitionValidation,
  removeDefinitionValidation,
  addDefinitionValidation,
  storeJSONValidation,
  addDisclosureValidation,
  listMasterTemplatesValidation,
  listTemplatesForAMasterTemplateValidation,
  updateElasticSearchStatusValidation,
  copyTemplateDataValidation,
  reorderDefinitionsValidation,
  storeJsonInBulkValidation,
  migrateDefaultValidation,
  listTemplateImagesValidation,
  getMultipleTemplateImageUploadUrlsValidation,
  uploadMultipleTemplateImagesValidation,
  deleteMultipleTemplateImagesValidation,
  manageSummaryValidation
};
