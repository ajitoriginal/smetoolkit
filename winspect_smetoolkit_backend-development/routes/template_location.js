const templateLocationController = require('../controllers/template_location');
const { jwtMiddleware } = require('../middlewares/auth');
const {
  listLocationValidation,
  addLocationValidation,
  editLocationValidation,
  deleteLocationValidation,
} = require('../helpers/validations/template_location');
const { validateRequest } = require('../middlewares/validation');

module.exports = (router) => {
  router.get('/', validateRequest(listLocationValidation), jwtMiddleware, templateLocationController.list);
  router.post('/', validateRequest(addLocationValidation), jwtMiddleware, templateLocationController.add);
  router.put('/', validateRequest(editLocationValidation), jwtMiddleware, templateLocationController.edit);
  router.delete('/', validateRequest(deleteLocationValidation), jwtMiddleware, templateLocationController.remove);
  return router;
};
