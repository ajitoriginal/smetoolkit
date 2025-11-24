const { addColumnIfNotExist, removeColumnIfExist } = require('../helpers/migrations');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await addColumnIfNotExist(queryInterface, 'templates', 'publishedBySme', {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'sme_users',
          key: 'sme_user_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      await addColumnIfNotExist(queryInterface, 'templates', 'createdBySme', {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: 1, // Set to standard full home
        references: {
          model: 'sme_users',
          key: 'sme_user_id',
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
      await removeColumnIfExist(queryInterface, 'templates', 'publishedBySme');
      await removeColumnIfExist(queryInterface, 'templates', 'createdBySme');
    } catch (e) {
      throw new Error(e);
    }
  },
};
