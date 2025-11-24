const { controllerBuilder } = require('../helpers/utils');
const messages = require('../helpers/messages');

const { listLocations, editLocation, removeLocation, addLocation } = require('../services/template_location');

const list = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'List Locations',
    serviceCall: listLocations,
    serviceData: req,
    successMsg: 'Locations Retrieved Successfully',
  });

  return res.status(response.status).send(response);
};

const add = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Add Location',
    serviceCall: addLocation,
    serviceData: req,
    successMsg: 'Location Added Successfully',
  });

  return res.status(response.status).send(response);
};

const edit = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Edit Location',
    serviceCall: editLocation,
    serviceData: req,
    successMsg: 'Location Updated Successfully',
  });

  return res.status(response.status).send(response);
};

const remove = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Remove Location',
    serviceCall: removeLocation,
    serviceData: req,
    successMsg: 'Location Removed Successfully',
  });

  return res.status(response.status).send(response);
};

module.exports = {
  list,
  add,
  edit,
  remove,
};
