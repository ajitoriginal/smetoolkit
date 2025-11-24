const { addColumnIfNotExist, removeColumnIfExist } = require('../helpers/migrations');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await addColumnIfNotExist(queryInterface, 'template_categories', 'print', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 1,
      });

      await addColumnIfNotExist(queryInterface, 'template_subcategories', 'print', {
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
      await removeColumnIfExist(queryInterface, 'template_categories', 'print');
      await removeColumnIfExist(queryInterface, 'template_subcategories', 'print');
    } catch (e) {
      throw new Error(e);
    }
  },
};
