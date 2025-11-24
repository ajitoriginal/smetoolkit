const { Sequelize, Model } = require('sequelize');

const TemplateDisclosure = (sequelize) => {
  /* Extending the TemplateDisclosure model from the sequilize Model class */
  class TemplateDisclosureModel extends Model {}

  /* initiating the TemplateDisclosure model schema */

  const DT = Sequelize.DataTypes;

  TemplateDisclosureModel.init(
    {
      templateDisclosureId: {
        type: DT.UUID,
        field: 'template_disclosure_id',
        primaryKey: true,
        defaultValue: DT.UUIDV4,
      },
      // title: {
      //   type: DT.STRING,
      //   allowNull: false,
      // },
      description: {
        type: DT.TEXT('long'),
        allowNull: false,
      },
      // show: {
      //   type: DT.BOOLEAN,
      //   allowNull: false,
      //   defaultValue: 1,
      // },
      // orderNumber: {
      //   type: DT.INTEGER,
      //   field: 'order_number',
      //   allowNull: false,
      // },
    },
    {
      sequelize,
      modelName: 'template_disclosure',
      timestamps: true,
      paranoid: true,
    }
  );
};

module.exports = TemplateDisclosure;
