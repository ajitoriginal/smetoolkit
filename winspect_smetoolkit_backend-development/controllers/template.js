const { controllerBuilder } = require('../helpers/utils');
const messages = require('../helpers/messages');

const {
  // getUrlToUploadTemplateCatImage,
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
} = require('../services/template');

const createDraft = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Create Draft Template',
    serviceCall: createDraftTemplate,
    serviceData: req,
    successMsg: 'Draft Template Created Successfully',
  });

  return res.status(response.status).send(response);
};

const listPublished = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'List Published Templates',
    serviceCall: publishedTemplatesList,
    serviceData: req,
    successMsg: 'Templates Retrieved Successfully',
  });

  return res.status(response.status).send(response);
};

const listCategoriesForATemplate = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'List Categories',
    serviceCall: listCategories,
    serviceData: req,
    successMsg: 'Categories Retrieved Successfully',
  });

  return res.status(response.status).send(response);
};

const listSubCategoriesForATemplate = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'List Sub Categories',
    serviceCall: listSubCategories,
    serviceData: req,
    successMsg: 'SubCategories Retrieved Successfully',
  });

  return res.status(response.status).send(response);
};

const listDraft = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'List Draft Templates',
    serviceCall: draftTemplatesList,
    serviceData: req,
    successMsg: 'Templates Retrieved Successfully',
  });

  return res.status(response.status).send(response);
};

const presignedUrlTemplateIcon = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Presigned Url For Template',
    serviceCall: getPresignedUrlToUploadImageForTemplateIcon,
    serviceData: req,
    successMsg: 'Template Icon Uploaded Successfully',
  });

  return res.status(response.status).send(response);
};

const publish = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Publish a Template',
    serviceCall: publishTemplate,
    serviceData: req,
    successMsg: 'Template Published Successfully',
  });

  return res.status(response.status).send(response);
};

const republish = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'RePublish a Template',
    serviceCall: rollbackToPreviousPublishedTemplate,
    serviceData: req,
    successMsg: 'Template RePublished Successfully',
  });

  return res.status(response.status).send(response);
};

const detail = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Template Detail',
    serviceCall: getTemplateDetail,
    serviceData: req,
    successMsg: 'Template Detail Fetched Successfully',
  });

  return res.status(response.status).send(response);
};

const updateDraft = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Update Draft Template',
    serviceCall: updateDraftTemplate,
    serviceData: req,
    successMsg: 'Draft Template Updated Successfully',
  });

  return res.status(response.status).send(response);
};

const listDisclosures = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'List Disclosures',
    serviceCall: listTemplateDisclosures,
    serviceData: req,
    successMsg: 'Template Disclosures Fetched Successfully',
  });

  return res.status(response.status).send(response);
};

const updateDisclosure = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Update Disclosure',
    serviceCall: editDisclosure,
    serviceData: req,
    successMsg: 'Disclosure Updated Successfully',
  });

  return res.status(response.status).send(response);
};

const getDefinition = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'List Definition',
    serviceCall: listDefinitions,
    serviceData: req,
    successMsg: 'Template Definition Fetched Successfully',
  });

  return res.status(response.status).send(response);
};

const reorderDefinition = async (req, res) => {

  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Reorder Definition',
    serviceCall: reorderDefinitions,
    serviceData: req,
    successMsg: 'Definition Reordered Successfully',
  });

  return res.status(response.status).send(response);
}

const createDefinition = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Create Definition',
    serviceCall: addDefinition,
    serviceData: req,
    successMsg: 'Definition Created Successfully',
  });

  return res.status(response.status).send(response);
};

const updateDefinition = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Update Definition',
    serviceCall: editDefinition,
    serviceData: req,
    successMsg: 'Definition Updated Successfully',
  });

  return res.status(response.status).send(response);
};

const deleteDefinition = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Delete Defintion',
    serviceCall: removeDefinition,
    serviceData: req,
    successMsg: 'Defintion Removed Successfully',
  });

  return res.status(response.status).send(response);
};

const storeJson = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Store JSON',
    serviceCall: storePublishedTemplateJsonInS3,
    serviceData: req,
    successMsg: 'JSON Store Successfully',
  });

  return res.status(response.status).send(response);
};

const createDisclosure = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Create Disclosure',
    serviceCall: addDisclousre,
    serviceData: req,
    successMsg: 'Disclosure Created Successfully',
  });

  return res.status(response.status).send(response);
};

const serviceMapping = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Update Service Mapping',
    serviceCall: updateServiceMapping,
    serviceData: req,
    successMsg: 'Service Mapping Updated Successfully',
  });

  return res.status(response.status).send(response);
};

const listMaster = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'List Master Template',
    serviceCall: listMasterTemplates,
    serviceData: req,
    successMsg: 'Template List Retrieved Successfully',
  });

  return res.status(response.status).send(response);
};

const listAllTemplates = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'List All Templates',
    serviceCall: listTemplatesForAMasterTemplate,
    serviceData: req,
    successMsg: 'Template List Retrieved Successfully',
  });

  return res.status(response.status).send(response);
};

