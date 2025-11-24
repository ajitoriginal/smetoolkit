const Joi = require('joi');

const listRemarkValidation = {
  querySchema: Joi.object({
    templateSubCategoryId: Joi.string().required(),
    pageIndex: Joi.number().integer().min(0).required(),
    pageSize: Joi.number().integer().min(1).required(),
    type: Joi.string().valid('Functional', 'Issue', 'Informational', 'Limitation', 'Not Inspected').required(),
    remarkType: Joi.string().valid('Template', 'Custom').required(),
    sort: Joi.string().valid('Recently Added', 'Most Used', 'Least Used', 'Most Similar', 'Least Similar').optional(),
    search: Joi.string().optional(),
    officeIds: Joi.string().optional(),
    start: Joi.date().optional(),
    end: Joi.date().optional(),
    similarityStart: Joi.number().precision(2).min(0).optional(),
    similarityEnd: Joi.number().precision(2).max(1).optional(),
  }),
};

const addRemarkValidation = {
  bodySchema: Joi.object({
    templateSubCategoryId: Joi.string().required(),
    remark: Joi.string().required(),
    title: Joi.string().required(),
    type: Joi.string()
      .valid('Functional', 'Not Present', 'Not Visible', 'Issue', 'Informational', 'Limitation', 'Not Inspected')
      .required(),
  }),
};

const editRemarkValidation = {
  bodySchema: Joi.object({
    templateRemarkId: Joi.string().required(),
    templateSubCategoryId: Joi.string().required(),
    remark: Joi.string().optional(),
    title: Joi.string().optional(),
    isFavourite: Joi.boolean(),
  }),
};

const deleteRemarkValidation = {
  bodySchema: Joi.object({
    templateRemarkId: Joi.string().required(),
    templateSubCategoryId: Joi.string().required(),
  }),
};

const listFavouriteRemarkValidation = {
  querySchema: Joi.object({
    templateId: Joi.string().required(),
  }),
};

const updateRemarkFrequencyValidation = {
  bodySchema: Joi.object({
    templateRemarkId: Joi.string().required(),
    frequency: Joi.number().integer().required(),
    totalFrequency: Joi.number().integer().required(),
    officeId: Joi.string().required(),
    myRemark: Joi.boolean().optional(),
    esTimestamp: Joi.date().required(),
    htmlRemark: Joi.string().optional().allow(null),
  }),
};

const updateBulkRemarkFrequencyValidation = {
  bodySchema: Joi.object({
    templateRemarkData: Joi.array().items(
      Joi.object({
        templateRemarkId: Joi.string().required(),
        frequency: Joi.number().integer().required(),
        totalFrequency: Joi.number().integer().required(),
        officeId: Joi.string().required(),
        myRemark: Joi.boolean().optional(),
        esTimestamp: Joi.date().required(),
        htmlRemark: Joi.string().optional().allow(null),
        officeStatus: Joi.string().valid('Functional',
        'Informational',
        'Limitation',
        'Not Inspected',
        'Action Required',
        'Repairs Recommended',
        'Preventive Measure',
        'Attention').required(),
      })
    ).required(),
  }),
};

const addCustomRemarkValidation = {
  bodySchema: Joi.object({
    remark: Joi.string().required(),
    title: Joi.string().required(),
    frequency: Joi.number().integer().required(),
    esTimestamp: Joi.date().required(),
    myRemark: Joi.boolean().optional(),
    addToDefault: Joi.boolean().optional(),
    totalFrequency: Joi.number().integer().required(),
    officeId: Joi.string().required(),
    officeStatus: Joi.string().valid('Functional',
    'Informational',
    'Limitation',
    'Not Inspected',
    'Action Required',
    'Repairs Recommended',
    'Preventive Measure',
    'Attention').required(),
    type: Joi.string()
      .valid('Functional', 'Not Present', 'Not Visible', 'Issue', 'Informational', 'Limitation', 'Not Inspected')
      .required(),
    templateSubCategoryId: Joi.string().required(),
    htmlRemark: Joi.string().optional().allow(null),
    customRemarkAddedByUser: Joi.string().required(),
    oldRemarkId: Joi.string().optional(),
  }),
};

const hideRemarksValidation = {
  bodySchema: Joi.object({
    remarkIds: Joi.array().items(Joi.string()).required(),
    templateSubCategoryId: Joi.string().required(),
  }),
};

const recoverRemarksValidation = {
  bodySchema: Joi.object({
    remarkIds: Joi.array().items(Joi.string()).required(),
    templateSubCategoryId: Joi.string().required(),
  }),
};

const listTemplateGroupRemarkValidation = {
  querySchema: Joi.object({
    nearestTemplateRemarkId: Joi.string().required(),
    isDraft: Joi.string().valid('True', 'False').required(),
  }),
};

