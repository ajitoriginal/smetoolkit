import { useState, useEffect } from "react";
import styles from "./table.module.scss";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import Modal from "../common/modal";
import { APIurl } from "../../utils/storage";
import WarningModal from "../common/modals/warning-modal";
import { url } from "../../utils/url";

export default function Table({
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
  const viewOnly = (
    requireAttachment,
    Toc,
    hasLocation,
    masterTempID,
    tempID,
    services,
    draft,
    name,
    hasDefinition,
    hasDisclosure,
  ) => {
    router.push(`/template`);
    localStorage.setItem(
      "requireAttachment",
      JSON.stringify(requireAttachment),
    );
    localStorage.setItem("Toc", JSON.stringify(Toc));
    localStorage.setItem("hasLocation", JSON.stringify(hasLocation));
    localStorage.setItem("masterTempID", JSON.stringify(masterTempID));
    localStorage.setItem("templateID", JSON.stringify(tempID));
    localStorage.setItem("Services", JSON.stringify(services));
    localStorage.setItem("isDraft", JSON.stringify(draft));
    localStorage.setItem("name", JSON.stringify(name));
    localStorage.setItem("hasDefinition", JSON.stringify(hasDefinition));
    localStorage.setItem("hasDisclosure", JSON.stringify(hasDisclosure));
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

  //access template
  const [accessModal, setAccessModal] = useState(false);
  const [accessIndex, setAccessIndex] = useState("");
  const close = () => {
    setAccessModal(false);
    setOfficeId();
  };

  const [officeId, setOfficeId] = useState();
  const [accessId, setAccessId] = useState([]);

  async function giveAccesstoAll(id) {
    let result = await fetch(`${api}api/v1/office?masterTemplateId=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
    });

    result = await result.json();
    if (result.status == 200) {
      setOfficeId(result.body);
    }

    let myArrayFiltered = result.body?.filter(
      (item) => item.office_templates.length > 0,
    );
    myArrayFiltered = myArrayFiltered.map((item) => item.officeId);
    setAccessId(myArrayFiltered);
  }

  //for giving access to company keys
  const deleteByValue = (value) => {
    setAccessId((accessId) => {
      return accessId.filter((accessId) => accessId !== value);
    });
  };
  async function settingAccess(id, name) {
    let result = await fetch(`${api}api/v1/office/template-access`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
      body: JSON.stringify({
        officeIds: accessId,
        masterTemplateId: id,
      }),
    });
    result = await result.json();
    if (result.status == 200) {
      setLoader(false);
      publishedTemplate(0);
      toastFunc(true);
      setToastMessage(`Company Key access has been updated for ${name}`);
    }
  }

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
            {head?.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
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
                      item?.templates[0]?.requireAttachment,
                      item?.templates[0]?.hasToc,
                      item?.templates[0]?.hasLocation,
                      item?.masterTemplateId,
                      item?.templates[0].templateId,
                      item?.services,
                      item?.templates[0]?.isDraft,
                      "",
                      item?.templates[0]?.hasDefinition,
                      item?.templates[0]?.hasDisclosure,
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
                            alt={`${item?.name} icon`}
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
                          setAccessModal(true);
                          setAccessIndex(index);
                          giveAccesstoAll(item.masterTemplateId);
                          setOfficeId();
                          setAccessId();
                          document.body.classList.add("hidden");
                        }}
                      >
                        Give access to
                      </button>

                      {accessModal && index == accessIndex && (
                        <div
                          className={`${styles.modalAccess} dFlex alignC justifyC`}
                        >
                          <div className={styles.access}>
                            <div
                              className={`${styles.Accessheader} dFlex alignC justifySB`}
                            >
                              <h3>Give access to</h3>
                              <span
                                onClick={() => {
                                  close();
                                  document.body.classList.remove("hidden");
                                }}
                              >
                                <img alt="close icon" src="/images/close.svg" />
                              </span>
                            </div>

                            <div className={styles.accessContent}>
                              <div className={styles.selectAll}>
                                {() => {
                                  if (accessId.length == officeId.length) {
                                    return (
                                      <span onClick={() => setAccessId([])}>
                                        Unselect All
                                      </span>
                                    );
                                  } else {
                                    return (
                                      <span
                                        onClick={() =>
                                          setAccessId(
                                            officeId.map(
                                              (item) => item.officeId,
                                            ),
                                          )
                                        }
                                      >
                                        Select All
                                      </span>
                                    );
                                  }
                                }}
                              </div>

                              <ul className={styles.accessList}>
                                {officeId?.map((item, index) => (
                                  <li
                                    key={index}
                                    onClick={() => {
                                      if (accessId?.includes(item.officeId)) {
                                        deleteByValue(item.officeId);
                                      } else {
                                        setAccessId((accessId) => [
                                          ...accessId,
                                          item.officeId,
                                        ]);
                                      }
                                    }}
                                  >
                                    <span
                                      className={
                                        accessId?.includes(item.officeId)
                                          ? styles.active
                                          : ""
                                      }
                                    ></span>
                                    {item.companyKey},{" "}
                                    <strong>{item.manager}</strong>, {item.city}
                                  </li>
                                ))}
                              </ul>

                              <div
                                className={`${styles.btnWrapper} dFlex alignC justifySB`}
                              >
                                <p>
                                  {accessId?.length} company key is Selected
                                </p>
                                <button
                                  className="btn gradient-btn"
                                  onClick={() => {
                                    settingAccess(
                                      item?.masterTemplateId,
                                      item?.name,
                                    );
                                    setLoader(true);
                                    close();
                                    document.body.classList.remove("hidden");
                                  }}
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
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
                      item?.requireAttachment,
                      item?.hasToc,
                      item?.hasLocation,
                      item?.master_template.masterTemplateId,
                      item?.templateId,
                      item?.services,
                      item?.isDraft,
                      item.master_template?.name,
                      item?.hasDefinition,
                      item?.hasDisclosure,
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
                            alt={`${item?.name} icon`}
                          />
                        ) : (
                          <img
                            src="/images/placeholder-icon.svg"
                            alt={`${item?.name} icon`}
                          />
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
