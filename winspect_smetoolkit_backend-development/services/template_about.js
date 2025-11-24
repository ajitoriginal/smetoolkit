const { Op } = require('sequelize');
const { models } = require('../database/index');
const messages = require('../helpers/messages');
const {
  handleKnownErrors,
  NotFoundError,
  BadRequestError,
} = require('../helpers/error');
const sequelize = require('../database/index');

const listAbout = async (req) => {
  const { templateSubCategoryId } = req.query;
  try {
    const templateSubCategoryExists =			await models.template_subcategory.findByPk(templateSubCategoryId);

    if (!templateSubCategoryExists) {
      throw new Error(
        messages.templateSubCategory.TEMPLATE_SUB_CATEGORY_NOT_FOUND
      );
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

    return abouts;
  } catch (e) {
    throw new Error(e.message);
  }
};

const addAbout = async (req) => {
  const { templateSubCategoryId, aboutTitle, isMultiSelect } = req.body;
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
      throw new Error(
        messages.templateSubCategory.TEMPLATE_SUB_CATEGORY_NOT_FOUND
      );
    }

    const draftTemplateSubCategories = await models.template_subcategory.findAll({
      where: {
        oldTemplateSubCategoryId: templateSubCategoryId,
      },
      attributes: ['templateSubCategoryId'],
      include: {
        attributes: [],
        model: models.template_category,
        include: {
          attributes: [],
          model: models.template,
          where : {
            isDraft: 1
          },
          required: true
        },
      },
    })

    // if (!templateSubCategory.template_category.template.isDraft) {
    //   throw new Error('Cannot Make changes to published template');
    // }

    const existingAbouts = await models.template_about.findAll({
      where: {
        templateSubCategoryId,
      },
    });

    // create about for a template
    const createdAbout = await models.template_about.create({
      templateSubCategoryId,
      aboutTitle,
      isMultiSelect,
      orderNumber: existingAbouts.length + 1,
      createdBySme: id,
      updatedBySme: id,
    });

    let updatedAboutCount = existingAbouts.length + 1;
    for( const draftTemplateSubCategory of draftTemplateSubCategories) {
      updatedAboutCount = updatedAboutCount + 1;
      await models.template_about.create({
        templateSubCategoryId: draftTemplateSubCategory.templateSubCategoryId,
        oldTemplateAboutValueId: createdAbout.templateAboutValueId,
        aboutTitle,
        isMultiSelect,
        orderNumber : updatedAboutCount,
        createdBySme: id,
        updatedBySme: id,
      });
    }

    return createdAbout;
  } catch (e) {
    throw new Error(e.message);
  }
};

const editAbout = async (req) => {
  const {
    templateAboutId,
    templateSubCategoryId,
    aboutTitle,
    isMultiSelect,
    hasLocation,
  } = req.body;
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
      throw new Error(
        messages.templateSubCategory.TEMPLATE_SUB_CATEGORY_NOT_FOUND
      );
    }

    // if (!templateSubCategory.template_category.template.isDraft) {
    // 	throw new Error("Cannot Make changes to published template");
    // }

    const aboutExist = await models.template_about.findOne({
      where: {
        templateAboutId,
        templateSubCategoryId,
      },
    });

    if (!aboutExist) {
      throw new Error(messages.templateAbout.TEMPLATE_ABOUT_NOT_FOUND);
    }

    if (hasLocation) {
      // check if this boolean is false for other abouts for same subcategory
      const locationAboutExist = await models.template_about.findOne({
        where: {
          templateSubCategoryId,
          hasLocation: 1,
          templateAboutId: {
            [Op.ne]: aboutExist.templateAboutId,
          },
        },
      });

      if (locationAboutExist) {
        throw new BadRequestError(
          'One of the About is already tagged to a remark'
        );
      }
    }

    const updatedAbout = await aboutExist.update({
      aboutTitle: aboutTitle || aboutExist.aboutTitle,
      isMultiSelect:
				isMultiSelect === false
				  ? false
				  : isMultiSelect === true
				    ? true
				    : aboutExist.isMultiSelect,
      hasLocation:
				hasLocation === false
				  ? false
				  : hasLocation === true
				    ? true
				    : aboutExist.hasLocation,
      updatedBySme: id,            
    });

    return updatedAbout;
  } catch (e) {
    throw new Error(e.message);
  }
};

