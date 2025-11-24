const templateRemarkController = require('../controllers/template_remark');
const { jwtMiddleware } = require('../middlewares/auth');
const {
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
} = require('../helpers/validations/template_remark');
const { validateRequest } = require('../middlewares/validation');

module.exports = (router) => {
  router.get('/', validateRequest(listRemarkValidation), jwtMiddleware, templateRemarkController.list);
  router.post('/', validateRequest(addRemarkValidation), jwtMiddleware, templateRemarkController.add);
  router.put('/', validateRequest(editRemarkValidation), jwtMiddleware, templateRemarkController.edit);
  router.delete('/', validateRequest(deleteRemarkValidation), jwtMiddleware, templateRemarkController.remove);
  router.get(
    '/favourite',
    validateRequest(listFavouriteRemarkValidation),
    jwtMiddleware,
    templateRemarkController.listFavourite
  );

  router.put(
    '/frequency',
    validateRequest(updateRemarkFrequencyValidation),
    // jwtMiddleware,
    templateRemarkController.updateFrequency
  );
  router.post('/custom', validateRequest(addCustomRemarkValidation), templateRemarkController.addCustom);

  router.put('/hide', validateRequest(hideRemarksValidation), jwtMiddleware, templateRemarkController.hide);
  router.put('/recover', validateRequest(recoverRemarksValidation), jwtMiddleware, templateRemarkController.recover);

  router.get(
    '/custom/group',
    validateRequest(listTemplateGroupRemarkValidation),
    jwtMiddleware,
    templateRemarkController.listTemplateGroupRemark
  );

  router.put(
    '/type',
    validateRequest(changeRemarkTypeValidation),
    jwtMiddleware,
    templateRemarkController.updateRemarkType
  );

  router.get(
    '/office',
    validateRequest(remarkOfficeListValidation),
    jwtMiddleware,
    templateRemarkController.getOfficeList
  );
  router.put(
    '/copy',
    validateRequest(copyPubRemarkToDraftValidation),
    jwtMiddleware,
    templateRemarkController.copyToDraft
  );

  router.post(
    '/image/path',
    validateRequest(storeImagePathValidation),
    jwtMiddleware,
    templateRemarkController.storeImage
  );

  router.delete(
    '/image/remove',
    validateRequest(removeImageValidation),
    jwtMiddleware,
    templateRemarkController.deleteImage
  );

  router.get(
    '/image/presigned-url',
    validateRequest(getPresignedUrlToUploadRemarkImageValidation),
    jwtMiddleware,
    templateRemarkController.presignedUrlTemplateRemark
  );

  router.put(
    '/image/status',
    validateRequest(updateImageStatusValidation),
    templateRemarkController.updateImageStatus
  );

  router.put(
    '/bulk-frequency',
    validateRequest(updateBulkRemarkFrequencyValidation),
    templateRemarkController.updateBulkFrequency
  );


  router.put(
    '/update',
    validateRequest(updateRemarkFromEsValidation),
    templateRemarkController.updateRemark
  );


  router.delete(
    '/delete',
    validateRequest(deleteRemarkValidation),
    templateRemarkController.deleteRemarkES
  );

  router.put(
    '/default/order',
    validateRequest(assignDefaultOrderValidation),
    templateRemarkController.assignDefaultOrder
  );

  router.put(
    '/status',
    validateRequest(assignDefaultOrderValidation),
    templateRemarkController.assignOfficeStatus
  );

  router.get(
    '/image/presigned-url',
    validateRequest(getPresignedUrlToUploadRemarkImageValidation),
    jwtMiddleware,
    templateRemarkController.presignedUrlTemplateRemark
  );

  router.post('/custom/bulk', validateRequest(addBulkCustomRemarksValidation), templateRemarkController.addBulkCustom);

  
  return router;
};
