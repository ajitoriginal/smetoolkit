const { controllerBuilder } = require('../helpers/utils');
const messages = require('../helpers/messages');

const {
  addReminder,
  listReminders,
  editReminder,
  removeReminder,
} = require('../services/template_subcategory_reminder');

const list = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'List Reminders',
    serviceCall: listReminders,
    serviceData: req,
    successMsg: 'Reminders Retrieved Successfully',
  });

  return res.status(response.status).send(response);
};

const add = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Add Reminder',
    serviceCall: addReminder,
    serviceData: req,
    successMsg: 'Reminder Added Successfully',
  });

  return res.status(response.status).send(response);
};

const edit = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Edit Reminder',
    serviceCall: editReminder,
    serviceData: req,
    successMsg: 'Reminder Updated Successfully',
  });

  return res.status(response.status).send(response);
};

const remove = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Remove Reminder',
    serviceCall: removeReminder,
    serviceData: req,
    successMsg: 'Reminder Removed Successfully',
  });

  return res.status(response.status).send(response);
};

module.exports = {
  list,
  add,
  edit,
  remove,
};
