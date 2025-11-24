const { Sequelize, Model } = require('sequelize');

const TemplateAbout = (sequelize) => {
  /* Extending the TemplateAbout model from the sequilize Model class */
  class TemplateAboutModel extends Model {}

  /* initiating the TemplateAbout model schema */

  const DT = Sequelize.DataTypes;

  TemplateAboutModel.init(
    {
      templateAboutId: {
        type: DT.UUID,
        field: 'template_about_id',
        primaryKey: true,
        defaultValue: DT.UUIDV4,
      },
      aboutTitle: {
        type: DT.STRING,
        field: 'about_title',
        allowNull: false,
      },
      isMultiSelect: {
        type: DT.BOOLEAN,
        field: 'is_multi_select',
        allowNull: false,
        defaultValue: 1,
      },
      hasLocation: {
        type: DT.BOOLEAN,
        field: 'has_location',
        allowNull: false,
        defaultValue: 0,
      },
      orderNumber: {
        type: DT.INTEGER,
        field: 'order_number',
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'template_about',
      timestamps: true,
      paranoid: true,
    }
  );
  // Define hook for delete cascade with paranoid mode
  TemplateAboutModel.addHook('beforeDestroy', async (instance, options) => {
    const aboutValues = await instance.getTemplate_about_values();
    const architecturalType = await instance.getArchitectural_type();

    // Delete associated TemplateSubCategories
    if (aboutValues.length !== 0) await Promise.all(aboutValues.map((aboutValue) => aboutValue.destroy()));

    if (architecturalType) await architecturalType.destroy();
  });

  // Define hook for delete cascade with paranoid mode
  TemplateAboutModel.addHook('beforeRestore', async (instance, options) => {
    const aboutValues = await instance.getTemplate_about_values({ paranoid: false });
    const architecturalType = await instance.getArchitectural_types({ paranoid: false });

    // Delete associated TemplateSubCategories
    if (aboutValues.length !== 0) await Promise.all(aboutValues.map((aboutValue) => aboutValue.restore()));

    if (architecturalType) await architecturalType.restore();
  });
};

module.exports = TemplateAbout;
