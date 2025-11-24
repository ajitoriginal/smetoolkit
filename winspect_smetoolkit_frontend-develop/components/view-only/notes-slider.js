import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import React from "react";
import "suneditor/dist/css/suneditor.min.css";
import styles from "./notes-slider.module.scss";
import { APIurl } from "../../utils/storage";
import Delete from "../common/delete";

const SunEditor = dynamic(() => import("suneditor-react", { buttonList }), {
  ssr: false,
});

export default function NotesSlider({
  AboutValue,
  Aboutnotes,
  draft,
  closeNotesModal,
  templateID,
  aboutAndNotesFunc,
  passingSubCat,
}) {
  const api = APIurl();
  const [toast, setToast] = useState("");

  const [loader, setLoader] = useState(false);

  const toastFunc = (value) => {
    setToast(value);
    setTimeout(function () {
      setToast("");
    }, 4000);
  };

  //calling local storage
  const [local, setlocal] = useState();
  useEffect(() => {
    const isStored = typeof window !== "undefined" && window.localStorage;
    const local = isStored && JSON.parse(localStorage.getItem("userInfo"));
    setlocal(local);
  }, []);

  // For adding notes
  //adding text editors on click
  const [addIndex, setAddIndex] = useState("");
  const [arr, setArr] = useState([]);
  const addInput = () => {
    setArr((s) => {
      return [
        ...s,
        {
          note: "",
        },
      ];
    });
  };
  //adding notes on click in an array
  const handleChange = (i, contents) => {
    const index = i;
    setArr((s) => {
      const newArr = s.slice();
      newArr[index].note = contents;
      return newArr;
    });
  };
  //Api for add notes
  async function addNotes(item) {
    let result = await fetch(`${api}api/v1/template/about-value/note`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
      body: JSON.stringify({
        notes: arr,
        templateAboutValueId: item.templateAboutValueId,
        templateId: templateID,
      }),
    });
    result = await result.json();
    if (result.status == 200) {
      toastFunc("Notes Added Successfully");
      setArr([]);
    }
    await aboutAndNotesFunc(passingSubCat);
    setLoader(false);
  }

  // for edit notes
  const [edit, setEdit] = useState(false);
  const [editIndex, setEditIndex] = useState();
  const [updateArrayState, setUpdateArrayState] = useState();
  async function updateNotes(item) {
    let result = await fetch(`${api}api/v1/template/about-value/note`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
      body: JSON.stringify({
        notes: [
          {
            note: updateArrayState,
            templateAboutValueNoteId: item.templateAboutValueNoteId,
          },
        ],
        templateAboutValueId: item.templateAboutValueId,
        templateId: templateID,
      }),
    });
    result = await result.json();
    if (result.status == 200) {
      toastFunc("Note Updated Successfully");
    }
    await aboutAndNotesFunc(passingSubCat);
    setLoader(false);
  }

  //for delete notes
  const [warning, setWarning] = useState(false);
  const [warningIndex, setWarningIndex] = useState("");
  const deleteClose = (value) => {
    setWarning(value);
  };

  const max = 1000;

  return (
    <div className={styles.sideRight}>
      <p className={`poped-message ${toast ? "active" : ""}`}>{toast}</p>
      <span
        onClick={(e) => {
          e.stopPropagation();
          closeNotesModal(false);
          setArr([]);
          setEdit(false);
          setWarning(false);
        }}
        className={styles.closeBtn}
      >
        <img alt="close icon" src="/images/closeblue.svg" />
      </span>

      <h3>Notes</h3>
      <ul className={styles.aboutValues}>
        <li>
          <h4>{Aboutnotes.value}</h4>
          <div className={styles.noteBox}>
            {/* displaying notes for view only screens */}
            {Aboutnotes.template_about_value_notes.length > 0
              ? Aboutnotes.template_about_value_notes.map((notes, index) => (
                  <div className={`${edit ? "editbox" : ""} dFlex`} key={index}>
                    {edit && editIndex === index ? (
                      <div
                        className={styles.editBox}
                        onBlur={() => {
                          {
                            updateArrayState === notes.note
                              ? ""
                              : updateNotes(notes);
                          }
                          setEdit(false);
                        }}
                        id={`editNotes-${index}`}
                      >
                        <SunEditor
                          key={index}
                          height="70"
                          setOptions={{
                            maxCharCount: max,
                            charCounter: true,
                            buttonList: [
                              ["bold", "italic", "underline", "list"],
                              ["removeFormat"],
                            ],
                          }}
                          onChange={(content) => setUpdateArrayState(content)}
                          setContents={notes.note}
                        />
                      </div>
                    ) : (
                      <p
                        key={index}
                        dangerouslySetInnerHTML={{ __html: notes.note }}
                      ></p>
                    )}
                    {
                      /* action options for notes */
                      !edit && (
                        <div className={`${styles.actionBar} dFlex`}>
                          {/* Delete button */}
                          {draft && (
                            <button
                              onClick={() => {
                                setWarning(true);
                                setWarningIndex(index);
                              }}
                              id={`deleteNotes-${index}`}
                            >
                              <img src="/images/delete.svg" alt="delete icon" />
                            </button>
                          )}

                          {/* Edit button */}
                          <button
                            onClick={() => {
                              setArr([]);
                              setEdit(true);
                              setEditIndex(index);
                            }}
                            id={`editNotes-${index}`}
                          >
                            <img src="/images/editblue.svg" alt="edit icon" />
                          </button>
                        </div>
                      )
                    }
                    {warning && warningIndex === index && (
                      <Delete
                        deleteClose={deleteClose}
                        item={notes}
                        noteDelete
                        aboutAndNotesFunc={aboutAndNotesFunc}
                        toastFunc={toastFunc}
                        passingSubCat={passingSubCat}
                        templateID={templateID}
                      />
                    )}
                  </div>
                ))
              : draft && <h6>No Notes Found!</h6>}

            {/* For adding Notes */}
            {addIndex &&
              arr.map((cont, i) => {
                return (
                  <div
                    key={i}
                    id={`addNotes-${i}`}
                    className={styles.editorWrapper}
                    onBlur={() => {
                      {
                        arr.length - 1 === i ? addNotes(Aboutnotes) : "";
                      }
                      {
                        arr.length - 1 === i ? setAddIndex(false) : "";
                      }
                      {
                        arr.length - 1 === i ? setArr([]) : "";
                      }
                    }}
                  >
                    <SunEditor
                      key={i}
                      height="70"
                      setOptions={{
                        maxCharCount: max,
                        charCounter: true,
                        buttonList: [
                          ["bold", "italic", "underline", "list"],
                          ["removeFormat"],
                        ],
                      }}
                      onChange={(contents) => {
                        handleChange(
                          i,
                          contents
                            .replace(/<[^>]+>/g, "")
                            ?.replace(/&nbsp;/g, " ")
                            .substring(0, 1000),
                        );
                      }}
                    />
                  </div>
                );
              })}

            {!edit && (
              <button
                className={`AddBtn ${styles.addBtn}`}
                onClick={() => {
                  addInput();
                  setAddIndex(true);
                }}
                id="addNotes"
              >
                + Add Note
              </button>
            )}
          </div>
        </li>
      </ul>
      {/* Loader */}
      {loader && (
        <div className="loader dFlex alignC justifyC">
          <span></span>
        </div>
      )}
    </div>
  );
}
