const { controllerBuilder } = require('../helpers/utils');
const messages = require('../helpers/messages');

const {
  addAboutValue,
  editAboutValue,
  deleteAboutValue,
  reorderAllAboutValues,
} = require('../services/template_about_value');

const add = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Add About Value',
    serviceCall: addAboutValue,
    serviceData: req,
    successMsg: 'About Value Added Successfully',
  });

  return res.status(response.status).send(response);
};

const edit = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Edit About Value',
    serviceCall: editAboutValue,
    serviceData: req,
    successMsg: 'About Value Updated Successfully',
  });

  return res.status(response.status).send(response);
};

const remove = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Remove About Value',
    serviceCall: deleteAboutValue,
    serviceData: req,
    successMsg: 'About Value Removed Successfully',
  });

  return res.status(response.status).send(response);
};

const reorder = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Reorder About Value',
    serviceCall: reorderAllAboutValues,
    serviceData: req,
    successMsg: 'About Value Reordered Successfully',
  });

  return res.status(response.status).send(response);
};

module.exports = {
  add,
  edit,
  remove,
  reorder,
};
