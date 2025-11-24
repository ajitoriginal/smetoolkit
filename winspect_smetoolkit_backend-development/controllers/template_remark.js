const { controllerBuilder } = require('../helpers/utils');
const messages = require('../helpers/messages');

const {
  listRemark,
  addRemark,
  editRemark,
  deleteRemark,
  listFavouriteRemark,
  updateRemarkFrequency,
  addCustomRemark,
  hideRemarks,
  recoverRemarks,
  getTemplateGroupRemarks,
  changeRemarkType,
  remarkOfficeList,
  copyPubRemarkToDraft,
  storeImagePath,
  removeImage,
  getPresignedUrlToUploadRemarkImage,
  imageUpdateStatus,
  updateBulkRemarkFrequency,
  updateRemarkFromEs,
  deleteRemarkFromES,
  assignDefaultOrderNumber,
  assignDefaultOfficeStatus,
  // addedByOfficeForSubcategoryRemark,
  addBulkCustomRemarks,
} = require('../services/template_remark');

const list = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'List Remarks',
    serviceCall: listRemark,
    serviceData: req,
    successMsg: 'Remarks Retrieved Successfully',
  });

  return res.status(response.status).send(response);
};

const add = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Add Remark',
    serviceCall: addRemark,
    serviceData: req,
    successMsg: 'Remark Added Successfully',
  });

  return res.status(response.status).send(response);
};

const edit = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Edit Remark',
    serviceCall: editRemark,
    serviceData: req,
    successMsg: 'Remark Updated Successfully',
  });

  return res.status(response.status).send(response);
};

const remove = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Remove Remark',
    serviceCall: deleteRemark,
    serviceData: req,
    successMsg: 'Remark Removed Successfully',
  });

  return res.status(response.status).send(response);
};

const listFavourite = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'List Favourite Remark',
    serviceCall: listFavouriteRemark,
    serviceData: req,
    successMsg: 'Remarks Retrieved Successfully',
  });

  return res.status(response.status).send(response);
};

const updateFrequency = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Update Remark Frequency',
    serviceCall: updateRemarkFrequency,
    serviceData: req,
    successMsg: 'Remark Frequency Updated Successfully',
  });

  return res.status(response.status).send(response);
};

const addCustom = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Add Custom Remark',
    serviceCall: addCustomRemark,
    serviceData: req,
    successMsg: 'Custom Remark Added Successfully',
  });

  return res.status(response.status).send(response);
};

const hide = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Hide Remarks',
    serviceCall: hideRemarks,
    serviceData: req,
    successMsg: 'Remarks Hidden Successfully',
  });

  return res.status(response.status).send(response);
};

const recover = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Recover Remarks',
    serviceCall: recoverRemarks,
    serviceData: req,
    successMsg: 'Remarks Recovered Successfully',
  });

  return res.status(response.status).send(response);
};

const listTemplateGroupRemark = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'List Template Group Remarks',
    serviceCall: getTemplateGroupRemarks,
    serviceData: req,
    successMsg: 'Remarks Retrieved Successfully',
  });

  return res.status(response.status).send(response);
};

const updateRemarkType = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Update Remark Type',
    serviceCall: changeRemarkType,
    serviceData: req,
    successMsg: 'Remark Type Updated Successfully',
  });

  return res.status(response.status).send(response);
};

const getOfficeList = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Office List',
    serviceCall: remarkOfficeList,
    serviceData: req,
    successMsg: 'Offices Retrieved Successfully',
  });

  return res.status(response.status).send(response);
};

const copyToDraft = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Copy Remark to draft',
    serviceCall: copyPubRemarkToDraft,
    serviceData: req,
    successMsg: 'Remarks Copied Successfully',
  });

  return res.status(response.status).send(response);
};

const storeImage = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Store Image',
    serviceCall: storeImagePath,
    serviceData: req,
    successMsg: 'Image Stored Successfully',
  });

  return res.status(response.status).send(response);
};

const deleteImage = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Delete Image',
    serviceCall: removeImage,
    serviceData: req,
    successMsg: 'Image Deleted Successfully',
  });

  return res.status(response.status).send(response);
};

const presignedUrlTemplateRemark = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Presigned Url For Template Remark',
    serviceCall: getPresignedUrlToUploadRemarkImage,
    serviceData: req,
    successMsg: 'Url Retrieved Successfully',
  });

  return res.status(response.status).send(response);
};

const updateImageStatus = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Update Image Status',
    serviceCall: imageUpdateStatus,
    serviceData: req,
    successMsg: 'Image Status Updated Successfully',
  });

  return res.status(response.status).send(response);
};

const updateBulkFrequency = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Update Bulk Remark Frequency',
    serviceCall: updateBulkRemarkFrequency,
    serviceData: req,
    successMsg: 'Remark Frequency Updated Successfully',
  });

  return res.status(response.status).send(response);
};

const updateRemark = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Update Remark From ES',
    serviceCall: updateRemarkFromEs,
    serviceData: req,
    successMsg: 'Remark Updated Successfully',
  });

  return res.status(response.status).send(response);
};


const deleteRemarkES = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Delete Remark From ES',
    serviceCall: deleteRemarkFromES,
    serviceData: req,
    successMsg: 'Remark Deleted Successfully',
  });

  return res.status(response.status).send(response);
};

const assignDefaultOrder = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Assign Default Order',
    serviceCall: assignDefaultOrderNumber,
    serviceData: req,
    successMsg: 'Remark Updated Successfully',
  });

  return res.status(response.status).send(response);
};

const assignOfficeStatus = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Assign Office Status',
    serviceCall: assignDefaultOfficeStatus,
    serviceData: req,
    successMsg: 'Office Status Updated Successfully',
  });

  return res.status(response.status).send(response);
};

// const fetchRemarkOffices = async (req, res) => {
//   /* Call the controller builder */
//   const response = await controllerBuilder({
//     controllerName: 'Fetch Remark Office',
//     serviceCall: addedByOfficeForSubcategoryRemark,
//     serviceData: req,
//     successMsg: 'Office Data Fetched Successfully',
//   });

//   return res.status(response.status).send(response);
// };

const addBulkCustom = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Add Bulk Custom Remark',
    serviceCall: addBulkCustomRemarks,
    serviceData: req,
    successMsg: 'Custom Remarks Added Successfully',
  });

  return res.status(response.status).send(response);
};

module.exports = {
  list,
  add,
  edit,
  remove,
  listFavourite,
  updateFrequency,
  addCustom,
  hide,
  recover,
  listTemplateGroupRemark,
  updateRemarkType,
  getOfficeList,
  copyToDraft,
  storeImage,
  deleteImage,
  presignedUrlTemplateRemark,
  updateImageStatus,
  updateBulkFrequency,
  updateRemark,
  deleteRemarkES,
  assignDefaultOrder,
  assignOfficeStatus,
  // fetchRemarkOffices,
  addBulkCustom,
};
