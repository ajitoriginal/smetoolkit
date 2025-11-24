import api from "../index";

class AboutNotesServices {
  static getAboutNotes(subcategoryId, router, showNotification) {
    return api({
      endpoint: `api/v1/template/sub-categories/detail?templateSubCategoryId=${subcategoryId}`,
      usingAuthToken: true,
      showNotification,
      router,
    });
  }
  static deleteAboutNotes(data, router, showNotification) {
    return api({
      endpoint: `api/v1/template/about`,
      usingAuthToken: true,
      method: "DELETE",
      data,
      showNotification,
      router,
    });
  }
}

export default AboutNotesServices;
