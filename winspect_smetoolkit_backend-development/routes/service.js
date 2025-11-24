const serviceController = require('../controllers/service');
const { jwtMiddleware } = require('../middlewares/auth');
const { serviceListValidation } = require('../helpers/validations/service');
const { validateRequest } = require('../middlewares/validation');

module.exports = (router) => {
  router.get('/', jwtMiddleware, validateRequest(serviceListValidation), serviceController.list);

  router.get('/template-mapping', jwtMiddleware, serviceController.templateMapping);

  return router;
};
