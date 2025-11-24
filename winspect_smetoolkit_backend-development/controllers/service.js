const { controllerBuilder } = require('../helpers/utils');
const messages = require('../helpers/messages');

const { getServices, updateTemplateMapping } = require('../services/service');

const list = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Get All Services',
    serviceCall: getServices,
    serviceData: req,
    successMsg: 'Services Retrieved Successfully',
  });

  return res.status(response.status).send(response);
};

const templateMapping = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Update Template Mapping',
    serviceCall: updateTemplateMapping,
    serviceData: req,
    successMsg: 'Template Mapping Updated Successfully',
  });

  return res.status(response.status).send(response);
};

module.exports = {
  list,
  templateMapping,
};
