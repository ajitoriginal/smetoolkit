import React, { useState, useEffect, useRef } from "react";
import { APIurl } from "../../utils/storage";
import dynamic from "next/dynamic";
import styles from "./definition.module.scss";
import Delete from "../common/delete";
import { toast } from "react-toastify";
import "suneditor/dist/css/suneditor.min.css";
const SunEditor = dynamic(() => import("suneditor-react", { buttonList }), {
  ssr: false,
});

export default function Definitions(props) {
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

  const [seed, setSeed] = useState(1);
  const reset = () => {
    callDefinition();
    setSeed(Math.random());
  };

  //fetch definition
  const [definitionData, setDefinitionData] = useState();
  async function callDefinition() {
    let result = await fetch(
      `${api}api/v1/template/definition?templateId=${templateID}`,
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
      setDefinitionData(result.body);
    }
    setLoader(false);
  }

  useEffect(() => {
    if (local != null) {
      callDefinition();
    }
  }, [local]);

  //add definition
  const refInpuEdit = useRef(null);
  const [addDefinition, setAddDefinition] = useState(false);
  const [addDefinitionText, setAddDefinitionText] = useState();
  const [addDefinitionDesc, setAddDefinitionDesc] = useState();

  async function addingDefinitions() {
    let result = await fetch(`${api}api/v1/template/definition`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
      body: JSON.stringify({
        templateId: templateID,
        title: addDefinitionText,
        description: addDefinitionDesc,
      }),
    });
    result = await result.json();
    toast.success(result?.message);
    callDefinition();
    setAddDefinition(false);
    setAddDefinitionText();
    setAddDefinitionDesc();
  }

  //edit definition
  const [editDefinition, setEditDefinition] = useState();
  const [editDefinitionText, setEditDefinitionText] = useState();
  const [editDefinitionDesc, setEditDefinitionDesc] = useState();

  async function editingDefinitions(id) {
    let result = await fetch(`${api}api/v1/template/definition`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
      body: JSON.stringify({
        templateDefinitionId: id,
        title: editDefinitionText,
        description: editDefinitionDesc,
      }),
    });
    result = await result.json();
    toast.success(result?.message);
    callDefinition();
    setEditDefinition();
  }

  //delete definition
  const [deleteB, setDeleteB] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState();
  const deleteClose = (value) => {
    setDeleteB(value);
  };
  const [deleteDef, setDeleteDef] = useState();
  const deleteIndexFunction = (value) => {
    setDeleteDef(value);
  };

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
    const dragData = definitionData[index - 1];
    let newData = [...definitionData];
    let updatedData = [];

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
          updatedData = newData?.filter((item) => {
            return item.templateDefinitionId !== dragData.templateDefinitionId;
          });
          updatedData?.splice(index - 1, 0, dragData);
          // console.log(updatedData);
          newData = updatedData;
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

      let passingData = updatedData?.map((item, index) => ({
        templateDefinitionId: item.templateDefinitionId,
        orderNumber: index + 1,
      }));
      Reorder(passingData, dragData);
    }
  }

  async function Reorder(passingD, dragValue) {
    setLoader(true);
    let result = await fetch(`${api}api/v1/template/definition/reorder`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
      body: JSON.stringify({
        templateDefinitionId: dragValue.templateDefinitionId,
        definitionData: passingD,
        templateId: templateID,
      }),
    });
    setLoader(false);
    reset();
  }

  return (
    <section
      className={styles.definitionSection}
      ref={containerRefAbout}
      key={seed}
    >
      {definitionData &&
        definitionData?.length > 0 &&
        definitionData?.map((item, index) => (
          <div
            key={index}
            className={`${isDragging === index + 1 ? "dragging" : ""} ${
              styles.defintionShowParent
            }`}
          >
            {" "}
            {definitionData?.length > 1 && (
              <span
                onClick={(e) => e.stopPropagation()}
                onPointerDown={(e) => dragStart(e, index + 1)}
                className={styles.dragIcon}
              >
                <img src="/images/drag.svg" alt="images" />
              </span>
            )}
            <div className={styles.defintionShow}>
              {editDefinition == index ? (
                <div
                  className={`${styles.defintionShow} ${styles.defintionShowAdd}`}
                >
                  <input
                    type="text"
                    id="addDefinitionTitle"
                    onChange={(e) => {
                      setEditDefinitionText(e.target.value);
                    }}
                    ref={refInpuEdit}
                    value={editDefinitionText}
                  />
                  <div className={styles.textareaWrapper}>
                    <SunEditor
                      height="100"
                      id="editDefinitionDesc"
                      setOptions={{
                        buttonList: [["bold", "italic", "underline", "list"]],
                      }}
                      setContents={editDefinitionDesc}
                      onChange={(content) => {
                        setEditDefinitionDesc(content);
                      }}
                    />
                  </div>
                  <button
                    className={`${styles.addButton} btn gradient-btn`}
                    onClick={() =>
                      editingDefinitions(item.templateDefinitionId)
                    }
                    disabled={
                      editDefinitionText && editDefinitionDesc ? false : true
                    }
                  >
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <h4>{item.title}</h4>
                  <div
                    className={styles.content}
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </>
              )}
              {editDefinition != index && (
                <div className={styles.actionBar}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteB(true);
                      setDeleteIndex(index);
                    }}
                  >
                    <img src="/images/deleteblue.svg" alt="delete icon" />
                  </button>

                  {deleteB && deleteIndex == index && (
                    <Delete
                      deleteClose={deleteClose}
                      item={item}
                      indexDefinition={index}
                      definitionDelete
                      callDefinition={callDefinition}
                      deleteIndexFunction={deleteIndexFunction}
                    />
                  )}

                  <button
                    onClick={() => {
                      setEditDefinition(index);
                      setTimeout(() => {
                        refInpuEdit.current.focus();
                      }, 50);
                      setEditDefinitionText(item.title);
                      setEditDefinitionDesc(item.description);
                    }}
                  >
                    <img src="/images/editblue.svg" alt="edit icon" />
                  </button>
                </div>
              )}
            </div>
            {deleteDef == index && (
              <div className={`${styles.defintionShow} ${styles.delete}`}>
                one defintion is deleted
              </div>
            )}
          </div>
        ))}
      {addDefinition && (
        <div className={`${styles.defintionShow} ${styles.defintionShowAdd}`}>
          <input
            type="text"
            id="addDefinitionTitle"
            onChange={(e) => {
              setAddDefinitionText(e.target.value);
            }}
            ref={refInpuEdit}
            placeholder="Enter title here"
          />
          <div className={styles.textareaWrapper}>
            <SunEditor
              height="100"
              id="addDefinitionDesc"
              setOptions={{
                buttonList: [["bold", "italic", "underline", "list"]],
              }}
              placeholder="Enter description here"
              onChange={(content) => {
                setAddDefinitionDesc(content);
              }}
            />
          </div>
          <button
            className={`${styles.addButton} btn gradient-btn`}
            onClick={() => addingDefinitions()}
            disabled={addDefinitionText && addDefinitionDesc ? false : true}
          >
            Save
          </button>
        </div>
      )}
      {!addDefinition && (
        <button
          className={styles.addNew}
          onClick={() => {
            setAddDefinition(true);
            setTimeout(() => {
              refInpuEdit.current.focus();
            }, 50);
          }}
        >
          {definitionData && definitionData?.length > 1 ? "+ New" : "+ Add"}
        </button>
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
