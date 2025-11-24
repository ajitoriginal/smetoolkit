import api from "../index";

class RemarkServices {
  static getFavouriteRemarks(templateId, router, showNotification) {
    return api({
      endpoint: `api/v1/template/remark/favourite?templateId=${templateId}`,
      usingAuthToken: true,
      showNotification,
      router,
    });
  }

  static addRemark(data, router, showNotification) {
    return api({
      endpoint: `api/v1/template/remark`,
      usingAuthToken: true,
      method: "POST",
      data,
      showNotification,
      router,
    });
  }

  static editRemark(data, router, showNotification) {
    return api({
      endpoint: `api/v1/template/remark`,
      usingAuthToken: true,
      method: "PUT",
      data,
      showNotification,
      router,
    });
  }

  static deleteRemark(data, router, showNotification) {
    return api({
      endpoint: `api/v1/template/remark`,
      usingAuthToken: true,
      method: "DELETE",
      data,
      showNotification,
      router,
    });
  }

  static hideRemark(data, router, showNotification) {
    return api({
      endpoint: `api/v1/template/remark/hide`,
      usingAuthToken: true,
      method: "PUT",
      data,
      showNotification,
      router,
    });
  }

  static recoverRemark(data, router, showNotification) {
    return api({
      endpoint: `api/v1/template/remark/recover`,
      usingAuthToken: true,
      method: "PUT",
      data,
      showNotification,
      router,
    });
  }

  static moveRemarkToTemplate(data, router, showNotification) {
    return api({
      endpoint: `api/v1/template/remark/type`,
      usingAuthToken: true,
      method: "PUT",
      data,
      showNotification,
      router,
    });
  }

  static getTemplateRemark(query, router, showNotification) {
    return api({
      endpoint: `api/v1/template/remark?${query}`,
      usingAuthToken: true,
      showNotification,
      router,
    });
  }

  static getCompanyList(templateId, router, showNotification) {
    return api({
      endpoint: `api/v1/template/remark/office?templateId=${templateId}`,
      usingAuthToken: true,
      showNotification,
      router,
    });
  }

  static getCustomRemarkAuthorList(templateId, router, showNotification) {
    return api({
      endpoint: `api/v1/template/remark/custom-remark-authors?templateId=${templateId}`,
      usingAuthToken: true,
      showNotification,
      router,
    });
  }

  static getGroupRemark(
    nearestTemplateRemarkId,
    isDraft,
    router,
    showNotification,
  ) {
    return api({
      endpoint: `api/v1/template/remark/custom/group?nearestTemplateRemarkId=${nearestTemplateRemarkId}&isDraft=${isDraft}`,
      usingAuthToken: true,
      showNotification,
      router,
    });
  }

  static copyRemark(data, router, showNotification) {
    return api({
      endpoint: `api/v1/template/remark/copy`,
      usingAuthToken: true,
      method: "PUT",
      data,
      showNotification,
      router,
    });
  }
  static deleteRemarkImage(data, router, showNotification) {
    return api({
      endpoint: `api/v1/template/remark/image/remove`,
      usingAuthToken: true,
      method: "DELETE",
      data,
      showNotification,
      router,
    });
  }

  static addRemarkImage(data, router, showNotification) {
    return api({
      endpoint: `api/v1/template/remark/image/path`,
      usingAuthToken: true,
      method: "POST",
      data,
      showNotification,
      router,
    });
  }

  static getOfficeList(data, router, showNotification) {
    return api({
      endpoint: `api/v1/office/remark?templateRemarkId=${data.templateRemarkId}&templateSubCategoryId=${data.templateSubCategoryId}`,
      usingAuthToken: true,
      method: "GET",
      showNotification,
      router,
    });
  }
  static setOfficeRemarkList(data, router, showNotification) {
    return api({
      endpoint: `api/v1/office/remark`,
      usingAuthToken: true,
      method: "PUT",
      data,
      showNotification,
      router,
    });
  }
}

export default RemarkServices;
