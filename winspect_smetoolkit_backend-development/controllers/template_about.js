const { controllerBuilder } = require('../helpers/utils');
const messages = require('../helpers/messages');

const {
  listAbout,
  addAbout,
  editAbout,
  deleteAbout,
  listAllAboutForTemplate,
  // reorderAbout,
  reorderAllAbout,
  copyPubAboutToDraft,
} = require('../services/template_about');

const list = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'List Abouts',
    serviceCall: listAbout,
    serviceData: req,
    successMsg: 'Abouts Retrieved Successfully',
  });

  return res.status(response.status).send(response);
};

const add = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Add About',
    serviceCall: addAbout,
    serviceData: req,
    successMsg: 'About Added Successfully',
  });

  return res.status(response.status).send(response);
};

const edit = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Edit About',
    serviceCall: editAbout,
    serviceData: req,
    successMsg: 'About Updated Successfully',
  });

  return res.status(response.status).send(response);
};

const remove = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Remove About',
    serviceCall: deleteAbout,
    serviceData: req,
    successMsg: 'About Removed Successfully',
  });

  return res.status(response.status).send(response);
};

const listForATemplate = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'List All Abouts For a template',
    serviceCall: listAllAboutForTemplate,
    serviceData: req,
    successMsg: 'Abouts Retrieved Successfully',
  });

  return res.status(response.status).send(response);
};

const reorder = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Reorder About',
    serviceCall: reorderAllAbout,
    serviceData: req,
    successMsg: 'About Reordered Successfully',
  });

  return res.status(response.status).send(response);
};

const copyToDraft = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Copy About to draft',
    serviceCall: copyPubAboutToDraft,
    serviceData: req,
    successMsg: 'About Copied Successfully',
  });

  return res.status(response.status).send(response);
};

module.exports = {
  list,
  add,
  edit,
  remove,
  listForATemplate,
  reorder,
  copyToDraft,
};
