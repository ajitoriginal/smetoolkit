const { Sequelize, Model } = require('sequelize');

const OfficeExcludedRemark = (sequelize) => {
  /* Extending the Office Excluded Remark model from the sequilize Model class */
  class OfficeExcludedRemarkModel extends Model {}

  /* initiating the Office Excluded Remark model schema */

  const DT = Sequelize.DataTypes;

  OfficeExcludedRemarkModel.init(
    {
      officeExcludedRemarkId: {
        type: DT.UUID,
        field: 'office_excluded_remark_id',
        primaryKey: true,
        defaultValue: DT.UUIDV4,
      },
    },
    {
      sequelize,
      modelName: 'office_excluded_remark',
      timestamps: true,
      paranoid: true,
    }
  );
};

module.exports = OfficeExcludedRemark;
