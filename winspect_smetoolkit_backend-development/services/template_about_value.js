const { Op } = require('sequelize');
const { models } = require('../database/index');
const messages = require('../helpers/messages');
const sequelize = require('../database/index');
const {
  handleKnownErrors,
  NotFoundError,
  BadRequestError,
} = require('../helpers/error');

const addAboutValue = async (req) => {
  const { templateAboutId, value, templateId } = req.body;
  const { id } = req.smeUser;
  try {
    // check if template
    const template = await models.template.findByPk(templateId);

    if (!template) {
      throw new Error(messages.template.TEMPLATE_NOT_FOUND);
    }

    // if (!template.isDraft) {
    //   throw new Error('Cannot Make changes to published template');
    // }

    // check if templateabout exists
    const aboutExist = await models.template_about.findByPk(templateAboutId);

    if (!aboutExist) {
      throw new Error(messages.templateAbout.TEMPLATE_ABOUT_NOT_FOUND);
    }

    const existingAboutValuess = await models.template_about_value.findAll({
      where: {
        templateAboutId,
      },
    });

    // create about value for a template
    const createdAboutValue = await models.template_about_value.create({
      templateAboutId,
      value,
      orderNumber: existingAboutValuess.length + 1,
      createdBySme: id,
      updatedBySme: id,
    });

    return createdAboutValue;
  } catch (e) {
    throw new Error(e.message);
  }
};

const editAboutValue = async (req) => {
  const { templateAboutValueId, templateAboutId, value, templateId } = req.body;
  const { id } = req.smeUser;
  try {
    // check if template
    const template = await models.template.findByPk(templateId);

    if (!template) {
      throw new Error(messages.template.TEMPLATE_NOT_FOUND);
    }

    const aboutValueExist = await models.template_about_value.findOne({
      where: {
        templateAboutId,
        templateAboutValueId,
      },
    });

    // if (!template.isDraft && aboutValueExist) {
    //   throw new Error('Cannot Make changes to published template');
    // }

    if (!aboutValueExist) {
      throw new Error(
        messages.templateAboutValue.TEMPLATE_ABOUT_VALUE_NOT_FOUND
      );
    }

    const updatedAboutValue = await aboutValueExist.update({
      value: value || aboutValueExist.value,
      updatedBySme: id,
    });

    return updatedAboutValue;
  } catch (e) {
    throw new Error(e.message);
  }
};

const deleteAboutValue = async (req) => {
  const { templateAboutValueId, templateAboutId, templateId } = req.body;
  try {
    const template = await models.template.findByPk(templateId);

    if (!template) {
      throw new Error(messages.template.TEMPLATE_NOT_FOUND);
    }

    // if (!template.isDraft) {
    //   throw new Error('Cannot Make changes to published template');
    // }

    const aboutValueExist = await models.template_about_value.findOne({
      where: {
        templateAboutValueId,
        templateAboutId,
      },
    });

    if (!aboutValueExist) {
      throw new Error(
        messages.templateAboutValue.TEMPLATE_ABOUT_VALUE_NOT_FOUND
      );
    }

    // const transaction = await sequelize.transaction();

    const deletedAboutValue= await sequelize.transaction(async (t) => {
      await models.report_about_value.update(
        { templateAboutValueId: null },
        { where: { templateAboutValueId:aboutValueExist.templateAboutValueId }, transaction: t }
      );
      return await aboutValueExist.destroy(t);      
    });

    return deletedAboutValue;
  } catch (e) {
    throw new Error(e.message);
  }
};

const reorderAllAboutValues = async (req) => {
  const { aboutValueData, templateAboutId } = req.body;
  const { id } = req.smeUser;
  try {
    // check if template
    const templateAbout = await models.template_about.findOne({
      where: {
        templateAboutId,
      },
      include: {
        model: models.template_subcategory,
        required: true,
        include: {
          model: models.template_category,
          required: true,
          include: {
            model: models.template,
            required: true,
          },
        },
      },
    });

    if (!templateAbout) {
      throw new NotFoundError(messages.templateAbout.TEMPLATE_ABOUT_NOT_FOUND);
    }

    // if (
    //   !templateAbout.template_subcategory.template_category.template.isDraft
    // ) {
    //   throw new BadRequestError('Cannot Make changes to published template');
    // }

    const templateAboutValueIds = aboutValueData.map(
      (element) => element.templateAboutValueId
    );

    const templateAboutValues = await models.template_about_value.findAll({
      where: {
        templateAboutValueId: templateAboutValueIds,
        templateAboutId,
      },
    });

    if (
      templateAboutValues.length !== templateAboutValueIds.length
			|| templateAboutValues.length === 0
    ) {
      throw new NotFoundError(
        messages.templateAboutValue.TEMPLATE_ABOUT_VALUE_NOT_FOUND
      );
    }

    // Loop through the input array
    for (const { orderNumber, templateAboutValueId } of aboutValueData) {
      // Find the item to be reordered
      const item = await models.template_about_value.findByPk(
        templateAboutValueId
      );

      // Update the order number of the item
      item.orderNumber = orderNumber;
      item.updatedBySme = id;
      await item.save();
    }
    return;
  } catch (e) {
    handleKnownErrors(e);
  }
};

module.exports = {
  addAboutValue,
  editAboutValue,
  deleteAboutValue,
  reorderAllAboutValues,
};
