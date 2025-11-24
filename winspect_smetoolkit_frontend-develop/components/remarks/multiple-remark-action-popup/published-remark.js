import { useEffect, useState } from "react";
import useRemarkStore from "../../../stores/remarkStore";
import styles from "./multipleRemarkActionPopup.module.scss";
import useCopyToStore from "../../../stores/copyToStore";
const PublishedMultipleRemarkActionPopup = () => {
  const [showMoveTemplateBtn, setShowMoveTemplateBtn] = useState(true);

  const { selectedCheckboxesRemark, setSelectedCheckboxesRemark } =
    useRemarkStore();
  const { setShowCopyToPopup, setCopyTo, setSelectedRemarkToCopy } =
    useCopyToStore();

  useEffect(() => {
    let showMoveTemplateBtn = true;
    selectedCheckboxesRemark.map((remark) => {
      if (remark.remarkType == "Template") {
        showMoveTemplateBtn = false;
      }
    });
    setShowMoveTemplateBtn(showMoveTemplateBtn);
  });

  const handleCopyTo = () => {
    const templateRemarkIds = selectedCheckboxesRemark.map(
      (remark) => remark.templateRemarkId,
    );

    setSelectedRemarkToCopy(templateRemarkIds);
    setShowCopyToPopup(true);
    setCopyTo("remark");
  };

  const handleCancleClick = () => {
    setSelectedRemarkToCopy([]);
    setSelectedCheckboxesRemark([]);
  };

  if (selectedCheckboxesRemark.length > 0) {
    return (
      <div className={styles.popupWrapper}>
        <button onClick={handleCopyTo}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
          >
            <path
              d="M14 9.75L12.9425 10.8075L14.8775 12.75H8V14.25H14.8775L12.9425 16.1925L14 17.25L17.75 13.5L14 9.75Z"
              fill="white"
            />
            <path
              d="M8.879 4.5L11.4395 7.0605L11.879 7.5H21.5V19.5H3.5V4.5H8.879ZM8.879 3H3.5C3.10218 3 2.72064 3.15804 2.43934 3.43934C2.15804 3.72064 2 4.10218 2 4.5V19.5C2 19.8978 2.15804 20.2794 2.43934 20.5607C2.72064 20.842 3.10218 21 3.5 21H21.5C21.8978 21 22.2794 20.842 22.5607 20.5607C22.842 20.2794 23 19.8978 23 19.5V7.5C23 7.10218 22.842 6.72064 22.5607 6.43934C22.2794 6.15804 21.8978 6 21.5 6H12.5L9.9395 3.4395C9.65826 3.15818 9.27679 3.00008 8.879 3Z"
              fill="white"
            />
          </svg>
          Copy ({selectedCheckboxesRemark.length}) remark to Draft
        </button>
        <button className={styles.outlined} onClick={handleCancleClick}>
          Cancel
        </button>
      </div>
    );
  }
};

export default PublishedMultipleRemarkActionPopup;
