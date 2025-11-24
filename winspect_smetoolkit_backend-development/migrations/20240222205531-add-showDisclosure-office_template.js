const { addColumnIfNotExist, removeColumnIfExist } = require('../helpers/migrations');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await addColumnIfNotExist(queryInterface, 'office_templates', 'show_disclosure', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 1,
      });

      await addColumnIfNotExist(queryInterface, 'office_templates', 'show_definition', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 1,
      });
    } catch (e) {
      throw new Error(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await removeColumnIfExist(queryInterface, 'office_templates', 'show_disclosure');
      await removeColumnIfExist(queryInterface, 'office_templates', 'show_definition');
    } catch (e) {
      throw new Error(e);
    }
  },
};
