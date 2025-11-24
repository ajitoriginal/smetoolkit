const { Sequelize, Model } = require('sequelize');

const ReportAboutValue = (sequelize) => {
  /* Extending the ReportAboutValue model from the sequilize Model class */
  class ReportAboutValueModel extends Model {}

  /* initiating the ReportAboutValue model schema */

  const DT = Sequelize.DataTypes;

  ReportAboutValueModel.init(
    {
      reportAboutValueId: {
        type: DT.UUID,
        field: 'report_about_value_id',
        primaryKey: true,
        defaultValue: DT.UUIDV4,
      },
      value: {
        type: DT.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DT.DATE(3),
        allowNull: false,
      },
      updatedAt: {
        type: DT.DATE(3),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'report_about_value',
      timestamps: true,
      paranoid: true,
      // indexes: [
      //   {
      //     name: 'updatedAt_index',
      //     fields: ['updatedAt'],
      //   },
      // ],
    }
  );

  // Define hook for delete cascade with paranoid mode
  // ReportAboutValueModel.addHook('beforeDestroy', async (instance, options) => {
  //   const remarkLocation = await instance.getReport_remark_location();

  //   if (remarkLocation) await remarkLocation.destroy();
  // });

  // // Define hook for delete cascade with paranoid mode
  // ReportAboutValueModel.addHook('beforeRestore', async (instance, options) => {
  //   const remarkLocation = await instance.getReport_remark_location({ paranoid: false });

  //   if (remarkLocation) await remarkLocation.restore();
  // });
};

module.exports = ReportAboutValue;
