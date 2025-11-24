import { useState } from "react";
import styles from "../../modal.module.scss";
import { APIurl } from "../../../../utils/storage";
import { useRouter } from "next/router";
import { url } from "../../../../utils/url";
import useGenerateStore from "../../../../stores/generalStore";

const Step1 = (props) => {
  const router = useRouter();
  const api = APIurl();
  const {
    setActiveSlide,
    setLoader,
    local,
    selectedTemplate,
    nextTemplateVersion,
    presignedForTemplate,
    templateId,
  } = props;

  const [tempExist, setTempExist] = useState();
  const [templateStyle, setTemplateStyle] = useState("Blank");
  const { setShowAddDraftPopup } = useGenerateStore();

  // for adding blank draft template
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
  return (
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
          className={templateStyle === "Prebuild" ? styles.active : ""}
        >
          <img src="/images/prebuilttemplate.svg" alt="blank template" />
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
  );
};

export default Step1;
