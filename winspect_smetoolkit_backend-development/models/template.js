const { Sequelize, Model } = require('sequelize');

const Template = (sequelize) => {
  /* Extending the Template model from the sequilize Model class */
  class TemplateModel extends Model {}

  /* initiating the Template model schema */

  const DT = Sequelize.DataTypes;

  TemplateModel.init(
    {
      templateId: {
        type: DT.UUID,
        field: 'template_id',
        primaryKey: true,
        defaultValue: DT.UUIDV4,
      },
      version: {
        type: DT.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 1.0,
      },
      initialPublishedAt: {
        type: DT.DATE,
        field: 'initial_published_at',
        allowNull: true,
      },
      publishedAt: {
        type: DT.DATE,
        field: 'published_at',
        allowNull: true,
      },
      scheduledPublishedAt: {
        type: DT.DATE,
        field: 'scheduled_published_at',
        allowNull: true,
      },
      isActive: {
        type: DT.BOOLEAN,
        field: 'is_active',
        allowNull: false,
        defaultValue: 0,
      },
      isDraft: {
        type: DT.BOOLEAN,
        field: 'is_draft',
        allowNull: false,
        defaultValue: 1,
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
      requireAttachment: {
        type: DT.BOOLEAN,
        field: 'require_attachment',
        allowNull: false,
        defaultValue: 0,
      },
      requireRemark: {
        type: DT.BOOLEAN,
        field: 'require_remark',
        allowNull: false,
        defaultValue: 1,
      },
      jsonKey: {
        type: DT.STRING,
        field: 'json_key',
        allowNull: true,
      },
      hasToc: {
        type: DT.BOOLEAN,
        allowNull: false,
        defaultValue: 1,
      },
      hasLocation: {
        type: DT.BOOLEAN,
        field: 'has_location',
        allowNull: false,
        defaultValue: 1,
      },
      hasDefinition: {
        type: DT.BOOLEAN,
        field: 'has_definition',
        allowNull: false,
        defaultValue: 1,
      },
      hasDisclosure: {
        type: DT.BOOLEAN,
        field: 'has_disclosure',
        allowNull: false,
        defaultValue: 1,
      },
      availableOnES: {
        type: DT.BOOLEAN,
        field: 'available_on_es',
        allowNull: false,
        defaultValue: 0,
      },
      jsonStructure: {
        type: DT.ENUM('old', 'new'),
        field: 'json_structure',
        allowNull: false,
        defaultValue: 'old',
      },
      templateJsonKey: {
        type: DT.STRING,
        field: 'template_json_key',
        allowNull: true,
      },
      templateJsonUpdatedAt: {
        type: DT.DATE,
        field: 'template_json_updated_at',
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'template',
      timestamps: true,
      paranoid: true,
    }
  );

  // Add paranoid cascade delete hook for TemplateCategory
  TemplateModel.addHook('beforeDestroy', async (instance, options) => {
    const categories = await instance.getTemplate_categories();
    const officeTemplates = await instance.getOffice_templates();

    // Delete associated TemplateSubCategories
    await Promise.all(categories.map((category) => category.destroy()));
    await Promise.all(officeTemplates.map((officeTemplate) => officeTemplate.destroy()));
  });

  // Add paranoid cascade delete hook for TemplateCategory
  TemplateModel.addHook('beforeRestore', async (instance, options) => {
    const categories = await instance.getTemplate_categories({ paranoid: false });
    const officeTemplates = await instance.getOffice_templates({ paranoid: false });

    // Delete associated TemplateSubCategories
    await Promise.all(categories.map((category) => category.restore()));
    await Promise.all(officeTemplates.map((officeTemplate) => officeTemplate.restore()));
  });

  TemplateModel.prototype.toJSON = function () {
    const values = { ...this.get() };

    values.version ? Number(values.version) : values.version;

    return values;
  };
};

module.exports = Template;
