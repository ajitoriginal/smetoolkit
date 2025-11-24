const Joi = require('joi');

const addAboutValueValidation = {
  bodySchema: Joi.object({
    templateAboutId: Joi.string().required(),
    templateId: Joi.string().required(),
    value: Joi.string().required(),
  }),
};

const editAboutValueValidation = {
  bodySchema: Joi.object({
    templateAboutId: Joi.string().required(),
    templateAboutValueId: Joi.string().required(),
    value: Joi.string().optional(),
    templateId: Joi.string().required(),
  }),
};

const deleteAboutValueValidation = {
  bodySchema: Joi.object({
    templateAboutValueId: Joi.string().required(),
    templateAboutId: Joi.string().required(),
    templateId: Joi.string().required(),
  }),
};

const reorderAllAboutValueValidation = {
  bodySchema: Joi.object({
    templateAboutId: Joi.string().required(),
    aboutValueData: Joi.array()
      .items(
        Joi.object({
          templateAboutValueId: Joi.string().required(),
          orderNumber: Joi.number().integer().required(),
        })
      )
      .required(),
  }),
};

module.exports = {
  addAboutValueValidation,
  editAboutValueValidation,
  deleteAboutValueValidation,
  reorderAllAboutValueValidation,
};
