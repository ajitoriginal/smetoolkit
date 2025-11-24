import Select from "react-select";
import styles from "../../modal.module.scss";
import { useEffect, useState } from "react";
import { APIurl } from "../../../../utils/storage";
import { useRouter } from "next/router";
import DropdownIndicator from "../../dropdown-indicator";
import { url } from "../../../../utils/url";
import useGenerateStore from "../../../../stores/generalStore";
const Step2 = (props) => {
  const {
    setActiveSlide,

    publish,
    preBuildVersion,
    setPreBuildVersion,
    getLatestVersion,

    setLoader,
    local,
    selectedTemplate,
    nextTemplateVersion,
    presignedForTemplate,
  } = props;
  const api = APIurl();
  const router = useRouter();
  const [pretempExist, setPretempExist] = useState();
  const [selectedCopyTemplate, setSelectedCopyTemplate] = useState();
  const [fetchVersionv, setFetchVersionv] = useState([]);
  const [preoptions, setPreoptions] = useState([]);
  const { setShowAddDraftPopup } = useGenerateStore();

  useEffect(() => {
    const options = [];
    const data = sortVersion(fetchVersionv);
    data?.map((item) => {
      options.push({ value: item.templateId, label: item.version });
    });
    setPreoptions([...options]);
    setPreBuildVersion(options[0]?.label);
  }, [fetchVersionv]);

  const preoptionsservice = [];

  publish?.map((item) => {
    if (item.templates.length > 0) {
      preoptionsservice.push({
        value: item,
        label: item.name,
      });
    }
  });

  const handleCopyTemplateChange = async (e) => {
    const allTemplate = await getLatestVersion(e.value.masterTemplateId);
    setSelectedCopyTemplate(e);
    setFetchVersionv(allTemplate);
    setPreBuildVersion("");
  };

  // for adding prebuild draft template

  async function createTemplatePrebuild() {
    let templateId = null;

    for (const template of fetchVersionv) {
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
      setShowAddDraftPopup(false);
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
  return (
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
        <label>Which template do you want to copy the data from?*</label>
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
  );
};
export default Step2;
