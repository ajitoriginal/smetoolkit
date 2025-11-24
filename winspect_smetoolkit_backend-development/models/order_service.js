const { Sequelize, Model } = require('sequelize');

const OrderService = (sequelize) => {
  /* Extending the OrderService model from the sequilize Model class */
  class OrderServiceModel extends Model {}

  /* initiating the OrderService model schema */

  const DT = Sequelize.DataTypes;

  OrderServiceModel.init(
    {
      orderServiceId: {
        type: DT.UUID,
        field: 'order_service_id',
        primaryKey: true,
        defaultValue: DT.UUIDV4,
      },
      serviceName: {
        type: DT.STRING, // WINconnect
        field: 'service_name',
        allowNull: false,
      },
      type: {
        type: DT.ENUM('Primary', 'Add-on'), // WINconnect
        allowNull: false,
      },
      serviceRefId: {
        type: DT.UUID, // WINconnect
        field: 'service_reference_id',
        allowNull: false,
      },
      hide: {
        type: DT.BOOLEAN,
        defaultValue: 0,
        allowNull: false,
      },
      hiddenDate: {
        type: DT.DATE,
        field: 'hidden_date',
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'order_service',
      timestamps: true,
      paranoid: true,
    }
  );
};

module.exports = OrderService;
