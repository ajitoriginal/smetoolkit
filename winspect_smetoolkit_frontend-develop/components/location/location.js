import React, { useState, useEffect, useRef } from "react";
import { APIurl } from "../../utils/storage";
import styles from "./location.module.scss";
import Delete from "../common/delete";
import { toast } from "react-toastify";

export default function Location(props) {
  const { draft, templateID } = props;
  const [loader, setLoader] = useState(true);

  const api = APIurl();
  const [local, setlocal] = useState();
  const [checkDraft, setCheckDraft] = useState();
  useEffect(() => {
    const isStored = typeof window !== "undefined" && window.localStorage;
    const local = isStored && JSON.parse(localStorage.getItem("userInfo"));
    const draftval = draft
      ? draft
      : isStored && JSON.parse(localStorage.getItem("isDraft"));
    setCheckDraft(draftval);
    setlocal(local);
  }, []);

  //fetch location
  const [locationList, setLocationList] = useState([]);
  const [locationListCopy, setLocationListCopy] = useState([]);
  async function findLocation(templateID) {
    let result = await fetch(
      `${api}api/v1/template/location?templateId=${templateID}`,
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
    setLocationListCopy(result?.body);
    setLoader(false);
  }

  useEffect(() => {
    if (local != null) {
      findLocation(templateID);
    }
  }, [local]);

  //add Location
  const [disableAdd, setDisableAdd] = useState(false);
  const [locationInput, setLocationInput] = useState();
  const refInpuAdd = useRef(null);
  async function addingLocation() {
    let result = await fetch(`${api}api/v1/template/location`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
      body: JSON.stringify({
        templateId: templateID,
        location: locationInput,
      }),
    });
    findLocation(templateID);
    result = await result.json();
    toast.success(result.message);
    setLocationInput();
    setDisableAdd(false);
  }

  //edit location
  const [editLocation, setEditLocation] = useState();
  const [editLocationText, setLocationText] = useState();
  const refInpuEdit = useRef(null);
  async function editingLocation(id) {
    await fetch(`${api}api/v1/template/location`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
      body: JSON.stringify({
        templateLocationId: id,
        location: editLocationText,
      }),
    });
    findLocation(templateID);
    setEditLocation();
  }

  const [search, setSearch] = useState();
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const filterLocation = locationListCopy.filter((item) =>
        item?.location.toLowerCase().includes(search?.toLowerCase()),
      );
      if (search?.length > 0) {
        setLocationList(filterLocation);
      } else {
        setLocationList(locationListCopy);
      }
    }, 0);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <section className={styles.locationSection}>
      <div className={styles.search}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search for a location"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <span
            className={search?.length > 0 ? styles.activeSearch : ""}
            onClick={() => {
              setSearch("");
            }}
          >
            <img src="/images/cross.svg" />
          </span>
        </div>
        {locationList && <p>{locationList?.length} locations found</p>}
      </div>
      <div className={styles.gridContainer}>
        <div
          className={`${styles.borderBox} ${styles.addBorderBox} ${
            disableAdd ? styles.active : ""
          }`}
          onClick={() => {
            setDisableAdd(true);
            setTimeout(() => {
              refInpuAdd.current.focus();
            }, 50);
          }}
        >
          {disableAdd ? (
            <div className={`${styles.editWrapper} dFlex alignC`}>
              <input
                type="text"
                onChange={(e) => {
                  setLocationInput(e.target.value);
                }}
                placeholder="Start typing..."
                ref={refInpuAdd}
              />
              <div className={`${styles.actionButton} dFlex alignC`}>
                <button
                  className={`${styles.addBtn} ${
                    locationInput?.length > 0 ? "" : styles.disable
                  }`}
                  onClick={() => {
                    addingLocation();
                  }}
                >
                  <img src="/images/checkw.svg" alt="tick" />
                </button>
                <button
                  className={`${styles.cancelBtn}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setDisableAdd(false);
                  }}
                >
                  <img src="/images/close-white-icon.svg" alt="close" />
                </button>
              </div>
            </div>
          ) : (
            <span className={styles.text}>+ Add New</span>
          )}
        </div>
        {locationList &&
          locationList?.length > 0 &&
          locationList?.map((item, index) => (
            <div
              key={index}
              className={`${editLocation === index ? styles.active : ""} ${
                styles.borderBox
              }`}
              onClick={() => {
                setEditLocation(index);
                setLocationText(item?.location);
                setTimeout(() => {
                  refInpuEdit.current.focus();
                }, 50);
              }}
            >
              {editLocation === index ? (
                <div className={`${styles.editWrapper} dFlex alignC`}>
                  <input
                    type="text"
                    value={editLocationText}
                    onChange={(e) => {
                      setLocationText(e.target.value);
                    }}
                    ref={refInpuEdit}
                  />
                  <div className={`${styles.actionButton} dFlex alignC`}>
                    <button
                      className={`${styles.addBtn} ${
                        editLocationText?.length > 0 ? "" : styles.disable
                      }`}
                      onClick={() => {
                        editingLocation(item.templateLocationId);
                      }}
                    >
                      <img src="/images/checkw.svg" alt="tick" />
                    </button>
                    <button
                      className={`${styles.cancelBtn}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditLocation();
                      }}
                    >
                      <img src="/images/close-white-icon.svg" alt="close" />
                    </button>
                  </div>
                </div>
              ) : (
                <span className={styles.text}>{item?.location}</span>
              )}
            </div>
          ))}
      </div>

      {loader && (
        <div className="loader dFlex alignC justifyC">
          <span></span>
        </div>
      )}
    </section>
  );
}