const deleteAbout = async (req) => {
  const { templateAboutId, templateSubCategoryId } = req.body;
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
      throw new Error(
        messages.templateSubCategory.TEMPLATE_SUB_CATEGORY_NOT_FOUND
      );
    }


    if (!templateSubCategory.template_category.template.isDraft) {
      throw new Error('Cannot Make changes to published template');
    }

    const aboutExist = await models.template_about.findOne({
      where: {
        templateAboutId,
        templateSubCategoryId,
      },
    });

    if (!aboutExist) {
      throw new Error(messages.templateAbout.TEMPLATE_ABOUT_NOT_FOUND);
    }

    const deletedAbout = await aboutExist.destroy();

    return deletedAbout;
  } catch (e) {
    throw new Error(e.message);
  }
};

const listAllAboutForTemplate = async (req) => {
  const { templateId } = req.query;
  try {
    const template = await models.template.findByPk(templateId);

    if (!template) {
      throw new Error(messages.template.TEMPLATE_NOT_FOUND);
    }

    const allAbouts = await models.template_about.findAll({
      include: [
        {
          model: models.template_subcategory,
          required: true,
          include: {
            model: models.template_category,
            where: {
              templateId,
            },
            required: true,
          },
        },
        {
          model: models.architectural_type,
          required: false,
        },
      ],
    });

    // Add the boolean property 'hasArchitecturalType' for each entry in the original 'allAbouts' array.
    await allAbouts.map((about) => {
      about.dataValues.hasArchitecturalType = about.architectural_type !== null;
    });

    return allAbouts;
  } catch (e) {
    throw new Error(e.message);
  }
};

// const reorderAbout = async (req) => {
//   const { newOrderSequence, templateAboutId, templateSubCategoryId } = req.body;
//   try {
//     // check if template
//     const templateSubCategory = await models.template_subcategory.findOne({
//       where: {
//         templateSubCategoryId,
//       },
//       include: {
//         model: models.template_category,
//         required: true,
//         include: {
//           model: models.template,
//           required: true,
//         },
//       },
//     });

//     if (!templateSubCategory) {
//       throw new NotFoundError(messages.templateSubCategory.TEMPLATE_SUB_CATEGORY_NOT_FOUND);
//     }

//     if (!templateSubCategory.template_category.template.isDraft) {
//       throw new BadRequestError('Cannot Make changes to published template');
//     }

//     const allAbouts = await models.template_about.findAll({ where: { templateSubCategoryId } });

//     // match and find subcategory to update
//     const aboutToUpdate = allAbouts.find((about) => about.templateAboutId === templateAboutId);
//     if (!aboutToUpdate) {
//       throw new NotFoundError('About not found');
//     }

//     if (newOrderSequence < 1 || newOrderSequence > allAbouts.length) {
//       throw new BadRequestError('Invalid new sequence');
//     }
//     if (newOrderSequence === aboutToUpdate.orderNumber) {
//       return; // Item is already in the correct position, so no need to update anything
//     }
//     // Lower Sequence
//     if (newOrderSequence < aboutToUpdate.orderNumber) {
//       allAbouts.forEach(async (about) => {
//         if (
//           about.templateAboutId !== templateAboutId &&
//           about.orderNumber >= newOrderSequence &&
//           about.orderNumber <= aboutToUpdate.orderNumber
//         ) {
//           await about.update({
//             orderNumber: about.orderNumber + 1,
//           });
//         }
//       });
//       // Upper Sequence
//     } else {
//       allAbouts.forEach(async (about) => {
//         if (
//           about.templateAboutId !== templateAboutId &&
//           about.orderNumber <= newOrderSequence &&
//           about.orderNumber > aboutToUpdate.orderNumber
//         ) {
//           await about.update({
//             orderNumber: about.orderNumber - 1,
//           });
//         }
//       });
//     }
//     // Update the sequence number of the item to move
//     await aboutToUpdate.update({
//       orderNumber: newOrderSequence,
//     });
//     return aboutToUpdate;
//   } catch (e) {
//     handleKnownErrors(e);
//   }
// };

