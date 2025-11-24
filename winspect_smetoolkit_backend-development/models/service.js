const { Sequelize, Model } = require('sequelize');

const Service = (sequelize) => {
  /* Extending the Service model from the sequilize Model class */
  class ServiceModel extends Model {}

  /* initiating the Service model schema */

  const DT = Sequelize.DataTypes;

  ServiceModel.init(
    {
      serviceId: {
        type: DT.UUID,
        field: 'service_id',
        primaryKey: true,
        defaultValue: DT.UUIDV4,
      },
      serviceName: {
        type: DT.STRING,
        field: 'service_name',
        allowNull: false,
      },
      strapiId: {
        type: DT.INTEGER,
        field: 'strapi_id',
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'service',
      timestamps: true,
      paranoid: true,
    }
  );
};

module.exports = Service;
