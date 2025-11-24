const policyController = require('../controllers/win_policy');
const { jwtMiddleware } = require('../middlewares/auth');

module.exports = (router) => {
  router.post('/', jwtMiddleware, policyController.createPolicy);
  router.get('/', jwtMiddleware, policyController.listPolicies);
  router.get('/:winPolicyId', jwtMiddleware, policyController.getPolicy);
  router.put('/:winPolicyId', jwtMiddleware, policyController.updatePolicy);
  router.delete('/:winPolicyId', jwtMiddleware, policyController.removePolicy);
  return router;
};