const sequelize = require('../database/index');
const { models } = require('../database/index');
const { handleKnownErrors, NotFoundError, BadRequestError } = require('../helpers/error');
const messages = require('../helpers/messages');
const { getUploadURLForTemplateCategoryIcon } = require('../helpers/s3');

const listCategories = async (req) => {
  const { templateId } = req.query;
  try {
    const templateExists = await models.template.findByPk(templateId);

    if (!templateExists) {
      throw new Error(messages.template.TEMPLATE_NOT_FOUND);
    }

    const categories = await models.template_category.findAll({
      where: {
        templateId,
      },
      order: [['orderNumber', 'ASC']],
    });

    return categories;
  } catch (e) {
    throw new Error(e.message);
  }
};

const getPresignedUrlToUploadIconForCategory = async (req) => {
  const { templateId, type } = req.query;
  try {
    // check if template
    const template = await models.template.findOne({
      where: {
        templateId,
      },
      include: {
        model: models.master_template,
      },
    });

    if (!template) {
      throw new Error(messages.template.TEMPLATE_NOT_FOUND);
    }

    if (!template.isDraft) {
      throw new Error('Cannot Make changes to published template');
    }

    const uploadURL = await getUploadURLForTemplateCategoryIcon(template.master_template.name, template.version, type);

    return uploadURL;
  } catch (e) {
    throw new Error(e.message);
  }
};

const addCategory = async (req) => {
  const { templateId, name, iconImageKey } = req.body;
  const { id } = req.smeUser;
  try {
    // check if template
    const template = await models.template.findByPk(templateId);

    if (!template) {
      throw new Error(messages.template.TEMPLATE_NOT_FOUND);
    }

    if (!template.isDraft) {
      throw new Error('Cannot Make changes to published template');
    }

    // check if categories already exist
    const categories = await models.template_category.findAll({
      where: {
        templateId,
      },
      order: [['orderNumber', 'DESC']],
    });

    let orderNumber = 1;

    if (categories.length !== 0) {
      orderNumber = categories[0].orderNumber + 1;
    }

    // create category for a template
    const createdCategory = await models.template_category.create({
      templateId,
      name,
      iconImageKey,
      orderNumber,
      iconImageLocation: iconImageKey ? process.env.S3_Location : null,
      createdBySme: id,
      updatedBySme: id,
    });

    return createdCategory;
  } catch (e) {
    throw new Error(e.message);
  }
};

const editCategory = async (req) => {
  const { templateId, templateCategoryId, name, iconImageKey, print } = req.body;
  const { id } = req.smeUser;
  try {
    // check if template
    const template = await models.template.findByPk(templateId);

    if (!template) {
      throw new Error(messages.template.TEMPLATE_NOT_FOUND);
    }

    if (!template.isDraft) {
      throw new Error('Cannot Make changes to published template');
    }

    // create category for a template
    const categoryExist = await models.template_category.findOne({
      where: {
        templateId,
        templateCategoryId,
      },
    });

    if (!categoryExist) {
      throw new Error(messages.templateCategory.TEMPLATE_CATEGORY_NOT_FOUND);
    }

    const updatedCategory = await categoryExist.update({
      name: name || categoryExist.name,
      iconImageKey: iconImageKey || categoryExist.iconImageKey,
      iconImageLocation: iconImageKey ? process.env.S3_Location : categoryExist.iconImageLocation,
      print: print === false ? false : print === true ? true : categoryExist.print,
      updatedBySme: id,
    });

    return updatedCategory;
  } catch (e) {
    throw new Error(e.message);
  }
};

