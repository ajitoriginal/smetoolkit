import AddNewRemarkPopup from "./add-new-remark-popup";
import DeleteRemarkPopup from "./delete-remark-popup";
import MoveRemarkPopup from "./move-remark";
import MultipleRemarkActionPopup from "./multiple-remark-action-popup";
import RemarkUtilizationPopup from "./remark-utilization-popup";
import RemarksGroupViewPopup from "./remarks-group-view-popup";
import RecoverRemarkPopup from "./delete-remark-popup/recoverRemarkPopup";
import CalendarPopup from "./calendar-popup";
import PublishedMultipleRemarkActionPopup from "./multiple-remark-action-popup/published-remark";
import useGenerateStore from "../../stores/generalStore";
import ImageUpload from "../crop-image/CropImage";
import RemarkDeselectPopup from "./remark-deselect-popup";

const RemarkPopups = () => {
  const { isDraft } = useGenerateStore();
  return (
    <>
      <RemarkUtilizationPopup />
      <RemarkDeselectPopup />
      <DeleteRemarkPopup />
      <RecoverRemarkPopup />
      <MoveRemarkPopup />
      <RemarksGroupViewPopup />
      <AddNewRemarkPopup />
      <CalendarPopup />
      {isDraft ? (
        <MultipleRemarkActionPopup />
      ) : (
        <PublishedMultipleRemarkActionPopup />
      )}

      <ImageUpload />
    </>
  );
};

export default RemarkPopups;
