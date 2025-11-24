import { useState, useRef, useEffect } from "react";
import styles from "../modal.module.scss";
import ModalHeader from "./create-draft-template/modal-header";
import Modal from "./modal-wrapper";
import { APIurl } from "../../../utils/storage";
const AddReminderModal = (props) => {
  const api = APIurl();

  const { heading, para, closeFunction, itemDetail, draftReminder, local } =
    props;
  const [locationInput, setLocationInput] = useState();
  const [disableAdd, setDisableAdd] = useState(false);
  const [locationList, setLocationList] = useState([]);

  useEffect(() => {
    if (local != null && itemDetail !== undefined) {
      findReminders(itemDetail?.templateSubCategoryId);
    }
  }, [local]);

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
  return (
    <Modal>
      <ModalHeader heading={heading} para={para} close={closeFunction} />
      <div className={`${styles.locationPopup} ${styles.modalSteps}`}>
        {
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
        }
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
                      editLocationText?.length > 0 ? styles.addBtnActive : ""
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
    </Modal>
  );
};

export default AddReminderModal;
