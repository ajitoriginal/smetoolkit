import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import RemarkServices from "../../../api/services/RemarkServices";
import useRemarkStore from "../../../stores/remarkStore";
import useSubCategoryStore from "../../../stores/subCategoryStore";
import styles from "./deleteRemark.module.scss";

const RecoverRemarkPopup = () => {
  const { subCategoryId } = useSubCategoryStore();
  const [selectedRemarkTitles, setSelectedRemarkTitles] = useState();
  const [selectedRemarkIds, setSelectedRemarkIds] = useState();

  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const {
    setShowRecoverRemarkPopup,
    showRecoverRemarkPopup,
    selectedRemarks,
    setRemarkList,
    remarkList,
  } = useRemarkStore();

  useEffect(() => {
    let titles = "";
    let ids = [];
    selectedRemarks?.map((selectedRemark) => {
      titles = `${titles !== "" ? `${titles}, ` : ""}${selectedRemark.title}`;
      ids.push(selectedRemark.templateRemarkId);
    });
    setSelectedRemarkTitles(titles);
    setSelectedRemarkIds(ids);
  }, [selectedRemarks]);

  const recoverRemark = () => {
    const deletedData = remarkList.map((obj) => {
      if (selectedRemarkIds.includes(obj.templateRemarkId)) {
        return { ...obj, hide: false }; // Update the title property to "123"
      }
      return obj;
    });
    setRemarkList(deletedData);
  };

  const handleClick = async () => {
    setLoader(true);
    let data = {
      remarkIds: selectedRemarkIds,
      templateSubCategoryId: subCategoryId,
    };
    let result = await RemarkServices.recoverRemark(data, router, true);
    if (result.status == 200) {
      recoverRemark();
      setShowRecoverRemarkPopup(false);
    }
    setLoader(false);
  };

  if (showRecoverRemarkPopup) {
    return (
      <div className={styles.popupWrapper}>
        <div className={styles.popup}>
          <div className={styles.title}>Recover remark</div>
          <h2>“{selectedRemarkTitles}”?</h2>
          <div className={styles.buttonWrapper}>
            {loader ? (
              <button>Please wait...</button>
            ) : (
              <>
                <button onClick={handleClick} className={styles.blue}>
                  Yes, Recover
                </button>
                <button onClick={() => setShowRecoverRemarkPopup(false)}>
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

export default RecoverRemarkPopup;
