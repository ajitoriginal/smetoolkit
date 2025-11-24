import styles from "./remarkSlider.module.scss";
import Remark from "../";
import useRemarkStore from "../../../../stores/remarkStore";
import { useEffect, useState } from "react";
import Pagination from "./pagination/pagination";
const RemarkSlider = (props) => {
  const { remarkSliderList, nearestTemplateRemarkId, setSimilarRemarkType } =
    props;
  const { setSelectedCheckboxesRemark, selectedCheckboxesRemark } =
    useRemarkStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    setSimilarRemarkType(remarkSliderList[currentIndex]?.remark.remarkType);
  }, [currentIndex]);
  return (
    <div className={styles.wrapper}>
      {remarkSliderList?.map((item, index) => {
        if (currentIndex == index) {
          return (
            <Remark
              key={index}
              remark={item.remark}
              frequency={item.frequency}
              frequencyData={item.frequencyData}
              setSelectedCheckboxesRemark={setSelectedCheckboxesRemark}
              selectedCheckboxesRemark={selectedCheckboxesRemark}
              sliderRemark
              nearestTemplateRemarkId={nearestTemplateRemarkId}
            />
          );
        }
      })}
      {remarkSliderList.length > 1 && (
        <div className={styles.rightAlign}>
          <Pagination
            index={currentIndex}
            setIndex={setCurrentIndex}
            count={remarkSliderList.length}
          />
        </div>
      )}
    </div>
  );
};

export default RemarkSlider;
