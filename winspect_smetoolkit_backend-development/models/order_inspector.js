const { Sequelize, Model } = require('sequelize');

const OrderInspector = (sequelize) => {
  /* Extending the OrderInspector model from the sequilize Model class */
  class OrderInspectorModel extends Model {}

  /* initiating the OrderInspector model schema */

  const DT = Sequelize.DataTypes;

  OrderInspectorModel.init(
    {
      orderInspectorId: {
        type: DT.UUID,
        field: 'order_inspector_id',
        primaryKey: true,
        defaultValue: DT.UUIDV4,
      },
      inspectorRefId: {
        type: DT.UUID,
        field: 'inspector_reference_id', // WINconnect
        allowNull: false,
      },
      inspectorDisplayName: {
        type: DT.STRING,
        field: 'inspector_display_name',
        allowNull: false,
      },
      isPrimary: {
        type: DT.BOOLEAN,
        field: 'is_primary',
        allowNull: false,
        defaultValue: 0,
      },
      inspectorEmail: {
        type: DT.STRING,
        field: 'inspector_email',
        allowNull: false,
      },
      inspectorMobile: {
        type: DT.STRING,
        field: 'inspector_mobile',
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'order_inspector',
      timestamps: true,
      paranoid: true,
    }
  );
};

module.exports = OrderInspector;
