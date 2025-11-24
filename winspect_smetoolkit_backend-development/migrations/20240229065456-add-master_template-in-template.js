const { addColumnIfNotExist, removeColumnIfExist } = require('../helpers/migrations');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await addColumnIfNotExist(queryInterface, 'templates', 'masterTemplateId', {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: 1, // Set to Master full home
        references: {
          model: 'master_templates',
          key: 'master_template_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      await addColumnIfNotExist(queryInterface, 'services', 'masterTemplateId', {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: 1, // Set to Master full home
        references: {
          model: 'master_templates',
          key: 'master_template_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    } catch (e) {
      throw new Error(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await removeColumnIfExist(queryInterface, 'templates', 'masterTemplateId');
      await removeColumnIfExist(queryInterface, 'services', 'masterTemplateId');
    } catch (e) {
      throw new Error(e);
    }
  },
};
