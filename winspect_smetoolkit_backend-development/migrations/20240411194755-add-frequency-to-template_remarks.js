const { addColumnIfNotExist, removeColumnIfExist } = require('../helpers/migrations');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await addColumnIfNotExist(queryInterface, 'template_remarks', 'total_frequency', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      });

      await addColumnIfNotExist(queryInterface, 'template_remarks', 'remark_type', {
        type: Sequelize.ENUM('Template', 'Custom'),
        allowNull: false,
        defaultValue: 'Template',
      });

      await addColumnIfNotExist(queryInterface, 'template_remarks', 'customRemarkAddedByUser', {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'user_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });

      await addColumnIfNotExist(queryInterface, 'template_remarks', 'hide', {
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
      await removeColumnIfExist(queryInterface, 'template_remarks', 'total_frequency');
      await removeColumnIfExist(queryInterface, 'template_remarks', 'remark_type');
      await removeColumnIfExist(queryInterface, 'template_remarks', 'customRemarkAddedBy');
      await removeColumnIfExist(queryInterface, 'template_remarks', 'hide');
    } catch (e) {
      throw new Error(e);
    }
  },
};
