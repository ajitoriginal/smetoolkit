import React, { useState, useEffect } from "react";
import styles from "./disclouser.module.scss";
import dynamic from "next/dynamic";
import { APIurl } from "../../utils/storage";
import "suneditor/dist/css/suneditor.min.css";
import { toast } from "react-toastify";
const SunEditor = dynamic(() => import("suneditor-react", { buttonList }), {
  ssr: false,
});

export default function Disclosure(props) {
  const { draft, templateID } = props;
  const [loader, setLoader] = useState(true);

  const api = APIurl();
  const [local, setlocal] = useState();

  useEffect(() => {
    const isStored = typeof window !== "undefined" && window.localStorage;
    const local = isStored && JSON.parse(localStorage.getItem("userInfo"));
    const draftval = draft
      ? draft
      : isStored && JSON.parse(localStorage.getItem("isDraft"));
    setlocal(local);
  }, []);

  //fetch disclosure
  const [disclosureData, setDisclosureData] = useState();
  async function callDisclouser() {
    let result = await fetch(
      `${api}api/v1/template/disclosure?templateId=${templateID}`,
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

    if (result.status == 200) {
      setDisclosureData(result.body);
    }
    setLoader(false);
  }

  useEffect(() => {
    if (local != null) {
      callDisclouser();
    }
  }, [local]);

  //edit disclosure
  const [disclosure, setDisclosure] = useState();
  async function updateDisclouser(id, description) {
    setLoader(true);
    let result = await fetch(`${api}api/v1/template/disclosure`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
      body: JSON.stringify({
        templateDisclosureId: id,
        description,
      }),
    });

    if (result.status == 200) {
      result = await result.json();
      toast.success(result.message);
    } else if (
      result.status == 400
      // &&
      // result.message == "templateDisclosureId is required"
    ) {
      result = await result.json();
      if (result.message == "templateDisclosureId is required") {
        let createResult = await fetch(`${api}api/v1/template/disclosure`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
          },
          body: JSON.stringify({
            templateId: templateID,
            description,
          }),
        });
        if (createResult.status == 200) {
          createResult = await createResult.json();
          toast.success(createResult.message);
        }
      }
    }
    setDisclosure(description);
    callDisclouser();
    setLoader(false);
  }

  return (
    <section
      className={`${styles.disclosureSection} disclosureSection sun-editor-editable`}
    >
      <>
        <SunEditor
          height="350"
          setOptions={{
            buttonList: [["bold", "italic", "underline", "list"]],
          }}
          placeholder="Start typing the important information here"
          setContents={disclosureData?.description}
          onChange={(content) => {
            setDisclosure(content);
          }}
        />
        <button
          className={`${styles.saveButton} btn gradient-btn`}
          onClick={() =>
            updateDisclouser(disclosureData?.templateDisclosureId, disclosure)
          }
        >
          Save
        </button>
      </>
      {/* Loader */}
      {loader && (
        <div className="loader dFlex alignC justifyC">
          <span></span>
        </div>
      )}
    </section>
  );
}
