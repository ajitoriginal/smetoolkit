const { Sequelize, Model } = require('sequelize');

const Office = (sequelize) => {
  /* Extending the Office model from the sequilize Model class */
  class OfficeModel extends Model {}

  /* initiating the Office model schema */

  const DT = Sequelize.DataTypes;

  OfficeModel.init(
    {
      officeId: {
        type: DT.UUID,
        field: 'office_id',
        primaryKey: true,
        defaultValue: DT.UUIDV4,
      },
      officeRefId: {
        type: DT.UUID,
        field: 'office_ref_id', // WINconnect
        // unique: true,
        allowNull: false,
      },
      name: {
        type: DT.STRING,
        allowNull: false,
      },
      companyKey: {
        type: DT.STRING,
        field: 'company_key',
        allowNull: false,
      },
      address: {
        type: DT.STRING,
        allowNull: true,
      },
      city: {
        type: DT.STRING,
        allowNull: true,
      },
      state: {
        type: DT.STRING,
        allowNull: true,
      },
      zip: {
        type: DT.STRING,
        allowNull: false,
      },
      county: {
        type: DT.STRING,
        allowNull: true,
      },
      latitude: {
        type: DT.DECIMAL(10, 6),
        allowNull: true,
      },
      longitude: {
        type: DT.DECIMAL(10, 6),
        allowNull: true,
      },
      manager: {
        type: DT.STRING,
        allowNull: false,
      },
      managerEmail: {
        type: DT.STRING,
        field: 'manager_email',
        allowNull: false,
      },
      phone: {
        type: DT.STRING,
        allowNull: false,
      },
      timezone: {
        type: DT.STRING,
        allowNull: false,
      },
      isActive: {
        type: DT.BOOLEAN,
        field: 'is_active',
        allowNull: false,
        defaultValue: 1,
      },
      winConnectStatus: {
        type: DT.BOOLEAN,
        field: 'winconnect_status',
        allowNull: false,
        defaultValue: 1,
      },
      defaultReportExpiry: {
        type: DT.INTEGER,
        field: 'default_report_expiry',
        allowNull: false,
        defaultValue: 30,
      },
    },
    {
      sequelize,
      modelName: 'office',
      timestamps: true,
      paranoid: true,
    }
  );
  OfficeModel.prototype.toJSON = function () {
    const values = { ...this.get() };

    values.latitude = Number(values.latitude);
    values.longitude = Number(values.longitude);
    return values;
  };
};

module.exports = Office;
