import React, { useState, useEffect } from "react";
import Switch from "react-switch";
import styles from "./right-property-detail.module.scss";
import { APIurl } from "../../utils/storage";

export default function RightProperty({ forAboutProperty }) {
  const api = APIurl();
  const [loader, setLoader] = useState(true);

  const [toast, setToast] = useState("");
  const toastFunc = (value) => {
    setToast(value);
    setTimeout(function () {
      setToast("");
    }, 4000);
  };

  //for getting local values
  const [local, setlocal] = useState();
  const [checkDraft, setCheckDraft] = useState();
  const [templateID, setTemplateID] = useState();
  useEffect(() => {
    const isStored = typeof window !== "undefined" && window.localStorage;
    const local = isStored && JSON.parse(localStorage.getItem("userInfo"));
    const draftval = isStored && JSON.parse(localStorage.getItem("isDraft"));
    const tempID = isStored && JSON.parse(localStorage.getItem("templateID"));
    setCheckDraft(draftval);
    setlocal(local);
    setTemplateID(tempID);
  }, []);

  //for retrieve property detail
  const [property, setProperty] = useState();
  async function retriveProperty(templateID) {
    let result = await fetch(
      `${api}api/v1/template/about/all?templateId=${templateID}`,
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
    setProperty(result?.body);
    setLoader(false);
  }

  useEffect(() => {
    if (local != null && forAboutProperty != null) {
      retriveProperty(forAboutProperty);
    } else if (templateID != null) {
      retriveProperty(templateID);
    }
  }, [templateID, forAboutProperty]);

  //for update property detail
  let passingArray = property;
  const [forPassing, setForPassing] = useState();
  function changeFunction(status, id, index) {
    if (passingArray[index]?.templateAboutId == id) {
      passingArray[index].hasArchitecturalType = !status;
    }
    let propertyDetailTrue = passingArray?.filter(
      (item) => item.hasArchitecturalType == true,
    );
    setForPassing(propertyDetailTrue);
  }
  async function updateProperty() {
    const arr = [];
    forPassing.map((item) => arr.push(item.templateAboutId));
    setLoader(true);
    let result = await fetch(`${api}api/v1/architectural-type`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
      body: JSON.stringify({
        templateAboutIds: arr,
        templateId: templateID,
      }),
    });
    result = await result.json();
    if (result.status == 200) {
      toastFunc("Property Details Updated Successfully");
      setLoader(false);
    }
  }

  return (
    <section className={styles.rightProperty}>
      <p className={`poped-message ${toast ? "active" : ""}`}>{toast}</p>
      <ul className="dFlex">
        {checkDraft
          ? passingArray?.map((item, index) => (
              <li
                key={index}
                className="dFlex justifySB alignC"
                id={`propertyList${index}`}
              >
                {item.aboutTitle}
                <Switch
                  checked={item.hasArchitecturalType}
                  onChange={() => {
                    changeFunction(
                      item.hasArchitecturalType,
                      item.templateAboutId,
                      index,
                    );
                  }}
                  offColor="#A8A8A8"
                  onColor="#34C759"
                />
              </li>
            ))
          : property?.map((item, index) => (
              <li key={index} className="dFlex justifySB alignC">
                {item.aboutTitle}
                <Switch
                  checked={item.hasArchitecturalType}
                  onChange={() => {}}
                  offColor="#A8A8A8"
                  onColor="#34C759"
                />
              </li>
            ))}
      </ul>
      {checkDraft && (
        <div className={styles.btnWrapper}>
          <button
            onClick={updateProperty}
            className="btn gradient-btn"
            id="saveProperty"
          >
            Save
          </button>
        </div>
      )}
      {/* Loader */}
      {loader && (
        <div className="loader dFlex alignC justifyC">
          <span></span>
        </div>
      )}
    </section>
  );
}
