import api from "../index";
class TemplateServices {
  static getPublishedTemplate(router, showNotification) {
    return api({
      endpoint: "api/v1/template/master?pageIndex=0&pageSize=100",
      usingAuthToken: true,
      showNotification,
      router,
    });
  }
  static getDraftTemplate(router, showNotification) {
    return api({
      endpoint: "api/v1/template/draft?pageIndex=0&pageSize=100",
      usingAuthToken: true,
      showNotification,
      router,
    });
  }

  static updateDraftTemplate(data, router, showNotification) {
    return api({
      endpoint: `api/v1/template/draft`,
      usingAuthToken: true,
      method: "PUT",
      data,
      showNotification,
      router,
    });
  }

  static getMasterTemplateDetail(masterTemplateID, router, showNotification) {
    return api({
      endpoint: `api/v1/template/published?masterTemplateId=${masterTemplateID}`,
      usingAuthToken: true,
      showNotification,
      router,
    });
  }
  static getTemplateDetail(templateID, router, showNotification) {
    return api({
      endpoint: `api/v1/template/info?templateId=${templateID}`,
      usingAuthToken: true,
      showNotification,
      router,
    });
  }

  static republishTemplate(data, router, showNotification) {
    return api({
      endpoint: `api/v1/template/republish`,
      usingAuthToken: true,
      method: "POST",
      data,
      showNotification,
      router,
    });
  }

  static publishTemplate(data, router, showNotification) {
    return api({
      endpoint: `api/v1/template/publish`,
      usingAuthToken: true,
      method: "POST",
      data,
      showNotification,
      router,
    });
  }
}

export default TemplateServices;
