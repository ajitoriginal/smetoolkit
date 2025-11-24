const { controllerBuilder } = require('../helpers/utils');
const messages = require('../helpers/messages');

const {
  listOffices,
  serviceAccess,
  removeServiceAccess,
  templateAccess,
  removeTemplateAccess,
  listOfficesMappedWithRemark,
  mapOfficeWithDefaultRemark,
  bulkMapOfficeWithDefaultRemark,
  listOfficesWithTemplateAccess,
  templateAccessForOneOffice,
  getUsersByOfficeId
} = require('../services/office');

const list = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Get All Offices',
    serviceCall: listOffices,
    serviceData: req,
    successMsg: 'Offices Retrieved Successfully',
  });

  return res.status(response.status).send(response);
};

const listOfficeWithTemplates = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Get All Offices with templates',
    serviceCall: listOfficesWithTemplateAccess,
    serviceData: req,
    successMsg: 'Offices And Templates Retrieved Successfully',
  });

  return res.status(response.status).send(response);
};

const access = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Provide Service Access to offices',
    serviceCall: serviceAccess,
    serviceData: req,
    successMsg: 'Access Provided Successfully',
  });

  return res.status(response.status).send(response);
};

const removeAccess = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Remove Service Access from offices',
    serviceCall: removeServiceAccess,
    serviceData: req,
    successMsg: 'Access Revoked Successfully',
  });

  return res.status(response.status).send(response);
};

const accessTemplate = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Provide Template Access to offices',
    serviceCall: templateAccess,
    serviceData: req,
    successMsg: 'Access Provided Successfully',
  });

  return res.status(response.status).send(response);
};

const accessTemplateForOneOffice = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Provide Template Access to office',
    serviceCall: templateAccessForOneOffice,
    serviceData: req,
    successMsg: 'Access Provided Successfully',
  });

  return res.status(response.status).send(response);
};

const removeAccessTemplate = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Remove Template Access from offices',
    serviceCall: removeTemplateAccess,
    serviceData: req,
    successMsg: 'Access Revoked Successfully',
  });

  return res.status(response.status).send(response);
};

const listRemarkMappedOffices = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'list Offices Mapped With Remark',
    serviceCall: listOfficesMappedWithRemark,
    serviceData: req,
    successMsg: 'Offices Retrieved Successfully',
  });

  return res.status(response.status).send(response);
};

const mapRemarkWithOffices = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Map Remark With Offices',
    serviceCall: mapOfficeWithDefaultRemark,
    serviceData: req,
    successMsg: 'Offices Mapped Successfully With Remark',
  });

  return res.status(response.status).send(response);
};

const bulkMapRemarkWithOffices = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Map Remark With Offices',
    serviceCall: bulkMapOfficeWithDefaultRemark,
    serviceData: req,
    successMsg: 'Offices Mapped Successfully With Remark',
  });

  return res.status(response.status).send(response);
};

const getOfficeUsers = async (req, res) => {
  const response = await controllerBuilder({
    controllerName: 'Get Users by Office ID',
    serviceCall: getUsersByOfficeId,
    serviceData: req,
    successMsg: 'Users Retrieved Successfully',
  });

  return res.status(response.status).send(response);
};

module.exports = {
  list,
  access,
  removeAccess,
  accessTemplate,
  removeAccessTemplate,
  listRemarkMappedOffices,
  mapRemarkWithOffices,
  bulkMapRemarkWithOffices,
  listOfficeWithTemplates,
  accessTemplateForOneOffice,
  getOfficeUsers
};
