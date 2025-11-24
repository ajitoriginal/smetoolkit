const { Sequelize, Model } = require('sequelize');
const crypto = require('crypto');
const messages = require('../helpers/messages');
const { BadRequestError } = require('../helpers/error');

const User = (sequelize) => {
  const SALT_LENGTH = 16;
  const KEY_LENGTH = 64;

  /* Extending the User model from the sequilize Model class */
  class UserModel extends Model {
    checkPassword$(password) {
      const hash = this._hashPassword(password, this.salt);

      if (hash !== this.passwordHash) {
        throw new BadRequestError(messages.user.INVALID_PASSWORD);
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
  UserModel.prototype.toJSON = function () {
    const values = { ...this.get() };

    delete values.passwordHash;
    delete values.salt;
    delete values.passwordTimestamp;
    return values;
  };

  /* initiating the User model schema */

  const DT = Sequelize.DataTypes;

  UserModel.init(
    {
      userId: {
        type: DT.UUID,
        field: 'user_id',
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
      userRefId: {
        type: DT.UUID,
        field: 'user_reference_id', // WINconnect
        unique: true,
        allowNull: false,
      },
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
      username: {
        type: DT.STRING,
        allowNull: false,
      },
      passwordTimestamp: {
        type: DT.DATE,
        field: 'password_timestamp',
        allowNull: true,
      },
      signatureImageKey: {
        type: DT.STRING,
        field: 'signature_image_key',
        allowNull: true,
      },
      companySealImageKey: {
        type: DT.STRING,
        field: 'company_seal_image_key',
        allowNull: true,
      },
      imageLocation: {
        type: DT.STRING,
        field: 'image_location',
        allowNull: true,
        // defaultValue: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/`,
      },
      showWelcome: {
        type: DT.BOOLEAN,
        field: 'show_welcome',
        allowNull: false,
        defaultValue: 1,
      },
      showClosure: {
        type: DT.BOOLEAN,
        field: 'show_closure',
        allowNull: false,
        defaultValue: 1,
      },
      license: {
        type: DT.STRING,
        allowNull: true,
      },
      licenseType: {
        type: DT.STRING,
        field: 'license_type',
        allowNull: true,
      },
      photoUrl: {
        type: DT.STRING,
        field: 'photo_url',
        allowNull: true,
      },
      displayName: {
        type: DT.STRING,
        field: 'display_name',
        allowNull: true,
      },
      termAccepted: {
        type: DT.BOOLEAN,
        field: 'term_accepted',
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'user',
      timestamps: true,
      paranoid: true,
    }
  );
};

module.exports = User;
