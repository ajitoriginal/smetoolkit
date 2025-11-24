const { Sequelize, Model } = require('sequelize');

const TemplateAboutValue = (sequelize) => {
  /* Extending the TemplateAboutValue model from the sequilize Model class */
  class TemplateAboutValueModel extends Model {}

  /* initiating the TemplateAboutValue model schema */

  const DT = Sequelize.DataTypes;

  TemplateAboutValueModel.init(
    {
      templateAboutValueId: {
        type: DT.UUID,
        field: 'template_about_value_id',
        primaryKey: true,
        defaultValue: DT.UUIDV4,
      },
      value: {
        type: DT.STRING,
        allowNull: false,
      },
      orderNumber: {
        type: DT.INTEGER,
        field: 'order_number',
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'template_about_value',
      timestamps: true,
      paranoid: true,
    }
  );
  // Define hook for delete cascade with paranoid mode
  TemplateAboutValueModel.addHook('beforeDestroy', async (instance, options) => {
    const aboutValueNotes = await instance.getTemplate_about_value_notes();

    // Delete associated TemplateSubCategories
    if (aboutValueNotes.length !== 0) await Promise.all(aboutValueNotes.map((aboutValueNote) => aboutValueNote.destroy()));
  });

  // Define hook for delete cascade with paranoid mode
  TemplateAboutValueModel.addHook('beforeRestore', async (instance, options) => {
    const aboutValueNotes = await instance.getTemplate_about_value_notes({ paranoid: false });

    // Delete associated TemplateSubCategories
    if (aboutValueNotes.length !== 0) await Promise.all(aboutValueNotes.map((aboutValueNote) => aboutValueNote.restore()));
  });
};

module.exports = TemplateAboutValue;
