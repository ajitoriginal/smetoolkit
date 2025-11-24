import React, { useState, useEffect, useRef } from "react";
import styles from "./remark-inner.module.scss";
import { APIurl } from "../../utils/storage";
import Delete from "../common/delete";
import TextEditor from "../TextEditor";
import { useRouter } from "next/router";
import Checkbox from "../../atoms/checkbox";
import useGenerateStore from "../../stores/generalStore";
import useCopyToStore from "../../stores/copyToStore";

export default function RemarkInner({
  remark,
  subcategories,
  draft,
  type,
  passingSubCat,
  aboutAndNotesFunc,
  slider,
  findFavorite,
  favoritesLimitReached,
  setFavoriteUpdated,
}) {
  const api = APIurl();
  const router = useRouter();
  const { mastertemplate, template } = router.query;
  const [loader, setLoader] = useState(false);
  const [toast, setToast] = useState("");
  const [error, setError] = useState(false);
  const [remarkList, setRemarkList] = useState([]);
  const [searchFocused, setSearchFocused] = useState(false);
  const { isDraft } = useGenerateStore();
  const {
    setSelectedRemarkToCopy,
    selectedRemarkToCopy,
    showRemarkCheckboxes,
  } = useCopyToStore();
  useEffect(() => {
    if (remark) setRemarkList(remark);
  }, [remark]);

  const toastFunc = (value) => {
    setToast(value);
    setTimeout(function () {
      setToast("");
    }, 4000);
  };

  //calling local storage
  const [local, setlocal] = useState();
  const [templateID, setTemplateID] = useState();
  useEffect(() => {
    const isStored = typeof window !== "undefined" && window.localStorage;
    const local = isStored && JSON.parse(localStorage.getItem("userInfo"));

    setlocal(local);
  }, []);

  useEffect(() => {
    if (template) {
      setTemplateID(template);
    }
  }, [template]);

  const [message, setMessage] = useState();

  //add remarks
  const [addNew, setAddNew] = useState(false);
  const [remarkHeading, setRemarkHeading] = useState();
  const [remarkText, setRemarkText] = useState("");
  const refInput = useRef(null);
  async function addRemark() {
    setLoader(true);
    let result = await fetch(`${api}api/v1/template/remark`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
      body: JSON.stringify({
        templateSubCategoryId: passingSubCat,
        remark: remarkText,
        title: remarkHeading,
        type: type,
      }),
    });
    result = await result.json();
    if (result.status == 200) {
      toastFunc("Remark Added Successfully");
      setRemarkHeading();
      setRemarkText("");
      setAddNew(false);
      setMessage();
      setLoader(false);
    }
    if (result.status == 400) {
      setMessage(result.message);
      setLoader(false);
    }
    await aboutAndNotesFunc(passingSubCat);
  }

  //delete remarks
  const [warning, setWarning] = useState(false);
  const [warningIndex, setWarningIndex] = useState("");
  const deleteClose = (value) => {
    setWarning(value);
  };

  //edit remarks
  const [editIndex, setEditIndex] = useState(false);
  const [editIndexValue, setEditIndexValue] = useState(null); // Use Remark ID instead of index;
  const refInputEdit = useRef(null);
  const [remarkHeadingEdit, setRemarkHeadingEdit] = useState();
  const [remarkTextEdit, setRemarkTextEdit] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  async function editRemark(temRemarkid) {
    setLoader(true);
    let result = await fetch(`${api}api/v1/template/remark`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "*",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
      body: JSON.stringify({
        templateSubCategoryId: passingSubCat,
        remark: remarkTextEdit,
        title: remarkHeadingEdit.replace(/<[^>]*>/g, ""),
        templateRemarkId: temRemarkid,
      }),
    });
    result = await result.json();
    if (result.status == 200) {
      toastFunc("Remark Updated Successfully");
      setEditIndex(false);
      setRemarkHeadingEdit();
      setRemarkTextEdit("");
      setMessage();
      setLoader(false);
    }
    if (result.status == 400) {
      setMessage(result.message);
      setLoader(false);
    }
    await aboutAndNotesFunc(passingSubCat);
    await findFavorite(templateID);
  }

  async function editFavorite(temRemarkid, favoriteStatus) {
    let result = await fetch(`${api}api/v1/template/remark`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "*",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
      body: JSON.stringify({
        templateSubCategoryId: passingSubCat,
        templateRemarkId: temRemarkid,
        isFavourite: favoriteStatus,
      }),
    });
    result = await result.json();
    result.status == 200 && setFavoriteUpdated(true);

    await aboutAndNotesFunc(passingSubCat);
    await findFavorite(templateID);
  }

  const max = 1000;

  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const delayedSearch = debounce((e) => {
    let searchText = e.target.value.toLowerCase();
    let result = "";
    if (searchText !== "") {
      result = remark?.filter(
        (item) =>
          item.title.toLowerCase().includes(searchText) ||
          item.remark.toLowerCase().includes(searchText),
      );

      result = result?.map((item) => ({
        ...item,
        title: item.title.replace(
          new RegExp(searchText, "gi"),
          (match) => `<strong class="searchedString">${match}</strong>`,
        ),
        remark: item.remark.replace(
          new RegExp(searchText, "gi"),
          (match) => `<strong class="searchedString">${match}</strong>`,
        ),
      }));
    } else {
      result = remark;
    }
    setRemarkList(result);
  }, 700);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    delayedSearch(event);
  };

  const handleCheckboxChange = (event, templateRemarkId) => {
    if (event.target.checked) {
      setSelectedRemarkToCopy([...selectedRemarkToCopy, templateRemarkId]);
    } else {
      setSelectedRemarkToCopy(
        selectedRemarkToCopy.filter((id) => id !== templateRemarkId),
      );
    }
  };
  return (
    <div className={slider ? styles.slider : styles.sliderBox}>
      <p
        className={`poped-message ${toast ? "active" : ""} ${
          error ? "red" : ""
        }`}
      >
        {toast}
      </p>

      <div className={styles.remarkSearchAddWrapper}>
        {remark && remark.length > 0 && (
          <div
            className={`${styles.remarkSearchWrapper} ${
              searchFocused ? styles.focused : ""
            }`}
          >
            <img
              src={
                searchFocused ? "/images/search-blue.svg" : "/images/search.svg"
              }
              alt="search-icon"
            />
            <input
              value={searchTerm}
              onChange={handleSearch}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="Search remarks"
            />
            {searchTerm !== "" && (
              <div
                className={styles.clear}
                onClick={() => {
                  setSearchTerm("");
                  setRemarkList(remark);
                }}
              >
                <img
                  src="/images/close-white-icon.svg"
                  alt="close-white-icon.svg"
                />
              </div>
            )}
          </div>
        )}
        {!addNew &&
          (subcategories && subcategories.length > 0 ? (
            <div
              className={`AddBtn noPos ${styles.addForSlider}`}
              onClick={() => {
                setAddNew(true);
                setRemarkHeading();
                setRemarkText("");
                setEditIndex(false);
                setMessage();
                setTimeout(() => {
                  refInput.current.focus();
                }, 50);
              }}
              id={`Addnew-${type}`}
            >
              + Add New
            </div>
          ) : (
            draft && <p>Please add a subcategory to add Remarks</p>
          ))}
      </div>

      {remarkList && remarkList.length > 0
        ? remarkList.map((item, index) => (
            <div
              className={` ${searchTerm !== "" ? styles.searchResults : ""} ${
                styles.slideContent
              } ${
                editIndex && editIndexValue === item.templateRemarkId
                  ? styles.editing
                  : ""
              }`}
              key={index}
            >
              {editIndex && editIndexValue === item.templateRemarkId ? (
                <div
                  className={styles.editBoxInputText}
                  id={`EditSection-${type}`}
                >
                  <input
                    type="text"
                    placeholder="Enter Remark Title"
                    value={
                      remarkHeadingEdit && remarkHeadingEdit !== ""
                        ? remarkHeadingEdit.replace(/<[^>]*>/g, "")
                        : ""
                    }
                    onChange={(e) => setRemarkHeadingEdit(e.target.value)}
                    ref={refInputEdit}
                    onClick={() => {
                      setMessage();
                    }}
                  />
                  <TextEditor
                    content={remarkTextEdit}
                    setContent={setRemarkTextEdit}
                  />
                  <div className="editor-section">
                    <div className="editingaction dFlex alingC">
                      <div className="btnWrapper">
                        <button
                          className="btn"
                          onClick={() => setEditIndex(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn gradient-btn"
                          onClick={() => editRemark(item.templateRemarkId)}
                        >
                          Update
                        </button>
                        {message && <p>{message}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div
                    className={`${styles.reviewHeading} dFlex alignC justifySB`}
                  >
                    <div className={styles.remarkTitleWrapper}>
                      {showRemarkCheckboxes && !isDraft && (
                        <div className={styles.checkbox}>
                          <Checkbox
                            checked={selectedRemarkToCopy.includes(
                              item.templateRemarkId,
                            )}
                            onChange={(event) =>
                              handleCheckboxChange(event, item.templateRemarkId)
                            }
                          />
                        </div>
                      )}
                      <h4 className="dFlex alignC">
                        {/* {item?.isFavourite ? (
                          <img src="/images/favorite.svg" alt="favorite icon" />
                        ) : (
                          ""
                        )} */}
                        <span
                          dangerouslySetInnerHTML={{ __html: item.title }}
                        />
                      </h4>
                    </div>
                    <div className={`dFlex actionbox ${styles.actionBar}`}>
                      <button
                        onClick={() => {
                          setWarning(true);
                          setWarningIndex(index);
                        }}
                        title="Delete"
                      >
                        <img src="/images/delete.svg" alt="delete icon" />
                      </button>
                      <button
                        onClick={() => {
                          setEditIndex(true);
                          setEditIndexValue(item.templateRemarkId);
                          setRemarkHeadingEdit(item.title);
                          setRemarkTextEdit(item.remark);
                          setTimeout(() => {
                            refInputEdit.current.focus();
                          }, 50);
                          setMessage();
                        }}
                        title="Edit"
                      >
                        <img src="/images/edit.svg" alt="edit icon" />
                      </button>
                      {/* {item.type == "Issue" ? (
                        ""
                      ) : (
                        <button
                          onClick={() => {
                            favoritesLimitReached
                              ? item?.isFavourite
                                ? editFavorite(
                                    item.templateRemarkId,
                                    !item?.isFavourite,
                                  )
                                : (toastFunc(
                                    "Maximum defaults already selected for this subcategory. Please remove others to add a new one.",
                                  ),
                                  setError(true))
                              : editFavorite(
                                  item.templateRemarkId,
                                  !item?.isFavourite,
                                );
                          }}
                        >
                          <img src="/images/star.svg" alt="star icon" />
                        </button>
                      )} */}
                    </div>
                    {warning && warningIndex === index && (
                      <Delete
                        deleteClose={deleteClose}
                        item={item}
                        remarkDelete
                        aboutAndNotesFunc={aboutAndNotesFunc}
                        toastFunc={toastFunc}
                        passingSubCat={passingSubCat}
                      />
                    )}
                  </div>
                  <div
                    className={styles.remarkContent}
                    dangerouslySetInnerHTML={{ __html: item.remark }}
                  ></div>
                </>
              )}
            </div>
          ))
        : !draft && <h3>No Remarks Found!</h3>}

      {addNew && (
        <div className={styles.addBoxInputText} id={`AddSection-${type}`}>
          <input
            type="text"
            placeholder="Enter Title"
            value={remarkHeading}
            onChange={(e) => setRemarkHeading(e.target.value)}
            ref={refInput}
            onClick={() => {
              setMessage();
            }}
          />

          <div className="editor-section editor-section-add">
            <TextEditor setContent={setRemarkText} />
            <div className="editingaction dFlex alignC justifySB">
              <div className="btnWrapper">
                <button className="btn" onClick={() => setAddNew(false)}>
                  Cancel
                </button>
                <button
                  className="btn gradient-btn"
                  onClick={() => addRemark()}
                >
                  Save
                </button>
                {message && <p>{message}</p>}
              </div>
            </div>
          </div>
        </div>
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
