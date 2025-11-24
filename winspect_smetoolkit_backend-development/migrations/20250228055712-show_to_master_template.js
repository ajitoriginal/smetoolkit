const { addColumnIfNotExist, removeColumnIfExist } = require('../helpers/migrations');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await addColumnIfNotExist(queryInterface, 'master_templates', 'show', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 1
      });

      await addColumnIfNotExist(queryInterface, 'template_remarks', 'last_updatedAt', {
        type: Sequelize.DATE,
        allowNull: true,
      });


    } catch (e) {
      throw new Error(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await removeColumnIfExist(queryInterface, 'master_templates', 'show');
      await removeColumnIfExist(queryInterface, 'template_remarks', 'last_updatedAt');
    } catch (e) {
      throw new Error(e);
    }
  },
};
