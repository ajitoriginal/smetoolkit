import api from "../index";

class AboutValueServices {
  static deleteAboutValues(data, router, showNotification) {
    return api({
      endpoint: `api/v1/template/about`,
      usingAuthToken: true,
      method: "DELETE",
      data,
      showNotification,
      router,
    });
  }
  static copyAboutValues(data, router, showNotification) {
    return api({
      endpoint: `api/v1/template/about/copy`,
      usingAuthToken: true,
      method: "PUT",
      data,
      showNotification,
      router,
    });
  }
}

export default AboutValueServices;
