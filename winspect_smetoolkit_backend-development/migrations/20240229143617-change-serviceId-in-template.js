const { addColumnIfNotExist, removeColumnIfExist } = require('../helpers/migrations');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await addColumnIfNotExist(queryInterface, 'templates', 'serviceId', {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'services',
          key: 'service_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });
    } catch (e) {
      throw new Error(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await addColumnIfNotExist(queryInterface, 'templates', 'serviceId', {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'services',
          key: 'service_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    } catch (e) {
      throw new Error(e);
    }
  },
};
