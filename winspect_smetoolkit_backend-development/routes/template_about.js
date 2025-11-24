const templateAboutController = require('../controllers/template_about');
const { jwtMiddleware } = require('../middlewares/auth');
const {
  listAboutValidation,
  addAboutValidation,
  editAboutValidation,
  deleteAboutValidation,
  listAllAboutForTemplateValidation,
  // reorderAboutValidation,
  reorderAllAboutValidation,
  copyPubAboutToDraftValidation,
} = require('../helpers/validations/template_about');
const { validateRequest } = require('../middlewares/validation');

module.exports = (router) => {
  router.get('/', validateRequest(listAboutValidation), jwtMiddleware, templateAboutController.list);
  router.post('/', validateRequest(addAboutValidation), jwtMiddleware, templateAboutController.add);
  router.put('/', validateRequest(editAboutValidation), jwtMiddleware, templateAboutController.edit);
  router.delete('/', validateRequest(deleteAboutValidation), jwtMiddleware, templateAboutController.remove);
  router.get(
    '/all',
    validateRequest(listAllAboutForTemplateValidation),
    jwtMiddleware,
    templateAboutController.listForATemplate
  );
  router.put('/reorder', validateRequest(reorderAllAboutValidation), jwtMiddleware, templateAboutController.reorder);
  router.put(
    '/copy',
    validateRequest(copyPubAboutToDraftValidation),
    jwtMiddleware,
    templateAboutController.copyToDraft
  );

  return router;
};
