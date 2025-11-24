const { Sequelize, Model } = require('sequelize');

const UserTemplateCategory = (sequelize) => {
  /* Extending the User Template Category model from the sequilize Model class */
  class UserTemplateCategoryModel extends Model {}

  /* initiating the User Template Category model schema */

  const DT = Sequelize.DataTypes;

  UserTemplateCategoryModel.init(
    {
      userTemplateCategoryId: {
        type: DT.UUID,
        field: 'user_template_category_id',
        primaryKey: true,
        defaultValue: DT.UUIDV4,
      },
      orderNumber: {
        type: DT.INTEGER,
        field: 'order_number',
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'user_template_category',
      timestamps: true,
      paranoid: true,
    }
  );

  // Add paranoid cascade delete hook for userTemplate
  UserTemplateCategoryModel.addHook('beforeDestroy', async (instance, options) => {
    const userTemplateSubCategories = await instance.getUser_template_subcategories();

    // Delete associated userTemplateCategories
    if (userTemplateSubCategories.length !== 0) await Promise.all(userTemplateSubCategories.map((userTemplateSubCategory) => userTemplateSubCategory.destroy()));
  });

  // Add paranoid cascade restore hook for userTemplate
  UserTemplateCategoryModel.addHook('beforeRestore', async (instance, options) => {
    const userTemplateSubCategories = await instance.getUser_template_subcategories({ paranoid: false });

    // Delete associated userTemplateCategories
    if (userTemplateSubCategories.length !== 0) await Promise.all(userTemplateSubCategories.map((userTemplateSubCategory) => userTemplateSubCategory.restore()));
  });
};

module.exports = UserTemplateCategory;
