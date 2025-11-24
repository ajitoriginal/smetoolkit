import { useState, useEffect, useRef } from "react";
import styles from "./about-and-notes.module.scss";
import Delete from "../common/delete";
import { APIurl } from "../../utils/storage";
import AboutValues from "./about-values";
import useCopyToStore from "../../stores/copyToStore";
import Checkbox from "../../atoms/checkbox";
import CopyCountItemWrapper from "../copy-count-item-wrapper";
import { hasDuplicateOrderNumber } from "../../utils/utils";

export default function AboutAndNotes({
  aboutNotes,
  draft,
  subcategories,
  passingSubCat,
  aboutAndNotesFunc,
  templateID,
}) {
  const api = APIurl();
  const [toast, setToast] = useState("");
  const toastFunc = (value) => {
    setToast(value);
    setTimeout(function () {
      setToast("");
    }, 4000);
  };
  const {
    showAboutCheckboxes,
    selectedAboutToCopy,
    setSelectedAboutToCopy,
    setShowCopyToPopup,
    setCopyTo,
  } = useCopyToStore();

  useEffect(() => {
    setShowNotes();
    if (aboutNotes?.abouts && draft) {
      let hasDuplicates = hasDuplicateOrderNumber(aboutNotes?.abouts);
      if (hasDuplicates) {
        const aboutData = aboutNotes?.abouts.map((item, index) => {
          return {
            templateAboutId: item.templateAboutId,
            orderNumber: index + 1,
          };
        });
        Reorder(aboutData, {
          templateSubCategoryId: aboutNotes?.abouts[0].templateSubCategoryId,
        });
      }
    }
  }, [aboutNotes]);

  const [loader, setLoader] = useState(false);

  //to show about values
  const [showNotes, setShowNotes] = useState();
  const notesClick = (index) => {
    setShowNotes(index);
    if (index === showNotes) {
      setShowNotes();
    }
  };

  //calling local storage
  const [local, setlocal] = useState();
  useEffect(() => {
    const isStored = typeof window !== "undefined" && window.localStorage;
    const local = isStored && JSON.parse(localStorage.getItem("userInfo"));
    setlocal(local);
  }, []);

  //for add About
  const [addName, setAddName] = useState();
  const [addNew, setAddNew] = useState(false);
  const refInput = useRef(null);
  async function addAbout() {
    let result = await fetch(`${api}api/v1/template/about`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
      body: JSON.stringify({
        aboutTitle: addName,
        templateSubCategoryId: passingSubCat,
        isMultiSelect: true,
      }),
    });
    result = await result.json();
    if (result.status == 200) {
      toastFunc("About Added Successfully");
    }
    setLoader(false);
    await aboutAndNotesFunc(passingSubCat);
  }

  //for delete About
  const [deleteB, setDeleteB] = useState(false);
  const deleteClose = (value) => {
    setDeleteB(value);
  };

  //for edit About
  const [editB, setEditB] = useState(false);
  const [indexs, setIndexs] = useState();
  const [name, setName] = useState();
  const refInpuEdit = useRef(null);
  async function editAbout(item) {
    let result = await fetch(`${api}api/v1/template/about`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "*",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
      body: JSON.stringify({
        aboutTitle: name,
        templateSubCategoryId: item.templateSubCategoryId,
        templateAboutId: item.templateAboutId,
      }),
    });
    result = await result.json();
    if (result.status == 200) {
      toastFunc("About Updated Successfully");
    }
    setIndexs();
    await aboutAndNotesFunc(passingSubCat);
  }

  //reodering abouts
  async function Reorder(passingData, dragValue) {
    setLoader(true);
    let result = await fetch(`${api}api/v1/template/about/reorder`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
      body: JSON.stringify({
        templateSubCategoryId: dragValue.templateSubCategoryId,
        aboutData: passingData,
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
    const dragData = aboutNotes?.abouts[index - 1];
    let newData = [...aboutNotes?.abouts];

    //getBoundingClientRect of drag tiem
    const dragBoundingRect = dragItem.getBoundingClientRect();

    //distance between two cards
    const space =
      items[1].getBoundingClientRect().top -
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
          newData = aboutNotes?.abouts.filter(
            (item) => item.templateAboutId !== dragData.templateAboutId,
          );
          newData.splice(index - 1, 0, dragData);
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
        templateAboutId: item.templateAboutId,
        orderNumber: index + 1,
      }));
      Reorder(passingData, dragData);
    }
  }

  const handleCheckboxChange = (event, aboutId) => {
    if (event.target.checked) {
      setSelectedAboutToCopy([...selectedAboutToCopy, aboutId]);
    } else {
      setSelectedAboutToCopy(
        selectedAboutToCopy.filter((id) => id !== aboutId),
      );
    }
  };
  const handleCopyTo = () => {
    setShowCopyToPopup(true);
    setCopyTo("about");
  };
  return (
    <>
      <CopyCountItemWrapper
        itemsLength={selectedAboutToCopy.length}
        setItems={setSelectedAboutToCopy}
        handleCopyTo={handleCopyTo}
      />

      <div className={`${styles.withBox} bgBox`}>
        <p className={`poped-message ${toast ? "active" : ""}`}>{toast}</p>
        <ul ref={containerRefAbout}>
          {/* show about and notes here */}
          {aboutNotes?.abouts?.map((item, index) => (
            <div key={index}>
              <li
                id={`about-${index}`}
                className={`
                
                ${showNotes === index ? styles.drop : ""}
                ${editB && indexs === index ? "" : "addBtn"}
                ${isDragging === index + 1 ? "dragging" : ""}
                 ${showAboutCheckboxes ? styles.showCheckboxLi : ""} 
                `}
              >
                <div
                  className={`${styles.inner} dFlex alignC justifySB`}
                  onClick={() => {
                    notesClick(index);
                  }}
                >
                  <div className="dFlex alignC">
                    {
                      <span
                        onClick={(e) => e.stopPropagation()}
                        onPointerDown={(e) => dragStart(e, index + 1)}
                        className={styles.dragIcon}
                        id={`aboutDrag-${index}`}
                      >
                        <img src="/images/drag.svg" alt="images" />
                      </span>
                    }
                    {editB && indexs === index ? (
                      <div
                        className={`${styles.editButtonInput}`}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        {/* Edit about Field */}
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          ref={refInpuEdit}
                          id={`aboutEditField-${index}`}
                          onBlur={() => {
                            setEditB(false);
                            editAbout(item);
                          }}
                        />
                      </div>
                    ) : (
                      <span>{item.aboutTitle}</span>
                    )}
                  </div>

                  <img src="/images/downarrow.svg" alt="icon" />
                </div>

                {showAboutCheckboxes && (
                  <div className={styles.checkbox}>
                    <Checkbox
                      checked={selectedAboutToCopy.includes(
                        item.templateAboutId,
                      )}
                      onChange={(event) =>
                        handleCheckboxChange(event, item.templateAboutId)
                      }
                    />
                  </div>
                )}

                {/* about action bar */}
                <div className={`actionbox dFlex ${styles.actionbox} ${""}`}>
                  {
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteB(true);
                        setIndexs(index);
                      }}
                      id={`aboutDeleteButton-${index}`}
                    >
                      <img src="/images/delete.svg" alt="delete icon" />
                    </button>
                  }
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditB(true);
                      setIndexs(index);
                      setName(item.aboutTitle);
                      setTimeout(() => {
                        refInpuEdit.current.focus();
                      }, 50);
                    }}
                    id={`aboutEditButton-${index}`}
                  >
                    <img src="/images/edit.svg" alt="edit icon" />
                  </button>
                </div>
                {/* about delete popup */}
                {deleteB && indexs === index && (
                  <Delete
                    deleteClose={deleteClose}
                    item={item}
                    aboutDelete
                    aboutAndNotesFunc={aboutAndNotesFunc}
                    passingSubCat={passingSubCat}
                    templateID={templateID}
                    toastFunc={toastFunc}
                  />
                )}
              </li>

              {/* About Values */}
              {showNotes === index && (
                <AboutValues
                  aboutNotes={aboutNotes.abouts}
                  aboutIndex={index}
                  item={item}
                  draft={draft}
                  aboutAndNotesFunc={aboutAndNotesFunc}
                  passingSubCat={passingSubCat}
                  templateID={templateID}
                />
              )}
            </div>
          ))}
          {addNew && (
            <div>
              <li className={styles.AddNewBox}>
                <input
                  type="text"
                  value={addName}
                  onChange={(e) => setAddName(e.target.value)}
                  placeholder="Enter the About Value"
                  id={`aboutAddField`}
                  ref={refInput}
                  onBlur={() => {
                    {
                      addName ? addAbout() : "";
                    }
                    setAddNew(false);
                  }}
                />
              </li>
            </div>
          )}
        </ul>

        {
          /* Add Button */
          subcategories && subcategories.length > 0
            ? !addNew && (
                <div
                  className={`AddBtn ${styles.leftPos}`}
                  onClick={() => {
                    setAddNew(true);
                    setAddName();
                    setTimeout(() => {
                      refInput.current.focus();
                    }, 50);
                  }}
                  id="aboutAdd"
                >
                  + Add New
                </div>
              )
            : draft && <p>Please add a subcategory to add abouts</p>
        }

        {/* Loader */}
        {loader && (
          <div className="loader dFlex alignC justifyC">
            <span></span>
          </div>
        )}

        {toast && (
          <p className={`poped-message ${toast ? "active" : ""}`}>{toast}</p>
        )}
      </div>
    </>
  );
}
