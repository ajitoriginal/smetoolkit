const Joi = require('joi');

const addOrRemoveArchitecturalTypeValidation = {
  bodySchema: Joi.object({
    templateAboutIds: Joi.array().items(Joi.string()).required(),
    templateId: Joi.string().required(),
  }),
};

module.exports = { addOrRemoveArchitecturalTypeValidation };
