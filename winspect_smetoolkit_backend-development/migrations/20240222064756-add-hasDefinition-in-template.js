const { addColumnIfNotExist, removeColumnIfExist } = require('../helpers/migrations');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await addColumnIfNotExist(queryInterface, 'templates', 'has_definition', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 1,
      });

      await addColumnIfNotExist(queryInterface, 'templates', 'has_disclosure', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 1,
      });

      await removeColumnIfExist(queryInterface, 'template_disclosures', 'title');
      await removeColumnIfExist(queryInterface, 'template_disclosures', 'show');
      await removeColumnIfExist(queryInterface, 'template_disclosures', 'order_number');

      await addColumnIfNotExist(queryInterface, 'templates', 'available_on_es', {
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
      await removeColumnIfExist(queryInterface, 'templates', 'has_definition');
      await removeColumnIfExist(queryInterface, 'templates', 'has_disclosure');

      await addColumnIfNotExist(queryInterface, 'template_disclosures', 'title', {
        type: Sequelize.STRING,
        allowNull: true,
      });

      await addColumnIfNotExist(queryInterface, 'template_disclosures', 'show', {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      });

      await addColumnIfNotExist(queryInterface, 'template_disclosures', 'order_number', {
        type: Sequelize.INTEGER,
        allowNull: true,
      });

      await removeColumnIfExist(queryInterface, 'templates', 'available_on_es');
    } catch (e) {
      throw new Error(e);
    }
  },
};
