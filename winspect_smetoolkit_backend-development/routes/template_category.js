const templateCategoryController = require('../controllers/template_category');
const { jwtMiddleware } = require('../middlewares/auth');
const {
  listCategoriesValidation,
  addCategoryValidation,
  editCategoryValidation,
  getPresignedUrlToUploadIconForCategoryValidation,
  deleteCategoryValidation,
  reorderCategoryValidation,
  copyPubCategoryToDraftValidation,
  reorderAllCategoryValidation,
} = require('../helpers/validations/template_category');
const { validateRequest } = require('../middlewares/validation');

module.exports = (router) => {
  router.get('/', validateRequest(listCategoriesValidation), jwtMiddleware, templateCategoryController.list);

  router.get(
    '/presigned-url',
    validateRequest(getPresignedUrlToUploadIconForCategoryValidation),
    jwtMiddleware,
    templateCategoryController.presignedUrl
  );
  router.post('/', validateRequest(addCategoryValidation), jwtMiddleware, templateCategoryController.add);
  router.put('/', validateRequest(editCategoryValidation), jwtMiddleware, templateCategoryController.edit);
  router.delete('/', validateRequest(deleteCategoryValidation), jwtMiddleware, templateCategoryController.remove);
  router.put('/reorder', validateRequest(reorderCategoryValidation), jwtMiddleware, templateCategoryController.reorder);
  router.put(
    '/copy',
    validateRequest(copyPubCategoryToDraftValidation),
    jwtMiddleware,
    templateCategoryController.copyToDraft
  );
  router.put(
    '/reorder/all',
    validateRequest(reorderAllCategoryValidation),
    jwtMiddleware,
    templateCategoryController.reorderAll
  );
  return router;
};
