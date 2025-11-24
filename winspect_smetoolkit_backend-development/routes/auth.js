const authController = require('../controllers/auth');
const { jwtMiddleware } = require('../middlewares/auth');
const { validateRequest } = require('../middlewares/validation');
const { manualLoginValidation, changePasswordValidation, registerValidation } = require('../helpers/validations/auth');

module.exports = (router) => {
  router.post('/login/manual', validateRequest(manualLoginValidation), authController.login);
  router.put(
    '/change-password',
    validateRequest(changePasswordValidation),
    jwtMiddleware,
    authController.changeUserPassword
  );
  router.post('/user', validateRequest(registerValidation), authController.registerUser);
  return router;
};
