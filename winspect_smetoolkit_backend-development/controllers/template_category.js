const { controllerBuilder } = require('../helpers/utils');
const messages = require('../helpers/messages');

const {
  addCategory,
  listCategories,
  editCategory,
  deleteCategory,
  getPresignedUrlToUploadIconForCategory,
  reorderCategory,
  copyPubCategoryToDraft,
  reorderAllCategory,
} = require('../services/template_category');

const add = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Add Category',
    serviceCall: addCategory,
    serviceData: req,
    successMsg: 'Category Added Successfully',
  });

  return res.status(response.status).send(response);
};

const list = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'List Categories',
    serviceCall: listCategories,
    serviceData: req,
    successMsg: 'Categories Retrieved Successfully',
  });

  return res.status(response.status).send(response);
};

const edit = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Edit Category',
    serviceCall: editCategory,
    serviceData: req,
    successMsg: 'Category Updated Successfully',
  });

  return res.status(response.status).send(response);
};

const remove = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Remove Category',
    serviceCall: deleteCategory,
    serviceData: req,
    successMsg: 'Category Removed Successfully',
  });

  return res.status(response.status).send(response);
};

const presignedUrl = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Get Presigned Url',
    serviceCall: getPresignedUrlToUploadIconForCategory,
    serviceData: req,
    successMsg: 'Presigned Url Fetched Successfully',
  });

  return res.status(response.status).send(response);
};

const reorder = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Reorder Category',
    serviceCall: reorderCategory,
    serviceData: req,
    successMsg: 'Category Reordered Successfully',
  });

  return res.status(response.status).send(response);
};

const copyToDraft = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Copy Category to draft',
    serviceCall: copyPubCategoryToDraft,
    serviceData: req,
    successMsg: 'Category Copied Successfully',
  });

  return res.status(response.status).send(response);
};

const reorderAll = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Reorder All Category',
    serviceCall: reorderAllCategory,
    serviceData: req,
    successMsg: 'Category Reordered Successfully',
  });

  return res.status(response.status).send(response);
};

module.exports = {
  add,
  list,
  edit,
  remove,
  presignedUrl,
  reorder,
  copyToDraft,
  reorderAll,
};
