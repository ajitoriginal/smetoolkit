const { Op } = require('sequelize');
const sequelize = require('../database/index');
const { models } = require('../database/index');
const messages = require('../helpers/messages');
const { createApiToken, createRefreshToken, validatePassword } = require('../helpers/utils');
const { ServerError, BadRequestError, NotFoundError, HttpError, handleKnownErrors } = require('../helpers/error');

const manualLogin = async (req) => {
  const { email, password } = req.body;
  try {
    // check if user exists in db
    const smeUser = await models.sme_user.findOne({
      where: { email, isActive: 1 },
    });

    if (!smeUser) {
      throw new BadRequestError(messages.smeUser.INVALID_CREDENTIALS);
    }

    // validate password
    smeUser.checkPassword$(password);

    const accessToken = createApiToken({
      id: smeUser.smeUserId,
      email: smeUser.email,
      isSuperAdmin: smeUser.isSuperAdmin,
    });

    const refreshToken = createRefreshToken({
      id: smeUser.smeUserId,
      email: smeUser.email,
      isSuperAdmin: smeUser.isSuperAdmin,
    });

    const returnData = {
      id: smeUser.userId,
      email: smeUser.email,
      isTempPassword: smeUser.isTempPassword,
      first: smeUser.first,
      last: smeUser.last,
      isSuperAdmin: smeUser.isSuperAdmin,
      winspectSMEtoolkit: { accessToken, refreshToken },
    };

    return returnData;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const changePassword = async (req) => {
  const { newPassword, currentPassword } = req.body;
  const { id } = req.smeUser;
  try {
    if (!(newPassword && currentPassword)) {
      throw new Error(messages.general.INVALID_INPUT);
    }

    const user = await models.sme_user.findOne({
      where: {
        smeUserId: id,
        isActive: 1,
      },
    });

    if (!user) {
      throw new Error(messages.user.USER_NOT_FOUND);
    }
    // validate password
    user.checkPassword$(currentPassword);

    // Check password strength
    if (validatePassword(newPassword) !== true) {
      const errorMessage = validatePassword(newPassword);
      throw new Error(errorMessage);
    }

    // Update password
    await user.update({
      password: newPassword,
      isTempPassword: 0,
    });

    return;
  } catch (e) {
    throw new Error(e.message);
  }
};

const register = async (req) => {
  const { first, last, email, password } = req.body;
  try {
    const createdUser = await models.sme_user.create({
      first,
      last,
      email,
      password,
      isTempPassword: 0,
    });

    return createdUser;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  manualLogin,
  changePassword,
  register,
};
