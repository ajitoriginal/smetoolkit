import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Select from "react-select";
import styles from "./modal.module.scss";
import { APIurl } from "../../utils/storage";
import DropdownIndicator from "./dropdown-indicator";
export default function Modal({
  heading,
  redirect,
  createNewstate,
  para,
  warning,
  btntext,
  closeFunction,
  service,
  templateID,
  setActiveCat,
  categoryAdd,
  categoryEdit,
  categoriesFunc,
  toastFunc,
  item,
  byDefaultName,
  favoriote,
  favorioteLits,
  aboutAndNotesFun,
  findFavorite,
  passingSubCat,
  checkDraft,
  remindermodal,
  itemDetail,
  draftReminder,
}) {
  const api = APIurl();
  const close = () => {
    closeFunction(false);
  };
  const [publish, setPublish] = useState([]);
  const [loader, setLoader] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState();
  const router = useRouter();
  function logout() {
    localStorage.clear();
    router.push("/");
  }
  async function publishedTemplate(e) {
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
    setPublish(result?.body?.rows);

    setLoader(false);
    if (result?.error?.code == "NOT_AUTHORIZED") {
      logout();
    }
  }

  const callBack = (value) => {
    toastFunc(value);
  };

  //calling local storage
  const [local, setlocal] = useState();
  useEffect(() => {
    const isStored = typeof window !== "undefined" && window.localStorage;
    const local = isStored && JSON.parse(localStorage.getItem("userInfo"));
    setlocal(local);
  }, []);

  //service list
  const [templateId, setTemplateId] = useState(
    createNewstate ? createNewstate.templateId : "",
  );
  const options = [];
  if (createNewstate == null) {
    publish?.map((item) => {
      options.push({ value: item, label: item.name });
    });
  }

  const formatOptionLabel = ({ value, label }) => {
    let serviceLength = value?.services.length;
    return (
      <div className={`${styles.optionWrapper} optionWrapper`}>
        <div className={styles.templateName}>{label}</div>
        <div className={`${styles.servicesName} serviceNames`}>
          {serviceLength} services:{" "}
          {value?.services.map((service, index) => {
            return `${service.serviceName}${
              index < serviceLength - 1 && serviceLength > 1 ? ", " : ""
            }`;
          })}
        </div>
      </div>
    );
  };

  //field values for creating template
  const [version, setVersion] = useState();
  const [selectedImageCategory, setSelectedImageCategory] = useState();
  const [templateStyle, setTemplateStyle] = useState("Blank");
  const [activeSlide, setActiveSlide] = useState(0);
  const [preBuildService, setPreBuildService] = useState();
  const [preBuild, setPreBuild] = useState();
  const [preBuildVersion, setPreBuildVersion] = useState();
  const [selectedCopyTemplate, setSelectedCopyTemplate] = useState();
  //sevice list in which templates are available
  const preoptionsservice = [];

  publish?.map((item) => {
    if (item.templates.length > 0) {
      preoptionsservice.push({
        value: item,
        label: item.name,
      });
    }
  });

  const [fetchVersionv, setFetchVersionv] = useState([]);
  const [preoptions, setPreoptions] = useState([]);

  const sortVersion = (data) => {
    // Sort the data by version in descending order
    data.sort((a, b) => {
      // Split version strings into arrays of integers
      const versionA = a.version.split(".").map(Number);
      const versionB = b.version.split(".").map(Number);

      // Compare each segment of the version numbers
      for (let i = 0; i < Math.max(versionA.length, versionB.length); i++) {
        const segmentA = versionA[i] || 0; // If segmentA is undefined, use 0
        const segmentB = versionB[i] || 0; // If segmentB is undefined, use 0

        if (segmentA !== segmentB) {
          return segmentB - segmentA; // Compare in descending order
        }
      }

      // If all segments are equal, sort by templateId
      return b.templateId.localeCompare(a.templateId); // Compare templateId in descending order
    });

    return data;
  };

  useEffect(() => {
    const options = [];
    const data = sortVersion(fetchVersionv);
    data?.map((item) => {
      options.push({ value: item.templateId, label: item.version });
    });
    setPreoptions([...options]);
    setPreBuildVersion(options[0]?.label);
  }, [fetchVersionv]);

  // to generate presigned url for template icon
  const [presignedForTemplate, setPresignedForTemplate] = useState();
  async function tempPresignedFun() {
    let result = await fetch(
      `${api}api/v1/template/presigned-url?masterTemplateId=${
        selectedTemplate.masterTemplateId
      }&type=${
        selectedImageCategory.type.split("/")[1]
      }&version=${nextTemplateVersion}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "image/jpg, image/png",
          Accept: "*",
          Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
        },
      },
    );
    result = await result.json();
    setPresignedForTemplate(result?.body?.Key);
    await fetch(`${result.body.uploadURL}`, {
      method: "PUT",
      body: selectedImageCategory,
    });
    setActiveSlide(1);
    setLoader(false);
  }

  // for adding blank draft template
  const [tempExist, setTempExist] = useState();
  async function createTemplate() {
    let result = await fetch(`${api}api/v1/template/draft`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
      body: JSON.stringify({
        masterTemplateId: selectedTemplate.masterTemplateId,
        version: nextTemplateVersion,
        iconImageKey: presignedForTemplate,
      }),
    });

    result = await result.json();
    setTempExist(result);
    if (result?.status == 200) {
      router.push(
        `${url.draftTemplates}/${result?.body?.masterTemplateId}/${result?.body?.templateId}`,
      );

      localStorage.setItem("templateId", JSON.stringify(templateId));
      localStorage.setItem(
        "templateID",
        JSON.stringify(result?.body?.templateId),
      );
    }
    setLoader(false);
  }
  // for adding prebuild draft template
  const [pretempExist, setPretempExist] = useState();
  async function createTemplatePrebuild() {
    let templateId = null;
    for (const template of selectedCopyTemplate.value.templates) {
      if (template.version === preBuildVersion) {
        templateId = template.templateId;
        break;
      }
    }

    let result = await fetch(`${api}api/v1/template/draft`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
      body: JSON.stringify({
        masterTemplateId: selectedTemplate.masterTemplateId,
        version: nextTemplateVersion.toString(),
        preBuilttemplateId: templateId,
        iconImageKey: presignedForTemplate,
      }),
    });
    result = await result.json();
    setPretempExist(result);
    if (result?.status == 200) {
      router.push(
        `${url.draftTemplates}/${result?.body?.masterTemplateId}/${result?.body?.templateId}`,
      );
      localStorage.setItem("templateId", JSON.stringify(templateId));
      localStorage.setItem(
        "templateID",
        JSON.stringify(result?.body?.templateId),
      );
    }
    setLoader(false);
  }

  //to generate presigned url for category icon
  const format = /[!@#$%^&*_+`~=\[\]{};':"\\|<>?]+/;
  const [specialCharacter, setSpecialCharacter] = useState(false);

  const categoryImageUrl = item
    ? `${item.iconImageLocation}${item.iconImageKey}`
    : null;
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCategoryImage, setSelectedCategoryImage] =
    useState(categoryImageUrl);
  let categoryImage = null;
  if (selectedCategoryImage !== null) {
    const fileName = item?.iconImageKey.split("/").pop();
    categoryImage = {
      name: fileName,
      url: selectedCategoryImage,
    };
  } else if (selectedFile !== null) {
    categoryImage = {
      name: selectedFile.name,
      url: URL.createObjectURL(selectedFile),
    };
  }
  const [name, setName] = useState(byDefaultName);

  async function presignedFun() {
    if (selectedFile !== null) {
      let result = await fetch(
        `${api}api/v1/template/categories/presigned-url?templateId=${
          selectedTemplate?.masterTemplateId ||
          JSON.parse(localStorage.getItem("templateID"))
        }&type=${selectedFile.type.split("/")[1]}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "image/jpg, image/png",
            Accept: "*",
            Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
          },
        },
      );
      setLoader(true);
      result = await result.json();
      await fetch(`${result.body.uploadURL}`, {
        method: "PUT",
        body: selectedFile,
      });
      return result?.body?.Key;
    } else {
      return categoryImage.url.replace(/^https?:\/\/.*\.com\//, "");
    }
  }

  // for adding general subcategory
  async function addSubCategoryGeneral(catid) {
    let result = await fetch(`${api}api/v1/template/sub-categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
      body: JSON.stringify({
        templateCategoryId: catid,
        name: "General",
      }),
    });
  }

  // for adding category
  async function addCategory() {
    let presignedUrl = await presignedFun();
    let result = await fetch(`${api}api/v1/template/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
      body: JSON.stringify({
        templateId: templateID,
        iconImageKey: presignedUrl,
        name: name,
      }),
    });
    result = await result.json();
    if (result.status == 200) {
      callBack("Category Added Successfully");
      addSubCategoryGeneral(result.body.templateCategoryId);
    }

    setLoader(false);
    closeFunction(false);
    setActiveCat(0);
    await categoriesFunc(templateID);
  }

  // for edit category
  async function editCategory() {
    let presignedUrl = await presignedFun();
    let result = await fetch(`${api}api/v1/template/categories`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "*",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
      body: JSON.stringify({
        templateId: templateID,
        iconImageKey: presignedUrl,
        templateCategoryId: item.templateCategoryId,
        name: name,
      }),
    });
    result = await result.json();
    if (result.status == 200) {
      callBack("Category Updated Successfully");
    }

    setLoader(false);
    closeFunction(false);
    setActiveCat(0);
    await categoriesFunc(templateID);
  }

  const [undoSection, setUndoSection] = useState([]);

  async function editFavorite(newSubCat, temRemarkid, favoriteStatus, index) {
    await fetch(`${api}api/v1/template/remark`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "*",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
      body: JSON.stringify({
        templateSubCategoryId: newSubCat,
        templateRemarkId: temRemarkid,
        isFavourite: favoriteStatus,
      }),
    });
    setTimeout(() => {
      aboutAndNotesFun(passingSubCat);
      findFavorite(templateID);
      deleteByUndo(index);
    }, 3000);
  }

  const deleteByUndo = (value) => {
    setUndoSection((undoSection) => {
      return undoSection.filter((undoSection) => undoSection !== value);
    });
  };

  //fetch reminders
  const [locationList, setLocationList] = useState([]);
  async function findReminders(subCatId) {
    let result = await fetch(
      `${api}api/v1/template/sub-categories/reminders?templateSubCategoryId=${subCatId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
        },
      },
    );
    result = await result.json();
    setLocationList(result?.body);
  }

  useEffect(() => {
    if (local) {
      publishedTemplate();
    }
    if (local != null && itemDetail !== undefined) {
      findReminders(itemDetail?.templateSubCategoryId);
    }
  }, [local]);

  // add reminders
  const [disableAdd, setDisableAdd] = useState(false);
  const [locationInput, setLocationInput] = useState();
  async function addingReminders(subID) {
    await fetch(`${api}api/v1/template/sub-categories/reminders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
      body: JSON.stringify({
        templateSubCategoryId: subID,
        description: locationInput,
      }),
    });
    findReminders(subID);
    document.getElementById("locationID").value = "";
    setLocationInput();
    setDisableAdd(false);
  }

  //edit reminder
  const [editLocation, setEditLocation] = useState();
  const [editLocationText, setLocationText] = useState();
  const refInpuEdit = useRef(null);
  async function editingLocation(subID, remindID) {
    await fetch(`${api}api/v1/template/sub-categories/reminders`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
      body: JSON.stringify({
        templateSubCategoryId: subID,
        templateSubCategoryReminderId: remindID,
        description: editLocationText,
      }),
    });
    findReminders(subID);
    setEditLocation();
  }

  //delete reminder
  const [undoSectionRemind, setUndoSectionRemind] = useState([]);

  async function removeReminder(item, index) {
    await fetch(`${api}api/v1/template/sub-categories/reminders`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "*",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
      body: JSON.stringify({
        templateSubCategoryId: itemDetail.templateSubCategoryId,
        templateSubCategoryReminderId: item.templateSubCategoryReminderId,
      }),
    });
    setTimeout(() => {
      findReminders(itemDetail?.templateSubCategoryId);
      deleteByUndoRemind(index);
    }, 5000);
  }

  const deleteByUndoRemind = (value) => {
    setUndoSectionRemind((undoSectionRemind) => {
      return undoSectionRemind.filter(
        (undoSectionRemind) => undoSectionRemind !== value,
      );
    });
  };

  async function undoReminders(subID, desc) {
    await fetch(`${api}api/v1/template/sub-categories/reminders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
      body: JSON.stringify({
        templateSubCategoryId: subID,
        description: desc,
      }),
    });
    findReminders(subID);
  }

  /**
   * Get the latest version of selected template from publish and draft list
   * @author Sadikali
   * @param selectedItem:selected template
   * @returns return next draft version of selected template
   */
  const getLatestVersion = async (masterTemplateId) => {
    let token = JSON.parse(localStorage.getItem("userInfo"));
    let allTemplate = await fetch(
      `${api}api/v1/template/all?masterTemplateId=${masterTemplateId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token?.body.winspectSMEtoolkit.accessToken}`,
        },
      },
    );

    allTemplate = await allTemplate.json();
    return allTemplate.body;
    //
  };

  const [nextTemplateVersion, setNextTemplateVersion] = useState();
  useEffect(() => {
    if (createNewstate !== null && createNewstate !== undefined) {
      const fetchData = async () => {
        try {
          localStorage.setItem("name", JSON.stringify(createNewstate?.name));
          const nextversion = await generateNextVersion(
            createNewstate.masterTemplateId,
          );
          setNextTemplateVersion(nextversion);
          setSelectedTemplate({
            masterTemplateId: createNewstate.masterTemplateId,
            services: createNewstate.services,
            templates: createNewstate.templates,
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [createNewstate]);

  const generateNextVersion = async (masterTemplateId) => {
    const allTemplate = await getLatestVersion(masterTemplateId);

    setAllTemplates(allTemplate);

    // Initialize variables to store the maximum version and corresponding template
    let maxVersion = allTemplate.length > 0 ? allTemplate[0]?.version : 0.9;

    // Iterate through template to find the maximum version
    if (allTemplate.length > 1) {
      allTemplate.forEach((template) => {
        const version = parseFloat(template.version);
        if (version > maxVersion) {
          maxVersion = version;
        }
      });
    }

    maxVersion = parseFloat(maxVersion * 10 + 1) / 10;
    return maxVersion.toFixed(1);
  };

  const [allTemplates, setAllTemplates] = useState([]);
  /**
   * Handle event when template dropdown gets change
   * @author Sadikali
   * @param e:{label, value} of option
   */
  const handleTemplateDropdownChange = async (e) => {
    const nextVersion = await generateNextVersion(e.value.masterTemplateId);

    setNextTemplateVersion(nextVersion);

    setTemplateId(e.label);
    setSelectedTemplate(e.value);
    setVersionShowError(false);
    localStorage.setItem("name", `"${e.value.name}"`);
  };

  const [versionShowError, setVersionShowError] = useState(false);
  /**
   * Check the entered version of selected template from publish and draft list
   * @author Sadikali
   * @returns true / false
   */
  const validateVersion = () => {
    let versionExist = false;
    // Extract templates array from data
    const templates = allTemplates;
    const version = parseFloat(nextTemplateVersion);
    // Initialize variables to store the maximum version and corresponding template

    let publishVersion =
      templates?.length > 0 ? parseFloat(templates[0].version) : 0;
    if (version == publishVersion) {
      versionExist = true;
    }

    // Iterate through templates to find the maximum version
    if (templates?.length > 1) {
      templates.forEach((template) => {
        const templateVersion = parseFloat(template?.version);
        if (version == templateVersion) {
          versionExist = true;
        }
      });
    }

    setVersionShowError(versionExist);
  };

  const handleCopyTemplateChange = async (e) => {
    const allTemplate = await getLatestVersion(e.value.masterTemplateId);

    setPreBuildService(e.value);
    setSelectedCopyTemplate(e);

    setFetchVersionv(allTemplate);
    setPreBuild("");
    setPreBuildVersion("");
  };

  return (
    <div
      className={`${styles.modalWrapper} ${
        activeSlide == 1 ? styles.step2 : styles.step1
      } modalWr  justifyC`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.modalbox}>
        <div
          className={`${styles.header} ${
            activeSlide === 1 ? styles.headerPadding : ""
          } ${activeSlide === 2 ? styles.headerPadding : ""}`}
        >
          <div>
            <h3>{heading}</h3>
            {para && <p className={styles.smalltext}>{para}</p>}
          </div>
          <span
            onClick={() => {
              close();
              document.body.classList.remove("hidden");
            }}
          >
            <img alt="close icon" src="/images/close-white-icon.svg" />
          </span>
        </div>

        {/* for logout */}
        {warning && (
          <div className={styles.modalContent}>
            <p className={styles.warning}>{warning}</p>
            <div className={`${styles.btnWrapper} dFlex alignC justifyC`}>
              <button
                className={`${styles.gradient} btn gradient-btn`}
                onClick={redirect}
              >
                {btntext}
              </button>
              <button className="btn outline-btn" onClick={close}>
                Cancel
              </button>
            </div>
          </div>
        )}
        {/* for add template */}
        {publish && createNewstate !== undefined && (
          <div className={`${styles.modalSteps} modalstep`}>
            {activeSlide === 0 && (
              <div>
                {createNewstate ? (
                  ""
                ) : (
                  <div className={styles.inputWrapper}>
                    <label>
                      Which template do you want to create the draft for?*
                    </label>
                    <Select
                      options={options}
                      formatOptionLabel={formatOptionLabel}
                      components={{ DropdownIndicator }}
                      name="templateId"
                      value={{
                        label: templateId,
                      }}
                      onChange={(e) => {
                        handleTemplateDropdownChange(e);
                      }}
                    />
                  </div>
                )}
                {selectedTemplate && (
                  <div className={styles.includedServices}>
                    Services included({selectedTemplate.services.length}) -{" "}
                    {selectedTemplate.services.map((service, index) => {
                      return `${service.serviceName}${
                        index < selectedTemplate.services.length - 1 &&
                        selectedTemplate.services.length > 1
                          ? ", "
                          : ""
                      }`;
                    })}
                  </div>
                )}
                <div className={styles.inputWrapper}>
                  <label>Enter the version*</label>
                  <input
                    type="text"
                    value={nextTemplateVersion}
                    onBlur={validateVersion}
                    onChange={(e) => {
                      let isValid = /^\d*\.?\d*$/.test(e.target.value);
                      if (isValid) {
                        let enteredVer = e.target.value;
                        setNextTemplateVersion(enteredVer);
                      }
                    }}
                  />
                  {versionShowError && (
                    <p className="error">Template already exists</p>
                  )}
                </div>
                <div className="inputAttachment">
                  <h6 className="dFlex alignC justifySB">
                    <label>Attach Logo*</label>
                    {selectedImageCategory && (
                      <h6 className="dFlex">
                        File Uploaded: {selectedImageCategory.name}
                        <button onClick={() => setSelectedImageCategory("")}>
                          <img alt="delete icon" src="/images/delete.svg" />
                        </button>
                      </h6>
                    )}
                  </h6>
                  <div className={`dFlex justifyC alignC`}>
                    {selectedImageCategory ? (
                      <img
                        src={URL.createObjectURL(selectedImageCategory)}
                        alt="uploaded images"
                        className="uploade-img-large"
                      />
                    ) : (
                      <>
                        <input
                          type="file"
                          accept="image/x-png, image/jpg, image/jpeg"
                          onChange={(e) =>
                            setSelectedImageCategory(e.target.files[0])
                          }
                        />
                        <img src="/images/upload.svg" alt="upload-icon" />
                        <p>
                          Drag and Drop Here <br />
                          or <br />
                          Browse file
                        </p>
                      </>
                    )}
                  </div>
                  <p>Only PNG and JPG are allowed.</p>
                </div>
                <div className={`${styles.btnWrapper}`}>
                  <button
                    className="btn gradient-btn w-100"
                    onClick={() => {
                      setLoader(true);
                      tempPresignedFun();
                    }}
                    disabled={
                      nextTemplateVersion &&
                      (createNewstate || templateId) &&
                      selectedImageCategory &&
                      !versionShowError
                        ? false
                        : true
                    }
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
            {activeSlide === 1 && (
              <div>
                <button
                  className="backbutton"
                  onClick={() => {
                    setActiveSlide(0);
                    setTempExist();
                  }}
                >
                  <img src="/images/back.svg" alt="back button" />
                </button>
                <ul className={styles.template}>
                  <li
                    onClick={() => setTemplateStyle("Blank")}
                    className={templateStyle === "Blank" ? styles.active : ""}
                  >
                    <img src="/images/blanktemplate.svg" alt="blank template" />
                    <h4>Blank Template</h4>
                    <p>Implement your boldest idea with no limits</p>
                  </li>
                  <li
                    onClick={() => setTemplateStyle("Prebuild")}
                    className={
                      templateStyle === "Prebuild" ? styles.active : ""
                    }
                  >
                    <img
                      src="/images/prebuilttemplate.svg"
                      alt="blank template"
                    />
                    <h4>Prebuilt Templates</h4>
                    <p>Edit and use right away any of 4 templates</p>
                  </li>
                </ul>
                {templateStyle === "Blank" ? (
                  <div className={`${styles.btnWrapper}`}>
                    <p className="error">{tempExist?.message}</p>
                    <button
                      className="btn gradient-btn w-100"
                      onClick={() => {
                        setLoader(true);
                        createTemplate();
                        document.body.classList.remove("hidden");
                      }}
                      disabled={tempExist ? true : false}
                    >
                      Finish
                    </button>
                  </div>
                ) : (
                  <div className={`${styles.btnWrapper}`}>
                    <button
                      className="btn gradient-btn w-100"
                      onClick={() => setActiveSlide(2)}
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            )}
            {activeSlide === 2 && (
              <div>
                <button
                  className="backbutton"
                  onClick={() => {
                    setActiveSlide(1);
                    setPretempExist();
                  }}
                >
                  <img src="/images/back.svg" alt="back button" />
                </button>
                <div className={styles.inputWrapper}>
                  <label>
                    Which template do you want to copy the data from?*
                  </label>
                  <Select
                    options={preoptionsservice}
                    components={{ DropdownIndicator }}
                    name="servicename"
                    value={{
                      label: selectedCopyTemplate?.label,
                    }}
                    onChange={handleCopyTemplateChange}
                  />
                </div>
                {/* {preBuildService && ( */}
                <div className={styles.inputWrapper}>
                  <label>Select the version*</label>
                  <Select
                    options={preoptions}
                    components={{ DropdownIndicator }}
                    name="templateId"
                    value={{
                      label: preBuildVersion,
                    }}
                    onChange={(e) => {
                      setPreBuild(e.value);
                      setPreBuildVersion(e.label);
                    }}
                  />
                </div>
                {/* )} */}
                <div className={`${styles.btnWrapper}`}>
                  <p className="error">{pretempExist?.message}</p>
                  <button
                    className="btn gradient-btn w-100"
                    onClick={() => {
                      createTemplatePrebuild();
                      setLoader(true);
                      document.body.classList.remove("hidden");
                    }}
                    disabled={selectedCopyTemplate ? false : true}
                  >
                    Finish
                  </button>
                </div>
              </div>
            )}
            <ul className={styles.dots}>
              <li className={activeSlide === 0 ? styles.active : ""}></li>
              <li className={activeSlide === 1 ? styles.active : ""}></li>
              <li className={activeSlide === 2 ? styles.active : ""}></li>
            </ul>
          </div>
        )}

        {favoriote && (
          <div className={`${styles.modalSteps} ${styles.favoriteList}`}>
            <ul>
              {favorioteLits &&
                favorioteLits.length > 0 &&
                favorioteLits?.map((item, index) => (
                  <li
                    key={index}
                    className={
                      undoSection?.includes(index) ? `${styles.fade}` : ""
                    }
                  >
                    <div className={`dFlex alignC justifySB`}>
                      <div className={styles.leftPart}>
                        <span>
                          {item?.template_subcategory?.template_category?.name}/
                          {item?.template_subcategory?.name}
                        </span>
                        <h3>{item.title}</h3>
                      </div>
                      <div className={styles.rightPart}>
                        <button
                          onClick={() => {
                            const newState = [...undoSection, index];
                            setUndoSection(newState);
                            if (newState.includes(index)) {
                              editFavorite(
                                item?.templateSubCategoryId,
                                item.templateRemarkId,
                                !item?.isFavourite,
                                index,
                              );
                            }
                          }}
                          className={checkDraft ? "" : styles.notWorked}
                        >
                          <img src="/images/favorite.svg" alt="favorite icon" />
                        </button>
                        <span>Click here to remove from Defaults</span>
                      </div>
                    </div>
                    <p>{item?.remark?.replace(/(<([^>]+)>)/gi, "")}</p>
                    <div class={`${styles.boxFade} alignC justifyC`}>
                      <div className="dFlex alignC justifySB">
                        <p>The remark has been removed from Defaults</p>
                        <button
                          onClick={() => {
                            deleteByUndo(index);
                            editFavorite(
                              item?.templateSubCategoryId,
                              item.templateRemarkId,
                              item?.isFavourite,
                              index,
                            );
                          }}
                        >
                          Undo
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        )}

        {/* for add / edit category */}
        {categoriesFunc && (
          <div className={`${styles.modalSteps}`}>
            <div>
              <div className={styles.inputWrapper}>
                <label>Category Name*</label>
                <input
                  type="text"
                  value={name}
                  maxlength="60"
                  placeholder="Enter the Category Name"
                  onChange={(e) => {
                    setName(e.target.value);
                    format.test(e.target.value)
                      ? setSpecialCharacter(true)
                      : setSpecialCharacter(false);
                  }}
                />
                {specialCharacter && (
                  <p className="error left">
                    Special characters are not Allowed!
                  </p>
                )}
                {name?.length == 60 && (
                  <p className="error left">
                    Maximum 60 characters are not Allowed!
                  </p>
                )}
              </div>

              <div className="inputAttachment">
                <h6 className="dFlex alignC justifySB">
                  <label>Attach Logo*</label>
                  {categoryImage && (
                    <h6 className="dFlex">
                      File Uploaded: {categoryImage?.name}
                      <button
                        onClick={() => {
                          setSelectedFile(null);
                          setSelectedCategoryImage(null);
                        }}
                      >
                        <img alt="delete icon" src="/images/delete.svg" />
                      </button>
                    </h6>
                  )}
                </h6>
                <div className={`dFlex justifyC alignC`}>
                  {categoryImage ? (
                    <img
                      src={categoryImage.url}
                      alt="uploaded images"
                      className="uploade-img-large"
                    />
                  ) : (
                    <>
                      <input
                        type="file"
                        accept="image/x-png, image/jpg, image/jpeg"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                      />
                      <img src="/images/upload.svg" alt="upload-icon" />
                      <p>
                        Drag and Drop Here <br />
                        or <br />
                        Browse file
                      </p>
                    </>
                  )}
                </div>
                <p>Only PNG and JPG are allowed.</p>
              </div>

              <div className={`${styles.btnWrapper}`}>
                <button
                  className="btn gradient-btn w-100"
                  onClick={() => {
                    if (categoryAdd) {
                      addCategory();
                    } else if (categoryEdit) {
                      editCategory();
                    }
                  }}
                  disabled={
                    categoryImage !== null && name && !specialCharacter
                      ? false
                      : true
                  }
                >
                  {categoryAdd ? "Add Category" : "Update Category"}
                </button>
              </div>
            </div>
          </div>
        )}

        {remindermodal && (
          <div className={`${styles.locationPopup} ${styles.modalSteps}`}>
            {draftReminder ? (
              <div className={styles.borderBox}>
                <input
                  type="text"
                  placeholder="Add  a Reminder"
                  onChange={(e) => {
                    setLocationInput(e.target.value);
                  }}
                  id="locationID"
                />
                <button
                  className={`${styles.addBtn} ${
                    locationInput?.length > 0 ? styles.addBtnActive : ""
                  }`}
                  onClick={() => {
                    locationInput?.length > 0 ? setDisableAdd(true) : "";
                    locationInput?.length > 0
                      ? addingReminders(itemDetail?.templateSubCategoryId)
                      : "";
                  }}
                  disabled={disableAdd ? true : false}
                >
                  Add
                </button>
              </div>
            ) : (
              ""
            )}
            {locationList &&
              locationList?.length > 0 &&
              locationList?.map((item, index) => (
                <div
                  key={index}
                  className={`${styles.borderBox} ${
                    undoSectionRemind?.includes(index) ? `${styles.fade}` : ""
                  }`}
                >
                  {editLocation === index ? (
                    <>
                      <input
                        type="text"
                        value={editLocationText}
                        onChange={(e) => {
                          setLocationText(e.target.value);
                        }}
                        ref={refInpuEdit}
                      />
                      <button
                        className={`${styles.addBtn} ${
                          editLocationText?.length > 0
                            ? styles.addBtnActive
                            : ""
                        }`}
                        onClick={() => {
                          editLocationText?.length > 0
                            ? editingLocation(
                                itemDetail?.templateSubCategoryId,
                                item?.templateSubCategoryReminderId,
                              )
                            : "";
                        }}
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <p>{item?.description}</p>
                      {draftReminder ? (
                        <div className={styles.menuAction}>
                          <span
                            onClick={() => {
                              setEditLocation(index);
                              setLocationText(item?.description);
                              setTimeout(() => {
                                refInpuEdit.current.focus();
                              }, 50);
                            }}
                          >
                            <img src="/images/editblue.svg" alt="edit icon" />
                          </span>
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              const newState = [...undoSectionRemind, index];
                              setUndoSectionRemind(newState);
                              if (newState.includes(index)) {
                                removeReminder(item, index);
                              }
                            }}
                          >
                            <img src="/images/delete.svg" alt="delete icon" />
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                    </>
                  )}
                  <div class={`${styles.boxFade} alignC justifyC`}>
                    <div className="dFlex alignC justifySB">
                      <p>
                        <strong>
                          &quot;{item?.description ? item?.description : ""}
                          &quot;{" "}
                        </strong>{" "}
                        has been removed from reminders
                      </p>
                      <button
                        onClick={() => {
                          deleteByUndoRemind(index);
                          undoReminders(
                            itemDetail?.templateSubCategoryId,
                            item?.description,
                          );
                        }}
                      >
                        Undo
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Loader */}
      {loader && (
        <div className="loader dFlex alignC justifyC">
          <span></span>
        </div>
      )}
    </div>
  );
}
