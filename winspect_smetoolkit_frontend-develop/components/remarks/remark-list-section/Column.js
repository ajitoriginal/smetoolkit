import Remark from "../remark";
import styles from "./remarkListSection.module.scss";
import useRemarkStore from "../../../stores/remarkStore";
import RemarkSlider from "../remark/remark-slider";
import useGenerateStore from "../../../stores/generalStore";
import useCopyToStore from "../../../stores/copyToStore";
const Column = (props) => {
  const {
    title,
    remarkList = [],
    remarkSliderList = [],
    noData,
    frequencyList,
    frequencyTemplateList,
    similarColumn,
  } = props;
  const { setShowAddNewRemarkPopup } = useRemarkStore();
  const { isCustom, isDraft } = useGenerateStore();
  let finalTitle = "Remarks";
  if (title == undefined) {
    if (isCustom) {
      finalTitle = "Custom Remarks";
    }
  } else {
    finalTitle = title;
  }
  const { setSelectedCheckboxesRemark } = useRemarkStore();
  const { setSelectedRemarkToCopy } = useCopyToStore();

  const handleSelectAllClick = () => {
    setSelectedCheckboxesRemark(remarkList);
    setSelectedRemarkToCopy(remarkList);
  };

  return (
    <div className={`${styles.columnWrapper} column-wrapper`}>
      <div className={`${styles.titleWrapper} title-wrapper`}>
        <div className={styles.title}>{finalTitle}</div>
        {!isCustom && (
          <div
            className={styles.addNewRemarkButton}
            onClick={() => setShowAddNewRemarkPopup(true)}
          >
            + Add New Remarks
          </div>
        )}
        {!isDraft && (
          <div onClick={handleSelectAllClick} className={styles.selectAll}>
            Select All
          </div>
        )}
      </div>
      {noData ? (
        <div className={styles.noData}>No Remarks Found</div>
      ) : (
        <>
          {remarkSliderList.length > 0 && (
            <RemarkSlider remarkSliderList={remarkSliderList} />
          )}
          <div className={styles.remarkListWrapper}>
            {remarkList?.map((item, index) => {
              return (
                <Remark
                  index={index}
                  key={index}
                  remark={item}
                  frequencyList={frequencyList}
                  frequencyTemplateList={frequencyTemplateList}
                  similarColumn={similarColumn}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Column;
