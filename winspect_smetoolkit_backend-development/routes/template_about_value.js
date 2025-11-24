const templateAboutValueController = require('../controllers/template_about_value');
const { jwtMiddleware } = require('../middlewares/auth');
const {
  addAboutValueValidation,
  editAboutValueValidation,
  deleteAboutValueValidation,
  reorderAllAboutValueValidation,
} = require('../helpers/validations/template_about_value');
const { validateRequest } = require('../middlewares/validation');

module.exports = (router) => {
  router.post('/', validateRequest(addAboutValueValidation), jwtMiddleware, templateAboutValueController.add);
  router.put('/', validateRequest(editAboutValueValidation), jwtMiddleware, templateAboutValueController.edit);
  router.delete('/', validateRequest(deleteAboutValueValidation), jwtMiddleware, templateAboutValueController.remove);
  router.put(
    '/reorder',
    validateRequest(reorderAllAboutValueValidation),
    jwtMiddleware,
    templateAboutValueController.reorder
  );

  return router;
};
