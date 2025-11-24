const { controllerBuilder } = require('../helpers/utils');
const messages = require('../helpers/messages');

const { manualLogin, changePassword, register } = require('../services/auth');

const login = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Manual Login',
    serviceCall: manualLogin,
    serviceData: req,
    successMsg: messages.smeUser.SIGNIN_SUCCESS,
  });

  return res.status(response.status).send(response);
};

const changeUserPassword = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Change Password',
    serviceCall: changePassword,
    serviceData: req,
    successMsg: 'Password Updated Successfully',
  });

  return res.status(response.status).send(response);
};

const registerUser = async (req, res) => {
  /* Call the controller builder */
  const response = await controllerBuilder({
    controllerName: 'Register User',
    serviceCall: register,
    serviceData: req,
    successMsg: 'User Registered Successfully',
  });

  return res.status(response.status).send(response);
};

module.exports = {
  login,
  changeUserPassword,
  registerUser,
};
