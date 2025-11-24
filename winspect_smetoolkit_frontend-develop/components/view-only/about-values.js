import styles from "./aboutvalues.module.scss";
import { useState, useEffect, useRef } from "react";
import { APIurl } from "../../utils/storage";
import NotesSlider from "./notes-slider";
import Delete from "../common/delete";

export default function AboutValues({
  aboutNotes,
  aboutIndex,
  item,
  draft,
  aboutAndNotesFunc,
  passingSubCat,
  templateID,
}) {
  const api = APIurl();
  //calling local storage
  const [local, setlocal] = useState();
  useEffect(() => {
    const isStored = typeof window !== "undefined" && window.localStorage;
    const local = isStored && JSON.parse(localStorage.getItem("userInfo"));
    setlocal(local);
  }, []);

  const [toast, setToast] = useState("");
  const toastFunc = (value) => {
    setToast(value);
    setTimeout(function () {
      setToast("");
    }, 4000);
  };

  const [loader, setLoader] = useState(false);

  //change single and multiselect
  const [notesIndex, setNotesIndex] = useState();
  async function editAbout(item, condition) {
    let result = await fetch(`${api}api/v1/template/about`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "*",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
      body: JSON.stringify({
        aboutTitle: item.aboutTitle,
        templateSubCategoryId: item.templateSubCategoryId,
        templateAboutId: item.templateAboutId,
        isMultiSelect: condition,
      }),
    });
    result = await result.json();
    await aboutAndNotesFunc(passingSubCat);
  }

  //change location
  const disInd = aboutNotes.findIndex((item) => item.hasLocation === true);
  async function editAboutLocation(item, condition) {
    let result = await fetch(`${api}api/v1/template/about`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "*",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
      body: JSON.stringify({
        aboutTitle: item.aboutTitle,
        templateSubCategoryId: item.templateSubCategoryId,
        templateAboutId: item.templateAboutId,
        hasLocation: condition,
      }),
    });
    result = await result.json();
    if (result.status == 200) {
      toastFunc("About Attach with Remark Updated Successfully");
    }
    await aboutAndNotesFunc(passingSubCat);
  }

  //for add about values
  const [addValue, setAddValue] = useState(false);
  const [addName, setAddName] = useState();
  const refInput = useRef(null);
  async function addAboutValue() {
    let result = await fetch(`${api}api/v1/template/about-value`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
      body: JSON.stringify({
        value: addName,
        templateAboutId: item.templateAboutId,
        templateId: templateID,
      }),
    });
    result = await result.json();
    if (result.status == 200) {
      toastFunc("About Value Added Successfully");
      setAddValue(false);
    }
    await aboutAndNotesFunc(passingSubCat);
    setLoader(false);
  }

  //for open Notes Slider
  const [notesModal, setNotesModal] = useState(false);
  const closeNotesModal = (value) => {
    setNotesModal(value);
  };

  //for edit about values
  const [name, setName] = useState();
  const [editB, setEditB] = useState(false);
  const [indexs, setIndexs] = useState();
  const refInpuEdit = useRef(null);
  async function editAboutValue(item) {
    let result = await fetch(`${api}api/v1/template/about-value`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "*",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
      body: JSON.stringify({
        value: name,
        templateAboutId: item.templateAboutId,
        templateAboutValueId: item.templateAboutValueId,
        templateId: templateID,
      }),
    });
    result = await result.json();
    if (result.status == 200) {
      toastFunc("About Value Update Successfully");
    }
    await aboutAndNotesFunc(passingSubCat);
  }

  //for delete about values
  const [deleteB, setDeleteB] = useState(false);
  const deleteClose = (value) => {
    setDeleteB(value);
  };

  //reodering about values
  async function Reorder(passingD, dragValue) {
    setLoader(true);
    let result = await fetch(`${api}api/v1/template/about-value/reorder`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
      body: JSON.stringify({
        templateAboutId: dragValue.templateAboutId,
        aboutValueData: passingD,
      }),
    });
    await aboutAndNotesFunc(passingSubCat);
    setLoader(false);
  }

  //dragging function
  const [isDragging, setIsDragging] = useState();
  const containerRefAbout = useRef();
  function dragStart(e, index) {
    e.stopPropagation();
    setIsDragging(index);

    const container = containerRefAbout.current;
    const items = [...container.childNodes];
    const dragItem = items[index - 1];
    const itemsBelowDragItem = items.slice(index);
    const notDragItems = items.filter((_, i) => i !== index - 1);
    const dragData = item.template_about_values[index - 1];
    let newData = [...item.template_about_values];

    //getBoundingClientRect of drag tiem
    const dragBoundingRect = dragItem.getBoundingClientRect();

    //distance between two cards
    const space =
      items[1]?.getBoundingClientRect().top -
      items[0].getBoundingClientRect().bottom;

    //set style when mousedown
    dragItem.style.position = "fixed";
    dragItem.style.zIndex = 10;
    dragItem.style.width = dragBoundingRect.width + "px";
    dragItem.style.height = dragBoundingRect.height + "px";
    dragItem.style.top = dragBoundingRect.top + "px";
    dragItem.style.left = dragBoundingRect.left + "px";
    dragItem.style.cursor = "grabbing";

    //create alternate div element when drag item
    const div = document.createElement("div");
    div.id = "div-temp";
    div.style.width = dragBoundingRect.width + "px";
    div.style.height = dragBoundingRect.height + "px";
    div.style.pointerEvents = "none";
    container.appendChild(div);

    //distance to moved
    const distance = dragBoundingRect.height + space;

    itemsBelowDragItem.forEach((item) => {
      item.style.transform = `translateY(${distance}px)`;
    });

    //get the coordinates of mouse
    let x = e.clientX;
    let y = e.clientY;

    //perform function on hover
    document.onpointermove = dragMove;

    function dragMove(e) {
      //calculate distance of mouse travelling

      //original cordinates minus current coordinates
      const posX = e.clientX - x;
      const posY = e.clientY - y;

      //move item
      dragItem.style.transform = `translate(${posX}px, ${posY}px)`;

      //swap position
      notDragItems.forEach((item) => {
        //check two elements is overlapping
        const rect1 = dragItem.getBoundingClientRect();
        const rect2 = item.getBoundingClientRect();

        let isOverlapping =
          rect1.y < rect2.y + rect2.height / 2 &&
          rect1.y + rect2.height / 2 > rect2.y;

        if (isOverlapping) {
          //swap position card
          if (item.getAttribute("style")) {
            item.style.transform = "";
            index++;
          } else {
            item.style.transform = `translateY(${distance}px)`;
            index--;
          }

          //swap data
          newData = newData?.filter(
            (item) =>
              item.templateAboutValueId !== dragData.templateAboutValueId,
          );
          newData?.splice(index - 1, 0, dragData);
        }
      });
    }

    //finish onPointerDown event
    document.onpointerup = dragEnd;

    function dragEnd() {
      document.onpointerup = "";
      document.onpointermove = "";

      setIsDragging(undefined);
      dragItem.style = "";
      container.removeChild(div);

      items.forEach((item) => (item.style = ""));
      let passingData = newData?.map((item, index) => ({
        templateAboutValueId: item.templateAboutValueId,
        orderNumber: index + 1,
      }));

      Reorder(passingData, dragData);
    }
  }

  return (
    <ul className={styles.innerAbout}>
      <div className={styles.funHeader}>
        {draft ? (
          <div className={`dFlex alignC ${styles.multisingle}`}>
            <h3
              className={item.isMultiSelect ? "" : styles.active}
              onClick={() => {
                editAbout(item, false);
              }}
              id={`singleSelect${aboutIndex}`}
            >
              Single Select
            </h3>
            <h3
              className={item.isMultiSelect ? styles.active : ""}
              onClick={() => {
                editAbout(item, true);
              }}
              id={`multiSelect${aboutIndex}`}
            >
              Multi Select
            </h3>
          </div>
        ) : (
          <div className={`${styles.multisingle} ${styles.view}`}>
            <h3>{item.isMultiSelect ? "Multi Select" : "Single Select"}</h3>
          </div>
        )}
      </div>

      <div ref={containerRefAbout}>
        {
          /* show about values */
          item.template_about_values?.map((about, value) => (
            <div key={value}>
              <li
                className={`addBtn ${
                  isDragging === value + 1 ? "dragging" : ""
                }`}
                id={`aboutInner-${aboutIndex}-${value}`}
              >
                {/* ${editB && indexs === index ? "" : "addBtn"} */}
                <div className="dFlex alignC justifySB">
                  <div className="dFlex alignC">
                    {item.template_about_values.length > 1 && (
                      <span
                        onClick={(e) => e.stopPropagation()}
                        onPointerDown={(e) => dragStart(e, value + 1)}
                        className={styles.dragIcon}
                        id={`aboutInnerDrag-${aboutIndex}-${value}`}
                      >
                        <img src="/images/drag.svg" alt="images" />
                      </span>
                    )}
                    {editB && indexs === value ? (
                      <div className={styles.editButtonInput}>
                        {/* Edit about Field */}
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          ref={refInpuEdit}
                          id={`aboutInnerEditField-${aboutIndex}`}
                          onBlur={() => {
                            setEditB(false);
                            editAboutValue(about);
                          }}
                        />
                      </div>
                    ) : (
                      about.value
                    )}
                  </div>

                  {/* <div
                    className={`actionbox dFlex ${styles.actionbox} ${
                      // draft ? "" : 
                      styles.singleBox
                    }`}
                  > */}
                  <div className={`actionbox dFlex ${styles.actionbox} ${""}`}>
                    {/* {draft && ( */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteB(true);
                        setIndexs(value);
                      }}
                      id={`aboutDeleteButton-${aboutIndex}-${value}`}
                    >
                      <img src="/images/delete.svg" alt="delete icon" />
                    </button>
                    {/* )} */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditB(true);
                        setIndexs(value);
                        setName(about.value);
                        setTimeout(() => {
                          refInpuEdit.current.focus();
                        }, 50);
                      }}
                      id={`aboutEditButton-${aboutIndex}-${value}`}
                    >
                      <img src="/images/edit.svg" alt="edit icon" />
                    </button>
                  </div>

                  {deleteB && indexs === value && (
                    <Delete
                      deleteClose={deleteClose}
                      item={about}
                      aboutValueDelete
                      toastFunc={toastFunc}
                      aboutAndNotesFunc={aboutAndNotesFunc}
                      passingSubCat={passingSubCat}
                      templateID={templateID}
                    />
                  )}

                  {/* To open notes slider */}
                  <span
                    onClick={() => {
                      setNotesModal(true);
                      setNotesIndex(value);
                    }}
                    id={`NotesOpener-${aboutIndex}-${value}`}
                  >
                    {draft
                      ? about?.template_about_value_notes.length > 0
                        ? `${about?.template_about_value_notes?.length} ${
                            about?.template_about_value_notes.length == 1
                              ? "Note"
                              : "Notes"
                          }`
                        : "Add Notes"
                      : about?.template_about_value_notes &&
                        `${about?.template_about_value_notes?.length} ${
                          about?.template_about_value_notes.length == 1
                            ? "Note"
                            : "Notes"
                        }`}
                  </span>

                  {
                    /* notes right side slider panel */
                    value === notesIndex && notesModal && (
                      <NotesSlider
                        AboutValue={item}
                        Aboutnotes={about}
                        draft={draft}
                        closeNotesModal={closeNotesModal}
                        templateID={templateID}
                        aboutAndNotesFunc={aboutAndNotesFunc}
                        passingSubCat={passingSubCat}
                      />
                    )
                  }
                </div>
              </li>
            </div>
          ))
        }
      </div>

      {addValue && (
        <li className={styles.AddNewBox}>
          <div>
            <input
              type="text"
              value={addName}
              onChange={(e) => setAddName(e.target.value)}
              ref={refInput}
              placeholder="Enter the about Value"
              onBlur={() => {
                {
                  addName ? addAboutValue() : "";
                }
                setAddValue(false);
              }}
              id={`aboutInnerAddField-${aboutIndex}`}
            />
          </div>
        </li>
      )}

      {
        /* add about values */
        !addValue && (
          <li
            className={styles.addAboutValues}
            onClick={() => {
              setAddValue(true);
              setAddName();
              setTimeout(() => {
                refInput.current.focus();
              }, 50);
            }}
            id={`addAboutInner-${aboutIndex}`}
          >
            <div>
              <img src="/images/add.svg" alt="add sign" />
              Add New
            </div>
          </li>
        )
      }

      {toast && (
        <p className={`poped-message ${toast ? "active" : ""}`}>{toast}</p>
      )}

      {/* Loader */}
      {loader && (
        <div className="loader dFlex alignC justifyC">
          <span></span>
        </div>
      )}
    </ul>
  );
}
