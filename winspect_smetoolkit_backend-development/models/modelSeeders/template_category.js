module.exports = async function (sequelize) {
  await sequelize.models.template_category.bulkCreate([
    {
      templateCategoryId: 1,
      name: 'Roof', //
      orderNumber: 1,
      templateId: 1,
    },
    {
      templateCategoryId: 2,
      name: 'Attic', //
      orderNumber: 2,
      templateId: 1,
    },
    {
      templateCategoryId: 3,
      name: 'Structure', //
      orderNumber: 3,
      templateId: 1,
    },
    {
      templateCategoryId: 4,
      name: 'Patios & Decks', //
      orderNumber: 4,
      templateId: 1,
    },
    {
      templateCategoryId: 5,
      name: 'Plumbing', //
      orderNumber: 5,
      templateId: 1,
    },
    {
      templateCategoryId: 6,
      name: 'HVAC', //
      orderNumber: 6,
      templateId: 1,
    },
    {
      templateCategoryId: 7,
      name: 'Electrical', //
      orderNumber: 7,
      templateId: 1,
    },
    {
      templateCategoryId: 8,
      name: 'Water Heater', //
      orderNumber: 8,
      templateId: 1,
    },
    {
      templateCategoryId: 9,
      name: 'Exterior', //
      orderNumber: 9,
      templateId: 1,
    },
    {
      templateCategoryId: 10,
      name: 'Interior', //
      orderNumber: 10,
      templateId: 1,
    },
    {
      templateCategoryId: 11,
      name: 'Fireplace', //
      orderNumber: 11,
      templateId: 1,
    },
    {
      templateCategoryId: 12,
      name: 'Appliances', //
      orderNumber: 12,
      templateId: 1,
    },

    // detached structure
    {
      templateCategoryId: 13,
      name: 'Detached Structure', //
      orderNumber: 13,
      templateId: 1,
    },
  ]);
};
