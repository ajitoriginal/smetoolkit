const { Model, DataTypes } = require('sequelize');

const WinPolicy = (sequelize) => {
  class WinPolicyModel extends Model {}

  WinPolicyModel.init(
    {
      winPolicyId: {
        type: DataTypes.UUID,
        field: 'win_policy_id',
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      sequenceNo: {
        type: DataTypes.INTEGER,
        field: 'sequence_no',
        allowNull: false,
        defaultValue: 1,
      },
      name: {
        type: DataTypes.STRING,
        field: 'name',
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        field: 'url',
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: 'win_policy',
      timestamps: true,
      paranoid: true,
      underscored: true,
    }
  );

  return WinPolicyModel;
};

module.exports = WinPolicy;