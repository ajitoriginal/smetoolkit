const templateController = require('../controllers/template');
const { jwtMiddleware } = require('../middlewares/auth');
const {
  createDraftTemplateValidation,
  publishedTemplatesListValidation,
  getPresignedUrlToUploadImageForTemplateIconValidatiom,
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
  deleteMultipleTemplateImagesValidation, manageSummaryValidation
} = require('../helpers/validations/template');
const { validateRequest } = require('../middlewares/validation');

module.exports = (router) => {
  router.post('/draft', jwtMiddleware, validateRequest(createDraftTemplateValidation), templateController.createDraft);
  router.get('/draft', jwtMiddleware, validateRequest(draftTemplatesListValidation), templateController.listDraft);
  router.get(
    '/published',
    jwtMiddleware,
    validateRequest(publishedTemplatesListValidation),
    templateController.listPublished
  );

  router.get(
    '/presigned-url',
    jwtMiddleware,
    validateRequest(getPresignedUrlToUploadImageForTemplateIconValidatiom),
    templateController.presignedUrlTemplateIcon
  );

  router.post('/publish', jwtMiddleware, validateRequest(publishTemplateValidation), templateController.publish);
  router.post('/republish', jwtMiddleware, validateRequest(republishTemplateValidation), templateController.republish);
  router.get('/detail', jwtMiddleware, validateRequest(getTemplateDetailValidation), templateController.detail);

  router.put('/draft', jwtMiddleware, validateRequest(updateDraftTemplateValidation), templateController.updateDraft);

  router.get(
    '/disclosure',
    jwtMiddleware,
    validateRequest(listTemplateDisclosuresValidation),
    templateController.listDisclosures
  );
  router.post(
    '/disclosure',
    jwtMiddleware,
    validateRequest(addDisclosureValidation),
    templateController.createDisclosure
  );
  router.put(
    '/disclosure',
    jwtMiddleware,
    validateRequest(editDisclosureValidation),
    templateController.updateDisclosure
  );

  router.get(
    '/definition',
    jwtMiddleware,
    validateRequest(listDefinitionsValidation),
    templateController.getDefinition
  );
  router.post(
    '/definition',
    jwtMiddleware,
    validateRequest(addDefinitionValidation),
    templateController.createDefinition
  );

  router.put(
    '/definition',
    jwtMiddleware,
    validateRequest(editDefinitionValidation),
    templateController.updateDefinition
  );

  router.put(
    '/definition/reorder',
    jwtMiddleware,
    validateRequest(reorderDefinitionsValidation),
    templateController.reorderDefinition
  );

  router.delete(
    '/definition',
    jwtMiddleware,
    validateRequest(removeDefinitionValidation),
    templateController.deleteDefinition
  );

  router.put('/json', jwtMiddleware, validateRequest(storeJSONValidation), templateController.storeJson);

  router.get('/service-mapping', jwtMiddleware, templateController.serviceMapping);

  router.get('/master', jwtMiddleware, validateRequest(listMasterTemplatesValidation), templateController.listMaster);

  router.get(
    '/all',
    jwtMiddleware,
    validateRequest(listTemplatesForAMasterTemplateValidation),
    templateController.listAllTemplates
  );

  router.put(
    '/es-status',
    // jwtMiddleware,
    validateRequest(updateElasticSearchStatusValidation),
    templateController.elasticSearchStatus
  );

  router.get('/info', jwtMiddleware, validateRequest(getTemplateDetailValidation), templateController.getTemplateInfo);

  router.put('/copy-info', jwtMiddleware, validateRequest(copyTemplateDataValidation), templateController.copyTemplateInfo);

  router.put('/json/base-structure', jwtMiddleware, validateRequest(storeJSONValidation), templateController.storeTemplateStructureJson);
  router.put('/json/remark', jwtMiddleware, validateRequest(storeJSONValidation), templateController.storeRemarkJson);

  router.put('/json/bulk', jwtMiddleware, validateRequest(storeJsonInBulkValidation), templateController.storeBulkJson);

  router.put('/default/migrate', jwtMiddleware, validateRequest(migrateDefaultValidation), templateController.migrate);

  router.get('/image', validateRequest(listTemplateImagesValidation), jwtMiddleware, templateController.fetchTemplateImages);
  router.post('/images/upload-urls', validateRequest(getMultipleTemplateImageUploadUrlsValidation), jwtMiddleware, templateController.urlsToUploadMultipleTemplateImages);
  router.post('/images', validateRequest(uploadMultipleTemplateImagesValidation), jwtMiddleware, templateController.createMultipleTemplateImages);
   // Multiple Images Delete
  router.delete('/images', validateRequest(deleteMultipleTemplateImagesValidation), templateController.deleteMultipleTemplateImagesController);

  router.get('/', jwtMiddleware, templateController.fetchTermAndCondition);
  router.put('/', jwtMiddleware, templateController.updateTermAndCondition);
    router.put('/remark/addToSummary', validateRequest(manageSummaryValidation), templateController.manageSummary);


  return router;
};
