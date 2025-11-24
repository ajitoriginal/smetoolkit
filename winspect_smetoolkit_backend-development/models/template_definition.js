const { Sequelize, Model } = require('sequelize');

const TemplateDefinition = (sequelize) => {
  /* Extending the TemplateDefinition model from the sequilize Model class */
  class TemplateDefinitionModel extends Model {}

  /* initiating the TemplateDefinition model schema */

  const DT = Sequelize.DataTypes;

  TemplateDefinitionModel.init(
    {
      templateDefinitionId: {
        type: DT.UUID,
        field: 'template_definition_id',
        primaryKey: true,
        defaultValue: DT.UUIDV4,
      },
      title: {
        type: DT.STRING,
        allowNull: false,
      },
      description: {
        type: DT.TEXT('long'),
        allowNull: true,
      },
      orderNumber: {
        type: DT.INTEGER,
        field: 'order_number',
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'template_definition',
      timestamps: true,
      paranoid: true,
    }
  );
};

module.exports = TemplateDefinition;
