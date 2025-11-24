const templateAboutValueNoteController = require('../controllers/template_about_value_note');
const { jwtMiddleware } = require('../middlewares/auth');
const {
  addEditAboutValueNoteValidation,
  deleteAboutValueValidation,
} = require('../helpers/validations/template_about_value_note');
const { validateRequest } = require('../middlewares/validation');

module.exports = (router) => {
  router.post(
    '/',
    validateRequest(addEditAboutValueNoteValidation),
    jwtMiddleware,
    templateAboutValueNoteController.upsert
  );
  router.delete(
    '/',
    validateRequest(deleteAboutValueValidation),
    jwtMiddleware,
    templateAboutValueNoteController.remove
  );

  return router;
};
