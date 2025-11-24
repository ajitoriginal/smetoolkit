const Joi = require('joi');

const listRemindersValidation = {
  querySchema: Joi.object({
    templateSubCategoryId: Joi.string().required(),
  }),
};

const addReminderValidation = {
  bodySchema: Joi.object({
    templateSubCategoryId: Joi.string().required(),
    description: Joi.string().required(),
  }),
};

const editReminderValidation = {
  bodySchema: Joi.object({
    templateSubCategoryReminderId: Joi.string().required(),
    templateSubCategoryId: Joi.string().required(),
    description: Joi.string(),
  }),
};

const deleteReminderValidation = {
  bodySchema: Joi.object({
    templateSubCategoryReminderId: Joi.string().required(),
    templateSubCategoryId: Joi.string().required(),
  }),
};

module.exports = {
  listRemindersValidation,
  addReminderValidation,
  editReminderValidation,
  deleteReminderValidation,
};
