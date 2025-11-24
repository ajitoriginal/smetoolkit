const { addColumnIfNotExist, removeColumnIfExist } = require('../helpers/migrations');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await addColumnIfNotExist(queryInterface, 'templates', 'template_json_key', {
        type: Sequelize.STRING,
        allowNull: true,
      });

      await addColumnIfNotExist(queryInterface, 'templates', 'template_json_updated_at', {
        type: Sequelize.DATE,
        allowNull: true,
      });

      await addColumnIfNotExist(queryInterface, 'office_templates', 'remark_json_key', {
        type: Sequelize.STRING,
        allowNull: true,
      });

      await addColumnIfNotExist(queryInterface, 'office_templates', 'remark_json_updated_at', {
        type: Sequelize.DATE,
        allowNull: true,
      });
    } catch (e) {
      throw new Error(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await removeColumnIfExist(queryInterface, 'templates', 'template_json_key');
      await removeColumnIfExist(queryInterface, 'templates', 'template_json_updated_at');
      await removeColumnIfExist(queryInterface, 'office_templates', 'remark_json_key');
      await removeColumnIfExist(queryInterface, 'office_templates', 'remark_json_updated_at');
    } catch (e) {
      throw new Error(e);
    }
  },
};
