import styles from "./index.module.scss";
const SecondaryButton = (props) => {
  const { text, onClick } = props;
  return (
    <div onClick={onClick} className={styles.button}>
      {text}
    </div>
  );
};
export default SecondaryButton;
