import useRemarkStore from "../../../stores/remarkStore";
import styles from "./remark.module.scss";
const ViewGroupBtn = (props) => {
  const { remark, nearestTemplateRemarkId } = props;
  const {
    setShowGroupViewRemarkPopup,
    setSelectedRemarkForGroupView,
    setNearestTemplateRemarkIdStore,
  } = useRemarkStore();
  const handleClick = () => {
    setNearestTemplateRemarkIdStore(nearestTemplateRemarkId);
    setSelectedRemarkForGroupView(remark);
    setShowGroupViewRemarkPopup(true);
  };
  return (
    <div
      className={styles.viewGroupLink}
      onClick={() => (remark.hide ? "" : handleClick())}
    >
      View Group
    </div>
  );
};

export default ViewGroupBtn;
