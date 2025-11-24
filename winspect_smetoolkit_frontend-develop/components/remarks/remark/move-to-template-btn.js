import useRemarkStore from "../../../stores/remarkStore";
import styles from "./remark.module.scss";
const MoveToTemplateBtn = (props) => {
  const { remark } = props;
  const { setShowMoveRemarkPopup, setSelectedRemarks } = useRemarkStore();
  const handleClick = () => {
    setSelectedRemarks([remark]);
    setShowMoveRemarkPopup(true);
  };
  return (
    <div
      className={styles.moveToTemplateBtn}
      onClick={() => (remark.hide ? "" : handleClick())}
    >
      <img src="/images/template-icon.svg" />
      Move to template
    </div>
  );
};

export default MoveToTemplateBtn;
