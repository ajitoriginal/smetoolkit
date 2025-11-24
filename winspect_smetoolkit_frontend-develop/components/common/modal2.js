import styles from "./modal.module.scss";
import styles2 from "./modal2.module.scss";

const Modal2 = ({ close, item, subCategory = false, onClick }) => (
  <div className={styles.modalWrapper} onClick={(e) => e.stopPropagation()}>
    <div className={`${styles.modalbox} ${styles2.modalbox}`}>
      <div className={`${styles.modalContent} ${styles2.modalContent}`}>
        <h3>
          Are you sure you want to set the {item.name}{" "}
          {subCategory ? "sub" : ""}
          category to {item.print ? "not" : ""} print while starting the
          inspection?
        </h3>
        <div className={`${styles.btnWrapper} dFlex alignC justifyC`}>
          <button
            className={`${styles.gradient} btn gradient-btn`}
            onClick={close}
          >
            Cancel
          </button>
          <button onClick={onClick} className="btn outline-btn">
            Yes, Print {item.print ? "Off" : "On"}
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Modal2;
