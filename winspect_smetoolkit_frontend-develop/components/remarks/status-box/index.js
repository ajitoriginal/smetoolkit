import styles from "./statusBox.module.scss";

const StatusBox = (props) => {
  const { text } = props;
  return <div className={styles.wrapper}>{text}</div>;
};

export default StatusBox;
