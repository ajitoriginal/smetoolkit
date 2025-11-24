const { addColumnIfNotExist, removeColumnIfExist } = require('../helpers/migrations');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await removeColumnIfExist(queryInterface, 'template_about_values', 'templateAboutValueNoteId');

      await addColumnIfNotExist(queryInterface, 'template_about_value_notes', 'templateAboutValueId', {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'template_about_values',
          key: 'template_about_value_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    } catch (e) {
      throw new Error(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await addColumnIfNotExist(queryInterface, 'template_about_values', 'templateAboutValueNoteId', {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'template_about_value_notes',
          key: 'template_about_value_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      await removeColumnIfExist(queryInterface, 'template_about_values', 'templateAboutValueId');
    } catch (e) {
      throw new Error(e);
    }
  },
};
