const { Op } = require('sequelize');
const sequelize = require('../database/index');
const { models } = require('../database/index');
const { BadRequestError, handleKnownErrors } = require('../helpers/error');
const messages = require('../helpers/messages');
const { getUploadURLForTemplateCategoryIcon } = require('../helpers/s3');

const listSubCategories = async (req) => {
  const { templateCategoryId } = req.query;
  try {
    const templateCategoryExists = await models.template_category.findByPk(templateCategoryId);

    if (!templateCategoryExists) {
      throw new Error(messages.templateCategory.TEMPLATE_CATEGORY_NOT_FOUND);
    }

    const subCategories = await models.template_subcategory.findAll({
      where: {
        templateCategoryId,
      },
      include: {
        model: models.template_subcategory_reminder,
        attributes: ['templateSubCategoryReminderId', 'description', 'templateSubCategoryId'],
        required: false,
      },
      order: [['orderNumber', 'ASC']],
    });

    return subCategories;
  } catch (e) {
    throw new Error(e.message);
  }
};

const getSubcategoryDetail = async (req) => {
  const { templateSubCategoryId } = req.query;
  try {
    const templatSubCategoryExists = await models.template_subcategory.findByPk(templateSubCategoryId);

    if (!templatSubCategoryExists) {
      throw new Error(messages.templateSubCategory.TEMPLATE_SUB_CATEGORY_NOT_FOUND);
    }

    const abouts = await models.template_about.findAll({
      where: {
        templateSubCategoryId,
      },
      include: {
        model: models.template_about_value,
        required: false,
        include: {
          model: models.template_about_value_note,
          required: false,
        },
      },
      order: [
        ['orderNumber', 'ASC'],
        [models.template_about_value, 'orderNumber', 'ASC'],
      ],
    });

    const remarks = await models.template_remark.findAll({
      where: {
        templateSubCategoryId,
        // remarkType: 'Template',
      },
    });

    const reminderCount = await models.template_subcategory_reminder.count({
      where: {
        templateSubCategoryId,
      },
    });

    const templateRemarkCount = await models.template_remark.count({
      where: {
        remarkType: 'Template',
        templateSubCategoryId,
      },
    });

    const customRemarkCount = await models.template_remark.count({
      where: {
        remarkType: 'Custom',
        templateSubCategoryId,
      },
    });

    return { abouts, remarks, reminderCount, templateRemarkCount, customRemarkCount };
  } catch (e) {
    throw new Error(e.message);
  }
};

const addSubCategory = async (req) => {
  const { templateCategoryId, name, isGeneral } = req.body;
  const { id } = req.smeUser;
  try {
    // check if template
    const templateCategory = await models.template_category.findOne({
      where: {
        templateCategoryId,
      },
      include: {
        model: models.template,
      },
    });

    if (!templateCategory) {
      throw new Error(messages.templateCategory.TEMPLATE_CATEGORY_NOT_FOUND);
    }

    if (!templateCategory.template.isDraft) {
      throw new Error('Cannot Make changes to published template');
    }

    // check if categories already exist
    const subCategories = await models.template_subcategory.findAll({
      where: {
        templateCategoryId,
      },
      order: [['orderNumber', 'DESC']],
    });

    let orderNumber = 1;

    if (subCategories.length !== 0) {
      orderNumber = subCategories[0].orderNumber + 1;
    }

    if (isGeneral) {
      // check if there's subcategory which is already general
      const generalSubcategory = await models.template_subcategory.findOne({
        where: {
          templateCategoryId,
          isGeneral: 1,
        },
      });

      if (generalSubcategory) {
        throw new Error('General Subcategory already exist');
      }
    }

    // create subcategory for a template
    const createdSubCategory = await models.template_subcategory.create({
      templateCategoryId,
      name,
      isGeneral,
      orderNumber,
      createdBySme: id,
      updatedBySme: id,
    });

    return createdSubCategory;
  } catch (e) {
    throw new Error(e.message);
  }
};

