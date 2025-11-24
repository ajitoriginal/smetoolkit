const { Sequelize, Model } = require('sequelize');

const MasterTemplate = (sequelize) => {
  /* Extending the MasterTemplate model from the sequilize Model class */
  class MasterTemplateModel extends Model {}

  /* initiating the MasterTemplate model schema */

  const DT = Sequelize.DataTypes;

  MasterTemplateModel.init(
    {
      masterTemplateId: {
        type: DT.UUID,
        field: 'master_template_id',
        primaryKey: true,
        defaultValue: DT.UUIDV4,
      },
      name: {
        type: DT.STRING,
        allowNull: false,
      },
      show: {
        type: DT.BOOLEAN,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: 'master_template',
      timestamps: true,
      paranoid: true,
    }
  );
};

module.exports = MasterTemplate;
