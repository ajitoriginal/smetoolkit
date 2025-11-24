import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import RemarkServices from "../../../api/services/RemarkServices";
import useRemarkStore from "../../../stores/remarkStore";
import useSubCategoryStore from "../../../stores/subCategoryStore";
import styles from "./deleteRemark.module.scss";

const DeleteRemarkPopup = () => {
  const { subCategoryId } = useSubCategoryStore();
  const [selectedRemarkTitles, setSelectedRemarkTitles] = useState();
  const [selectedRemarkIds, setSelectedRemarkIds] = useState();

  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const {
    setShowDeleteRemarkPopup,
    showDeleteRemarkPopup,
    selectedRemarks,
    selectedCheckboxesRemark,
    setSelectedCheckboxesRemark,
    setRemarkList,
    remarkList,
  } = useRemarkStore();

  useEffect(() => {
    let titles = "";
    let ids = [];
    selectedRemarks?.map((selectedRemark, index) => {
      titles = `${
        titles !== ""
          ? `${titles}${
              selectedRemarks.length > 1 && index == selectedRemarks.length - 1
                ? " & "
                : ", "
            } `
          : ""
      }${selectedRemark.title}`;
      ids.push(selectedRemark.templateRemarkId);
    });
    setSelectedRemarkTitles(titles);
    setSelectedRemarkIds(ids);
  }, [selectedRemarks]);

  const deleteRemark = () => {
    const deletedData = remarkList.map((obj) => {
      if (selectedRemarkIds.includes(obj.templateRemarkId)) {
        return { ...obj, hide: true }; // Update the title property to "123"
      }
      return obj;
    });
    setRemarkList(deletedData);
  };

  const unCheckCheckboxes = () => {
    selectedCheckboxesRemark.map((item) => {
      setSelectedCheckboxesRemark([]);
    });
  };

  const handleClick = async () => {
    setLoader(true);
    let data = {
      remarkIds: selectedRemarkIds,
      templateSubCategoryId: subCategoryId,
    };
    let result = await RemarkServices.hideRemark(data, router, true);
    if (result.status == 200) {
      deleteRemark();
      unCheckCheckboxes();
    }
    setLoader(false);
    setShowDeleteRemarkPopup(false);
  };

  if (showDeleteRemarkPopup) {
    return (
      <div className={styles.popupWrapper}>
        <div className={styles.popup}>
          <div className={styles.title}>Delete remark</div>
          <h2>“{selectedRemarkTitles}”?</h2>
          <div className={styles.buttonWrapper}>
            {loader ? (
              <button>Please wait...</button>
            ) : (
              <>
                <button onClick={handleClick} className={styles.red}>
                  Yes, Delete
                </button>
                <button onClick={() => setShowDeleteRemarkPopup(false)}>
                  No
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default DeleteRemarkPopup;
