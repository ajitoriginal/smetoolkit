const architecturalTypeController = require('../controllers/architectural_type');
const { jwtMiddleware } = require('../middlewares/auth');
const { addOrRemoveArchitecturalTypeValidation } = require('../helpers/validations/architectural_type');
const { validateRequest } = require('../middlewares/validation');

module.exports = (router) => {
  router.post(
    '/',
    validateRequest(addOrRemoveArchitecturalTypeValidation),
    jwtMiddleware,
    architecturalTypeController.addOrRemove
  );

  return router;
};
