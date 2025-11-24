const { addColumnIfNotExist, removeColumnIfExist } = require('../helpers/migrations');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {

      await addColumnIfNotExist(queryInterface, 'template_images', 'templateId', {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'templates',
          key: 'template_id',
        },
        defaultValue: 1,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

    } catch (e) {
      throw new Error(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {

      await removeColumnIfExist(queryInterface, 'template_images', 'templateId');
    } catch (e) {
      throw new Error(e);
    }
  },
};
