const { models } = require("../database/index");
const { addColumnIfNotExist, removeColumnIfExist } = require("../helpers/migrations");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await addColumnIfNotExist(queryInterface, "template_remark_frequencies", "html_remark", {
      type: Sequelize.TEXT('long'),
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await removeColumnIfExist(queryInterface, "template_remark_frequencies", "html_remark");
  },
};