const elasticSearchStatus = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Update Elastic Search Status',
    serviceCall: updateElasticSearchStatus,
    serviceData: req,
    successMsg: 'Template Updated Successfully',
  });

  return res.status(response.status).send(response);
};

const getTemplateInfo = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Get Template Info',
    serviceCall: templateInfo,
    serviceData: req,
    successMsg: 'Template Retrieved Successfully',
  });

  return res.status(response.status).send(response);
};

const copyTemplateInfo = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Copy Template Info',
    serviceCall: copyTemplateData,
    serviceData: req,
    successMsg: 'Template Data Copied Successfully',
  });

  return res.status(response.status).send(response);
};

const storeTemplateStructureJson = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Store Template Structure JSON',
    serviceCall: uploadTemplateStructureToS3,
    serviceData: req,
    successMsg: 'JSON Uploaded Successfully',
  });

  return res.status(response.status).send(response);
};


const storeRemarkJson = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Store Remark JSON',
    serviceCall: uploadOfficeRemarkDataToS3,
    serviceData: req,
    successMsg: 'JSON Uploaded Successfully',
  });

  return res.status(response.status).send(response);
};

const storeBulkJson = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Store Bulk JSON',
    serviceCall: storeJsonInBulk,
    serviceData: req,
    successMsg: 'JSON stored Successfully',
  });

  return res.status(response.status).send(response);
};

const migrate = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Migrate Defaults',
    serviceCall: migrateDefaults,
    serviceData: req,
    successMsg: 'Defaults Migrated Successfully',
  });

  return res.status(response.status).send(response);
};

const fetchTemplateImages = async (req, res) => {
  const response = await controllerBuilder({
    controllerName: 'Fetch Template Images',
    serviceCall: listTemplateImages,
    serviceData: req,
    successMsg: 'Images Fetched Successfully',
  });

  return res.status(response.status).send(response);
};

const urlsToUploadMultipleTemplateImages = async (req, res) => {
  const response = await controllerBuilder({
    controllerName: 'Get Multiple Template Image Upload URLs',
    serviceCall: getMultipleUrlsToUploadTemplateImages,
    serviceData: req,
    successMsg: 'Upload URLs Generated Successfully',
  });

  return res.status(response.status).send(response);
};

const createMultipleTemplateImages = async (req, res) => {
  const response = await controllerBuilder({
    controllerName: 'Create Multiple Template Images',
    serviceCall: uploadMultipleTemplateImages,
    serviceData: req,
    successMsg: 'Template Images Created Successfully',
  });

  return res.status(response.status).send(response);
};

const deleteMultipleTemplateImagesController = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Delete Multiple Template Images',
    serviceCall: deleteMultipleTemplateImages,
    serviceData: req,
    successMsg: 'Template Images Deleted Successfully',
  });

  return res.status(response.status).send(response);
};

const mapImageWithRemark = async (req, res) => {
  const response = await controllerBuilder({
    controllerName: 'Map Template Image with Remark',
    serviceCall: mapTemplateImages,
    serviceData: req,
    successMsg: 'Images Mapped Successfully',
  });

  return res.status(response.status).send(response);
};

const fetchTermAndCondition = async (req, res) => {
  const response = await controllerBuilder({
    controllerName: 'Fetch Term And Condition',
    serviceCall: getTermAndCondition,
    serviceData: req,
    successMsg: 'T&C fetched Successfully',
  });

  return res.status(response.status).send(response);
};

const updateTermAndCondition = async (req, res) => {
  const response = await controllerBuilder({
    controllerName: 'Update Term And Condition',
    serviceCall: updateATermAndCondition,
    serviceData: req,
    successMsg: 'T&C updated Successfully',
  });

  return res.status(response.status).send(response);
};

const manageSummary = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Manage Summary Remark',
    serviceCall: manageSummaryRemark,
    serviceData: req,
    successMsg: 'Summary Updated Successfully',
  });

  return res.status(response.status).send(response);
};

module.exports = {
  // urlToUploadCatImage,
  createDraft,
  listPublished,
  listCategoriesForATemplate,
  listSubCategoriesForATemplate,
  listDraft,
  presignedUrlTemplateIcon,
  publish,
  republish,
  detail,
  updateDraft,
  listDisclosures,
  updateDisclosure,
  getDefinition,
  createDefinition,
  updateDefinition,
  deleteDefinition,
  storeJson,
  createDisclosure,
  serviceMapping,
  listMaster,
  listAllTemplates,
  elasticSearchStatus,
  getTemplateInfo,
  copyTemplateInfo,
  reorderDefinition,
  storeTemplateStructureJson,
  storeRemarkJson,
  storeBulkJson,
  migrate,
  fetchTemplateImages,
  urlsToUploadMultipleTemplateImages,
  createMultipleTemplateImages,
  deleteMultipleTemplateImagesController,
  fetchTermAndCondition,
  updateTermAndCondition,
  manageSummary
};
