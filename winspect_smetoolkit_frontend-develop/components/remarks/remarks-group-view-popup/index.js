import { useEffect, useState } from "react";
import RemarkServices from "../../../api/services/RemarkServices";
import useRemarkStore from "../../../stores/remarkStore";
import Column from "../remark-list-section/Column";
import styles from "./remarksGroupViewPopup.module.scss";
import useGenerateStore from "../../../stores/generalStore";
const RemarksGroupViewPopup = () => {
  const [remarkList, setRemarkList] = useState([]);
  const [frequencyList, setFrequencyList] = useState([]);
  const [frequencyTemplateList, setFrequencyTemplateList] = useState([]);

  const { isDraft } = useGenerateStore();
  const {
    setShowGroupViewRemarkPopup,
    showGroupViewRemarkPopup,
    selectedRemarkForGroupView,
    selectedCheckboxesRemark,
    setSelectedRemarkForGroupView,
    nearestTemplateRemarkIdStore,
  } = useRemarkStore();
  useEffect(() => {
    if (selectedRemarkForGroupView !== null) {
      getGropViewRemarks();
    }
  }, [selectedRemarkForGroupView]);

  const getGropViewRemarks = async () => {
    let result = await RemarkServices.getGroupRemark(
      nearestTemplateRemarkIdStore,
      // "edfc1371-d8f8-41dc-9266-6e7d7c46c433",
      isDraft ? "True" : "False",
    );

    let list = [];
    let freqList = [];
    let freqTemplateList = [];

    result?.body?.map((item) => {
      let remarkItem = item.template_remark.newTemplateRemark;
      if (!isDraft) {
        remarkItem = item.template_remark;
      }
      remarkItem.nearestScore =
        item.nearestRemarkScore != null
          ? item.nearestRemarkScore
          : item.nearestTemplateScore;
      list.push(remarkItem);
      freqList.push(item.template_remark.totalFrequency);
      freqTemplateList.push(item.template_remark.template_remark_frequencies);
    });

    setRemarkList([...list]);
    setFrequencyList([...freqList]);
    setFrequencyTemplateList([...freqTemplateList]);
  };

  const handleClose = () => {
    setShowGroupViewRemarkPopup(false);
    setSelectedRemarkForGroupView(null);
    setRemarkList([]);
  };

  if (showGroupViewRemarkPopup) {
    return (
      <div
        className={`${styles.wrapper} ${
          selectedCheckboxesRemark.length > 0 ? styles.withMultiPopup : ""
        } remark-group-view`}
      >
        <div className={styles.popup}>
          <div className={styles.titleWrapper}>
            <div className={styles.title}>
              {selectedRemarkForGroupView.title} - Similar Remarks
            </div>
            <div className={styles.close} onClick={() => handleClose()}>
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
            <div className={styles.columnTitleWrapper}>
              <div className={styles.columnTitle}>Custom Remarks</div>
              <div className={styles.columnTitle}>Similar Template Remark </div>
            </div>
            <div className={`${styles.twoColumns} group-view-columns`}>
              <Column
                remarkList={remarkList}
                frequencyList={frequencyList}
                frequencyTemplateList={frequencyTemplateList}
                title="Custom Remarks"
              />
              <Column
                remarkList={[selectedRemarkForGroupView]}
                title="Similar Template Remarks"
                similarColumn
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default RemarksGroupViewPopup;