const reorderAllAbout = async (req) => {
  const { aboutData, templateSubCategoryId } = req.body;
  const { id } = req.smeUser;
  try {
    // check if template
    const templateSubCategory = await models.template_subcategory.findOne({
      where: {
        templateSubCategoryId,
      },
      include: {
        model: models.template_category,
        required: true,
        include: {
          model: models.template,
          required: true,
        },
      },
    });

    if (!templateSubCategory) {
      throw new NotFoundError(
        messages.templateSubCategory.TEMPLATE_SUB_CATEGORY_NOT_FOUND
      );
    }

    // if (!templateSubCategory.template_category.template.isDraft) {
    //   throw new BadRequestError('Cannot Make changes to published template');
    // }

    const templateAboutIds = aboutData.map(
      (element) => element.templateAboutId
    );

    const templateAbouts = await models.template_about.findAll({
      where: {
        templateAboutId: templateAboutIds,
        templateSubCategoryId,
      },
    });

    if (
      templateAbouts.length !== templateAboutIds.length
			|| templateAbouts.length === 0
    ) {
      throw new NotFoundError(messages.templateAbout.TEMPLATE_ABOUT_NOT_FOUND);
    }

    // Loop through the input array
    for (const { orderNumber, templateAboutId } of aboutData) {
      // Find the item to be reordered
      const item = await models.template_about.findByPk(templateAboutId);

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

const copyPubAboutToDraft = async (req) => {
  const { copyFromPubTemplateId, copyFromAboutIds, copyToDraftSubCategoryId } =		req.body;
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

    // check if draft subcategory exist
    const draftSubCategory = await models.template_subcategory.findOne({
      where: {
        templateSubCategoryId: copyToDraftSubCategoryId,
      },
      include: {
        model: models.template_category,
        attributes: ['templateCategoryId'],
        include: {
          model: models.template,
          attributes: ['templateId'],
          where: {
            isDraft: 1,
          },
        },
      },
    });

    if (!draftSubCategory) {
      throw new NotFoundError(
        messages.templateSubCategory.TEMPLATE_SUB_CATEGORY_NOT_FOUND
      );
    }

    const copyFromAbout = await models.template_about.findAll({
      where: {
        templateAboutId: copyFromAboutIds,
      },
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
            attributes: [
              'templateAboutValueNoteId',
              'note',
              'templateAboutValueId',
              'oldTemplateValueNoteId',
            ],
            required: false,
          },
        },
      ],
    });

    // Clone the subcategories, and related information
    const clonedAbouts = await sequelize.transaction(async (t) => {
      // Clone the template abouts and related values and notes
      const clonedAbouts = await Promise.all(
        copyFromAbout.map(async (about) => {
          const clonedAbout = await models.template_about.create(
            {
              aboutTitle: about.aboutTitle,
              isMultiSelect: about.isMultiSelect,
              orderNumber: about.orderNumber,
              templateSubCategoryId: copyToDraftSubCategoryId,
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
                      templateAboutValueId:
												clonedAboutValue.templateAboutValueId,
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
      return clonedAbouts;
    });

    return clonedAbouts;
  } catch (e) {
    handleKnownErrors(e);
  }
};

module.exports = {
  listAbout,
  addAbout,
  editAbout,
  deleteAbout,
  listAllAboutForTemplate,
  // reorderAbout,
  reorderAllAbout,
  copyPubAboutToDraft,
};
