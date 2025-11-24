import styles from "./meta.module.scss";
const Meta = (props) => {
  const { label, value } = props;
  return (
    <div className={styles.meta}>
      <div className={styles.label}>{label}:</div>
      <div className={styles.value}>{value}</div>
    </div>
  );
};
export default Meta;
