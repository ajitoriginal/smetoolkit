import api from "../index";

class CategoryServices {
  static getCategories(templateId, router, showNotification) {
    return api({
      endpoint: `api/v1/template/categories?templateId=${templateId}`,
      usingAuthToken: true,
      showNotification,
      router,
    });
  }

  static addCategory(data, router, showNotification) {
    return api({
      endpoint: `api/v1/template/categories`,
      usingAuthToken: true,
      method: "POST",
      data,
      showNotification,
      router,
    });
  }

  static reorderCategories(data, router, showNotification) {
    return api({
      endpoint: `api/v1/template/categories/reorder`,
      usingAuthToken: true,
      method: "PUT",
      data,
      showNotification,
      router,
    });
  }

  static reorderAllCategories(data, router, showNotification) {
    return api({
      endpoint: `api/v1/template/categories/reorder/all`,
      usingAuthToken: true,
      method: "PUT",
      data,
      showNotification,
      router,
    });
  }

  static togglePrintOffCategory(data, router, showNotification) {
    return api({
      endpoint: `api/v1/template/categories`,
      usingAuthToken: true,
      method: "PUT",
      data,
      showNotification,
      router,
    });
  }

  static deleteCategory(data, router, showNotification) {
    return api({
      endpoint: `api/v1/template/categories`,
      usingAuthToken: true,
      method: "DELETE",
      data,
      showNotification,
      router,
    });
  }

  static copyCategory(data, router, showNotification) {
    return api({
      endpoint: `api/v1/template/categories/copy`,
      usingAuthToken: true,
      method: "PUT",
      data,
      showNotification,
      router,
    });
  }
}

export default CategoryServices;
