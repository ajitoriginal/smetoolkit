import Modal from "../modal-wrapper";
import style from "./delete-remark-image-popup.module.scss";
import styles from "../../modal.module.scss";
import { useState } from "react";
import RemarkServices from "../../../../api/services/RemarkServices";
import { useRouter } from "next/router";
const DeleteRemarkImagePopup = (props) => {
  const router = useRouter();
  const {
    setShowDeleteRemarkImagePopup,
    setSelectedRemarkImages,
    selectedImageToDelete,
    selectedRemarkImages,
  } = props;
  const [loader, setLoader] = useState(false);

  const handleDelete = async () => {
    setLoader(true);
    const data = {
      templateRemarkImageId: selectedImageToDelete.templateRemarkImageId,
    };

    let result = await RemarkServices.deleteRemarkImage(data, router, true);
    if (result.status == 200) {
      setSelectedRemarkImages(
        selectedRemarkImages.filter(
          (selectedImage) => selectedImage !== selectedImageToDelete,
        ),
      );
    }
    setLoader(false);
    setShowDeleteRemarkImagePopup(false);
  };
  const closeFunction = () => {
    setShowDeleteRemarkImagePopup(false);
  };
  return (
    <Modal className="delete-remark-image">
      <div className={`${styles.modalContent} ${style.deleteRemarkImageModal}`}>
        <div className={style.title}>Delete Image</div>
        <div className={style.content}>“Dashboard image.jpeg”?</div>
        <div className={`${styles.btnWrapper} dFlex alignC justifyC`}>
          {loader ? (
            <button className={`${style.primaryBtn} btn gradient-btn`}>
              Please wait
            </button>
          ) : (
            <>
              <button
                className={`${style.primaryBtn} btn gradient-btn`}
                onClick={handleDelete}
              >
                Yes, Delete
              </button>
              <button
                className={`btn outline-btn ${style.secondaryBtn}`}
                onClick={closeFunction}
              >
                No
              </button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default DeleteRemarkImagePopup;
