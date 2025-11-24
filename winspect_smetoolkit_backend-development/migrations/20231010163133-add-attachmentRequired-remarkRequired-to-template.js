const { addColumnIfNotExist, removeColumnIfExist } = require('../helpers/migrations');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await addColumnIfNotExist(queryInterface, 'templates', 'require_attachment', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      });

      await addColumnIfNotExist(queryInterface, 'templates', 'require_remark', {
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
      await removeColumnIfExist(queryInterface, 'templates', 'require_attachment');
      await removeColumnIfExist(queryInterface, 'templates', 'require_remark');
    } catch (e) {
      throw new Error(e);
    }
  },
};
