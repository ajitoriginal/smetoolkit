import styles from "./remark.module.scss";
import MetaWrapper from "./meta/metaWrapper";
import DeleteRemarkButton from "./delete-remark";
import RestoreRemark from "./restore-remark";
import RemarkCheckbox from "./remark-checkbox";
import RemarkTags from "./remark-tags";
import EditRemarkButton from "./edit-remark-buttton";
import MoveToTemplateBtn from "./move-to-template-btn";
import useGenerateStore from "../../../stores/generalStore";
import { useState } from "react";
import UploadImage from "../../upload-image/UploadImage";
import DeleteRemarkImagePopup from "../../common/modals/delete-remark-image-popup/DeleteRemarkImagePopup";
import RemarkImage from "../../remark-image/RemarkImage";

const RemarkContent = (props) => {
  const {
    remark,
    frequency,
    sliderRemark,
    frequencyList,
    index,
    frequencyTemplateList,
    similarColumn,
    nearestTemplateRemarkId,
    frequencyData,
    similarRemarkType,
  } = props.props;

  const { setShowEditRemark } = props;
  const [selectedRemarkImages, setSelectedRemarkImages] = useState(
    remark.template_remark_images || [],
  );
  const [selectedImageToDelete, setSelectedImageToDelete] = useState(null);
  const [showDeleteRemarkImagePopup, setShowDeleteRemarkImagePopup] =
    useState(false);
  const [selectedImageToShow, setSelectedImageToShow] = useState(null);

  const { isDraft, isCustom } = useGenerateStore();
  const metaData = {
    addedDate: remark.createdAt,
    addedBy: remark.user?.displayName,
    lastEdited: remark.updatedAt,
    version: null,
  };
  const handleImageRemove = (image) => {
    setSelectedImageToDelete(image);
    setShowDeleteRemarkImagePopup(true);
  };
  const handleRemarkImageClick = (image) => {
    setSelectedImageToShow(image);
  };
  return (
    <div
      className={`${styles.wrapper} remark-wrapper ${
        remark?.hide ? styles.hide : ""
      }`}
    >
      <div className={styles.rightIcons}>
        {isDraft && !isCustom && selectedRemarkImages.length < 8 && (
          <UploadImage
            selectedRemarkImagesLength={selectedRemarkImages.length}
            remarkId={remark.templateRemarkId}
            isDisabled={remark?.isFavourite}
          />
        )}
        {!sliderRemark && !similarColumn && (
          <EditRemarkButton
            remark={remark}
            setShowEditRemark={setShowEditRemark}
          />
        )}
      </div>
      <div className={styles.titleWrapper}>
        {!sliderRemark && !similarColumn && <RemarkCheckbox remark={remark} />}
        <div className={styles.title}>{remark?.title}</div>
        <RemarkTags
          sliderRemark={sliderRemark}
          remark={remark}
          frequencyData={frequencyData}
          frequencyCount={
            frequency ? frequency : frequencyList ? frequencyList[index] : null
          }
          frequencyTemplate={
            frequencyTemplateList ? frequencyTemplateList[index] : null
          }
          nearestTemplateRemarkId={nearestTemplateRemarkId}
          similarRemarkType={similarRemarkType}
        />
      </div>
      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: remark?.remark }}
      />
      <div className={styles.bottom}>
        <div className={styles.bottomLeft}>
          <MetaWrapper metaData={metaData} />
          <div className={styles.remarkImages}>
            {selectedRemarkImages.map((image, index) => {
              let imageUrl = `${image.template_image.location}${image.template_image.originalImageKey}`;
              let imageName = imageUrl;
              if (image.template_image.reportImageKey !== null) {
                imageUrl = `${image.template_image.location}${image.template_image.thumbImageKey}`;
                imageName = image.template_image.reportImageKey;
              }

              imageName = imageName.split("/").pop();

              return (
                <div key={index} className={styles.remarkImage}>
                  <img
                    onClick={() => handleRemarkImageClick(image)}
                    src={imageUrl}
                    alt=""
                    width="100"
                  />
                  <div
                    className={styles.imageName}
                    onClick={() => handleRemarkImageClick(image)}
                  >
                    {imageName}
                  </div>
                  {isDraft && (
                    <div
                      onClick={() => handleImageRemove(image)}
                      className={styles.remove}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M12 4L4 12M4 4L12 12"
                          stroke="#A4A4A4"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {!sliderRemark && !similarColumn && (
          <div className={styles.bottomRight}>
            {/* {remark.remarkType !== "Template" && (
              // <MoveToTemplateBtn remark={remark} />
            )} */}
            {remark.hide ? (
              <RestoreRemark remark={remark} />
            ) : (
              <DeleteRemarkButton remark={remark} />
            )}
          </div>
        )}
      </div>
      {showDeleteRemarkImagePopup && (
        <DeleteRemarkImagePopup
          setShowDeleteRemarkImagePopup={setShowDeleteRemarkImagePopup}
          selectedImageToDelete={selectedImageToDelete}
          setSelectedRemarkImages={setSelectedRemarkImages}
          selectedRemarkImages={selectedRemarkImages}
        />
      )}
      {selectedImageToShow !== null && (
        <RemarkImage
          selectedImageToShow={selectedImageToShow}
          setSelectedImageToShow={setSelectedImageToShow}
        />
      )}
    </div>
  );
};
export default RemarkContent;
