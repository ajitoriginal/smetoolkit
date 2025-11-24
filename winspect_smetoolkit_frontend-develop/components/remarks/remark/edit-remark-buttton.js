import styles from "./remark.module.scss";
const EditRemarkButton = (props) => {
  const { setShowEditRemark, remark } = props;
  return (
    <div
      className={`${styles.edit} edit-remark-btn`}
      onClick={() => (remark.hide ? "" : setShowEditRemark(true))}
    >
      <img src="/images/edit-gray.svg" className={styles.gray} />
      <img src="/images/edit-white.svg" className={styles.white} />
    </div>
  );
};

export default EditRemarkButton;
