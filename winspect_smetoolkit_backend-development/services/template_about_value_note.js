const { Op } = require('sequelize');
const { models } = require('../database/index');
const messages = require('../helpers/messages');

const addEditAboutValueNote = async (req) => {
  const { templateAboutValueId, notes, templateId } = req.body;
  const { id } = req.smeUser;
  try {
    // check if template
    const template = await models.template.findByPk(templateId);

    if (!template) {
      throw new Error(messages.template.TEMPLATE_NOT_FOUND);
    }

    // check if template about note exists
    const aboutValueExist = await models.template_about_value.findByPk(
      templateAboutValueId
    );

    const aboutValueNoteIds = notes.map((note) => note.templateAboutValueNoteId).filter((id) => id);
    if (!template.isDraft && aboutValueNoteIds.length > 0) {
		  throw new Error('Cannot Make changes to published template');
    }

    if (!aboutValueExist) {
      throw new Error(
        messages.templateAboutValue.TEMPLATE_ABOUT_VALUE_NOT_FOUND
      );
    }

    // data for bulkcreate
    const dataToUpsert = notes.map((note) => ({
      ...note,
      templateAboutValueId,
      createdBySme: id,
      updatedBySme: id,
    }));

    // create about value for a template
    const createdAboutValueNotes =			await models.template_about_value_note.bulkCreate(dataToUpsert, {
			  updateOnDuplicate: [
			    'templateAboutValueNoteId',
			    'templateAboutValueId',
          'updatedBySme',
			    'note',
			  ],
			  returning: true,
    });

    return createdAboutValueNotes;
  } catch (e) {
    throw new Error(e.message);
  }
};

const deleteAboutValueNote = async (req) => {
  const { templateAboutValueId, templateAboutValueNoteId, templateId } =		req.body;
  try {
    const template = await models.template.findByPk(templateId);

    if (!template) {
      throw new Error(messages.template.TEMPLATE_NOT_FOUND);
    }

    if (!template.isDraft) {
      throw new Error('Cannot Make changes to published template');
    }

    const aboutValueNoteExist = await models.template_about_value_note.findOne({
      where: {
        templateAboutValueId,
        templateAboutValueNoteId,
      },
    });

    if (!aboutValueNoteExist) {
      throw new Error(
        messages.templateAboutValueNote.TEMPLATE_ABOUT_VALUE_NOTE_NOT_FOUND
      );
    }

    const deletedAboutValueNote = await aboutValueNoteExist.destroy();

    return deletedAboutValueNote;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  addEditAboutValueNote,
  deleteAboutValueNote,
};
