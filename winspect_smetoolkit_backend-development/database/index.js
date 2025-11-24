const Sequelize = require('sequelize');

const { successLog, noticeLog, errorLog } = require('../helpers/loggers');

function initiateDatabase() {
  const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER_NAME,
    process.env.DATABASE_PASSWORD,
    {
      host: process.env.DATABASE_HOST,
      dialect: 'mysql',
      logging: noticeLog,
      define: {
        timestamps: false,
      },
    }
  );

  // IIFE
  (async function () {
    try {
      await sequelize.authenticate();
      successLog('CONNECTED TO DB :', 'Connection has been established successfully.');
    } catch (error) {
      errorLog('DB CONNECTION ERROR :', `Unable to connect to the database:${error}`);
    }
  }());

  require('./models')(sequelize);

  require('./associations')(sequelize);

  // sequelize.sync();

  // Run Model seeders (For preexisting data)

  // sequelize
  //   .sync({
  //    alter: false,
  //   })
  //   .then(async () => {
  // await require('../models/modelSeeders/master_template')(sequelize);
  //   });

  return sequelize;
}

module.exports = initiateDatabase();
