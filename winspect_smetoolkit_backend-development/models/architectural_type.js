const { Sequelize, Model } = require('sequelize');

const ArchitecturalType = (sequelize) => {
  /* Extending the Architectural Type model from the sequilize Model class */
  class ArchitecturalTypeModel extends Model {}

  /* initiating the Architectural Type model schema */

  const DT = Sequelize.DataTypes;

  ArchitecturalTypeModel.init(
    {
      architecturalTypeId: {
        type: DT.UUID,
        field: 'architectural_type_id',
        primaryKey: true,
        defaultValue: DT.UUIDV4,
      },
    },
    {
      sequelize,
      modelName: 'architectural_type',
      timestamps: true,
      paranoid: true,
    }
  );
};

module.exports = ArchitecturalType;
