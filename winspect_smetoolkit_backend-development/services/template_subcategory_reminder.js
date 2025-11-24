const { models } = require('../database/index');
const { handleKnownErrors, BadRequestError, NotFoundError } = require('../helpers/error');
const messages = require('../helpers/messages');

const addReminder = async (req) => {
  const { description, templateSubCategoryId } = req.body;
  const { id } = req.smeUser;
  try {
    // check if template
    const templateSubCategory = await models.template_subcategory.findOne({
      where: {
        templateSubCategoryId,
      },
      include: {
        model: models.template_category,
        include: {
          model: models.template,
        },
      },
    });

    if (!templateSubCategory) {
      throw new NotFoundError(messages.templateSubCategory.TEMPLATE_SUB_CATEGORY_NOT_FOUND);
    }

    const draftTemplateSubCategories = await models.template_subcategory.findAll({
      where: {
        oldTemplateSubCategoryId: templateSubCategoryId,
      },
      include: {
        model: models.template_category,
        include: {
          model: models.template,
          where : {
            isDraft: 1
          },
          required: true
        },
      },
    })


    // if (!templateSubCategory.template_category.template.isDraft) {
    //   throw new BadRequestError('Cannot Make changes to published template');
    // }

    // create category for a template
    const createdReminder = await models.template_subcategory_reminder.create({
      templateSubCategoryId,
      description,
      createdBySme: id,
      updatedBySme: id,
    });

    for( const draftTemplateSubCategory of draftTemplateSubCategories) {
      await models.template_subcategory_reminder.create({
        templateSubCategoryId: draftTemplateSubCategory.templateSubCategoryId,
        oldTemplateReminderId: createdReminder.templateSubCategoryReminderId,
        description,
        createdBySme: id,
        updatedBySme: id,
      });
    }

    return createdReminder;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const listReminders = async (req) => {
  const { templateSubCategoryId } = req.query;
  try {
    const templateSubCategoryReminders = await models.template_subcategory_reminder.findAll({
      where: {
        templateSubCategoryId,
      },
      order: [['description', 'ASC']],
    });

    return templateSubCategoryReminders;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const editReminder = async (req) => {
  const { templateSubCategoryReminderId, templateSubCategoryId, description } = req.body;
  const { id } = req.smeUser;
  try {
    // check if template
    const templateSubCategory = await models.template_subcategory.findOne({
      where: {
        templateSubCategoryId,
      },
      include: {
        model: models.template_category,
        include: {
          model: models.template,
        },
      },
    });

    if (!templateSubCategory) {
      throw new NotFoundError(messages.templateSubCategory.TEMPLATE_SUB_CATEGORY_NOT_FOUND);
    }

    // if (!templateSubCategory.template_category.template.isDraft) {
    //   throw new BadRequestError('Cannot Make changes to published template');
    // }

    const templateSubCategoryReminder = await models.template_subcategory_reminder.findOne({
      where: {
        templateSubCategoryReminderId,
        templateSubCategoryId,
      },
    });

    if (!templateSubCategoryReminder) {
      throw new NotFoundError(messages.templateSubCategoryReminder.TEMPLATE_SUBCATEGORY_REMINDER_NOT_FOUND);
    }

    await templateSubCategoryReminder.update({
      description: description || templateSubCategoryReminder.description,
      updatedBySme: id,
    });

    return templateSubCategoryReminder;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const removeReminder = async (req) => {
  const { templateSubCategoryReminderId, templateSubCategoryId } = req.body;
  try {
    // check if template
    const templateSubCategory = await models.template_subcategory.findOne({
      where: {
        templateSubCategoryId,
      },
      include: {
        model: models.template_category,
        include: {
          model: models.template,
        },
      },
    });

    if (!templateSubCategory) {
      throw new NotFoundError(messages.templateSubCategory.TEMPLATE_SUB_CATEGORY_NOT_FOUND);
    }

    if (!templateSubCategory.template_category.template.isDraft) {
      throw new BadRequestError('Cannot Make changes to published template');
    }

    const templateSubCategoryReminder = await models.template_subcategory_reminder.findOne({
      where: {
        templateSubCategoryReminderId,
        templateSubCategoryId,
      },
    });

    if (!templateSubCategoryReminder) {
      throw new NotFoundError(messages.templateSubCategoryReminder.TEMPLATE_SUBCATEGORY_REMINDER_NOT_FOUND);
    }

    await templateSubCategoryReminder.destroy();

    return templateSubCategoryReminder;
  } catch (e) {
    handleKnownErrors(e);
  }
};

module.exports = {
  addReminder,
  listReminders,
  editReminder,
  removeReminder,
};
