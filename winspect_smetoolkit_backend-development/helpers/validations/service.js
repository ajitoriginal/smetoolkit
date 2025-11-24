const Joi = require('joi');

const serviceListValidation = {
  querySchema: Joi.object({
    pageIndex: Joi.number().integer().min(0).required(),
    pageSize: Joi.number().integer().min(1).required(),
  }),
};

module.exports = {
  serviceListValidation,
};
