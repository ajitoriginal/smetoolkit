import TwoColumn from "./TwoColumn";
import OneColumn from "./OneColumn";
import useGenerateStore from "../../../stores/generalStore";
import useShowCompareStore from "../../../stores/showCompareStore";

const RemarkListSection = () => {
  const { isCustom } = useGenerateStore();
  const { showCompare } = useShowCompareStore();
  // if (isCustom && showCompare) {
  //   return <TwoColumn />;
  // } else {
  return <OneColumn />;
  // }
};

export default RemarkListSection;
