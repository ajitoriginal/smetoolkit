const { addColumnIfNotExist, removeColumnIfExist } = require('../helpers/migrations');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await addColumnIfNotExist(queryInterface, 'templates', 'json_structure', {
        type: Sequelize.ENUM('old', 'new'),
        allowNull: false,
        defaultValue: 'old',
      });
    } catch (e) {
      throw new Error(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await removeColumnIfExist(queryInterface, 'templates', 'json_structure');
    } catch (e) {
      throw new Error(e);
    }
  },
};
