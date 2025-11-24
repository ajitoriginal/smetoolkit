import styles from "./index.module.scss";
const PrimaryButton = (props) => {
  const { text, onClick, disabled, icon = null } = props;
  return (
    <div
      onClick={onClick}
      className={`${styles.button} ${disabled ? styles.disabled : ""}`}
    >
      {icon !== null && icon} <span className={styles.buttonText}>{text}</span>
    </div>
  );
};
export default PrimaryButton;
