const { controllerBuilder } = require('../helpers/utils');
const messages = require('../helpers/messages');

const { addEditAboutValueNote, deleteAboutValueNote } = require('../services/template_about_value_note');

const upsert = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Add/Edit About Value',
    serviceCall: addEditAboutValueNote,
    serviceData: req,
    successMsg: 'About Value Note Upserted Successfully',
  });

  return res.status(response.status).send(response);
};

const remove = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Remove About Value Note',
    serviceCall: deleteAboutValueNote,
    serviceData: req,
    successMsg: 'About Value Note Removed Successfully',
  });

  return res.status(response.status).send(response);
};

module.exports = {
  upsert,
  remove,
};
