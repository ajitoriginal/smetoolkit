const { addColumnIfNotExist, removeColumnIfExist } = require('../helpers/migrations');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await removeColumnIfExist(queryInterface, 'template_remarks', 'type');

      await addColumnIfNotExist(queryInterface, 'template_remarks', 'type', {
        type: Sequelize.ENUM('Functional', 'Not Present', 'Not Visible', 'Issue'),
        allowNull: false,
        defaultValue: 'Issue',
      });
    } catch (e) {
      throw new Error(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await removeColumnIfExist(queryInterface, 'template_remarks', 'type');

      await addColumnIfNotExist(queryInterface, 'template_remarks', 'type', {
        type: Sequelize.ENUM('Limitation', 'Condition', 'Note', 'Remark'),
        allowNull: true,
      });
    } catch (e) {
      throw new Error(e);
    }
  },
};
