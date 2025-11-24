const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const validator = require('email-validator');
const passwordValidator = require('password-validator');
const randomWords = require('random-words');
const circularJson = require('circular-json');
const { defaultServerResponse } = require('./messages');
const { errorLog } = require('./loggers');
const { handleKnownErrors } = require('./error');
const { models } = require('../database/index');
const { Op } = require('sequelize');

// Controller builder to call the services
const controllerBuilder = async ({ controllerName, serviceCall, serviceData, successMsg }) => {
  const response = { ...defaultServerResponse };
  try {
    const responseFromService = await serviceCall(serviceData);
    response.status = 200;
    response.message = successMsg;
    response.body = responseFromService;
  } catch (error) {
    errorLog(
      'ERROR:',
      `Something went wrong: Controller: ${controllerName}\n${error.message}\n\n Request: ${circularJson.stringify(
        serviceData
      )}`
    );
    response.message = error.message;
    response.status = error.code ? error.code : response.status;
  }

  return response;
};

// Pagination function to set offset and limit
const paginate = (page, pageSize) => {
  const offset = page * pageSize;
  const limit = parseInt(pageSize);

  return {
    offset,
    limit,
  };
};

const createAccessToken = (data) =>
  jwt.sign(data, process.env.JWT_SECRET_ACCESS_TOKEN, {
    // algorithm: "HS384",
    expiresIn: process.env.JWT_EXPIRES_ACCESS_TOKEN,
  });

const createApiToken = (data) => createAccessToken(data);

const createRefreshToken = (data) =>
  jwt.sign(data, process.env.JWT_SECRET_REFRESH_TOKEN, {
    // algorithm: "HS384",
    expiresIn: process.env.JWT_EXPIRES_REFRESH_TOKEN,
  });

const generatePassword = () => {
  const result = `${randomWords()}@${Math.floor(Math.random() * 100) + 1}`;
  return result.charAt(0).toUpperCase() + result.slice(1);
};

const emailValidation = (email) => validator.validate(email);

const validatePassword = (password) => {
  const schema = new passwordValidator();

  schema
    .is()
    .min(8, 'Minimum 8 chars are required')
    .is()
    .max(100, 'Maximum 100 chars can be used')
    .has()
    .uppercase(1, 'Must have atleast 1 uppercase char')
    .has()
    .lowercase(1, 'Must have atleast 1 lowercase char')
    .has()
    .digits(1, 'Atleast 1 digit is required');

  if (!schema.validate(password)) {
    const array = schema.validate(password, { details: true });
    const { message } = array[0];
    return message;
  }
  return true;
};

const createDefaultDisclosures = async (transaction, templateId) => {
  try {
    const templateDisclosureArray = [
      { title: 'Not A Warranty', orderNumber: 1, templateId },
      { title: 'Inspection Notice', orderNumber: 2, templateId },
      { title: 'Disclaimer', orderNumber: 3, templateId },
    ];
    await models.template_disclosure.bulkCreate(templateDisclosureArray, { transaction });
  } catch (e) {
    handleKnownErrors(e);
  }
};

const splitArray = (array, chunkSize, prefix) => {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    const obj = {};
    obj[`${prefix}_${Math.floor(i / chunkSize) + 1}`] = chunk;
    result.push(obj);
  }
  return result;
};


const getTemplateStructureDetail = async (templateId, t) => {
  try {
    const template = await models.template.findOne({
      where: {
        templateId,
      },
      transaction: t,
    });

    // Fetch template categories
    console.log('Fetching template categories');
    const templateCategories = await models.template_category.findAll({
      where: { templateId: template.templateId },
      transaction: t,
    });

    console.log('Template categories fetched');

    if (template) {

      if(templateCategories && templateCategories.length > 0){
      // Fetch subcategories and related data for each category incrementally
      for (const category of templateCategories) {
        console.log(`Fetching subcategories for category ${category.templateCategoryId}`);
        const subcategories = await models.template_subcategory.findAll({
          where: { templateCategoryId: category.templateCategoryId },
          transaction: t,
        });

        console.log(`Subcategories fetched for category ${category.templateCategoryId}`);

        for (const subcategory of subcategories) {
          console.log(`Fetching details for subcategory ${subcategory.templateSubCategoryId}`);

          const reminders = await models.template_subcategory_reminder.findAll({
            where: { templateSubCategoryId: subcategory.templateSubCategoryId },
            transaction: t,
          });

          const abouts = await models.template_about.findAll({
            where: { templateSubCategoryId: subcategory.templateSubCategoryId },
            include: [
              {
                model: models.template_about_value,
                required: false,
                include: {
                  model: models.template_about_value_note,
                  required: false,
                },
              },
            ],
            transaction: t,
          });

          console.log(`Details fetched for subcategory ${subcategory.templateSubCategoryId}`);

          subcategory.setDataValue('template_subcategory_reminders', reminders);
          subcategory.setDataValue('template_abouts', abouts);
        }

        category.setDataValue('template_subcategories', subcategories);
      }
    }

      const masterTemplate = await models.master_template.findOne({
        where: { masterTemplateId: template.masterTemplateId },
        include: {
          model: models.service,
        },
      });
      const template_definitions = await models.template_definition.findAll({ where: { templateId } });
      const template_disclosures = await models.template_disclosure.findAll({ where: { templateId } });
      const template_locations = await models.template_location.findAll({ where: { templateId } });
      const user = await models.sme_user.findOne({
        where: { smeUserId: template.createdBySme },
        attributes: ['smeUserId', 'first', 'last', 'email'],
      });

      template.setDataValue('master_template', masterTemplate);
      template.setDataValue('template_definitions', template_definitions);
      template.setDataValue('template_disclosures', template_disclosures);
      template.setDataValue('template_locations', template_locations);
      template.setDataValue('user', user);
    }
    template.setDataValue('template_categories', templateCategories);

    return template;
  } catch (e) {
    handleKnownErrors(e);
  }
};


