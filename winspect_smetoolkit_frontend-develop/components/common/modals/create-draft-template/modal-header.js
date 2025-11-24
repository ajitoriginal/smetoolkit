import styles from "../../modal.module.scss";

const ModalHeader = (props) => {
  const { heading, para, activeSlide, close } = props;
  return (
    <div
      className={`${styles.header} ${
        activeSlide === 1 ? styles.headerPadding : ""
      } ${activeSlide === 2 ? styles.headerPadding : ""}`}
    >
      <div>
        <h3>{heading}</h3>
        {para && <p className={styles.smalltext}>{para}</p>}
      </div>
      <span
        onClick={() => {
          close();
          document.body.classList.remove("hidden");
        }}
      >
        <img alt="close icon" src="/images/close-white-icon.svg" />
      </span>
    </div>
  );
};

export default ModalHeader;
