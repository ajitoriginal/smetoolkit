import { useState } from "react";
import styles from "../modal.module.scss";
import ModalHeader from "./create-draft-template/modal-header";
import Modal from "./modal-wrapper";
import { APIurl } from "../../../utils/storage";
import { toast } from "react-toastify";
import CategoryServices from "../../../api/services/CategoryServices";
const AddEditCategoryModal = (props) => {
  const api = APIurl();

  const {
    heading,
    para,
    closeFunction,
    item,
    byDefaultName,
    categoryAdd,
    local,
    setLoader,
    templateID,
    setActiveCat,
    categoriesFunc,
    categoryEdit,
  } = props;
  const format = /[!@#$%^&*_+`~=\[\]{};':"\\|<>?]+/;
  const [specialCharacter, setSpecialCharacter] = useState(false);

  const categoryImageUrl = item
    ? `${item.iconImageLocation}${item.iconImageKey}`
    : null;
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCategoryImage, setSelectedCategoryImage] =
    useState(categoryImageUrl);

  let categoryImage = null;
  if (selectedCategoryImage !== null) {
    const fileName = item?.iconImageKey.split("/").pop();
    categoryImage = {
      name: fileName,
      url: selectedCategoryImage,
    };
  } else if (selectedFile !== null) {
    categoryImage = {
      name: selectedFile.name,
      url: URL.createObjectURL(selectedFile),
    };
  }
  const [name, setName] = useState(byDefaultName);

  async function presignedFun() {
    if (selectedFile !== null) {
      let result = await fetch(
        `${api}api/v1/template/categories/presigned-url?templateId=${templateID}
        &type=${selectedFile.type.split("/")[1]}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "image/jpg, image/png",
            Accept: "*",
            Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
          },
        },
      );
      setLoader(true);
      result = await result.json();

      await fetch(`${result.body.uploadURL}`, {
        method: "PUT",
        body: selectedFile,
      });
      return result?.body?.Key;
    } else {
      return categoryImage.url.replace(/^https?:\/\/.*\.com\//, "");
    }
  }

  // for adding category
  async function addCategory() {
    let presignedUrl = await presignedFun();
    const data = {
      templateId: templateID,
      iconImageKey: presignedUrl,
      name: name,
    };
    let result = await CategoryServices.addCategory(data, true);
    if (result.status == 200) {
      addSubCategoryGeneral(result.body.templateCategoryId);
    }

    setLoader(false);
    closeFunction(false);
    setActiveCat(0);
    await categoriesFunc(templateID);
  }

  // for adding general subcategory
  async function addSubCategoryGeneral(catid) {
    let result = await fetch(`${api}api/v1/template/sub-categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
      body: JSON.stringify({
        templateCategoryId: catid,
        name: "General",
      }),
    });
  }

  // for edit category
  async function editCategory() {
    let presignedUrl = await presignedFun();
    let result = await fetch(`${api}api/v1/template/categories`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "*",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
      body: JSON.stringify({
        templateId: templateID,
        iconImageKey: presignedUrl,
        templateCategoryId: item.templateCategoryId,
        name: name,
      }),
    });
    result = await result.json();
    if (result.status == 200) {
      toast.success(result.message);
    }

    setLoader(false);
    closeFunction(false);
    setActiveCat(0);
    await categoriesFunc(templateID);
  }

  return (
    <Modal>
      <ModalHeader heading={heading} para={para} close={closeFunction} />
      <div className={`${styles.modalSteps}`}>
        <div>
          <div className={styles.inputWrapper}>
            <label>Category Name*</label>
            <input
              type="text"
              value={name}
              maxlength="60"
              placeholder="Enter the Category Name"
              onChange={(e) => {
                setName(e.target.value);
                format.test(e.target.value)
                  ? setSpecialCharacter(true)
                  : setSpecialCharacter(false);
              }}
            />
            {specialCharacter && (
              <p className="error left">Special characters are not Allowed!</p>
            )}
            {name?.length == 60 && (
              <p className="error left">
                Maximum 60 characters are not Allowed!
              </p>
            )}
          </div>

          <div className="inputAttachment">
            <h6 className="dFlex alignC justifySB">
              <label>Attach Logo*</label>
              {categoryImage && (
                <h6 className="dFlex">
                  File Uploaded: {categoryImage?.name}
                  <button
                    onClick={() => {
                      setSelectedFile(null);
                      setSelectedCategoryImage(null);
                    }}
                  >
                    <img alt="delete icon" src="/images/delete.svg" />
                  </button>
                </h6>
              )}
            </h6>
            <div className={`dFlex justifyC alignC`}>
              {categoryImage ? (
                <img
                  src={categoryImage.url}
                  alt="uploaded images"
                  className="uploade-img-large"
                />
              ) : (
                <>
                  <input
                    type="file"
                    accept="image/x-png"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                  />
                  <img src="/images/upload.svg" alt="upload-icon" />
                  <p>
                    Drag and Drop Here <br />
                    or <br />
                    Browse file
                  </p>
                </>
              )}
            </div>
            <p>Only PNG and JPG are allowed.</p>
          </div>

          <div className={`${styles.btnWrapper}`}>
            <button
              className="btn gradient-btn w-100"
              onClick={() => {
                if (categoryAdd) {
                  addCategory();
                } else if (categoryEdit) {
                  editCategory();
                }
              }}
              disabled={
                categoryImage !== null && name && !specialCharacter
                  ? false
                  : true
              }
            >
              {categoryAdd ? "Add Category" : "Update Category"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddEditCategoryModal;
