const { Sequelize, Model } = require('sequelize');

const OfficeIncludedRemark = (sequelize) => {
  /* Extending the Office Excluded Remark model from the sequilize Model class */
  class OfficeIncludedRemarkModel extends Model {}

  /* initiating the Office Excluded Remark model schema */

  const DT = Sequelize.DataTypes;

  OfficeIncludedRemarkModel.init(
    {
      officeIncludedRemarkId: {
        type: DT.UUID,
        field: 'office_included_remark_id',
        primaryKey: true,
        defaultValue: DT.UUIDV4,
      },
    },
    {
      sequelize,
      modelName: 'office_included_remark',
      timestamps: true,
      paranoid: true,
    }
  );
};

module.exports = OfficeIncludedRemark;
