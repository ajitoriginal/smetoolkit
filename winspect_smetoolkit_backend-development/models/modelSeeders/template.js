module.exports = async function (sequelize) {
  await sequelize.models.template.bulkCreate([
    {
      templateId: 1,
      name: 'Full Home Inspection Template',
      serviceName: 'Standard Full Home Inspection',
      version: 1.0,
    },
  ]);
};
