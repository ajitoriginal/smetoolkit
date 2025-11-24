const officeController = require('../controllers/office');
const { jwtMiddleware } = require('../middlewares/auth');
const { validateRequest } = require('../middlewares/validation');
const {
  officeAccessValidation,
  officeRemoveAccessValidation,
  listOfficesValidation,
  templateAccessValidation,
  removeTemplateAccessValidation,
  listOfficesMappedWithRemarkValidation,
  mapOfficeWithDefaultRemarkValidation,
  bulkMapOfficeWithDefaultRemarkValidation,
  listOfficesWithTemplatesValidation,
  templateAccessOneOfficeValidation,
  getUsersByOfficeIdValidation
} = require('../helpers/validations/office');

module.exports = (router) => {
  router.get('/', jwtMiddleware, validateRequest(listOfficesValidation), officeController.list);

  router.get('/templates', jwtMiddleware, validateRequest(listOfficesWithTemplatesValidation), officeController.listOfficeWithTemplates);

  router.post('/service-access', jwtMiddleware, validateRequest(officeAccessValidation), officeController.access);
  router.delete(
    '/service-access',
    jwtMiddleware,
    validateRequest(officeRemoveAccessValidation),
    officeController.removeAccess
  );

  router.post(
    '/template-access',
    jwtMiddleware,
    validateRequest(templateAccessValidation),
    officeController.accessTemplate
  );

  router.post(
    '/template-access-office',
    jwtMiddleware,
    validateRequest(templateAccessOneOfficeValidation),
    officeController.accessTemplateForOneOffice
  );

  router.delete(
    '/template-access',
    jwtMiddleware,
    validateRequest(removeTemplateAccessValidation),
    officeController.removeAccessTemplate
  );

  router.get('/remark', jwtMiddleware, validateRequest(listOfficesMappedWithRemarkValidation), officeController.listRemarkMappedOffices);

  router.put('/remark', jwtMiddleware, validateRequest(mapOfficeWithDefaultRemarkValidation), officeController.mapRemarkWithOffices);

  router.put('/remark-bulk', jwtMiddleware, validateRequest(bulkMapOfficeWithDefaultRemarkValidation), officeController.bulkMapRemarkWithOffices);

  router.post('/users', jwtMiddleware, validateRequest(getUsersByOfficeIdValidation), officeController.getOfficeUsers);

  return router;
};
