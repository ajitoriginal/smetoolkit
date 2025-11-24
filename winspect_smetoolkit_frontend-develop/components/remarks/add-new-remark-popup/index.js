import styles from "./addNewRemarkPopup.module.scss";
import TextEditor from "../../TextEditor";
import { useState } from "react";
import useRemarkStore from "../../../stores/remarkStore";
import RemarkServices from "../../../api/services/RemarkServices";
import useSubCategoryStore from "../../../stores/subCategoryStore";
import { useRouter } from "next/router";
import useGenerateStore from "../../../stores/generalStore";

const AddNewRemarkPopup = () => {
  const [remarkText, setRemarkText] = useState("");
  const [remarkHeading, setRemarkHeading] = useState();
  const [message, setMessage] = useState();
  const [loader, setLoader] = useState(false);

  const {
    selectedRemarkType,
    setShowAddNewRemarkPopup,
    showAddNewRemarkPopup,
    setRemarkList,
    remarkList,
    setRemarkTypeTabsCount,
    remarkTypeTabsCount,
    remarkCatTabsCount,
    setRemarkCatTabsCount,
    reloadRemarks,
  } = useRemarkStore();

  const { isCustom } = useGenerateStore();

  const { subCategoryId } = useSubCategoryStore();

  const router = useRouter();

  const validateForm = () => {
    let valid = true;
    if (remarkHeading == "" || remarkText == "") {
      valid = false;
    }
    return valid;
  };

  const updateRemarkListAndCount = (item) => {
    let remarkArray = remarkList;
    remarkArray.unshift(item);
    setRemarkList(remarkArray);

    // update remark type count
    if (isCustom) {
      setRemarkTypeTabsCount({
        ...remarkTypeTabsCount,
        custom: remarkTypeTabsCount.custom + 1,
      });
    } else {
      setRemarkTypeTabsCount({
        ...remarkTypeTabsCount,
        template: remarkTypeTabsCount.template + 1,
      });
    }

    //udate category count
    let remarCatCount = remarkCatTabsCount;
    let remarkType = selectedRemarkType.toLowerCase();
    remarCatCount[remarkType] = remarkCatTabsCount[remarkType] + 1;

    setRemarkCatTabsCount(remarCatCount);
  };

  async function addRemark() {
    let valid = validateForm();
    if (valid) {
      setLoader(true);
      const data = {
        templateSubCategoryId: subCategoryId,
        remark: remarkText,
        title: remarkHeading,
        type: selectedRemarkType,
      };

      let result = await RemarkServices.addRemark(data, router, true);
      if (result.status == 200) {
        setRemarkHeading();
        setRemarkText("");
        setShowAddNewRemarkPopup(false);
        reloadRemarks();
      }
      setLoader(false);
    } else {
      setMessage("Please fill empty input");
    }
  }

  if (showAddNewRemarkPopup) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.popup}>
          <div className={styles.titleWrapper}>
            <div className={styles.title}>New Remark</div>
            <div
              className={styles.close}
              onClick={() => setShowAddNewRemarkPopup(false)}
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <rect
                  y="0.888672"
                  width="1.25706"
                  height="10.0565"
                  rx="0.628532"
                  transform="rotate(-45 0 0.888672)"
                  fill="white"
                />
                <rect
                  x="7.11133"
                  width="1.25706"
                  height="10.0565"
                  rx="0.628532"
                  transform="rotate(45 7.11133 0)"
                  fill="white"
                />
              </svg>
            </div>
          </div>

          <div className={styles.content}>
            <div className={styles.fieldWrapper}>
              <div className={styles.label}>Title*</div>
              <div className={styles.inputWrapper}>
                <input
                  placeholder="Enter Title"
                  onChange={(e) => setRemarkHeading(e.target.value)}
                  onClick={() => {
                    setMessage();
                  }}
                />
              </div>
            </div>
            <div className={styles.fieldWrapper}>
              <div className={styles.label}>Remark*</div>
              <div className={styles.inputWrapper}>
                <div className={`${styles.editor} add-new-remark-editor`}>
                  <TextEditor
                    setContent={setRemarkText}
                    onClick={() => {
                      setMessage();
                    }}
                  />
                </div>
              </div>
            </div>
            <div className={styles.saveButtonWrapper}>
              {loader ? (
                <button className={styles.wait}>Please wait...</button>
              ) : (
                <button onClick={addRemark}>Save</button>
              )}
            </div>
            {message && <p className={styles.error}>{message}</p>}
          </div>
        </div>
      </div>
    );
  }
};

export default AddNewRemarkPopup;
