import { useState, useEffect, useRef } from "react";
import styles from "./subcategory-list.module.scss";
import Delete from "../common/delete";
import { APIurl } from "../../utils/storage";
import Switch from "react-switch";
import Modal2 from "../common/modal2";
import AddReminderModal from "../common/modals/add-reminder";
import Checkbox from "../../atoms/checkbox";
import useCopyToStore from "../../stores/copyToStore";
import CopyCountItemWrapper from "../copy-count-item-wrapper";
import SubcategoryServices from "../../api/services/SubcategoryServices";
import { hasDuplicateOrderNumber } from "../../utils/utils";

export default function SubCategoryList({
  subcategories,
  activeSubCat,
  setActiveSubCat,
  subCategoryClick,
  draft,
  subCategoryFunc,
  category,
  setSubCatForAbout,
  passingCat,
}) {
  const api = APIurl();
  const [loader, setLoader] = useState(false);
  const [indexs, setIndexs] = useState();
  const [toast, setToast] = useState("");
  const {
    setShowCopyToPopup,
    setSelectedSubCategoriesToCopy,
    selectedSubCategoriesToCopy,
    setCopyTo,
    showSubCategoryCheckboxes,
  } = useCopyToStore();

  //for getting local values
  const [local, setlocal] = useState();
  useEffect(() => {
    const isStored = typeof window !== "undefined" && window.localStorage;
    const local = isStored && JSON.parse(localStorage.getItem("userInfo"));
    setlocal(local);
  }, []);

  const toastFunc = (value) => {
    setToast(value);
    setTimeout(function () {
      setToast("");
    }, 4000);
  };

  //for add Sub Category
  const [addName, setAddName] = useState();
  const [addNew, setAddNew] = useState(false);
  const refInput = useRef(null);
  async function addSubCategory() {
    let result = await fetch(`${api}api/v1/template/sub-categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
      body: JSON.stringify({
        templateCategoryId: passingCat,
        name: addName,
      }),
    });

    result = await result.json();
    if (result.status == 200) {
      toastFunc("Subcategory Added Successfully");
    }
    setActiveSubCat(0);
    await subCategoryFunc(passingCat);
    setLoader(false);
  }

  //for delete sub category
  const [deleteB, setDeleteB] = useState(false);
  const deleteClose = (value) => {
    setDeleteB(value);
  };

  //for edit Sub Category
  const [name, setName] = useState("");
  const [editB, setEditB] = useState(false);
  const refInpuEdit = useRef(null);
  async function editSubCategory(item) {
    let result = await fetch(`${api}api/v1/template/sub-categories`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "*",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
      body: JSON.stringify({
        templateSubCategoryId: item.templateSubCategoryId,
        templateCategoryId: item.templateCategoryId,
        name: name,
      }),
    });

    result = await result.json();
    if (result.status == 200) {
      toastFunc("Subcategory Update Successfully");
    }
    setActiveSubCat(0);
    await subCategoryFunc(item.templateCategoryId);
  }

  //reorder subcategory
  async function Reorder(indexPassingValue, dragValue) {
    let result = await fetch(`${api}api/v1/template/sub-categories/reorder`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
      body: JSON.stringify({
        templateCategoryId: dragValue.templateCategoryId,
        templateSubCategoryId: dragValue.templateSubCategoryId,
        newOrderSequence: indexPassingValue + 1,
      }),
    });
    subCategoryFunc(dragValue.templateCategoryId);
  }

  //dragging function
  const [isDragging, setIsDragging] = useState();
  const containerRef = useRef();
  function dragStart(e, index) {
    e.stopPropagation();
    setIsDragging(index);

    const container = containerRef.current;
    const items = [...container.childNodes];
    const dragItem = items[index - 1];
    const itemsBelowDragItem = items.slice(index);
    const notDragItems = items.filter((_, i) => i !== index - 1);
    const dragData = subcategories[index - 1];
    let newData = [...subcategories];

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
          newData = subcategories.filter(
            (item) =>
              item.templateSubCategoryId !== dragData.templateSubCategoryId,
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

      let indexPassingValue = newData.indexOf(dragData);
      Reorder(indexPassingValue, dragData);
    }
  }

  const format = /[!@#$%^&*_+`~=\[\]{};':"\\|<>?]+/;
  const [specialCharacter, setSpecialCharacter] = useState(false);

  //for edit Sub Category
  const [error, setError] = useState(false);
  async function editGeneral(item) {
    let result = await fetch(`${api}api/v1/template/sub-categories`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "*",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
      body: JSON.stringify({
        templateSubCategoryId: item.templateSubCategoryId,
        templateCategoryId: item.templateCategoryId,
        isGeneral: !item?.isGeneral,
      }),
    });
    result = await result.json();
    if (result.message == "General Subcategory already exist") {
      toastFunc(result.message);
      setError(true);
    }
    if (result.status == 200) {
      setError(false);
    }
    setActiveSubCat(0);
    await subCategoryFunc(item.templateCategoryId);
  }

  const [reminderButton, setReminderButton] = useState();
  const [modal, setModal] = useState();
  const [showModal2, setShowMadal2] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [subcategoryList, setSubcategoryList] = useState([]);
  const [selectedSubcategoryIndex, setSelectedSubcategoryIndex] =
    useState(null);
  const handleToggle = (item, index) => {
    setShowMadal2(true);
    setSelectedSubCategory(item);
    setSelectedSubcategoryIndex(index);
  };
  useEffect(() => {
    if (subcategories) {
      let hasDuplicates = hasDuplicateOrderNumber(subcategories);
      if (hasDuplicates) {
        const subCategoryData = subcategories.map((item, index) => {
          return {
            templateSubCategoryId: item.templateSubCategoryId,
            orderNumber: index + 1,
          };
        });
        ReorderAll(subCategoryData);
      }

      setSubcategoryList(subcategories);
    }
  }, [subcategories]);

  async function ReorderAll(subCategoryList) {
    setLoader(true);
    let data = {
      templateCategoryId: passingCat,
      subCategoryData: subCategoryList,
    };
    let result = await SubcategoryServices.reorderAllSubCategories(data);
    if (result.status == 200) {
      subCategoryFunc(passingCat);
    }
    setLoader(false);
  }

  const togglePrintOff = async () => {
    setLoader(true);
    let result = await fetch(`${api}api/v1/template/sub-categories`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
      body: JSON.stringify({
        templateCategoryId: selectedSubCategory.templateCategoryId,
        name: selectedSubCategory.name,
        print: !selectedSubCategory.print,
        templateSubCategoryId: selectedSubCategory.templateSubCategoryId,
        isGeneral: selectedSubCategory.isGeneral,
      }),
    });
    if (result.status == 200) {
      setShowMadal2(false);
      result = await result.json();
      let subCategories = subcategoryList;
      subCategories[selectedSubcategoryIndex] = result.body;
    }
    setLoader(false);
  };

  const handleCheckboxChange = (event, templateSubCategoryId) => {
    if (event.target.checked) {
      setSelectedSubCategoriesToCopy([
        ...selectedSubCategoriesToCopy,
        templateSubCategoryId,
      ]);
    } else {
      setSelectedSubCategoriesToCopy(
        selectedSubCategoriesToCopy.filter(
          (id) => id !== templateSubCategoryId,
        ),
      );
    }
  };
  const handleCopyTo = () => {
    setShowCopyToPopup(true);
    setCopyTo("subcategory");
  };
  return (
    <>
      <CopyCountItemWrapper
        itemsLength={selectedSubCategoriesToCopy.length}
        setItems={setSelectedSubCategoriesToCopy}
        handleCopyTo={handleCopyTo}
      />
      <div className={`${styles.withBox} bgBox`}>
        <p
          className={`poped-message ${toast ? "active" : ""} ${
            error ? "red" : ""
          }`}
        >
          {toast}
        </p>
        <ul ref={containerRef}>
          {subcategories &&
            subcategories.length > 0 &&
            subcategories?.map((item, index) => (
              <div key={index}>
                <li
                  id={`subCategory-${index}`}
                  className={`
                  ${isDragging === index + 1 ? "dragging" : ""}
                  
                  ${editB && indexs === index ? "" : "addBtn"}
                  ${!draft ? styles.activeBox : ""}       
                  ${
                    showSubCategoryCheckboxes ? styles.showCheckboxLi : ""
                  }           
                `}
                >
                  <div
                    className={`${styles.subCategoryLiInner} ${
                      !item.print ? styles.noPrint : ""
                    } ${activeSubCat === index ? styles.active : ""} `}
                    onClick={() => {
                      subCategoryClick(item.templateSubCategoryId, index);
                      setSubCatForAbout(item.templateSubCategoryId);
                    }}
                  >
                    {draft && (
                      <span
                        id={`subCategoryDrag-${index}`}
                        onPointerDown={(e) => dragStart(e, index + 1)}
                        className={styles.dragIcon}
                      >
                        <img src="/images/drag.svg" alt="images" />
                      </span>
                    )}

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
                          maxlength="60"
                          id={`subCategoryEditField-${index}`}
                          onChange={(e) => {
                            format.test(e.target.value)
                              ? setSpecialCharacter(true)
                              : setSpecialCharacter(false);
                            setName(e.target.value);
                          }}
                          ref={refInpuEdit}
                          onBlur={() => {
                            setEditB(false);
                            !specialCharacter && editSubCategory(item);
                          }}
                        />
                      </div>
                    ) : (
                      <span>{item?.name}</span>
                    )}

                    {draft ? (
                      <span
                        className={`${styles.checkgeneralDraft} ${
                          item?.isGeneral ? styles.checked : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          editGeneral(item);
                        }}
                      >
                        {item?.isGeneral ? (
                          <img src="/images/check-G.svg" alt="check" />
                        ) : (
                          ""
                        )}
                      </span>
                    ) : (
                      <div
                        className={`dFlex alignC ${styles.subCategoriesRightItems}`}
                      >
                        {item?.isGeneral && (
                          <span
                            className={`${styles.checkgeneral} ${
                              item?.isGeneral ? styles.checked : ""
                            }`}
                          >
                            <img src="/images/check-G.svg" alt="check" />
                          </span>
                        )}
                        {item?.template_subcategory_reminders.length > 0 ? (
                          <span
                            className={styles.reminder}
                            onClick={(e) => {
                              e.stopPropagation();
                              setModal(item);
                            }}
                          >
                            <img src="/images/reminder.svg" alt="reminder" />
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    )}
                  </div>
                  {showSubCategoryCheckboxes && (
                    <div className={styles.checkbox}>
                      <Checkbox
                        checked={selectedSubCategoriesToCopy.includes(
                          item.templateSubCategoryId,
                        )}
                        onChange={(event) =>
                          handleCheckboxChange(
                            event,
                            item.templateSubCategoryId,
                          )
                        }
                      />
                    </div>
                  )}

                  {draft && (
                    <div className={`dFlex actionbox ${styles.actionBar}`}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteB(true);
                          setIndexs(index);
                        }}
                        id={`subCategoryDeleteButton-${index}`}
                      >
                        <img src="/images/delete.svg" alt="delete icon" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditB(true);
                          setIndexs(index);
                          setName(item.name);
                          setTimeout(() => {
                            refInpuEdit.current.focus();
                          }, 50);
                        }}
                        id={`subCategoryEditButton-${index}`}
                      >
                        <img src="/images/edit.svg" alt="edit icon" />
                      </button>
                      {/* <button
                      onClick={(e) => {
                        e.stopPropagation();
                        reminderButton == index
                          ? setReminderButton()
                          : setReminderButton(index);
                      }}
                      id={`subCategoryDotsButton-${index}`}
                    >
                      <img src="/images/dotswhite.svg" alt="dots icon" />
                    </button> */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setModal(item);
                        }}
                        id={`subCategoryDotsButton-${index}`}
                      >
                        <img
                          src="/images/white-reminder-icon.svg"
                          alt="reminder icon"
                        />
                      </button>
                      {!item.isGeneral && (
                        <div className={styles.switch}>
                          <Switch
                            checked={item.print}
                            onChange={() => {
                              handleToggle(item, index);
                            }}
                            offColor="#A8A8A8"
                            onColor="#34C759"
                            // disabled={checkDraft ? false : true}
                          />
                        </div>
                      )}

                      {reminderButton == index && (
                        <ul className={styles.reminders}>
                          <li
                            onClick={(e) => {
                              e.stopPropagation();
                              setModal(item);
                            }}
                          >
                            Add reminders
                          </li>
                        </ul>
                      )}
                    </div>
                  )}
                </li>
                {specialCharacter && name && editB && indexs === index && (
                  <p className="error left">
                    Special characters are not Allowed!
                  </p>
                )}
                {name.length == 60 && name && editB && indexs === index && (
                  <p className="error left">
                    Maximum 60 characters are not Allowed!
                  </p>
                )}
                {deleteB && indexs === index && (
                  <Delete
                    deleteClose={deleteClose}
                    setActiveSubCat={setActiveSubCat}
                    item={item}
                    subCategoryDelete
                    subCategoryFunc={subCategoryFunc}
                    toastFunc={toastFunc}
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
                  maxlength="60"
                  onChange={(e) => {
                    format.test(e.target.value)
                      ? setSpecialCharacter(true)
                      : setSpecialCharacter(false);
                    setAddName(e.target.value);
                  }}
                  ref={refInput}
                  placeholder="Enter the Subcategory Value"
                  onBlur={() => {
                    {
                      addName && !specialCharacter ? addSubCategory() : "";
                    }
                    setAddNew(false);
                  }}
                  id={`subCategoryAddField`}
                />
              </li>
              {specialCharacter && addName && (
                <p className="error left">
                  Special characters are not Allowed!
                </p>
              )}
              {addName?.length == 60 && addName && (
                <p className="error left">
                  Maximum 60 characters are not Allowed!
                </p>
              )}
            </div>
          )}
        </ul>

        {
          /* Add Button */
          draft && category && category.length > 0
            ? !addNew && (
                <div
                  className={`AddBtn ${styles.leftPos}`}
                  onClick={() => {
                    setAddNew(true);
                    setAddName();
                    setTimeout(() => {
                      refInput.current.focus();
                    }, 50);
                    setSpecialCharacter(false);
                  }}
                  id="subCategoryAdd"
                >
                  + Add New
                </div>
              )
            : draft && <p>Please add a category to add subcategories</p>
        }

        {modal && (
          <AddReminderModal
            heading={`${draft ? "Add Reminders" : "Reminders"}`}
            para="Reminders will be listed at the subcategory level to assist inspectors in identifying specific items for inspection within that particular subcategory."
            closeFunction={() => {
              setModal();
            }}
            itemDetail={modal}
            remindermodal={true}
            draftReminder={draft}
            local={local}
          />
        )}

        {showModal2 && (
          <Modal2
            close={() => setShowMadal2(false)}
            item={selectedSubCategory}
            subCategory
            onClick={togglePrintOff}
          />
        )}

        {/* Loader */}
        {loader && (
          <div className="loader dFlex alignC justifyC">
            <span></span>
          </div>
        )}
      </div>
    </>
  );
}
