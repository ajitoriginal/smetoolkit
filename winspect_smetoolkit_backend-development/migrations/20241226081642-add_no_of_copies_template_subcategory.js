const { addColumnIfNotExist, removeColumnIfExist } = require('../helpers/migrations');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await addColumnIfNotExist(queryInterface, 'template_subcategories', 'no_of_copies', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      });
    } catch (e) {
      throw new Error(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await removeColumnIfExist(queryInterface, 'template_subcategories', 'no_of_copies');
    } catch (e) {
      throw new Error(e);
    }
  },
};
