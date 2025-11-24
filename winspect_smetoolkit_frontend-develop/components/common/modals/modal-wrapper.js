import styles from "../modal.module.scss";

const Modal = (props) => {
  const { className } = props;
  return (
    <>
      <div
        className={`${styles.modalWrapper} modalWr  justifyC`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`${styles.modalbox} ${className}`}>
          {props.children}
        </div>
      </div>
      {/* Loader */}
      {props.loader && (
        <div className="loader dFlex alignC justifyC">
          <span></span>
        </div>
      )}
    </>
  );
};

export default Modal;
