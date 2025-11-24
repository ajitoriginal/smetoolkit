import { useState, useRef, useEffect } from "react";
import styles from "../modal.module.scss";
import ModalHeader from "./create-draft-template/modal-header";
import Modal from "./modal-wrapper";
import { APIurl } from "../../../utils/storage";

const FavouriteRemarkModal = (props) => {
  const api = APIurl();
  const {
    heading,
    closeFunction,
    favorioteLits,
    findFavorite,
    aboutAndNotesFun,
    passingSubCat,
    templateID,
    checkDraft,
    local,
  } = props;

  const [undoSection, setUndoSection] = useState([]);
  async function editFavorite(newSubCat, temRemarkid, favoriteStatus, index) {
    await fetch(`${api}api/v1/template/remark`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "*",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
      body: JSON.stringify({
        templateSubCategoryId: newSubCat,
        templateRemarkId: temRemarkid,
        isFavourite: favoriteStatus,
      }),
    });
    setTimeout(() => {
      aboutAndNotesFun(passingSubCat);
      findFavorite(templateID);
      deleteByUndo(index);
    }, 3000);
  }
  const deleteByUndo = (value) => {
    setUndoSection((undoSection) => {
      return undoSection.filter((undoSection) => undoSection !== value);
    });
  };
  return (
    <Modal>
      <ModalHeader heading={heading} close={closeFunction} />
      <div className={`${styles.modalSteps} ${styles.favoriteList}`}>
        <ul>
          {favorioteLits &&
            favorioteLits.length > 0 &&
            favorioteLits?.map((item, index) => (
              <li
                key={index}
                className={undoSection?.includes(index) ? `${styles.fade}` : ""}
              >
                <div className={`dFlex alignC justifySB`}>
                  <div className={styles.leftPart}>
                    <span>
                      {item?.template_subcategory?.template_category?.name}/
                      {item?.template_subcategory?.name}
                    </span>
                    <h3>{item.title}</h3>
                  </div>
                  <div className={styles.rightPart}>
                    <button
                      onClick={() => {
                        const newState = [...undoSection, index];
                        setUndoSection(newState);
                        if (newState.includes(index)) {
                          editFavorite(
                            item?.templateSubCategoryId,
                            item.templateRemarkId,
                            !item?.isFavourite,
                            index,
                          );
                        }
                      }}
                      className={checkDraft ? "" : styles.notWorked}
                    >
                      <img src="/images/favorite.svg" alt="favorite icon" />
                    </button>
                    <span>Click here to remove from Defaults</span>
                  </div>
                </div>
                <p>{item?.remark?.replace(/(<([^>]+)>)/gi, "")}</p>
                <div class={`${styles.boxFade} alignC justifyC`}>
                  <div className="dFlex alignC justifySB">
                    <p>The remark has been removed from Defaults</p>
                    <button
                      onClick={() => {
                        deleteByUndo(index);
                        editFavorite(
                          item?.templateSubCategoryId,
                          item.templateRemarkId,
                          item?.isFavourite,
                          index,
                        );
                      }}
                    >
                      Undo
                    </button>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </Modal>
  );
};
export default FavouriteRemarkModal;
