const { addColumnIfNotExist, removeColumnIfExist } = require('../helpers/migrations');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await addColumnIfNotExist(queryInterface, 'templates', 'oldTemplateId', {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'templates',
          key: 'template_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });

      await addColumnIfNotExist(queryInterface, 'template_categories', 'oldTemplateCategoryId', {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'template_categories',
          key: 'template_category_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });
      await addColumnIfNotExist(queryInterface, 'template_subcategories', 'oldTemplateSubCategoryId', {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'template_subcategories',
          key: 'template_sub_category_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });

      await addColumnIfNotExist(queryInterface, 'template_remarks', 'oldTemplateRemarkId', {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'template_remarks',
          key: 'template_remark_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });
      await addColumnIfNotExist(queryInterface, 'template_abouts', 'oldTemplateAboutId', {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'template_abouts',
          key: 'template_about_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });

      await addColumnIfNotExist(queryInterface, 'template_about_values', 'oldTemplateAboutValueId', {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'template_about_values',
          key: 'template_about_value_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });
      await addColumnIfNotExist(queryInterface, 'template_about_value_notes', 'oldTemplateValueNoteId', {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'template_about_value_notes',
          key: 'template_about_value_note_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });

      await addColumnIfNotExist(queryInterface, 'template_subcategory_reminders', 'oldTemplateReminderId', {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'template_subcategory_reminders',
          key: 'template_subcategory_reminder_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });
      await addColumnIfNotExist(queryInterface, 'template_locations', 'oldTemplateLocationId', {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'template_locations',
          key: 'template_location_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });

      await addColumnIfNotExist(queryInterface, 'template_disclosures', 'oldTemplateDisclosureId', {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'template_disclosures',
          key: 'template_disclosure_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });

      await addColumnIfNotExist(queryInterface, 'template_definitions', 'oldTemplateDefinitionId', {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'template_definitions',
          key: 'template_definition_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });
    } catch (e) {
      throw new Error(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await removeColumnIfExist(queryInterface, 'templates', 'oldTemplateId');
      await removeColumnIfExist(queryInterface, 'template_categories', 'oldTemplateCategoryId');
      await removeColumnIfExist(queryInterface, 'template_subcategories', 'oldTemplateSubCategoryId');
      await removeColumnIfExist(queryInterface, 'template_remarks', 'oldTemplateRemarkId');
      await removeColumnIfExist(queryInterface, 'template_abouts', 'oldTemplateAboutId');
      await removeColumnIfExist(queryInterface, 'template_about_values', 'oldTemplateAboutValueId');
      await removeColumnIfExist(queryInterface, 'template_about_value_notes', 'oldTemplateValueNoteId');
      await removeColumnIfExist(queryInterface, 'template_subcategory_reminders', 'oldTemplateReminderId');
      await removeColumnIfExist(queryInterface, 'template_locations', 'oldTemplateLocationId');
      await removeColumnIfExist(queryInterface, 'template_disclosures', 'oldTemplateDisclosureId');
      await removeColumnIfExist(queryInterface, 'template_definitions', 'oldTemplateDefinitionId');
    } catch (e) {
      throw new Error(e);
    }
  },
};