const editSubCategory = async (req) => {
  const { templateCategoryId, templateSubCategoryId, name, isGeneral, print } = req.body;
  const { id } = req.smeUser;
  try {
    // check if template
    const templateCategory = await models.template_category.findOne({
      where: {
        templateCategoryId,
      },
      include: {
        model: models.template,
      },
    });

    if (!templateCategory) {
      throw new Error(messages.templateCategory.TEMPLATE_CATEGORY_NOT_FOUND);
    }

    if (!templateCategory.template.isDraft) {
      throw new Error('Cannot Make changes to published template');
    }

    const subCategoryExist = await models.template_subcategory.findOne({
      where: {
        templateCategoryId,
        templateSubCategoryId,
      },
    });

    if (!subCategoryExist) {
      throw new Error(messages.templateSubCategory.TEMPLATE_SUB_CATEGORY_NOT_FOUND);
    }

    if (print === false) {
      if (subCategoryExist.isGeneral) {
        throw new BadRequestError('Cannot print of general subcategory!');
      }
    }

    // if (isGeneral) {
    //   // check if there's subcategory which is already general
    //   const generalSubcategory = await models.template_subcategory.findOne({
    //     where: {
    //       templateCategoryId,
    //       isGeneral: 1,
    //       templateSubCategoryId: {
    //         [Op.ne]: templateSubCategoryId,
    //       },
    //     },
    //   });

    //   if (generalSubcategory) {
    //     throw new Error('General Subcategory already exist');
    //   }
    // }

    const updatedSubCategory = await subCategoryExist.update({
      name: name || subCategoryExist.name,
      isGeneral: isGeneral === false ? false : isGeneral === true ? true : subCategoryExist.isGeneral,
      print: print === false ? false : print === true ? true : subCategoryExist.print,
      updatedBySme: id,
    });

    return updatedSubCategory;
  } catch (e) {
    throw new Error(e.message);
  }
};

const deleteSubCategory = async (req) => {
  const { templateCategoryId, templateSubCategoryId } = req.body;
  try {
    // check if template
    const templateCategory = await models.template_category.findOne({
      where: {
        templateCategoryId,
      },
      include: {
        model: models.template,
      },
    });

    if (!templateCategory) {
      throw new Error(messages.templateCategory.TEMPLATE_CATEGORY_NOT_FOUND);
    }

    if (!templateCategory.template.isDraft) {
      throw new Error('Cannot Make changes to published template');
    }

    const subCategoryExist = await models.template_subcategory.findOne({
      where: {
        templateCategoryId,
        templateSubCategoryId,
      },
    });

    if (!subCategoryExist) {
      throw new Error(messages.templateSubCategory.TEMPLATE_SUB_CATEGORY_NOT_FOUND);
    }

    // transaction
    // cons t transaction = await sequelize.transaction();

    let deletedSubCategory;

    await sequelize.transaction(async (t) => {
      deletedSubCategory = await subCategoryExist.destroy({ transaction: t });

      // Get all subcategories in the template
      const allSubCategories = await models.template_subcategory.findAll({
        where: {
          templateCategoryId,
        },
        order: [['orderNumber', 'ASC']],
        transaction: t,
      });

      // Save the order number of the deleted subcategory
      const deletedSubCategoryOrderNumber = deletedSubCategory.orderNumber;

      // Shift the order numbers of the remaining subcategories
      for (const subCategory of allSubCategories) {
        if (
          subCategory.templateSubCategoryId !== templateSubCategoryId
          && subCategory.orderNumber > deletedSubCategoryOrderNumber
        ) {
          await subCategory.update(
            {
              orderNumber: subCategory.orderNumber - 1,
            },
            { transaction: t }
          );
        }
      }
    });

    return deletedSubCategory;
  } catch (e) {
    throw new Error(e.message);
  }
};

