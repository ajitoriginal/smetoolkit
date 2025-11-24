const { Sequelize, Model } = require('sequelize');

const TemplateSubCategoryReminder = (sequelize) => {
  /* Extending the TemplateSubCategoryReminder model from the sequilize Model class */
  class TemplateSubCategoryReminderModel extends Model {}

  /* initiating the TemplateSubCategoryReminder model schema */

  const DT = Sequelize.DataTypes;

  TemplateSubCategoryReminderModel.init(
    {
      templateSubCategoryReminderId: {
        type: DT.UUID,
        field: 'template_subcategory_reminder_id',
        primaryKey: true,
        defaultValue: DT.UUIDV4,
      },
      description: {
        type: DT.TEXT('long'),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'template_subcategory_reminder',
      timestamps: true,
      paranoid: true,
    }
  );
};

module.exports = TemplateSubCategoryReminder;
