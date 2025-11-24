const { controllerBuilder } = require('../helpers/utils');
const {
  createAPolicy,
  listAllPolicies,
  updateAPolicy,
  deleteAPolicy,
  getAPolicy
} = require('../services/win_policy');

const createPolicy = async (req, res) => {
  const response = await controllerBuilder({
    controllerName: 'Create Policy',
    serviceCall: createAPolicy,
    serviceData: req,
    successMsg: 'Policy Created Successfully',
  });

  return res.status(response.status).send(response);
};

const listPolicies = async (req, res) => {
  const response = await controllerBuilder({
    controllerName: 'List Policies',
    serviceCall: listAllPolicies,
    serviceData: req,
    successMsg: 'Policies Retrieved Successfully',
  });

  return res.status(response.status).send(response);
};

const updatePolicy = async (req, res) => {
  const response = await controllerBuilder({
    controllerName: 'Update Policy',
    serviceCall: updateAPolicy,
    serviceData: req,
    successMsg: 'Policy Updated Successfully',
  });

  return res.status(response.status).send(response);
};

const removePolicy = async (req, res) => {
  const response = await controllerBuilder({
    controllerName: 'Delete Policy',
    serviceCall: deleteAPolicy,
    serviceData: req,
    successMsg: 'Policy Deleted Successfully',
  });

  return res.status(response.status).send(response);
};

const getPolicy = async (req, res) => {
  const response = await controllerBuilder({
    controllerName: 'Get Policy',
    serviceCall: getAPolicy,
    serviceData: req,
    successMsg: 'Policy Retrieved Successfully',
  });

  return res.status(response.status).send(response);
};

module.exports = {
  createPolicy,
  listPolicies,
  updatePolicy,
  removePolicy,
  getPolicy
};