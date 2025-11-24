import Select from "react-select";
import styles from "../../modal.module.scss";
import { APIurl } from "../../../../utils/storage";
import { useState } from "react";
import DropdownIndicator from "../../dropdown-indicator";
const Step0 = (props) => {
  const {
    createNewstate,
    options,
    templateId,
    selectedTemplate,
    nextTemplateVersion,
    setNextTemplateVersion,
    setLoader,
    local,
    setPresignedForTemplate,
    setActiveSlide,
    allTemplates,
    generateNextVersion,
    setTemplateId,
    setSelectedTemplate,
  } = props;

  const api = APIurl();

  const [selectedImageCategory, setSelectedImageCategory] = useState();

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

  /**
   * Handle event when template dropdown gets change
   * @author Sadikali
   * @param e:{label, value} of option
   */
  const handleTemplateDropdownChange = async (e) => {
    const nextVersion = await generateNextVersion(e.value.masterTemplateId);

    setSelectedImageCategory(
      `${e.value.templates[0].iconImageLocation}${e.value.templates[0].iconImageKey}`,
    );
    setPresignedForTemplate(e.value.templates[0].iconImageKey);
    setNextTemplateVersion(nextVersion);

    setTemplateId(e.label);
    setSelectedTemplate(e.value);
    setVersionShowError(false);
    localStorage.setItem("name", `"${e.value.name}"`);
  };

  const [versionShowError, setVersionShowError] = useState(false);
  return (
    <div>
      {createNewstate ? (
        ""
      ) : (
        <div className={styles.inputWrapper}>
          <label>Which template do you want to create the draft for?*</label>
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
      {selectedTemplate && selectedTemplate?.services && (
        <div className={styles.includedServices}>
          Services included({selectedTemplate.services?.length}) -{" "}
          {selectedTemplate.services?.map((service, index) => {
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
        {versionShowError && <p className="error">Template already exists</p>}
      </div>
      <div className="inputAttachment">
        <h6 className="dFlex alignC justifySB">
          <label>Attach Logo*</label>
          {/* {selectedImageCategory && (
            <h6 className="dFlex">
              File Uploaded: {selectedImageCategory.name}
              <button onClick={() => setSelectedImageCategory("")}>
                <img alt="delete icon" src="/images/delete.svg" />
              </button>
            </h6>
          )} */}
        </h6>
        <div>
          {selectedImageCategory ? (
            <div className="image-name-wrapper">
              <img
                src={
                  selectedImageCategory.name
                    ? URL.createObjectURL(selectedImageCategory)
                    : selectedImageCategory
                }
                alt="uploaded images"
                className="uploade-img-large"
              />
              <div className="filename">
                {selectedImageCategory.name
                  ? selectedImageCategory.name
                  : selectedImageCategory.substring(
                      selectedImageCategory.lastIndexOf("/") + 1,
                    )}
                <div className="file-input-wrapper">
                  <input
                    type="file"
                    accept="image/x-png"
                    onChange={(e) =>
                      setSelectedImageCategory(e.target.files[0])
                    }
                  />
                  Upload New
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                  >
                    <path
                      d="M12.1667 4.66699L18 10.5003M18 10.5003L12.1667 16.3337M18 10.5003H3"
                      stroke="#005982"
                      stroke-width="1.90476"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ) : (
            <>
              <input
                type="file"
                accept="image/x-png"
                onChange={(e) => setSelectedImageCategory(e.target.files[0])}
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
            if (selectedImageCategory.name) {
              tempPresignedFun();
              setLoader(true);
            } else {
              setActiveSlide(1);
            }
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
  );
};

export default Step0;
