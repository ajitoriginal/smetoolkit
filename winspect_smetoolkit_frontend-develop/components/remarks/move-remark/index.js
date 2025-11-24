import { useEffect, useState } from "react";
import useRemarkStore from "../../../stores/remarkStore";
import styles from "./moveRemark.module.scss";
import SubcategoryServices from "../../../api/services/SubcategoryServices";
import RemarkServices from "../../../api/services/RemarkServices";
import { useRouter } from "next/router";

const MoveRemarkPopup = () => {
  const { router } = useRouter();
  const {
    setShowMoveRemarkPopup,
    showMoveRemarkPopup,
    selectedRemarks,
    remarkList,
  } = useRemarkStore();
  const [selectedRemarkTitles, setSelectedRemarkTitles] = useState();
  const [selectedRemarkIds, setSelectedRemarkIds] = useState();
  const [loader, setLoader] = useState(false);

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

  const removeRemark = () => {
    let remarkArray = remarkList;
    selectedRemarks.map((selectedRemark) => {
      let index = remarkArray.findIndex(
        (item) => item.templateRemarkId === selectedRemark.templateRemarkId,
      );
      remarkArray.splice(index, 1);
    });
  };

  const handleClick = async () => {
    setLoader(true);
    let data = {
      customRemarkIds: selectedRemarkIds,
    };
    let result = await RemarkServices.moveRemarkToTemplate(data, router, true);
    if (result.status == 200) {
      removeRemark();
    }
    setLoader(false);
    setShowMoveRemarkPopup(false);
  };

  if (showMoveRemarkPopup) {
    return (
      <div className={styles.popupWrapper}>
        <div className={styles.popup}>
          <div className={styles.title}>Move remark</div>
          <h2>“{selectedRemarkTitles}”?</h2>
          <div className={`${styles.title} ${styles.last}`}>to template?</div>

          <div className={styles.buttonWrapper}>
            {loader ? (
              <button>Please wait...</button>
            ) : (
              <>
                <button onClick={handleClick} className={styles.red}>
                  Yes
                </button>
                <button onClick={() => setShowMoveRemarkPopup(false)}>
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

export default MoveRemarkPopup;
