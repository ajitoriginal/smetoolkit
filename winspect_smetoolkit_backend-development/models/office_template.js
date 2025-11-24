const { Sequelize, Model } = require('sequelize');

const OfficeTemplate = (sequelize) => {
  /* Extending the Office Template model from the sequilize Model class */
  class OfficeTemplateModel extends Model {}

  /* initiating the Office Template model schema */

  const DT = Sequelize.DataTypes;

  OfficeTemplateModel.init(
    {
      officeTemplateId: {
        type: DT.UUID,
        field: 'office_template_id',
        primaryKey: true,
        defaultValue: DT.UUIDV4,
      },
      defaultAttachmentFlow: {
        type: DT.BOOLEAN,
        field: 'default_attachment_flow',
        allowNull: true,
      },
      showDisclosure: {
        type: DT.BOOLEAN,
        field: 'show_disclosure',
        allowNull: false,
        defaultValue: 1,
      },
      showDefinition: {
        type: DT.BOOLEAN,
        field: 'show_definition',
        allowNull: false,
        defaultValue: 1,
      },
      remarkJsonKey: {
        type: DT.STRING,
        field: 'remark_json_key',
        allowNull: true,
      },
      remarkJsonUpdatedAt: {
        type: DT.DATE,
        field: 'remark_json_updated_at',
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'office_template',
      timestamps: true,
      paranoid: true,
    }
  );

  // Add paranoid cascade delete hook for officeTemplate
  OfficeTemplateModel.addHook('beforeDestroy', async (instance, options) => {
    const userTemplates = await instance.getUser_templates();

    // Delete associated userTemplates
    if (userTemplates.length !== 0) await Promise.all(userTemplates.map((userTemplate) => userTemplate.destroy()));
  });

  // Add paranoid cascade restore hook for officeTemplate
  OfficeTemplateModel.addHook('beforeRestore', async (instance, options) => {
    const userTemplates = await instance.getUser_templates({ paranoid: false });

    // Delete associated userTemplates
    if (userTemplates.length !== 0) await Promise.all(userTemplates.map((userTemplate) => userTemplate.restore()));
  });

  return OfficeTemplateModel;
};

module.exports = OfficeTemplate;
