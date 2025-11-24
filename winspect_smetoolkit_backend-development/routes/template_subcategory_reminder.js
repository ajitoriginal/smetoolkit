const templateSubCategoryReminderController = require('../controllers/template_subcategory_reminder');
const { jwtMiddleware } = require('../middlewares/auth');
const {
  listRemindersValidation,
  addReminderValidation,
  editReminderValidation,
  deleteReminderValidation,
} = require('../helpers/validations/template_subcategory_reminder');
const { validateRequest } = require('../middlewares/validation');

module.exports = (router) => {
  router.get('/', validateRequest(listRemindersValidation), jwtMiddleware, templateSubCategoryReminderController.list);
  router.post('/', validateRequest(addReminderValidation), jwtMiddleware, templateSubCategoryReminderController.add);
  router.put('/', validateRequest(editReminderValidation), jwtMiddleware, templateSubCategoryReminderController.edit);
  router.delete(
    '/',
    validateRequest(deleteReminderValidation),
    jwtMiddleware,
    templateSubCategoryReminderController.remove
  );
  return router;
};
