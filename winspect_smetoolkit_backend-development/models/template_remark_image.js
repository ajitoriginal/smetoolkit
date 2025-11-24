const { Sequelize, Model } = require('sequelize');

const TemplateRemarkImage = (sequelize) => {
  /* Extending the TemplateRemarkImage model from the sequilize Model class */

  class TemplateRemarkImageModel extends Model {}

  /* initiating the TemplateRemarkImage model schema */

  const DT = Sequelize.DataTypes;

  TemplateRemarkImageModel.init(
    {
      templateRemarkImageId: {
        type: DT.UUID,
        field: 'template_remark_image_id',
        primaryKey: true,
        defaultValue: DT.UUIDV4,
      },
      orderNumber: {
        type: DT.INTEGER,
        field: 'order_number',
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'template_remark_image',
      timestamps: true,
      paranoid: true,
    }
  );
};

module.exports = TemplateRemarkImage;
