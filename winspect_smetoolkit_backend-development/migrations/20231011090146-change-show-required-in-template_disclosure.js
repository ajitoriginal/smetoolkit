const { addColumnIfNotExist, removeColumnIfExist } = require('../helpers/migrations');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await removeColumnIfExist(queryInterface, 'template_disclosures', 'show');

      await addColumnIfNotExist(queryInterface, 'template_disclosures', 'show', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 1,
      });
    } catch (e) {
      throw new Error(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await removeColumnIfExist(queryInterface, 'template_disclosures', 'show');

      await addColumnIfNotExist(queryInterface, 'template_disclosures', 'show', {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      });
    } catch (e) {
      throw new Error(e);
    }
  },
};
