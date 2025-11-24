module.exports = async function (sequelize) {
  await sequelize.models.sme_user.bulkCreate([
    {
      smeUserId: 1,
      password: 'Roove@123',
      email: 'admin@winhomeoffice.com',
      isTempPassword: 0,
      first: 'Admin',
      last: 'win',
    },
    {
      smeUserId: 2,
      password: 'Roove@123',
      email: 'igill@winhomeoffice.com',
      isTempPassword: 0,
      first: 'Ishan',
      last: 'Gill',
    },
  ]);
};
