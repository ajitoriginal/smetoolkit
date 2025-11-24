const Joi = require('joi');

const listLocationValidation = {
  querySchema: Joi.object({
    templateId: Joi.string().required(),
  }),
};

const addLocationValidation = {
  bodySchema: Joi.object({
    templateId: Joi.string().required(),
    location: Joi.string().required(),
  }),
};

const editLocationValidation = {
  bodySchema: Joi.object({
    templateLocationId: Joi.string().required(),
    location: Joi.string(),
  }),
};

const deleteLocationValidation = {
  bodySchema: Joi.object({
    templateLocationId: Joi.string().required(),
  }),
};

module.exports = {
  listLocationValidation,
  addLocationValidation,
  editLocationValidation,
  deleteLocationValidation,
};
