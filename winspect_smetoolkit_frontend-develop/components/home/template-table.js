import { useState, useEffect } from "react";
import styles from "./table.module.scss";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { APIurl } from "../../utils/storage";
import WarningModal from "../common/modals/warning-modal";
import { url } from "../../utils/url";
import AssignedModal from "./assignedModal/assignedmodal";

export default function TemplateTable({
  head,
  content,
  openAddNew,
  createNew,
  published,
  drafts,
  Service,
  Draft,
  publishedTemplate,
}) {
  const api = APIurl();

  const addNew = (id) => {
    openAddNew(true);
    createNew(id);
    localStorage.setItem("isDraft", JSON.stringify(true));
  };

  let newDate = new Date();
  const router = useRouter();

  //setting local storage
  const viewOnly = (masterTempID, tempID, parentLink) => {
    router.push(`/${parentLink}/${masterTempID}/${tempID}`);
  };

  //calling local storage
  const [local, setlocal] = useState();
  useEffect(() => {
    const isStored = typeof window !== "undefined" && window.localStorage;
    const local = isStored && JSON.parse(localStorage.getItem("userInfo"));
    setlocal(local);
  }, []);

  //publish the template
  const [modal, setModal] = useState(false);
  const [templateIdToPublish, setTemplateIdToPublish] = useState("");

  const [loader, setLoader] = useState(false);
  async function publishTheTemplate(id) {
    setLoader(true);
    let result = await fetch(`${api}api/v1/template/publish`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
      body: JSON.stringify({
        templateId: id,
      }),
    });
    result = await result.json();
    setModal(false);
    if (result.status == 200) {
      setLoader(false);
      setToastMessage("Template published");
      toastFunc(true);
    } else if (result.status == 400) {
      setLoader(false);
      setToastMessage(result.message);
      toastFunc(true, true);
    }
    Draft(0);
    Service();
  }

  //common state for access and assignment
  const [modalLoader, setModalLoader] = useState(false);
  const [searchKey, setSearchKey] = useState("");

  //assignment helpers template
  const [assignmentModel, setAssignmentModel] = useState(false);
  const [officesWithTemplates, setOfficeWithTemplates] = useState([]);
  const fetchOfficesWithTemplates = async (value) => {
    setModalLoader(true);
    let response = await fetch(
      `${api}api/v1/office/templates${value ? "?searchKey=" + value : ""}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "*",
          Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
        },
      },
    );

    response = await response.json();
    if (response.status == 200) {
      setOfficeWithTemplates(response?.body);
      setModalLoader(false);
    }
  };
  //**for step 2
  const [officeTemplates, setOfficeTemplates] = useState({});
  const [publishedTemplates, setPublishedTemplates] = useState([]);
  const setSelectedOffice = (templateData) => {
    // templateData.map((template) => template.masterTemplate.masterTemplateId),
    setOfficeTemplates(
      templateData?.reduce((acc, value, index) => {
        if (value?.masterTemplate?.masterTemplateId) {
          acc[value?.masterTemplate?.masterTemplateId] = true;
        }
        return acc;
      }, {}),
    );
  };
  async function fetchPublishedTemplate() {
    setModalLoader(true);
    let result = await fetch(
      `${api}api/v1/template/master?pageIndex=0&pageSize=100`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
        },
      },
    );
    result = await result.json();
    setPublishedTemplates(result.body.rows);
    setModalLoader(false);
  }

  const handleAssignmentSelection = (templateId) => {
    setOfficeTemplates((prevTemplates) => {
      const updatedTemplates = { ...prevTemplates };

      // Toggle selection
      if (updatedTemplates[templateId] === true) {
        updatedTemplates[templateId] = false; // Mark as removed
      } else {
        updatedTemplates[templateId] = true; // Mark as selected
      }

      return updatedTemplates;
    });
  };

  async function settingAccessForOneOffice(id) {
    setLoader(true);
    let result = await fetch(`${api}api/v1/office/template-access-office`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
      body: JSON.stringify({
        officeId: id,
        masterTemplateIds: Object.keys(officeTemplates).filter((key) => {
          if (officeTemplates[key] == true) {
            return key;
          }
        }),
        removeTemplateList: Object.keys(officeTemplates).filter((key) => {
          if (officeTemplates[key] == false) {
            return key;
          }
        }),
      }),
    });
    result = await result.json();
    if (result.status == 200) {
      setLoader(false);
      toastFunc(true);
      setToastMessage(`Company Key access has been updated`);
    }
    if (result.status != 200) {
      toastFunc(true);
      setToastMessage(`Something went wrong!`);
    }
  }

  //access helpers
  const [accessModal, setAccessModal] = useState("");
  const [officeId, setOfficeId] = useState([]);
  const [accessId, setAccessId] = useState([]);
  const [masterTemplateId, setMasterTemplateId] = useState("");
  async function giveAccesstoAll(id, value) {
    setModalLoader(true);
    let result = await fetch(
      `${api}api/v1/office?masterTemplateId=${id}${
        value ? "&searchKey=" + value : ""
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "*",
          Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
        },
      },
    );

    result = await result.json();
    if (result.status == 200) {
      setOfficeId(result.body);
      setModalLoader(false);
    }

    let myArrayFiltered = result.body?.filter(
      (item) => item.office_templates.length > 0,
    );
    myArrayFiltered = myArrayFiltered.map((item) => item.officeId);
    setAccessId(myArrayFiltered);
  }
  const handleSelection = (id) => {
    setAccessId((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };
  const selectAll = () => {
    setAccessId(officeId.map((item) => item.officeId));
  };

  const unselectAll = () => {
    setAccessId([]);
  };
  async function settingAccess() {
    let result = await fetch(`${api}api/v1/office/template-access`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
      body: JSON.stringify({
        officeIds: accessId,
        masterTemplateId: masterTemplateId,
      }),
    });
    result = await result.json();
    if (result.status == 200) {
      setLoader(false);
      publishedTemplate(0);
      toastFunc(true);
      setToastMessage(`Company Key access has been updated`);
    }
  }

  //common function for access and assignment
  const functionForSearch = (value) => {
    setSearchKey(value);

    if (value.length >= 3 || value.length === 0) {
      if (assignmentModel) {
        fetchOfficesWithTemplates(value);
      } else {
        giveAccesstoAll(masterTemplateId, value);
      }
    }
  };

  const closeModal = () => {
    document.body.classList.remove("hidden");
    setSearchKey("");
    setAccessModal("");
    setAssignmentModel(false);
    setOfficeWithTemplates([]);
    setOfficeId([]);
    setAccessId();
  };

  const [toast, setToast] = useState("");
  const [redToast, setRedToast] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const toastFunc = (value, red = false) => {
    if (red) {
      setRedToast(value);
    } else {
      setToast(value);
    }
    setTimeout(function () {
      setToast("");
      setRedToast("");
    }, 4000);
  };

  return (
    <>
      <table className={styles.tableHome}>
        <thead>
          <tr>
            {head?.map((item, index) => {
              if (published && index == 0) {
                return (
                  <th key={index}>
                    <div>
                      {item}
                      <button
                        className={styles.spAssignment}
                        onClick={() => {
                          setAssignmentModel(true);
                          fetchOfficesWithTemplates();
                          document.body.classList.add("hidden");
                        }}
                      >
                        SP Assignment
                      </button>
                    </div>
                    {assignmentModel && (
                      <AssignedModal
                        type="assignment"
                        templateList={officesWithTemplates}
                        templateCount={content}
                        closeModal={closeModal}
                        searchKey={searchKey}
                        functionForSearch={functionForSearch}
                        modalLoader={modalLoader}
                        officeTemplates={officeTemplates}
                        publishedTemplates={publishedTemplates}
                        setSelectedOffice={setSelectedOffice}
                        fetchPublishedTemplate={fetchPublishedTemplate}
                        handleSelection={handleAssignmentSelection}
                        settingAccessForOneOffice={settingAccessForOneOffice}
                      />
                    )}
                  </th>
                );
              } else {
                return <th key={index}>{item}</th>;
              }
            })}
          </tr>
        </thead>

        {published && (
          <tbody>
            {content?.map((item, index) => {
              const servicesLength = item.services.length;
              return item.templates.length > 0 ? (
                <tr
                  key={index}
                  onClick={() => {
                    viewOnly(
                      item?.masterTemplateId,
                      item?.templates[0].templateId,
                      url.publishTemplates,
                    );
                  }}
                  id={`publishedServiceRow-${index}`}
                >
                  <td>
                    <div>
                      <div className={styles.imageWrapper}>
                        {item?.templates[0]?.iconImageLocation ? (
                          <img
                            src={`${item?.templates[0]?.iconImageLocation}${item?.templates[0]?.iconImageKey}`}
                          />
                        ) : (
                          <img src="/images/placeholder-icon.svg" />
                        )}
                      </div>
                      <div>
                        {item?.name}
                        <div className={styles.serviceList}>
                          <span>
                            Used for {servicesLength} service
                            {servicesLength > 1 && "s"}
                            <div className={styles.serviceListPopup}>
                              {item?.services.map((service, index) => {
                                return `${service.serviceName}${
                                  index < servicesLength - 1 &&
                                  servicesLength > 1
                                    ? ", "
                                    : ""
                                }`;
                              })}
                            </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={styles.displayColum}>
                      {item?.templates[0]?.version}
                      <br />
                      {item?.templates[0]?.updatedAt
                        ? dayjs(item?.templates[0]?.updatedAt).format(
                            "[Since] D MMM YYYY",
                          )
                        : ""}
                    </div>
                  </td>
                  <td>
                    <div className={styles.displayColum}>
                      {item?.templates[0]?.createdAt
                        ? dayjs(item?.templates[0]?.createdAt).format(
                            "MMM D[,] YYYY [at] h:mm A",
                          )
                        : ""}
                      <br />
                      {item?.templates[0]?.createdBy && (
                        <small>
                          By {item?.templates[0]?.createdBy?.first}{" "}
                          {item?.templates[0]?.createdBy?.last}
                        </small>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className={styles.displayColum}>
                      {item?.templates[0]?.publishedAt
                        ? dayjs(item?.templates[0]?.publishedAt).format(
                            "MMM D[,] YYYY [at] h:mm A",
                          )
                        : ""}
                      <br />
                      {item?.templates[0]?.publishedBy && (
                        <small>
                          By {item?.templates[0]?.publishedBy?.first}{" "}
                          {item?.templates[0]?.publishedBy?.last}
                        </small>
                      )}
                    </div>
                  </td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <div>
                      <button
                        id={`giveAccessButton-${index}`}
                        onClick={() => {
                          setAccessModal(index);
                          giveAccesstoAll(item.masterTemplateId);
                          setMasterTemplateId(item.masterTemplateId);
                          document.body.classList.add("hidden");
                        }}
                      >
                        Give access to
                      </button>

                      {index === accessModal && (
                        <AssignedModal
                          type="access"
                          templateList={officeId}
                          templateCount={content}
                          closeModal={closeModal}
                          searchKey={searchKey}
                          functionForSearch={functionForSearch}
                          modalLoader={modalLoader}
                          accessId={accessId}
                          handleSelection={handleSelection}
                          selectAll={selectAll}
                          unselectAll={unselectAll}
                          settingAccess={settingAccess}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                <tr key={index} id={`publishedServiceRow-${index}`}>
                  <td>
                    <div>
                      <div className={styles.imageWrapper}>
                        {item?.templates[0]?.iconImageLocation ? (
                          <img
                            src={`${item?.templates[0]?.iconImageLocation}${item?.templates[0]?.iconImageKey}`}
                          />
                        ) : (
                          <img src="/images/placeholder-icon.svg" />
                        )}
                      </div>
                      <div>
                        {item?.name}
                        <div className={styles.serviceList}>
                          <span>
                            Used for {servicesLength} service
                            {servicesLength > 1 && "s"}
                            {servicesLength > 0 && (
                              <div className={styles.serviceListPopup}>
                                {item?.services.map((service, index) => {
                                  return `${service.serviceName}${
                                    index < servicesLength - 1 &&
                                    servicesLength > 1
                                      ? ", "
                                      : ""
                                  }`;
                                })}
                              </div>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>NIL</div>
                  </td>
                  <td>
                    <div>
                      <button
                        id={`createFromPublished-${index}`}
                        onClick={() => {
                          addNew(item);
                          document.body.classList.add("hidden");
                        }}
                      >
                        Create template
                      </button>
                    </div>
                  </td>
                  <td colSpan="2">
                    <div>NIL</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}
        {drafts && (
          <tbody>
            {content?.map((item, index) => {
              const servicesLength = item.master_template?.services.length;
              return (
                <tr
                  key={index}
                  onClick={() =>
                    viewOnly(
                      item?.master_template.masterTemplateId,
                      item?.templateId,
                      url.draftTemplates,
                    )
                  }
                  id={`draftServiceRow-${index}`}
                >
                  <td>
                    <div>
                      <div className={styles.imageWrapper}>
                        {item?.iconImageLocation ? (
                          <img
                            src={`${item?.iconImageLocation}${item?.iconImageKey}`}
                          />
                        ) : (
                          <img src="/images/placeholder-icon.svg" />
                        )}
                      </div>
                      <div>
                        {item?.master_template?.name}
                        <div className={styles.serviceList}>
                          <span>
                            Used for {servicesLength} service
                            {servicesLength > 1 && "s"}
                            {servicesLength > 0 && (
                              <div className={styles.serviceListPopup}>
                                {item?.master_template?.services.map(
                                  (service, index) => {
                                    return `${service.serviceName}${
                                      index < servicesLength - 1 &&
                                      servicesLength > 1
                                        ? ", "
                                        : ""
                                    }`;
                                  },
                                )}
                              </div>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={styles.displayColum}>
                      {item?.version}
                      <br />
                      <small>
                        {item?.createdAt
                          ? dayjs(newDate).format("D") -
                            dayjs(item?.createdAt).format("D")
                          : ""}{" "}
                        day ago
                      </small>
                    </div>
                  </td>
                  <td>
                    <div className={styles.displayColum}>
                      {item?.createdAt
                        ? dayjs(item?.createdAt).format(
                            "MMM D[,] YYYY [at] h:mm A",
                          )
                        : ""}
                      <br />
                      {item?.createdBy && (
                        <small>
                          By {item?.createdBy?.first} {item?.createdBy?.last}
                        </small>
                      )}
                    </div>
                  </td>
                  <td>
                    <div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setModal(true);
                          setTemplateIdToPublish(item?.templateId);
                        }}
                        id={`createFromDraft-${index}`}
                      >
                        Publish
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {
              <tr>
                <td colSpan="4">
                  <div
                    className={styles.createnew}
                    onClick={() => {
                      addNew(null);
                      document.body.classList.add("hidden");
                    }}
                    id="createNewButton"
                  >
                    <span className={styles.blank}></span>
                    Create new draft
                  </div>
                </td>
              </tr>
            }
          </tbody>
        )}
        {loader && (
          <div className="loader dFlex alignC justifyC">
            <span></span>
          </div>
        )}
      </table>
      {modal && (
        <WarningModal
          heading="Publish the template"
          warning="Are you sure you want to publish this template?"
          btntext="Publish"
          redirect={() => publishTheTemplate(templateIdToPublish)}
          closeFunction={() => {
            setModal(false);
          }}
        />
      )}
      {toast && (
        <p
          className={`poped-message } ${toast ? "active" : ""} ${
            styles.custompop
          }`}
        >
          {toastMessage}
        </p>
      )}
      {redToast && (
        <p
          className={`poped-message red ${redToast ? "active" : ""} ${
            styles.custompop
          }`}
        >
          {toastMessage}
        </p>
      )}
    </>
  );
}
