const { controllerBuilder } = require('../helpers/utils');
const messages = require('../helpers/messages');

const {
  listSubCategories,
  getSubcategoryDetail,
  addSubCategory,
  editSubCategory,
  deleteSubCategory,
  reorderSubCategory,
  copyPubSubCategoryToDraft,
  reorderAllSubCategory,
} = require('../services/template_subcategory');

const list = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'List Sub Categories',
    serviceCall: listSubCategories,
    serviceData: req,
    successMsg: 'SubCategories Retrieved Successfully',
  });

  return res.status(response.status).send(response);
};

const subcategoryDetail = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Subcategory Detail',
    serviceCall: getSubcategoryDetail,
    serviceData: req,
    successMsg: 'Subcategory Details Retrieved Successfully',
  });

  return res.status(response.status).send(response);
};

const add = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Add Sub Categories',
    serviceCall: addSubCategory,
    serviceData: req,
    successMsg: 'SubCategory Added Successfully',
  });

  return res.status(response.status).send(response);
};

const edit = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Edit SubCategory',
    serviceCall: editSubCategory,
    serviceData: req,
    successMsg: 'SubCategory Updated Successfully',
  });

  return res.status(response.status).send(response);
};

const remove = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Remove SubCategory',
    serviceCall: deleteSubCategory,
    serviceData: req,
    successMsg: 'SubCategory Removed Successfully',
  });

  return res.status(response.status).send(response);
};

const reorder = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Reorder SubCategory',
    serviceCall: reorderSubCategory,
    serviceData: req,
    successMsg: 'SubCategory Reordered Successfully',
  });

  return res.status(response.status).send(response);
};

const copyToDraft = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Copy SubCategory to draft',
    serviceCall: copyPubSubCategoryToDraft,
    serviceData: req,
    successMsg: 'SubCategory Copied Successfully',
  });

  return res.status(response.status).send(response);
};

const reorderAll = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Reorder All SubCategory',
    serviceCall: reorderAllSubCategory,
    serviceData: req,
    successMsg: 'SubCategory Reordered Successfully',
  });

  return res.status(response.status).send(response);
};

module.exports = {
  list,
  subcategoryDetail,
  add,
  edit,
  remove,
  reorder,
  copyToDraft,
  reorderAll,
};