const changeRemarkTypeValidation = {
  bodySchema: Joi.object({
    customRemarkIds: Joi.array().items(Joi.string()).required(),
  }),
};

const remarkOfficeListValidation = {
  querySchema: Joi.object({
    templateId: Joi.string().required(),
  }),
};

const copyPubRemarkToDraftValidation = {
  bodySchema: Joi.object({
    copyFromPubTemplateId: Joi.string().required(),
    copyFromRemarkIds: Joi.array().items(Joi.string()).required(),
    copyToDraftSubCategoryId: Joi.string().required(),
  }),
};

const storeImagePathValidation = {
  bodySchema: Joi.object({
    originalImageKey: Joi.string().required(),
    templateId: Joi.string().required(),
    // orderNumber: Joi.number().integer().required(),
    uploadStatus: Joi.string().valid('uploaded', 'pending', 'failed').optional(),
  }),
};

const removeImageValidation = {
  bodySchema: Joi.object({
    templateRemarkImageId: Joi.string().required(),
  }),
};

const getPresignedUrlToUploadRemarkImageValidation = {
  querySchema: Joi.object({
    templateId: Joi.string().required(),
    randomId: Joi.number().integer().optional(),
  }),
};

const updateImageStatusValidation = {
  bodySchema: Joi.object({
    uploadStatus: Joi.string().valid('uploaded', 'pending', 'failed').required(),
    thumbImageKey: Joi.string().optional(),
    reportImageKey: Joi.string().optional(),
    originalImageKey: Joi.string().required(),
  }),
};


const updateRemarkFromEsValidation = {
  bodySchema: Joi.object({
    templateRemarkId: Joi.string().required(),
    remark: Joi.string().optional(),
    title: Joi.string().optional(),
    frequency: Joi.number().integer().optional(),
    myRemark: Joi.boolean().optional(),
    // type: Joi.string().valid('Functional', 'Not Present', 'Not Visible', 'Issue', 'Informational', 'Limitation', 'Not Inspected').required(),
    officeId: Joi.string().required(),
    defaultAction: Joi.boolean().required(),
    officeStatus: Joi.string().valid('Functional',
    'Informational',
    'Limitation',
    'Not Inspected',
    'Action Required',
    'Repairs Recommended',
    'Preventive Measure',
    'Attention').required(),
    defaultValue: Joi.boolean().when('defaultAction', {
      is: true,
      then: Joi.required(),
      otherwise: Joi.optional(),
    }),
    htmlRemark: Joi.string().optional().allow(null),
    oldRemarkId: Joi.string().optional(),
  }),
};

const assignDefaultOrderValidation = {
  bodySchema: Joi.object({
    templateIds: Joi.array().items(Joi.string()).required(),
  }),
};

const singleCustomRemarkSchema = Joi.object({
  remark: Joi.string().required(),
  title: Joi.string().required(),
  frequency: Joi.number().integer().required(),
  esTimestamp: Joi.date().required(),
  myRemark: Joi.boolean().optional(),
  addToDefault: Joi.boolean().optional(),
  totalFrequency: Joi.number().integer().required(),
  officeStatus: Joi.string()
    .valid(
      'Functional',
      'Informational',
      'Limitation',
      'Not Inspected',
      'Action Required',
      'Repairs Recommended',
      'Preventive Measure',
      'Attention'
    )
    .required(),
  type: Joi.string()
    .valid(
      'Functional',
      'Not Present',
      'Not Visible',
      'Issue',
      'Informational',
      'Limitation',
      'Not Inspected'
    )
    .required(),
  htmlRemark: Joi.string().optional().allow(null),
});

const addBulkCustomRemarksValidation = {
  bodySchema: Joi.object({
    officeId: Joi.string().required(),
    templateSubCategoryId: Joi.string().required(),
    customRemarkAddedByUser: Joi.string().required(),
    remarks: Joi.array().items(singleCustomRemarkSchema).min(1).required(),
  }),
};

module.exports = {
  listRemarkValidation,
  addRemarkValidation,
  editRemarkValidation,
  deleteRemarkValidation,
  listFavouriteRemarkValidation,
  updateRemarkFrequencyValidation,
  addCustomRemarkValidation,
  hideRemarksValidation,
  recoverRemarksValidation,
  listTemplateGroupRemarkValidation,
  changeRemarkTypeValidation,
  remarkOfficeListValidation,
  copyPubRemarkToDraftValidation,
  storeImagePathValidation,
  removeImageValidation,
  getPresignedUrlToUploadRemarkImageValidation,
  updateImageStatusValidation,
  updateBulkRemarkFrequencyValidation,
  updateRemarkFromEsValidation,
  assignDefaultOrderValidation,
  addBulkCustomRemarksValidation,
};