const { Sequelize, Model } = require('sequelize');
const crypto = require('crypto');
const messages = require('../helpers/messages');
const { ServerError, BadRequestError, NotFoundError, HttpError } = require('../helpers/error');

const SmeUser = (sequelize) => {
  const SALT_LENGTH = 16;
  const KEY_LENGTH = 64;

  /* Extending the Sme User model from the sequilize Model class */
  class SmeUserModel extends Model {
    checkPassword$(password) {
      const hash = this._hashPassword(password, this.salt);

      if (hash !== this.passwordHash) {
        throw new BadRequestError(messages.smeUser.INVALID_CREDENTIALS);
      }
    }

    _generateSalt() {
      const salt = crypto.randomBytes(SALT_LENGTH);

      return salt.toString('hex');
    }

    _hashPassword(password, salt) {
      const hash = crypto.scryptSync(password, salt, KEY_LENGTH);

      return hash.toString('hex');
    }
  }

  /* Override to JSON to exclude the password */
  SmeUserModel.prototype.toJSON = function () {
    const values = { ...this.get() };

    delete values.passwordHash;
    delete values.salt;
    delete values.passwordTimestamp;
    return values;
  };

  /* initiating the User model schema */

  const DT = Sequelize.DataTypes;

  SmeUserModel.init(
    {
      smeUserId: {
        type: DT.UUID,
        field: 'sme_user_id',
        primaryKey: true,
        defaultValue: DT.UUIDV4,
      },
      passwordHash: {
        type: DT.STRING,
        field: 'password_hash',
        allowNull: true,
      },
      salt: {
        type: DT.STRING,
        allowNull: true,
      },
      password: {
        type: DT.VIRTUAL,
        set(password) {
          const salt = this._generateSalt();
          this.setDataValue('salt', salt);
          this.setDataValue('passwordHash', this._hashPassword(password, salt));
        },
      },
      // userRefId: {
      //   type: DT.UUID,
      //   field: 'user_reference_id', // WINconnect
      //   unique: true,
      //   allowNull: false,
      // },
      isSuperAdmin: {
        type: DT.BOOLEAN,
        field: 'is_super_admin',
        defaultValue: 0,
        allowNull: false,
      },
      isTempPassword: {
        type: DT.BOOLEAN,
        field: 'is_temporary_password',
        defaultValue: 1,
        allowNull: false,
      },
      isActive: {
        type: DT.BOOLEAN,
        field: 'is_active',
        allowNull: false,
        defaultValue: 1,
      },
      email: {
        type: DT.STRING,
        allowNull: false,
        unique: true,
      },
      passwordTimestamp: {
        type: DT.DATE,
        field: 'password_timestamp',
        allowNull: true,
      },
      first: {
        type: DT.STRING,
        allowNull: true,
      },
      last: {
        type: DT.STRING,
        allowNull: true,
      },
      // imageLocation: {
      //   type: DT.STRING,
      //   field: 'image_location',
      //   allowNull: true,
      //   // defaultValue: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/`,
      // },
      // showWelcome: {
      //   type: DT.BOOLEAN,
      //   field: 'show_welcome',
      //   allowNull: false,
      //   defaultValue: 1,
      // },
      // showClosure: {
      //   type: DT.BOOLEAN,
      //   field: 'show_closure',
      //   allowNull: false,
      //   defaultValue: 1,
      // },
    },
    {
      sequelize,
      modelName: 'sme_user',
      timestamps: true,
      paranoid: true,
    }
  );
};

module.exports = SmeUser;
