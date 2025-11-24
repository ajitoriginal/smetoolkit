import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { components } from "react-select";
import styles from "../../modal.module.scss";
import { APIurl } from "../../../../utils/storage";
import Modal from "../modal-wrapper";
import Step0 from "./step-0";
import ModalHeader from "./modal-header";
import Step1 from "./step-1";
import Step2 from "./step-2";

export default function CreateDraftModal({ createNewstate, close }) {
  const api = APIurl();

  const [publish, setPublish] = useState([]);
  const [loader, setLoader] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState();
  const [options, setOptions] = useState([]);
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

  useEffect(() => {
    const optionList = [];
    if (createNewstate == null) {
      publish?.map((item) => {
        optionList.push({ value: item, label: item.name });
      });
      setOptions(optionList);
    }
  }, [publish]);

  //field values for creating template

  const [activeSlide, setActiveSlide] = useState(0);

  const [preBuildVersion, setPreBuildVersion] = useState();

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

  // to generate presigned url for template icon
  const [presignedForTemplate, setPresignedForTemplate] = useState();

  useEffect(() => {
    if (local) {
      publishedTemplate();
    }
  }, [local]);

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
  return (
    <Modal loader={loader}>
      <ModalHeader
        heading={`Create a Draft Template
          ${createNewstate ? `For ${createNewstate.name}` : ""}`}
        para="Fill out the information below to get started"
        activeSlide={activeSlide}
        close={close}
      />
      {/* for add template */}
      {publish && createNewstate !== undefined && (
        <div className={`${styles.modalSteps} modalstep`}>
          {activeSlide === 0 && (
            <Step0
              options={options}
              templateId={templateId}
              setTemplateId={setTemplateId}
              selectedTemplate={selectedTemplate}
              createNewstate={createNewstate}
              nextTemplateVersion={nextTemplateVersion}
              setNextTemplateVersion={setNextTemplateVersion}
              setLoader={setLoader}
              local={local}
              setPresignedForTemplate={setPresignedForTemplate}
              setActiveSlide={setActiveSlide}
              allTemplates={allTemplates}
              generateNextVersion={generateNextVersion}
              setSelectedTemplate={setSelectedTemplate}
            />
          )}
          {activeSlide === 1 && (
            <Step1
              setLoader={setLoader}
              local={local}
              setActiveSlide={setActiveSlide}
              selectedTemplate={selectedTemplate}
              nextTemplateVersion={nextTemplateVersion}
              presignedForTemplate={presignedForTemplate}
              templateId={templateId}
            />
          )}
          {activeSlide === 2 && (
            <Step2
              setActiveSlide={setActiveSlide}
              publish={publish}
              preBuildVersion={preBuildVersion}
              setPreBuildVersion={setPreBuildVersion}
              getLatestVersion={getLatestVersion}
              setLoader={setLoader}
              local={local}
              selectedTemplate={selectedTemplate}
              nextTemplateVersion={nextTemplateVersion}
              presignedForTemplate={presignedForTemplate}
            />
          )}
          <ul className={styles.dots}>
            <li className={activeSlide === 0 ? styles.active : ""}></li>
            <li className={activeSlide === 1 ? styles.active : ""}></li>
            <li className={activeSlide === 2 ? styles.active : ""}></li>
          </ul>
        </div>
      )}
    </Modal>
  );
}
