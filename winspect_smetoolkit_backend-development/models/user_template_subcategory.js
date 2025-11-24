const { Sequelize, Model } = require('sequelize');

const UserTemplateSubCategory = (sequelize) => {
  /* Extending the User Template SubCategory model from the sequilize Model class */
  class UserTemplateSubCategoryModel extends Model {}

  /* initiating the User Template Category model schema */

  const DT = Sequelize.DataTypes;

  UserTemplateSubCategoryModel.init(
    {
      userTemplateSubCategoryId: {
        type: DT.UUID,
        field: 'user_template_sub_category_id',
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
      modelName: 'user_template_subcategory',
      timestamps: true,
      paranoid: true,
    }
  );
};

module.exports = UserTemplateSubCategory;
