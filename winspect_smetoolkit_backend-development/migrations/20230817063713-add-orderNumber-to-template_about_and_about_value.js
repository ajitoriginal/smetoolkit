const { addColumnIfNotExist, removeColumnIfExist } = require('../helpers/migrations');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await addColumnIfNotExist(queryInterface, 'template_abouts', 'order_number', {
        type: Sequelize.INTEGER,
        allowNull: true,
      });

      await addColumnIfNotExist(queryInterface, 'template_about_values', 'order_number', {
        type: Sequelize.INTEGER,
        allowNull: true,
      });
    } catch (e) {
      throw new Error(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await removeColumnIfExist(queryInterface, 'template_abouts', 'order_number');
      await removeColumnIfExist(queryInterface, 'template_about_values', 'order_number');
    } catch (e) {
      throw new Error(e);
    }
  },
};