const reorderSubCategory = async (req) => {
  const { newOrderSequence, templateCategoryId, templateSubCategoryId } = req.body;
  const { id } = req.smeUser;
  try {
    // check if template
    const templateCategory = await models.template_category.findOne({
      where: {
        templateCategoryId,
      },
      include: {
        model: models.template,
      },
    });

    if (!templateCategory) {
      throw new Error(messages.templateCategory.TEMPLATE_CATEGORY_NOT_FOUND);
    }

    if (!templateCategory.template.isDraft) {
      throw new Error('Cannot Make changes to published template');
    }

    const allSubCategories = await models.template_subcategory.findAll({ where: { templateCategoryId } });

    // match and find subcategory to update
    const subCategoryToUpdate = allSubCategories.find(
      (subcategory) => subcategory.templateSubCategoryId === templateSubCategoryId
    );
    if (!subCategoryToUpdate) {
      throw new Error('SubCategory not found');
    }

    if (newOrderSequence < 1 || newOrderSequence > allSubCategories.length) {
      throw new Error('Invalid new sequence');
    }
    if (newOrderSequence === subCategoryToUpdate.orderNumber) {
      return; // Item is already in the correct position, so no need to update anything
    }
    // Lower Sequence
    if (newOrderSequence < subCategoryToUpdate.orderNumber) {
      allSubCategories.forEach(async (subcategory) => {
        if (
          subcategory.templateSubCategoryId !== templateSubCategoryId
          && subcategory.orderNumber >= newOrderSequence
          && subcategory.orderNumber <= subCategoryToUpdate.orderNumber
        ) {
          await subcategory.update({
            orderNumber: subcategory.orderNumber + 1,
          });
        }
      });
      // Upper Sequence
    } else {
      allSubCategories.forEach(async (subcategory) => {
        if (
          subcategory.templateSubCategoryId !== templateSubCategoryId
          && subcategory.orderNumber <= newOrderSequence
          && subcategory.orderNumber > subCategoryToUpdate.orderNumber
        ) {
          await subcategory.update({
            orderNumber: subcategory.orderNumber - 1,
          });
        }
      });
    }
    // Update the sequence number of the item to move
    await subCategoryToUpdate.update({
      orderNumber: newOrderSequence,
      updatedBySme: id,
    });
    return;
  } catch (e) {
    throw new Error(e.message);
  }
};

const copyPubSubCategoryToDraft = async (req) => {
  const { copyFromPubTemplateId, copyFromSubCategoryIds, copyToDraftCategoryId } = req.body;
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
    const draftCategory = await models.template_category.findOne({
      where: {
        templateCategoryId: copyToDraftCategoryId,
      },
      include: {
        model: models.template,
        where: {
          isDraft: 1,
        },
      },
    });

    if (!draftCategory) {
      throw new NotFoundError(messages.templateCategory.TEMPLATE_CATEGORY_NOT_FOUND);
    }

    const copyFromSubCategory = await models.template_subcategory.findAll({
      where: {
        templateSubCategoryId: copyFromSubCategoryIds,
      },
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
    });

    // Clone the subcategories, and related information
    const clonedSubCategories = await sequelize.transaction(async (t) => {
      const clonedSubCategories = await Promise.all(
        copyFromSubCategory.map(async (subCategory) => {
          const clonedSubCategory = await models.template_subcategory.create(
            {
              orderNumber: subCategory.orderNumber,
              name: subCategory.name,
              isGeneral: subCategory.isGeneral,
              templateCategoryId: copyToDraftCategoryId,
              print: subCategory.print,
              oldTemplateSubCategoryId: subCategory.templateSubCategoryId,
              createdBySme:id,
              updatedBySme:id,
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
                  createdBySme:id,
                  updatedBySme:id,
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
                  createdBySme:id,
                  updatedBySme:id,
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
                      createdBySme:id,
                      updatedBySme:id,
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
                          createdBySme:id,
                          updatedBySme:id,
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
      return clonedSubCategories;
    });

    return clonedSubCategories;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const reorderAllSubCategory = async (req) => {
  const { subCategoryData, templateCategoryId } = req.body;
  const { id } = req.smeUser;
  try {
    // check if template
    const templateCategory = await models.template_category.findOne({
      where: {
        templateCategoryId,
      },
      include: {
        model: models.template,
        required: true,
      },
    });

    if (!templateCategory) {
      throw new NotFoundError(messages.templateCategory.TEMPLATE_CATEGORY_NOT_FOUND);
    }

    if (!templateCategory.template.isDraft) {
      throw new BadRequestError('Cannot Make changes to published template');
    }

    const templateSubCategoryIds = subCategoryData.map((element) => element.templateSubCategoryId);

    const templateSubCategories = await models.template_subcategory.findAll({
      where: {
        templateSubCategoryId: templateSubCategoryIds,
        templateCategoryId,
      },
    });

    if (templateSubCategories.length !== templateSubCategoryIds.length || templateSubCategories.length === 0) {
      throw new NotFoundError(messages.templateSubCategory.TEMPLATE_SUB_CATEGORY_NOT_FOUND);
    }

    // Loop through the input array
    for (const { orderNumber, templateSubCategoryId } of subCategoryData) {
      // Find the item to be reordered
      const item = await models.template_subcategory.findByPk(templateSubCategoryId);

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
  listSubCategories,
  getSubcategoryDetail,
  addSubCategory,
  editSubCategory,
  deleteSubCategory,
  reorderSubCategory,
  copyPubSubCategoryToDraft,
  reorderAllSubCategory,
};
