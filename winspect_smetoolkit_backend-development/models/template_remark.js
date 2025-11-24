const { Sequelize, Model } = require('sequelize');

const TemplateRemark = (sequelize) => {
  /* Extending the TemplateRemark model from the sequilize Model class */
  class TemplateRemarkModel extends Model {}

  /* initiating the TemplateRemark model schema */

  const DT = Sequelize.DataTypes;

  TemplateRemarkModel.init(
    {
      templateRemarkId: {
        type: DT.UUID,
        field: 'template_remark_id',
        primaryKey: true,
        defaultValue: DT.UUIDV4,
      },
      remark: {
        type: DT.TEXT('long'),
        allowNull: false,
      },
      aIGenerated: {
        type: DT.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },
      type: {
        type: DT.ENUM(
          'Functional',
          'Not Present',
          'Not Visible',
          'Issue',
          'Informational',
          'Limitation',
          'Not Inspected'
        ),
        allowNull: false,
      },
      title: {
        type: DT.STRING,
        allowNull: true,
      },
      aIGeneratedTitle: {
        type: DT.STRING,
        field: 'ai_generated_title',
        allowNull: true,
      },
      isFavourite: {
        type: DT.BOOLEAN,
        field: 'is_favourite',
        allowNull: false,
        defaultValue: 0,
      },
      totalFrequency: {
        type: DT.INTEGER,
        field: 'total_frequency',
        allowNull: false,
        defaultValue: 0,
      },
      remarkType: {
        type: DT.ENUM('Template', 'Custom'),
        field: 'remark_type',
        allowNull: false,
        defaultValue: 'Template',
      },
      hide: {
        type: DT.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },
      lastUpdatedAt: {
        type: DT.DATE,
        field: 'last_updatedAt',
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'template_remark',
      timestamps: true,
      paranoid: true,
    }
  );
};

module.exports = TemplateRemark;