const getRemarkStructureDetail = async (templateId, t) => {
  try {

    const subcategories = await models.template_subcategory.findAll({
      include:{
        model: models.template_category,
        attributes: [],
        where:{
          templateId,
        }
      },
      transaction: t,
    })

    const officesTemplates = await models.office_template.findAll({
      where: { templateId },
      attributes: ["officeId"],
      transaction: t,
    });

    const officeRemarkDataArray = [];

    for (const officeTemplate of officesTemplates) {
      const officeId = officeTemplate.officeId;
      const officeRemarkData = { officeId, remarks: [] };

      for (const subcategory of subcategories) {
        console.log(`Fetching details for subcategory ${subcategory.templateSubCategoryId}, office ${officeId}`);

        const remarks = await models.template_remark.findAll({
          where: {
            templateSubCategoryId: subcategory.templateSubCategoryId,
            [Op.or]: [
              { remarkType: "Template" },
              {
                "$template_remark_frequencies.my_remark$": true,
                "$template_remark_frequencies.officeId$": officeId,
              },
            ],
          },
          include: [
            {
              model: models.template_remark_frequency,
              required: false,
              where: { officeId },
              include: {
                model: models.template_remark_image,
                required: false,
                include: {
                  model: models.template_image,
                  required: false,
                },
              },
            },
          ],
          transaction: t,
        });

        console.log(`Details fetched for subcategory ${subcategory.templateSubCategoryId}, office ${officeId}`);

        officeRemarkData.remarks.push(...remarks);
      }

      // Store each office's remark data in an array
      officeRemarkDataArray.push(officeRemarkData);
    }

    return officeRemarkDataArray;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const getRemarkStructureDetailForAnOffice = async (templateId, officeId, t) => {
  try {

    console.log('Checking for template', templateId);

    const subcategories = await models.template_subcategory.findAll({
      include: {
        model: models.template_category,
        attributes: [],
        where: { templateId },
      },
      transaction: t,
    });

    if (subcategories.length === 0) {
      console.log(`No subcategories found for templateId: ${templateId}`);
      return null;
    }

    const officeRemarkData = { officeId, remarks: [] };

    for (const subcategory of subcategories) {
      console.log(`Fetching details for subcategory ${subcategory.templateSubCategoryId}, office ${officeId}`);

      const remarks = await models.template_remark.findAll({
        where: {
          templateSubCategoryId: subcategory.templateSubCategoryId,
          [Op.or]: [
            { remarkType: "Template" },
            {
              "$template_remark_frequencies.my_remark$": true,
              "$template_remark_frequencies.officeId$": officeId,
            },
          ],
        },
        include: [
          {
            model: models.template_remark_frequency,
            required: false,
            where: { officeId },
            include: {
              model: models.template_remark_image,
              required: false,
              include: {
                model: models.template_image,
                required: false,
              },
            },
          },
        ],
        transaction: t,
      });

      console.log(`Details fetched for subcategory ${subcategory.templateSubCategoryId}, office ${officeId}`);

      officeRemarkData.remarks.push(...remarks);
    }

    return officeRemarkData;
  } catch (e) {
    handleKnownErrors(e);
    return null;
  }
};


module.exports = {
  controllerBuilder,
  paginate,
  generatePassword,
  createApiToken,
  emailValidation,
  validatePassword,
  createRefreshToken,
  createDefaultDisclosures,
  splitArray,
  getTemplateStructureDetail,
  getRemarkStructureDetail,
  getRemarkStructureDetailForAnOffice,
};
