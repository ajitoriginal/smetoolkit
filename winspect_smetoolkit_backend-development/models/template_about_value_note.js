const { Sequelize, Model } = require('sequelize');

const TemplateAboutValueNote = (sequelize) => {
  /* Extending the TemplateAboutValueNote model from the sequilize Model class */
  class TemplateAboutValueNoteModel extends Model {}

  /* initiating the TemplateAboutValueNote model schema */

  const DT = Sequelize.DataTypes;

  TemplateAboutValueNoteModel.init(
    {
      templateAboutValueNoteId: {
        type: DT.UUID,
        field: 'template_about_value_note_id',
        primaryKey: true,
        defaultValue: DT.UUIDV4,
      },
      note: {
        type: DT.TEXT('long'),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'template_about_value_note',
      timestamps: true,
      paranoid: true,
    }
  );
};

module.exports = TemplateAboutValueNote;
