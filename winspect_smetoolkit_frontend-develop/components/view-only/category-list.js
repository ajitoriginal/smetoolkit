import React, { useState, useEffect, useRef } from "react";
import styles from "./category-list.module.scss";
import Modal2 from "../common/modal2";
import Delete from "../common/delete";
import Switch from "react-switch";
import AddEditCategoryModal from "../common/modals/add-edit-category";
import CategoryServices from "../../api/services/CategoryServices";
import Checkbox from "../../atoms/checkbox";
import useCopyToStore from "../../stores/copyToStore";
import useGenerateStore from "../../stores/generalStore";
import { hasDuplicateOrderNumber } from "../../utils/utils";

export default function CategoryList({
  draft,
  templateID,
  category,
  activeCat,
  setActiveCat,
  categoryClick,
  categoriesFunc,
  setCatForSub,
  setPostCheckChanged,
  postCheckChanged,
}) {
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState(false);
  const [deleteB, setDeleteB] = useState(false);
  const [editB, setEditB] = useState(false);
  const [indexs, setIndexs] = useState();
  const [showModal2, setShowMadal2] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState();
  const {
    showCategoryCheckboxes,
    setSelectedCategoriesToCopy,
    selectedCategoriesToCopy,
  } = useCopyToStore();
  const { isDraft } = useGenerateStore();
  useEffect(() => {
    if (category) {
      let hasDuplicates = hasDuplicateOrderNumber(category);
      if (hasDuplicates) {
        const categoryData = category.map((item, index) => {
          return {
            templateCategoryId: item.templateCategoryId,
            orderNumber: index + 1,
          };
        });
        ReorderAll(categoryData);
      }

      setCategoryList(category);
    }
  }, [category]);

  //for getting local values
  const [local, setlocal] = useState();
  useEffect(() => {
    const isStored = typeof window !== "undefined" && window.localStorage;
    const local = isStored && JSON.parse(localStorage.getItem("userInfo"));
    setlocal(local);
  }, []);

  const close = (value) => {
    setModal(value);
  };

  const deleteClose = (value) => {
    setDeleteB(value);
  };

  const closeEdit = (value) => {
    setEditB(value);
  };

  async function ReorderAll(categoryList) {
    setLoader(true);
    let data = {
      templateId: templateID,
      categoryData: categoryList,
    };
    let result = await CategoryServices.reorderAllCategories(data);
    if (result.status == 200) {
      categoriesFunc(templateID);
    }
    setLoader(false);
  }

  // for reorder categories
  async function Reorder(indexPassingValue, dragValue) {
    setLoader(true);
    let data = {
      templateId: dragValue.templateId,
      templateCategoryId: dragValue.templateCategoryId,
      newOrderSequence: indexPassingValue + 1,
    };
    await CategoryServices.reorderCategories(data);
    categoriesFunc(dragValue.templateId);
    setLoader(false);
  }

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
    const dragData = category[index - 1];
    let newData = [...category];

    //getBoundingClientRect of drag tiem
    const dragBoundingRect = dragItem.getBoundingClientRect();

    //distance between two cards
    const space =
      items[1]?.getBoundingClientRect().left -
      items[0]?.getBoundingClientRect().right;

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
      item.style.transform = `translateX(${distance}px)`;
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
          rect1.x < rect2.x + rect2.width / 2 &&
          rect1.x + rect2.width / 2 > rect2.x;

        if (isOverlapping) {
          //swap position card
          if (item.getAttribute("style")) {
            item.style.transform = "";
            index++;
          } else {
            item.style.transform = `translateX(${distance}px)`;
            index--;
          }

          // swap data
          newData = category.filter(
            (item) => item.templateCategoryId !== dragData.templateCategoryId,
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
  const [key, setKey] = useState(Date.now());

  const handleToggle = (item, index) => {
    setShowMadal2(true);
    setSelectedCategory(item);
    setSelectedCategoryIndex(index);
  };

  const togglePrintOff = async () => {
    setLoader(true);
    let data = {
      templateId: selectedCategory.templateId,
      templateCategoryId: selectedCategory.templateCategoryId,
      iconImageKey: selectedCategory.iconImageKey,
      name: selectedCategory.name,
      print: !selectedCategory.print,
    };
    let result = await CategoryServices.togglePrintOffCategory(data, true);

    if (result.status == 200) {
      setShowMadal2(false);
      let categories = categoryList;
      categories[selectedCategoryIndex] = result.body;
      if (setPostCheckChanged !== null) {
        setPostCheckChanged(!postCheckChanged);
      }
    } else if (result.status == 400) {
      setShowMadal2(false);
    }
    setLoader(false);
  };
  const handleCheckboxChange = (event, templateCategoryId) => {
    if (event.target.checked) {
      setSelectedCategoriesToCopy([
        ...selectedCategoriesToCopy,
        templateCategoryId,
      ]);
    } else {
      setSelectedCategoriesToCopy(
        selectedCategoriesToCopy.filter((id) => id !== templateCategoryId),
      );
    }
  };
  return (
    <div className={`${styles.categoryList} category-list`}>
      <ul className="dFlex">
        <div className="dFlex" ref={containerRef}>
          {categoryList?.map((item, index) => (
            <li
              key={index}
              id={`category-${index}`}
              className={`
                  ${styles.categoryItem}
                  ${isDragging === index + 1 ? "dragging" : ""}
                  ${activeCat === index ? styles.active : ""} 
                  ${!item.print ? styles.noPrint : ""}
                  drag dFlex addBtn`}
            >
              {showCategoryCheckboxes && !isDraft && (
                <div className={styles.checkbox}>
                  <Checkbox
                    checked={selectedCategoriesToCopy.includes(
                      item.templateCategoryId,
                    )}
                    onChange={(event) =>
                      handleCheckboxChange(event, item.templateCategoryId)
                    }
                  />
                </div>
              )}
              <div
                className={styles.categoryItemInner}
                onClick={() => {
                  categoryClick(item.templateCategoryId, index);
                  setCatForSub(item.templateCategoryId);
                }}
              >
                <span
                  id={`categoryClick-${index}`}
                  className={`dFlex alignC justifyC ${styles.imageWrapper}`}
                >
                  <img
                    key={key}
                    src={`${item?.iconImageLocation}${item?.iconImageKey}`}
                    alt={`${item.name}-icon`}
                    className={styles.icon}
                  />
                </span>

                <p id={`categoryDrag-${index}`} className={styles.categoryName}>
                  {item.name}
                </p>
              </div>
              {draft && (
                <>
                  <div
                    className={styles.drag}
                    onPointerDown={(e) => dragStart(e, index + 1)}
                  >
                    <img src="/images/drag.svg" alt="drag" />
                  </div>

                  <div className={`actionbox dFlex ${styles.actionbox}`}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteB(true);
                        setIndexs(index);
                      }}
                    >
                      <img src="/images/delete.svg" alt="delete icon" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditB(true);
                        setIndexs(index);
                      }}
                    >
                      <img src="/images/edit.svg" alt="edit icon" />
                    </button>
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
                  </div>
                </>
              )}
              {deleteB && indexs === index && (
                <Delete
                  deleteClose={deleteClose}
                  item={item}
                  categoryDelete
                  categoriesFunc={categoriesFunc}
                  setActiveCat={setActiveCat}
                />
              )}
              {editB && indexs === index && (
                <AddEditCategoryModal
                  heading={`Edit (${item.name})`}
                  closeFunction={closeEdit}
                  templateID={templateID}
                  categoryEdit
                  item={item}
                  byDefaultName={item.name}
                  categoriesFunc={categoriesFunc}
                  setActiveCat={setActiveCat}
                  local={local}
                  setLoader={setLoader}
                />
              )}
            </li>
          ))}
          {draft ? (
            <li
              onClick={() => {
                setModal(true);
              }}
              id={`catgoryAddButton`}
              className={`${styles.addNewBtn}`}
            >
              <div className={`${styles.categoryItem} ${styles.inner}`}>
                <span className="dFlex alignC justifyC">
                  <img src="/images/add-circle.svg" alt="add sign" />
                </span>
                <p>Add New</p>
              </div>
            </li>
          ) : (
            ""
          )}
        </div>
      </ul>
      {modal && (
        <AddEditCategoryModal
          heading="Adding Category"
          closeFunction={close}
          templateID={templateID}
          categoryAdd
          categoriesFunc={categoriesFunc}
          setActiveCat={setActiveCat}
          local={local}
          setLoader={setLoader}
        />
      )}
      {showModal2 && (
        <Modal2
          close={() => setShowMadal2(false)}
          onClick={togglePrintOff}
          item={selectedCategory}
        />
      )}
      {/* Loader */}
      {loader && (
        <div className="loader dFlex alignC justifyC">
          <span></span>
        </div>
      )}
    </div>
  );
}
