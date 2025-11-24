const { addColumnIfNotExist, removeColumnIfExist } = require('../helpers/migrations');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await addColumnIfNotExist(queryInterface, 'templates', 'updatedBySme', {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'sme_users',
          key: 'sme_user_id',
        },
        defaultValue: 1,
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      });

      await addColumnIfNotExist(queryInterface, 'template_categories', 'createdBySme', {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'sme_users',
          key: 'sme_user_id',
        },
        defaultValue: 1,
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      });

      await addColumnIfNotExist(queryInterface, 'template_categories', 'updatedBySme', {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'sme_users',
          key: 'sme_user_id',
        },
        defaultValue: 1,
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      });
      await addColumnIfNotExist(queryInterface, 'template_subcategories', 'createdBySme', {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'sme_users',
          key: 'sme_user_id',
        },
        defaultValue: 1,
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      });

      await addColumnIfNotExist(queryInterface, 'template_subcategories', 'updatedBySme', {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'sme_users',
          key: 'sme_user_id',
        },
        defaultValue: 1,
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      });
      await addColumnIfNotExist(queryInterface, 'template_abouts', 'createdBySme', {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'sme_users',
          key: 'sme_user_id',
        },
        defaultValue: 1,
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      });

      await addColumnIfNotExist(queryInterface, 'template_abouts', 'updatedBySme', {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'sme_users',
          key: 'sme_user_id',
        },
        defaultValue: 1,
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      });
      await addColumnIfNotExist(queryInterface, 'template_about_values', 'createdBySme', {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'sme_users',
          key: 'sme_user_id',
        },
        defaultValue: 1,
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      });

      await addColumnIfNotExist(queryInterface, 'template_about_values', 'updatedBySme', {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'sme_users',
          key: 'sme_user_id',
        },
        defaultValue: 1,
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      });
      await addColumnIfNotExist(queryInterface, 'template_about_value_notes', 'createdBySme', {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'sme_users',
          key: 'sme_user_id',
        },
        defaultValue: 1,
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      });

      await addColumnIfNotExist(queryInterface, 'template_about_value_notes', 'updatedBySme', {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'sme_users',
          key: 'sme_user_id',
        },
        defaultValue: 1,
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      });
      await addColumnIfNotExist(queryInterface, 'template_remarks', 'createdBySme', {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'sme_users',
          key: 'sme_user_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      });

      await addColumnIfNotExist(queryInterface, 'template_remarks', 'updatedBySme', {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'sme_users',
          key: 'sme_user_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      });
      await addColumnIfNotExist(queryInterface, 'template_subcategory_reminders', 'createdBySme', {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'sme_users',
          key: 'sme_user_id',
        },
        defaultValue: 1,
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      });

      await addColumnIfNotExist(queryInterface, 'template_subcategory_reminders', 'updatedBySme', {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'sme_users',
          key: 'sme_user_id',
        },
        defaultValue: 1,
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      });
      await addColumnIfNotExist(queryInterface, 'template_locations', 'createdBySme', {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'sme_users',
          key: 'sme_user_id',
        },
        defaultValue: 1,
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      });

      await addColumnIfNotExist(queryInterface, 'template_locations', 'updatedBySme', {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'sme_users',
          key: 'sme_user_id',
        },
        defaultValue: 1,
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      });
      await addColumnIfNotExist(queryInterface, 'template_definitions', 'createdBySme', {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'sme_users',
          key: 'sme_user_id',
        },
        defaultValue: 1,
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      });

      await addColumnIfNotExist(queryInterface, 'template_definitions', 'updatedBySme', {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'sme_users',
          key: 'sme_user_id',
        },
        defaultValue: 1,
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      });
      await addColumnIfNotExist(queryInterface, 'template_disclosures', 'createdBySme', {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'sme_users',
          key: 'sme_user_id',
        },
        defaultValue: 1,
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      });

      await addColumnIfNotExist(queryInterface, 'template_disclosures', 'updatedBySme', {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'sme_users',
          key: 'sme_user_id',
        },
        defaultValue: 1,
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      });

      await addColumnIfNotExist(queryInterface, 'office_templates', 'createdBySme', {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'sme_users',
          key: 'sme_user_id',
        },
        defaultValue: 1,
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      });
    } catch (e) {
      throw new Error(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await removeColumnIfExist(queryInterface, 'templates', 'updatedBySme');
      await removeColumnIfExist(queryInterface, 'template_categories', 'createdBySme');
      await removeColumnIfExist(queryInterface, 'template_categories', 'updatedBySme');
      await removeColumnIfExist(queryInterface, 'template_subcategories', 'createdBySme');
      await removeColumnIfExist(queryInterface, 'template_subcategories', 'updatedBySme');
      await removeColumnIfExist(queryInterface, 'template_abouts', 'createdBySme');
      await removeColumnIfExist(queryInterface, 'template_abouts', 'updatedBySme');
      await removeColumnIfExist(queryInterface, 'template_about_values', 'createdBySme');
      await removeColumnIfExist(queryInterface, 'template_about_values', 'updatedBySme');
      await removeColumnIfExist(queryInterface, 'template_about_value_notes', 'createdBySme');
      await removeColumnIfExist(queryInterface, 'template_about_value_notes', 'updatedBySme');
      await removeColumnIfExist(queryInterface, 'template_remarks', 'createdBySme');
      await removeColumnIfExist(queryInterface, 'template_remarks', 'updatedBySme');
      await removeColumnIfExist(queryInterface, 'template_subcategory_reminders', 'createdBySme');
      await removeColumnIfExist(queryInterface, 'template_subcategory_reminders', 'updatedBySme');
      await removeColumnIfExist(queryInterface, 'template_locations', 'createdBySme');
      await removeColumnIfExist(queryInterface, 'template_locations', 'updatedBySme');
      await removeColumnIfExist(queryInterface, 'template_definitions', 'createdBySme');
      await removeColumnIfExist(queryInterface, 'template_definitions', 'updatedBySme');
      await removeColumnIfExist(queryInterface, 'template_disclosures', 'createdBySme');
      await removeColumnIfExist(queryInterface, 'template_disclosures', 'updatedBySme');
      await removeColumnIfExist(queryInterface, 'office_templates', 'createdBySme');
    } catch (e) {
      throw new Error(e);
    }
  },
};
