const { controllerBuilder } = require('../helpers/utils');
const messages = require('../helpers/messages');

const { addRemoveArchitecturalType } = require('../services/architectural_type');

const addOrRemove = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Add Architectural Type',
    serviceCall: addRemoveArchitecturalType,
    serviceData: req,
    successMsg: 'Architectural Types Added Successfully',
  });

  return res.status(response.status).send(response);
};

module.exports = {
  addOrRemove,
};
