import PrimaryButton from "../../../atoms/primary-button";
import useFilterStore from "../../../stores/filterStore";
import styles from "./index.module.scss";

import React, { useState } from "react";

import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

const CustomRangePopup = () => {
  const [value, setValue] = useState([0, 100]);

  const {
    showSimilarityRangePopup,
    setShowSimilarityRangePopup,
    setSimilarityRange,
  } = useFilterStore();
  const handleClick = () => {
    setShowSimilarityRangePopup(false);
    setSimilarityRange({
      similarityStart: value[0],
      similarityEnd: value[1],
    });
  };

  if (showSimilarityRangePopup) {
    return (
      <div className={styles.popupWrapper}>
        <div className={styles.title}>Custom Range</div>

        <RangeSlider value={value} onInput={setValue} step={1} />
        <div className={styles.inputWrapper}>
          <div>{value[0]}%</div> to
          <div>{value[1]}%</div>
        </div>
        <div className={styles.buttonWrapper}>
          <PrimaryButton onClick={handleClick} text="Apply" />
        </div>
      </div>
    );
  }
};
export default CustomRangePopup;
