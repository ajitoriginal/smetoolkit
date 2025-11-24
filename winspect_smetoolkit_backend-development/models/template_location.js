const { Sequelize, Model } = require('sequelize');

const TemplateLocation = (sequelize) => {
  /* Extending the TemplateLocation model from the sequilize Model class */
  class TemplateLocationModel extends Model {}

  /* initiating the TemplateLocation model schema */

  const DT = Sequelize.DataTypes;

  TemplateLocationModel.init(
    {
      templateLocationId: {
        type: DT.UUID,
        field: 'template_location_id',
        primaryKey: true,
        defaultValue: DT.UUIDV4,
      },
      location: {
        type: DT.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'template_location',
      timestamps: true,
      paranoid: true,
    }
  );
};

module.exports = TemplateLocation;
