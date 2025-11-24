import useLoaderStore from "../../../stores/loaderStore";
import styles from "../modal.module.scss";
import ModalHeader from "./create-draft-template/modal-header";
import Modal from "./modal-wrapper";
const WarningModal = (props) => {
  const { heading, para, warning, btntext, closeFunction, redirect } = props;
  const { loader } = useLoaderStore();
  return (
    <Modal>
      <ModalHeader heading={heading} para={para} close={closeFunction} />
      <div className={styles.modalContent}>
        <p className={styles.warning}>{warning}</p>
        <div className={`${styles.btnWrapper} dFlex alignC justifyC`}>
          {loader ? (
            <button className={`${styles.gradient} btn gradient-btn`}>
              Please wait
            </button>
          ) : (
            <button
              className={`${styles.gradient} btn gradient-btn`}
              onClick={redirect}
            >
              {btntext}
            </button>
          )}
          <button className="btn outline-btn" onClick={closeFunction}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default WarningModal;
