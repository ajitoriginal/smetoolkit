import { useEffect } from "react";
import RemarksComp from "../../../../../components/remarks";
import useRemarkStore from "../../../../../stores/remarkStore";
import useGenerateStore from "../../../../../stores/generalStore";
import useShowCompareStore from "../../../../../stores/showCompareStore";

const Remarks = () => {
  const { clearSelectedCheckboxesRemark } = useRemarkStore();
  const { setIsCustom, setIsDraft } = useGenerateStore();
  const { setShowCompare } = useShowCompareStore();

  const { setSelectedRemarkType } = useRemarkStore();
  useEffect(() => {
    clearSelectedCheckboxesRemark();
    setIsCustom(false);
    setShowCompare(false);
    setSelectedRemarkType("Functional");
    setIsDraft(true);
  }, []);
  return <RemarksComp isDraft />;
};

export default Remarks;
