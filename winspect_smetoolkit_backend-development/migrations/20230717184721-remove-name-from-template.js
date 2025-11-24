const { addColumnIfNotExist, removeColumnIfExist } = require('../helpers/migrations');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await removeColumnIfExist(queryInterface, 'templates', 'name');
    } catch (e) {
      throw new Error(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await addColumnIfNotExist(queryInterface, 'templates', 'name', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    } catch (e) {
      throw new Error(e);
    }
  },
};
