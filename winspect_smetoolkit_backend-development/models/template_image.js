const { Sequelize, Model } = require('sequelize');

const TemplateImage = (sequelize) => {
  /* Extending the TemplateImage model from the sequilize Model class */

  class TemplateImageModel extends Model {}

  /* initiating the TemplateImage model schema */

  const DT = Sequelize.DataTypes;

  TemplateImageModel.init(
    {
      templateImageId: {
        type: DT.UUID,
        field: 'template_image_id',
        primaryKey: true,
        defaultValue: DT.UUIDV4,
      },
      templateId: {
        type: DT.UUID,
        field: 'templateId',
        allowNull: false,
        references: {
          model: 'templates',
          key: 'template_id'
        }
      },
      imageTitle: {
        type: DT.STRING,
        field: 'image_title',
        allowNull: true,
      },
      thumbImageKey: {
        type: DT.STRING,
        field: 'thumb_image_key',
        allowNull: true,
      },
      originalImageKey: {
        type: DT.STRING,
        field: 'original_image_key',
        allowNull: false,
      },
      reportImageKey: {
        type: DT.STRING,
        field: 'report_image_key',
        allowNull: true,
      },
      location: {
        type: DT.STRING,
        allowNull: false,
        defaultValue: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/`,
      },
      uploadStatus: {
        type: DT.ENUM('uploaded', 'pending', 'failed', 'in process'),
        field: 'upload_status',
        allowNull: true,
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
      modelName: 'template_image',
      timestamps: true,
      paranoid: true,
    }
  );
};

module.exports = TemplateImage;
