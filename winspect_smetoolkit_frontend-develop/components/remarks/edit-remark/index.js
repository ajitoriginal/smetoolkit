import { useState } from "react";
import TextEditor from "../../TextEditor";
import styles from "./editRemark.module.scss";
import RemarkServices from "../../../api/services/RemarkServices";
import useSubCategoryStore from "../../../stores/subCategoryStore";
import useRemarkStore from "../../../stores/remarkStore";
import { useRouter } from "next/router";

const EditRemark = (props) => {
  const { setShowEditRemark, remark } = props;
  const [remarkText, setRemarkText] = useState(remark.remark);
  const [remarkHeading, setRemarkHeading] = useState(remark.title);
  const [message, setMessage] = useState();
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const validateForm = () => {
    let valid = true;
    if (remarkHeading == "" || remarkText == "") {
      valid = false;
    }
    return valid;
  };
  const { setShowAddNewRemarkPopup, setRemarkList, remarkList } =
    useRemarkStore();
  const { subCategoryId } = useSubCategoryStore();

  const updateRemark = () => {
    const updatedData = remarkList.map((obj) => {
      if (obj.templateRemarkId === remark.templateRemarkId) {
        return { ...obj, remark: remarkText, title: remarkHeading };
      }
      return obj;
    });
    setRemarkList(updatedData);
  };

  async function editRemark() {
    let valid = validateForm();
    if (valid) {
      setLoader(true);
      const data = {
        templateSubCategoryId: subCategoryId,
        remark: remarkText,
        title: remarkHeading,
        templateRemarkId: remark.templateRemarkId,
      };

      let result = await RemarkServices.editRemark(data, router, true);
      if (result.status == 200) {
        setRemarkHeading();
        setRemarkText("");
        setShowAddNewRemarkPopup(false);
        setShowEditRemark(false);
        updateRemark();
      }
      setLoader(false);
    } else {
      setMessage("Please fill empty input");
    }
  }
  return (
    <div className={styles.wrapper}>
      <input
        value={remarkHeading}
        onChange={(e) => setRemarkHeading(e.target.value)}
      />
      <div className="edit-remark-editor">
        <TextEditor
          content={remarkText}
          setContent={setRemarkText}
          bottomRightHidden={true}
        />
      </div>
      <div className={styles.buttonWrapper}>
        <button
          onClick={() => setShowEditRemark(false)}
          className={styles.cancelBtn}
        >
          Cancel
        </button>
        {loader ? (
          <button className={`${styles.saveBtn} ${styles.wait}`}>
            Please wait...
          </button>
        ) : (
          <button onClick={editRemark} className={styles.saveBtn}>
            Save Remark
          </button>
        )}

        {message && <p className={styles.error}>{message}</p>}
      </div>
    </div>
  );
};

export default EditRemark;
