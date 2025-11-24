const { addColumnIfNotExist, removeColumnIfExist } = require('../helpers/migrations');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await addColumnIfNotExist(queryInterface, 'template_remark_frequencies', 'my_remark', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 1,
      });

      await addColumnIfNotExist(queryInterface, 'template_remark_frequencies', 'es_timestamp', {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date(),
      });
    } catch (e) {
      throw new Error(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await removeColumnIfExist(queryInterface, 'template_remark_frequencies', 'my_remark');
      await removeColumnIfExist(queryInterface, 'template_remark_frequencies', 'es_timestamp');
    } catch (e) {
      throw new Error(e);
    }
  },
};
