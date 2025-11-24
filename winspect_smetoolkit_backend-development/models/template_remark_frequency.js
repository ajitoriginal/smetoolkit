const { Sequelize, Model } = require('sequelize');

const TemplateRemarkFrequency = (sequelize) => {
  /* Extending the TemplateRemarkFrequency model from the sequilize Model class */
  class TemplateRemarkFrequencyModel extends Model {}

  /* initiating the TemplateRemarkFrequency model schema */

  const DT = Sequelize.DataTypes;

  TemplateRemarkFrequencyModel.init(
    {
      templateRemarkFrequencyId: {
        type: DT.UUID,
        field: 'template_remark_frequency_id',
        primaryKey: true,
        defaultValue: DT.UUIDV4,
      },
      frequency: {
        type: DT.INTEGER,
        allowNull: false,
      },
      myRemark: {
        type: DT.BOOLEAN,
        field: 'my_remark',
        allowNull: false,
        defaultValue: 1,
      },
      esTimestamp: {
        type: DT.DATE,
        field: 'es_timestamp',
        allowNull: false,
        defaultValue: new Date(),
      },
      isDefault:{
        type: DT.BOOLEAN,
        field: 'is_default',
        allowNull: false,
        defaultValue: 0,
      },
      defaultOrderNumber: {
        type: DT.INTEGER,
        field: 'default_order_number',
        allowNull: true,
      },
      officeStatus: {
        type: DT.ENUM(
          'Functional',
          'Informational',
          'Limitation',
          'Not Inspected',
          'Action Required',
          'Repairs Recommended',
          'Preventive Measure',
          'Attention',
        ),
        field: 'office_status',
        allowNull: false,
        defaultValue: 'Repairs Recommended',
      },
      htmlRemark: {
        type: DT.TEXT('long'),
        field: 'html_remark',
        allowNull: true,
      },
      addToSummary: {
        type: DT.BOOLEAN,
        field: 'add_to_summary',
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'template_remark_frequency',
      timestamps: true,
      paranoid: true,
    }
  );
};

module.exports = TemplateRemarkFrequency;
