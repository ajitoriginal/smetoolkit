const { addColumnIfNotExist, removeColumnIfExist } = require('../helpers/migrations');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await addColumnIfNotExist(queryInterface, 'template_remark_frequencies', 'default_order_number', {
        type: Sequelize.INTEGER,
        allowNull: true,
      });
      

    } catch (e) {
      throw new Error(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await removeColumnIfExist(queryInterface, 'template_remark_frequencies', 'default_order_number');
    } catch (e) {
      throw new Error(e);
    }
  },
};
