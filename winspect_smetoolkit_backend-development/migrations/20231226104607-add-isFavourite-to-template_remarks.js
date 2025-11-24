const { addColumnIfNotExist, removeColumnIfExist } = require('../helpers/migrations');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await addColumnIfNotExist(queryInterface, 'template_remarks', 'is_favourite', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      });
    } catch (e) {
      throw new Error(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await removeColumnIfExist(queryInterface, 'template_remarks', 'is_favourite');
    } catch (e) {
      throw new Error(e);
    }
  },
};
