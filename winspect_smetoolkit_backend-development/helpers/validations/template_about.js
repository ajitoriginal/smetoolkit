const Joi = require('joi');

const listAboutValidation = {
  querySchema: Joi.object({
    templateSubCategoryId: Joi.string().required(),
  }),
};

const addAboutValidation = {
  bodySchema: Joi.object({
    templateSubCategoryId: Joi.string().required(),
    aboutTitle: Joi.string().required(),
    isMultiSelect: Joi.boolean(),
  }),
};

const editAboutValidation = {
  bodySchema: Joi.object({
    templateAboutId: Joi.string().required(),
    templateSubCategoryId: Joi.string().required(),
    aboutTitle: Joi.string().optional(),
    isMultiSelect: Joi.boolean(),
    hasLocation: Joi.boolean(),
  }),
};

const deleteAboutValidation = {
  bodySchema: Joi.object({
    templateAboutId: Joi.string().required(),
    templateSubCategoryId: Joi.string().required(),
  }),
};

const listAllAboutForTemplateValidation = {
  querySchema: Joi.object({
    templateId: Joi.string().required(),
  }),
};

// const reorderAboutValidation = {
//   bodySchema: Joi.object({
//     newOrderSequence: Joi.number().integer().min(1).required(),
//     templateAboutId: Joi.string().required(),
//     templateSubCategoryId: Joi.string().required(),
//   }),
// };

const reorderAllAboutValidation = {
  bodySchema: Joi.object({
    templateSubCategoryId: Joi.string().required(),
    aboutData: Joi.array()
      .items(
        Joi.object({
          templateAboutId: Joi.string().required(),
          orderNumber: Joi.number().integer().required(),
        })
      )
      .required(),
  }),
};

const copyPubAboutToDraftValidation = {
  bodySchema: Joi.object({
    copyFromPubTemplateId: Joi.string().required(),
    copyFromAboutIds: Joi.array().items(Joi.string()).required(),
    copyToDraftSubCategoryId: Joi.string().required(),
  }),
};

module.exports = {
  listAboutValidation,
  addAboutValidation,
  editAboutValidation,
  deleteAboutValidation,
  listAllAboutForTemplateValidation,
  // reorderAboutValidation,
  reorderAllAboutValidation,
  copyPubAboutToDraftValidation,
};
