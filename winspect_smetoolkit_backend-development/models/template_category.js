const { Sequelize, Model } = require('sequelize');
const { models } = require('../database/index');
const TemplateSubCategory = require('./template_subcategory');

const TemplateCategory = (sequelize) => {
  /* Extending the TemplateCategory model from the sequilize Model class */
  class TemplateCategoryModel extends Model {}

  /* initiating the TemplateCategory model schema */

  const DT = Sequelize.DataTypes;

  TemplateCategoryModel.init(
    {
      templateCategoryId: {
        type: DT.UUID,
        field: 'template_category_id',
        primaryKey: true,
        defaultValue: DT.UUIDV4,
      },
      name: {
        type: DT.STRING,
        allowNull: false,
      },
      orderNumber: {
        type: DT.INTEGER,
        field: 'order_number',
        allowNull: false,
      },
      iconImageKey: {
        type: DT.STRING,
        field: 'icon_image_key',
        allowNull: true,
      },
      iconImageLocation: {
        type: DT.STRING,
        field: 'icon_image_location',
        allowNull: true,
      },
      print: {
        type: DT.BOOLEAN,
        defaultValue: 1,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'template_category',
      timestamps: true,
      paranoid: true,
    }
  );

  // Add paranoid cascade delete hook for TemplateCategory
  TemplateCategoryModel.addHook('beforeDestroy', async (instance, options) => {
    const subCategories = await instance.getTemplate_subcategories();

    // TODO Architectural type

    // Delete associated TemplateSubCategories
    if (subCategories.length !== 0) await Promise.all(subCategories.map((subCategory) => subCategory.destroy()));
  });

  // Add paranoid cascade delete hook for TemplateCategory
  TemplateCategoryModel.addHook('beforeRestore', async (instance, options) => {
    const subCategories = await instance.getTemplate_subcategories({ paranoid: false });

    // Delete associated TemplateSubCategories
    if (subCategories.length !== 0) await Promise.all(subCategories.map((subCategory) => subCategory.restore()));
  });

  return TemplateCategoryModel;
};

module.exports = TemplateCategory;
