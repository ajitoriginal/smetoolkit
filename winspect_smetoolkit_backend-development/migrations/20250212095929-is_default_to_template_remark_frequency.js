const { models } = require("../database/index");
const { addColumnIfNotExist, removeColumnIfExist } = require("../helpers/migrations");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await addColumnIfNotExist(queryInterface, "template_remark_frequencies", "is_default", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await removeColumnIfExist(queryInterface, "template_remark_frequencies", "is_default");
  },
};
