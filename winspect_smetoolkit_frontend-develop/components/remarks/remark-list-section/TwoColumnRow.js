import { useState } from "react";
import Remark from "../remark";
import RemarkSlider from "../remark/remark-slider";
import styles from "./remarkListSection.module.scss";

const TwoColumnRow = (props) => {
  const { item, index, isDraft } = props;
  const [similarRemarkType, setSimilarRemarkType] = useState("");
  let similarRemarks = [];
  let nearestTemplateRemarkId = null;
  if (isDraft) {
    nearestTemplateRemarkId =
      item.oldTemplateRemark?.template_remark_similarity
        ?.nearestTemplateRemarkId;
    if (item.oldTemplateRemark?.template_remark_similarity !== null) {
      if (
        item.oldTemplateRemark?.template_remark_similarity
          ?.nearestTemplateRemark?.newTemplateRemark
      ) {
        similarRemarks.push({
          remark:
            item.oldTemplateRemark?.template_remark_similarity
              ?.nearestTemplateRemark?.newTemplateRemark,
          frequency:
            item.oldTemplateRemark?.template_remark_similarity
              ?.nearestTemplateRemark?.totalFrequency,
          frequencyData:
            item.oldTemplateRemark?.template_remark_similarity
              ?.nearestTemplateRemark?.template_remark_frequencies,
        });
      }
      if (
        item.oldTemplateRemark?.template_remark_similarity?.nearestRemark
          ?.newTemplateRemark
      ) {
        similarRemarks.push({
          remark:
            item.oldTemplateRemark?.template_remark_similarity?.nearestRemark
              ?.newTemplateRemark,
          frequency:
            item.oldTemplateRemark?.template_remark_similarity?.nearestRemark
              ?.totalFrequency,
          frequencyData:
            item.oldTemplateRemark?.template_remark_similarity?.nearestRemark
              ?.template_remark_frequencies,
        });
      }
    }
  } else {
    nearestTemplateRemarkId =
      item.template_remark_similarity?.nearestTemplateRemarkId;
    if (item.template_remark_similarity !== null) {
      if (item.template_remark_similarity?.nearestTemplateRemark) {
        similarRemarks.push({
          remark: item.template_remark_similarity.nearestTemplateRemark,
          frequency: item.template_remark_similarity.totalFrequency,
          frequencyData:
            item.template_remark_similarity.template_remark_frequencies,
        });
      }
      if (item.template_remark_similarity?.nearestRemark) {
        similarRemarks.push({
          remark: item.template_remark_similarity?.nearestRemark,
          frequency: item.template_remark_similarity.totalFrequency,
          frequencyData:
            item.template_remark_similarity.template_remark_frequencies,
        });
      }
    }
  }
  return (
    <div key={index} className={styles.row}>
      <div className={`${styles.item} left-item`}>
        <Remark
          key={index}
          remark={item}
          similarRemarkType={similarRemarkType}
        />
      </div>
      <div className={styles.item}>
        <RemarkSlider
          remarkSliderList={similarRemarks}
          nearestTemplateRemarkId={nearestTemplateRemarkId}
          setSimilarRemarkType={setSimilarRemarkType}
        />
      </div>
    </div>
  );
};

export default TwoColumnRow;
