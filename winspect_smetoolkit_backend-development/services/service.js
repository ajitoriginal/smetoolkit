const { Op } = require('sequelize');
const Sequelize = require('sequelize');
const { models } = require('../database/index');
const messages = require('../helpers/messages');
const { paginate } = require('../helpers/utils');
const sequelize = require('../database/index');
const { handleKnownErrors } = require('../helpers/error');

const getServices = async (req) => {
  const { pageIndex, pageSize } = req.query;
  try {
    const services = await models.service.findAndCountAll({
      attributes: ['serviceId', 'serviceName'],
      distinct: true,
      include: {
        model: models.template,
        where: {
          isActive: 1,
          isDraft: 0,
        },
        required: false,
        include: [
          {
            model: models.sme_user,
            as: 'publishedBy', // This alias is used to differentiate between createdBySme and publishedBySme
            attributes: ['smeUserId', 'first', 'last', 'email'],
          },
          {
            model: models.sme_user,
            as: 'createdBy', // Another alias for createdBySme
            attributes: ['smeUserId', 'first', 'last', 'email'],
          },
          {
            model: models.office_template,
            attributes: ['officeTemplateId'],
            required: false,
            include: {
              model: models.office,
              attributes: ['officeId', 'officeRefId', 'name', 'companyKey', 'isActive'],
              required: false,
            },
          },
        ],
      },
      order: [[models.template, 'publishedAt', 'DESC']],
      ...paginate(pageIndex, pageSize),
    });

    return services;
  } catch (e) {
    throw new Error(e.message);
  }
};

const updateTemplateMapping = async (req) => {
  try {
    const allMasterTemplates = await models.master_template.findAll();

    const allServices = await models.service.findAll();

    for (const service of allServices) {
      for (const template of allMasterTemplates) {
        if (template.name.toLowerCase().includes(service.serviceName.toLowerCase())) {
          service.masterTemplateId = template.masterTemplateId;

          // Save the updated service in the database
          await service.save();
        }
      }
    }

    return;
  } catch (e) {
    handleKnownErrors(e);
  }
};

module.exports = {
  getServices,
  updateTemplateMapping,
};
