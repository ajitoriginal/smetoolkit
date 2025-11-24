module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Update the enum values for the 'type' column in the 'template_remarks' table
    await queryInterface.changeColumn('template_remarks', 'type', {
      type: Sequelize.ENUM(
        'Functional',
        'Not Present',
        'Not Visible',
        'Issue',
        'Informational',
        'Limitation',
        'Not Inspected'
      ),
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert back to the previous enum values if needed
    await queryInterface.changeColumn('template_remarks', 'type', {
      type: Sequelize.ENUM('Functional', 'Not Present', 'Not Visible', 'Issue', 'Informational', 'Limitation'),
      allowNull: false,
    });
  },
};
