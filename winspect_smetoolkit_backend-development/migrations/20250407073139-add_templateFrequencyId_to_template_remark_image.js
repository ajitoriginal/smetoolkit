const { addColumnIfNotExist, removeColumnIfExist } = require('../helpers/migrations');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {

      await removeColumnIfExist(queryInterface, 'template_remark_images', 'templateRemarkId');

      await addColumnIfNotExist(queryInterface, 'template_remark_images', 'templateRemarkFrequencyId', {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'template_remark_frequencies',
          key: 'template_remark_frequency_id',
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
      await addColumnIfNotExist(queryInterface, 'template_remark_images', 'templateRemarkId', {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'template_remarks',
          key: 'template_remark_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      await removeColumnIfExist(queryInterface, 'template_remark_images', 'templateRemarkFrequencyId');
    } catch (e) {
      throw new Error(e);
    }
  },
};
