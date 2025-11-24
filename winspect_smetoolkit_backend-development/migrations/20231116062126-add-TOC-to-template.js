const { addColumnIfNotExist, removeColumnIfExist } = require('../helpers/migrations');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await addColumnIfNotExist(queryInterface, 'templates', 'hasToc', {
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
      await removeColumnIfExist(queryInterface, 'templates', 'hasToc');
    } catch (e) {
      throw new Error(e);
    }
  },
};
