const Joi = require('joi');

const addEditAboutValueNoteValidation = {
  bodySchema: Joi.object({
    templateAboutValueId: Joi.string().required(),
    notes: Joi.array()
      .items(
        Joi.object({
          note: Joi.string().required(),
          templateAboutValueNoteId: Joi.string().optional(),
        })
      )
      .required(),
    templateId: Joi.string().required(),
  }),
};

const deleteAboutValueValidation = {
  bodySchema: Joi.object({
    templateAboutValueId: Joi.string().required(),
    templateAboutValueNoteId: Joi.string().required(),
    templateId: Joi.string().required(),
  }),
};

module.exports = {
  addEditAboutValueNoteValidation,
  deleteAboutValueValidation,
};
