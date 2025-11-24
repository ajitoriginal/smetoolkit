const { addColumnIfNotExist, removeColumnIfExist } = require('../helpers/migrations');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await addColumnIfNotExist(queryInterface, 'template_remark_frequencies', 'office_status', {
        type: Sequelize.ENUM(
          'Functional',
          'Informational',
          'Limitation',
          'Not Inspected',
          'Action Required',
          'Repairs Recommended',
          'Preventive Measure',
          'Attention',
        ),
        allowNull: false,
        defaultValue: 'Repairs Recommended'
      });
      

    } catch (e) {
      throw new Error(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await removeColumnIfExist(queryInterface, 'template_remark_frequencies', 'office_status');
    } catch (e) {
      throw new Error(e);
    }
  },
};
