const { Op } = require('sequelize');
const sequelize = require('../database/index');
const { models } = require('../database/index');
const messages = require('../helpers/messages');

const addRemoveArchitecturalType = async (req) => {
  const { templateAboutIds, templateId } = req.body;
  try {
    const template = await models.template.findByPk(templateId);

    if (!template) {
      throw new Error(messages.template.TEMPLATE_NOT_FOUND);
    }

    if (!template.isDraft) {
      throw new Error('Cannot Make changes to published template');
    }
    // check if templateAboutIds exist
    const templateAbouts = await models.template_about.findAll({
      where: {
        templateAboutId: templateAboutIds,
      },
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
      ],
    });

    if (templateAbouts.length !== templateAboutIds.length) {
      throw new Error(messages.templateAbout.TEMPLATE_ABOUT_NOT_FOUND);
    }

    await sequelize.transaction(async (t) => {
      // remove other ArchitecturalTypes
      const removeOtherArchitecturalTypes = await models.architectural_type.destroy({
        where: {
          templateAboutId: {
            [Op.notIn]: templateAboutIds,
          },
          templateId,
        },
        transaction: t,
      });

      await Promise.all(
        await templateAboutIds.map(async (templateAboutId) => {
          const [architecturalType, created] = await models.architectural_type.findOrCreate({
            where: {
              templateAboutId,
              templateId,
            },
            defaults: {
              templateAboutId,
              templateId,
            },
            paranoid: false,
            transaction: t,
          });

          if (architecturalType.deletedAt !== null) {
            await architecturalType.restore({ transaction: t });
          }

          return architecturalType;
        })
      );
    });

    return;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  addRemoveArchitecturalType,
};