const deleteCategory = async (req) => {
  const { templateId, templateCategoryId } = req.body;
  try {
    // check if template
    const template = await models.template.findByPk(templateId);

    if (!template) {
      throw new NotFoundError(messages.template.TEMPLATE_NOT_FOUND);
    }

    if (!template.isDraft) {
      throw new BadRequestError('Cannot Make changes to published template');
    }

    // create category for a template
    const categoryExist = await models.template_category.findOne({
      where: {
        templateId,
        templateCategoryId,
      },
    });

    if (!categoryExist) {
      throw new NotFoundError(messages.templateCategory.TEMPLATE_CATEGORY_NOT_FOUND);
    }

    // transaction
    // const transaction = await sequelize.transaction();

    let deletedCategory;

    await sequelize.transaction(async (t) => {
      // Delete the category
      deletedCategory = await categoryExist.destroy({ transaction: t });

      // Get all categories in the template
      const allCategories = await models.template_category.findAll({
        where: {
          templateId,
        },
        order: [['orderNumber', 'ASC']],
        transaction: t,
      });

      const deletedCategoryOrderNumber = deletedCategory.orderNumber;

      // Shift the order numbers of the remaining categories
      for (const category of allCategories) {
        if (category.templateCategoryId !== templateCategoryId && category.orderNumber > deletedCategoryOrderNumber) {
          await category.update(
            {
              orderNumber: category.orderNumber - 1,
            },
            { transaction: t }
          );
        }
      }
    });

    return deletedCategory;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const reorderCategory = async (req) => {
  const { newOrderSequence, templateCategoryId, templateId } = req.body;
  const { id } = req.smeUser;
  try {
    // check if template
    const template = await models.template.findByPk(templateId);

    if (!template) {
      throw new Error(messages.template.TEMPLATE_NOT_FOUND);
    }

    if (!template.isDraft) {
      throw new Error('Cannot Make changes to published template');
    }

    const allCategories = await models.template_category.findAll({ where: { templateId } });

    // match and find category to update
    const categoryToUpdate = allCategories.find((category) => category.templateCategoryId === templateCategoryId);
    if (!categoryToUpdate) {
      throw new Error('Category not found');
    }

    if (newOrderSequence < 1 || newOrderSequence > allCategories.length) {
      throw new Error('Invalid new sequence');
    }
    if (newOrderSequence === categoryToUpdate.orderNumber) {
      return; // Item is already in the correct position, so no need to update anything
    }
    // Lower Sequence
    if (newOrderSequence < categoryToUpdate.orderNumber) {
      allCategories.forEach(async (category) => {
        if (
          category.templateCategoryId !== templateCategoryId
          && category.orderNumber >= newOrderSequence
          && category.orderNumber <= categoryToUpdate.orderNumber
        ) {
          await category.update({
            orderNumber: category.orderNumber + 1,
          });
        }
      });
      // Upper Sequence
    } else {
      allCategories.forEach(async (category) => {
        if (
          category.templateCategoryId !== templateCategoryId
          && category.orderNumber <= newOrderSequence
          && category.orderNumber > categoryToUpdate.orderNumber
        ) {
          await category.update({
            orderNumber: category.orderNumber - 1,
          });
        }
      });
    }
    // Update the sequence number of the item to move
    await categoryToUpdate.update({
      orderNumber: newOrderSequence,
      updatedBySme: id,
    });
    return;
  } catch (e) {
    throw new Error(e.message);
  }
};

const copyPubCategoryToDraft = async (req) => {
  const { copyFromPubTemplateId, copyFromCategoryIds, copyToDraftTemplateId } = req.body;
  const { id } = req.smeUser;
  try {
    const pubTemplate = await models.template.findOne({
      where: {
        templateId: copyFromPubTemplateId,
      },
    });

    if (!pubTemplate) {
      throw new NotFoundError(messages.template.TEMPLATE_NOT_FOUND);
    }

    if (pubTemplate.isDraft) {
      throw new BadRequestError('Cannot copy from draft template');
    }

    // check if draft exist
    const draftTemplate = await models.template.findOne({
      where: {
        templateId: copyToDraftTemplateId,
        isDraft: 1,
      },
    });

    if (!draftTemplate) {
      throw new NotFoundError(messages.template.TEMPLATE_NOT_FOUND);
    }

    const copyFromCategory = await models.template_category.findAll({
      where: {
        templateCategoryId: copyFromCategoryIds,
      },
      include: {
        model: models.template_subcategory,
        attributes: [
          'templateSubCategoryId',
          'orderNumber',
          'isGeneral',
          'name',
          'templateCategoryId',
          'print',
          'oldTemplateSubCategoryId',
        ],
        required: false,
        include: [
          {
            model: models.template_subcategory_reminder,
            attributes: ['description', 'templateSubCategoryId', 'oldTemplateReminderId'],
            required: false,
          },
          {
            model: models.template_remark,
            attributes: [
              'templateRemarkId',
              'remark',
              'type',
              'title',
              'isFavourite',
              'totalFrequency',
              'remarkType',
              'hide',
              'oldTemplateRemarkId',
            ],
            required: false,
          },
          {
            model: models.template_about,
            attributes: [
              'templateAboutId',
              'aboutTitle',
              'isMultiSelect',
              'orderNumber',
              'templateSubCategoryId',
              'oldTemplateAboutId',
            ],
            required: false,
            include: [
              {
                model: models.template_about_value,
                attributes: [
                  'templateAboutValueId',
                  'value',
                  'orderNumber',
                  'templateAboutId',
                  'oldTemplateAboutValueId',
                ],
                required: false,
                include: {
                  model: models.template_about_value_note,
                  attributes: ['templateAboutValueNoteId', 'note', 'templateAboutValueId', 'oldTemplateValueNoteId'],
                  required: false,
                },
              },
            ],
          },
        ],
      },
    });

    // Clone the template categories, subcategories, and related information
    const clonedCategories = await sequelize.transaction(async (t) => {
      const clonedCategories = await Promise.all(
        copyFromCategory.map(async (category) => {
          const clonedCategory = await models.template_category.create(
            {
              orderNumber: category.orderNumber,
              iconImageLocation: category.iconImageLocation,
              iconImageKey: category.iconImageKey,
              name: category.name,
              templateId: copyToDraftTemplateId,
              print: category.print,
              oldTemplateCategoryId: category.templateCategoryId,
              createdBySme: id,
              updatedBySme: id,
            },
            { transaction: t }
          );

          const clonedSubCategories = await Promise.all(
            category.template_subcategories.map(async (subCategory) => {
              const clonedSubCategory = await models.template_subcategory.create(
                {
                  orderNumber: subCategory.orderNumber,
                  name: subCategory.name,
                  isGeneral: subCategory.isGeneral,
                  templateCategoryId: clonedCategory.templateCategoryId,
                  print: subCategory.print,
                  oldTemplateSubCategoryId: subCategory.templateSubCategoryId,
                  createdBySme: id,
                  updatedBySme: id,
                },
                { transaction: t }
              );

              // Clone the template remarks
              await Promise.all(
                subCategory.template_subcategory_reminders.map(async (reminder) => {
                  await models.template_subcategory_reminder.create(
                    {
                      description: reminder.description,
                      templateSubCategoryId: clonedSubCategory.templateSubCategoryId,
                      oldTemplateReminderId: reminder.templateSubCategoryReminderId,
                      createdBySme: id,
                      updatedBySme: id,
                    },
                    { transaction: t }
                  );
                })
              );

              // Clone the template remarks
              await Promise.all(
                subCategory.template_remarks.map(async (remark) => {
                  const clonedRemark = await models.template_remark.create(
                    {
                      remark: remark.remark,
                      type: remark.type,
                      title: remark.title,
                      isFavourite: remark.isFavourite,
                      templateSubCategoryId: clonedSubCategory.templateSubCategoryId,
                      oldTemplateRemarkId: remark.templateRemarkId,
                      totalFrequency: remark.totalFrequency,
                      remarkType: remark.remarkType,
                      hide: remark.hide,
                      customRemarkAddedByUser: remark.customRemarkAddedByUser,
                      createdBySme: id,
                      updatedBySme: id,
                    },
                    { transaction: t }
                  );
                })
              );

              // Clone the template abouts and related values and notes
              await Promise.all(
                subCategory.template_abouts.map(async (about) => {
                  const clonedAbout = await models.template_about.create(
                    {
                      aboutTitle: about.aboutTitle,
                      isMultiSelect: about.isMultiSelect,
                      orderNumber: about.orderNumber,
                      templateSubCategoryId: clonedSubCategory.templateSubCategoryId,
                      oldTemplateAboutId: about.templateAboutId,
                      createdBySme: id,
                      updatedBySme: id,
                    },
                    { transaction: t }
                  );

                  // Clone the template about values and notes
                  await Promise.all(
                    about.template_about_values.map(async (aboutValue) => {
                      const clonedAboutValue = await models.template_about_value.create(
                        {
                          value: aboutValue.value,
                          orderNumber: aboutValue.orderNumber,
                          templateAboutId: clonedAbout.templateAboutId,
                          oldTemplateAboutValueId: aboutValue.templateAboutValueId,
                          createdBySme: id,
                          updatedBySme: id,
                        },
                        { transaction: t }
                      );

                      await Promise.all(
                        aboutValue.template_about_value_notes.map(async (note) => {
                          await models.template_about_value_note.create(
                            {
                              note: note.note,
                              templateAboutValueId: clonedAboutValue.templateAboutValueId,
                              oldTemplateValueNoteId: note.templateAboutValueNoteId,
                              createdBySme: id,
                              updatedBySme: id,
                            },
                            { transaction: t }
                          );
                        })
                      );
                    })
                  );

                  return clonedAbout;
                })
              );

              return clonedSubCategory;
            })
          );

          return clonedCategory;
        })
      );
      return clonedCategories;
    });

    return clonedCategories;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const reorderAllCategory = async (req) => {
  const { categoryData, templateId } = req.body;
  const { id } = req.smeUser;
  try {
    // check if template
    const template = await models.template.findOne({
      where: {
        templateId,
      },
    });

    if (!template) {
      throw new NotFoundError(messages.template.TEMPLATE_NOT_FOUND);
    }

    if (!template.isDraft) {
      throw new BadRequestError('Cannot Make changes to published template');
    }

    const templateCategoryIds = categoryData.map((element) => element.templateCategoryId);

    const templateCategories = await models.template_category.findAll({
      where: {
        templateCategoryId: templateCategoryIds,
        templateId,
      },
    });

    if (templateCategories.length !== templateCategoryIds.length || templateCategories.length === 0) {
      throw new NotFoundError(messages.templateCategory.TEMPLATE_CATEGORY_NOT_FOUND);
    }

    // Loop through the input array
    for (const { orderNumber, templateCategoryId } of categoryData) {
      // Find the item to be reordered
      const item = await models.template_category.findByPk(templateCategoryId);

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
  addCategory,
  listCategories,
  editCategory,
  deleteCategory,
  getPresignedUrlToUploadIconForCategory,
  reorderCategory,
  copyPubCategoryToDraft,
  reorderAllCategory,
};
