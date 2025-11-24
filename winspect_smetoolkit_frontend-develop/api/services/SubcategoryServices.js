import api from "../index";

class SubcategoryServices {
  static getSubcategories(categoryId, router, showNotification) {
    return api({
      endpoint: `api/v1/template/sub-categories?templateCategoryId=${categoryId}`,
      usingAuthToken: true,
      showNotification,
      router,
    });
  }
  static deleteSubCategory(data, router, showNotification) {
    return api({
      endpoint: `api/v1/template/sub-categories`,
      usingAuthToken: true,
      method: "DELETE",
      data,
      showNotification,
      router,
    });
  }
  static getSubcategoryDetail(subCategoryId, router, showNotification) {
    return api({
      endpoint: `api/v1/template/sub-categories/detail?templateSubCategoryId=${subCategoryId}`,
      usingAuthToken: true,
      showNotification,
      router,
    });
  }
  static copySubCategory(data, router, showNotification) {
    return api({
      endpoint: `api/v1/template/sub-categories/copy`,
      usingAuthToken: true,
      method: "PUT",
      data,
      showNotification,
      router,
    });
  }

  static reorderAllSubCategories(data, router, showNotification) {
    return api({
      endpoint: `api/v1/template/sub-categories/reorder/all`,
      usingAuthToken: true,
      method: "PUT",
      data,
      showNotification,
      router,
    });
  }
}

export default SubcategoryServices;
