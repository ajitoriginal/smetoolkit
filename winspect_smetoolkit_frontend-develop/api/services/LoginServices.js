import api from "../index";

class LoginServices {
  static login(data, router, showNotification) {
    return api({
      endpoint: `api/v1/auth/login/manual`,
      method: "POST",
      data,
      showNotification,
      router,
    });
  }
}

export default LoginServices;
