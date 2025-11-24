const { Sequelize, Model } = require('sequelize');

const UserTemplate = (sequelize) => {
  /* Extending the User Template model from the sequilize Model class */
  class UserTemplateModel extends Model {}

  /* initiating the User Template model schema */

  const DT = Sequelize.DataTypes;

  UserTemplateModel.init(
    {
      userTemplateId: {
        type: DT.UUID,
        field: 'user_template_id',
        primaryKey: true,
        defaultValue: DT.UUIDV4,
      },
    },
    {
      sequelize,
      modelName: 'user_template',
      timestamps: true,
      paranoid: true,
    }
  );

  // Add paranoid cascade delete hook for userTemplate
  UserTemplateModel.addHook('beforeDestroy', async (instance, options) => {
    const userTemplateCategories = await instance.getUser_template_categories();

    // Delete associated userTemplateCategories
    if (userTemplateCategories.length !== 0) await Promise.all(userTemplateCategories.map((userTemplateCategory) => userTemplateCategory.destroy()));
  });

  // Add paranoid cascade restore hook for userTemplate
  UserTemplateModel.addHook('beforeRestore', async (instance, options) => {
    const userTemplateCategories = await instance.getUser_template_categories({ paranoid: false });

    // Delete associated userTemplateCategories
    if (userTemplateCategories.length !== 0) await Promise.all(userTemplateCategories.map((userTemplateCategory) => userTemplateCategory.restore()));
  });
};

module.exports = UserTemplate;
