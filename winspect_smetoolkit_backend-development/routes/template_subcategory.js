const templateSubCategoryController = require('../controllers/template_subcategory');
const { jwtMiddleware } = require('../middlewares/auth');
const {
  listSubCategoriesValidation,
  subcategoryDetailValidation,
  addSubCategoryValidation,
  editSubCategoryValidation,
  deleteSubCategoryValidation,
  reorderSubCategoryValidation,
  copyPubSubCategoryToDraftValidation,
  reorderAllSubCategoryValidation,
} = require('../helpers/validations/template_subcategory');
const { validateRequest } = require('../middlewares/validation');

module.exports = (router) => {
  router.get('/', validateRequest(listSubCategoriesValidation), jwtMiddleware, templateSubCategoryController.list);

  router.get(
    '/detail',
    validateRequest(subcategoryDetailValidation),
    jwtMiddleware,
    templateSubCategoryController.subcategoryDetail
  );

  router.post('/', validateRequest(addSubCategoryValidation), jwtMiddleware, templateSubCategoryController.add);
  router.put('/', validateRequest(editSubCategoryValidation), jwtMiddleware, templateSubCategoryController.edit);
  router.delete('/', validateRequest(deleteSubCategoryValidation), jwtMiddleware, templateSubCategoryController.remove);
  router.put(
    '/reorder',
    validateRequest(reorderSubCategoryValidation),
    jwtMiddleware,
    templateSubCategoryController.reorder
  );
  router.put(
    '/copy',
    validateRequest(copyPubSubCategoryToDraftValidation),
    jwtMiddleware,
    templateSubCategoryController.copyToDraft
  );

  router.put(
    '/reorder/all',
    validateRequest(reorderAllSubCategoryValidation),
    jwtMiddleware,
    templateSubCategoryController.reorderAll
  );

  return router;
};
