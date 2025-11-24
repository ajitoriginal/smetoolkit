import { useEffect } from "react";
import RemarksComp from "../../../../../components/remarks";
import useRemarkStore from "../../../../../stores/remarkStore";
import useGenerateStore from "../../../../../stores/generalStore";
import useShowCompareStore from "../../../../../stores/showCompareStore";

const Remarks = () => {
  const { clearSelectedCheckboxesRemark } = useRemarkStore();

  const { setIsCustom, setIsDraft } = useGenerateStore();
  const { setShowCompare } = useShowCompareStore();
  useEffect(() => {
    clearSelectedCheckboxesRemark();
    setIsCustom(false);
    setShowCompare(true);
    setIsDraft(false);
  }, []);
  return <RemarksComp />;
};

export default Remarks;
