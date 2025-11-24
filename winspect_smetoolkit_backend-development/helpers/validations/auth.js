const Joi = require('joi');

const manualLoginValidation = {
  bodySchema: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

const changePasswordValidation = {
  bodySchema: Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
  }),
};

const registerValidation = {
  bodySchema: Joi.object({
    first: Joi.string().required(),
    last: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

module.exports = {
  manualLoginValidation,
  changePasswordValidation,
  registerValidation,
};
