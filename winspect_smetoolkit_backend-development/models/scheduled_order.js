const { Sequelize, Model } = require('sequelize');

const ScheduledOrder = (sequelize) => {
  /* Extending the Scheduled Order model from the sequilize Model class */
  class ScheduledOrderModel extends Model {}

  /* initiating the Scheduled Order model schema */

  const DT = Sequelize.DataTypes;

  ScheduledOrderModel.init(
    {
      scheduledOrderId: {
        type: DT.UUID,
        field: 'scheduled_order_id',
        primaryKey: true,
        defaultValue: DT.UUIDV4,
      },
      datetime: {
        type: DT.DATE,
        allowNull: false,
      },
      oid: {
        type: DT.INTEGER,
        allowNull: false,
      },
      reportStatus: {
        type: DT.ENUM('In Process', 'Completed', 'Not Started'),
        field: 'report_status',
        allowNull: false,
        defaultValue: 'Not Started',
      },
      isCompleted: {
        type: DT.BOOLEAN,
        field: 'is_completed',
        defaultValue: 0,
        allowNull: false,
      },
      address: {
        type: DT.STRING,
        allowNull: true,
      },
      isSigned: {
        type: DT.BOOLEAN,
        field: 'is_signed',
        allowNull: false,
      },
      orderRefId: {
        type: DT.UUID,
        field: 'order_reference_id', // WINconnect
        unique: true,
        allowNull: false,
      },
      clientRefId: {
        type: DT.UUID,
        field: 'client_reference_id', // WINconnect
        allowNull: true,
      },
      clientDisplayName: {
        type: DT.STRING,
        field: 'client_display_name', // WINconnect
        allowNull: true,
      },
      clientPhone: {
        type: DT.STRING,
        field: 'client_phone', // WINconnect
        allowNull: true,
      },
      clientEmail: {
        type: DT.STRING,
        field: 'client_email', // WINconnect
        allowNull: true,
      },
      buyerAgentRefId: {
        type: DT.UUID,
        field: 'buyer_agent_reference_id', // WINconnect
        allowNull: true,
      },
      buyerAgentDisplayName: {
        type: DT.STRING,
        field: 'buyer_agent_display_name', // WINconnect
        allowNull: true,
      },
      buyerPhone: {
        type: DT.STRING,
        field: 'buyer_phone', // WINconnect
        allowNull: true,
      },
      buyerEmail: {
        type: DT.STRING,
        field: 'buyer_email', // WINconnect
        allowNull: true,
      },
      buyerAgency: {
        type: DT.STRING,
        field: 'buyer_agency', // WINconnect
        allowNull: true,
      },
      buyerPhotoUrl: {
        type: DT.STRING,
        field: 'buyer_photo_url', // WINconnect
        allowNull: true,
      },
      hookUtc: {
        type: DT.DATE,
        field: 'hook_utc', // WINconnect
        allowNull: false,
      },
      latitude: {
        type: DT.DECIMAL(10, 6),
        allowNull: true,
      },
      longitude: {
        type: DT.DECIMAL(10, 6),
        allowNull: true,
      },
      isPaid: {
        type: DT.BOOLEAN,
        field: 'is_paid',
        allowNull: false,
      },
      scheduledByRefId: {
        type: DT.STRING,
        field: 'scheduled_by_reference_id',
        allowNull: true,
      },
      scheduledByName: {
        type: DT.STRING,
        field: 'scheduled_by_name',
        allowNull: true,
      },
      createdByRefId: {
        type: DT.STRING,
        field: 'created_by_reference_id',
        allowNull: true,
      },
      createdByName: {
        type: DT.STRING,
        field: 'created_by_name',
        allowNull: true,
      },
      completedByRefId: {
        type: DT.STRING,
        field: 'completed_by_reference_id',
        allowNull: true,
      },
      completedByName: {
        type: DT.STRING,
        field: 'completed_by_name',
        allowNull: true,
      },
      coverImageKey: {
        type: DT.STRING,
        field: 'cover_image_key',
        allowNull: true,
      },
      coverImageLocation: {
        type: DT.STRING,
        field: 'cover_image_location',
        allowNull: true,
      },
      sellerAgentRefId: {
        type: DT.UUID,
        field: 'seller_agent_reference_id', // WINconnect
        allowNull: true,
      },
      sellerAgentDisplayName: {
        type: DT.STRING,
        field: 'seller_agent_display_name', // WINconnect
        allowNull: true,
      },
      sellerPhone: {
        type: DT.STRING,
        field: 'seller_phone', // WINconnect
        allowNull: true,
      },
      sellerEmail: {
        type: DT.STRING,
        field: 'seller_email', // WINconnect
        allowNull: true,
      },
      sellerAgency: {
        type: DT.STRING,
        field: 'seller_agency', // WINconnect
        allowNull: true,
      },
      reportUrl: {
        type: DT.STRING,
        field: 'report_url',
        allowNull: true,
      },
      clientNotes: {
        type: DT.STRING,
        field: 'client_notes',
        allowNull: true,
      },
      reportNumber: {
        type: DT.STRING,
        field: 'report_number',
        allowNull: true,
      },
      os: {
        type: DT.BOOLEAN,
        allowNull: false,
        default: 0,
      },
      fees: {
        type: DT.INTEGER,
        allowNull: true,
      },
      reportUrlExpiryDate: {
        type: DT.DATE,
        field: 'report_url_expiry_date',
        allowNull: true,
      },
    },

    {
      sequelize,
      modelName: 'scheduled_order',
      timestamps: true,
      paranoid: true,
      indexes: [
        {
          name: 'datetime_index',
          fields: ['datetime'],
        },
      ],
    }
  );
  ScheduledOrderModel.prototype.toJSON = function () {
    const values = { ...this.get() };

    values.latitude = values.latitude ? Number(values.latitude) : values.latitude;
    values.longitude = values.longitude ? Number(values.longitude) : values.longitude;
    values.temperature = values.temperature ? Number(values.temperature) : values.temperature;

    return values;
  };
};

module.exports = ScheduledOrder;
