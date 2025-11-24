const { Sequelize, Model } = require('sequelize');

const Report = (sequelize) => {
  /* Extending the Report model from the sequilize Model class */
  class ReportModel extends Model {}

  /* initiating the Report model schema */

  const DT = Sequelize.DataTypes;

  ReportModel.init(
    {
      reportId: {
        type: DT.UUID,
        field: 'report_id',
        primaryKey: true,
        defaultValue: DT.UUIDV4,
      },
      isSent: {
        type: DT.BOOLEAN,
        field: 'is_sent',
        defaultValue: 0,
        allowNull: false,
      },
      initialCompletedDatetime: {
        type: DT.DATE,
        field: 'initial_completed_datetime',
        allowNull: true,
      },
      completedDatetime: {
        type: DT.DATE,
        field: 'completed_datetime',
        allowNull: true,
      },
      isPreviewCompleted: {
        type: DT.BOOLEAN,
        field: 'is_preview_completed',
        allowNull: false,
        defaultValue: 0,
      },
      pdfKey: {
        type: DT.TEXT('long'),
        field: 'pdf_key',
        allowNull: true,
      },
      s3Location: {
        type: DT.STRING,
        field: 's3_location',
        allowNull: true,
      },
      isEdited: {
        type: DT.BOOLEAN,
        field: 'is_edited',
        allowNull: false,
        defaultValue: 0,
      },
      previewCompletedDatetime: {
        type: DT.DATE,
        field: 'preview_completed_datetime',
        allowNull: true,
      },
      showClientInfo: {
        type: DT.BOOLEAN,
        field: 'show_client_info',
        allowNull: false,
        defaultValue: 1,
      },
      attachmentOnly: {
        type: DT.BOOLEAN,
        field: 'attachment_only',
        allowNull: false,
        defaultValue: 0,
      },
      pdfGeneration: {
        type: DT.ENUM('Generated', 'In Process', 'Failed'),
        field: 'pdf_generation',
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'report',
      timestamps: true,
      paranoid: true,
    }
  );
};

module.exports = Report;
