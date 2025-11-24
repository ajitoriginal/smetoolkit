import ImageUploading from "react-images-uploading";
import useRemarkStore from "../../stores/remarkStore";
import styles from "./style.module.scss";
const UploadImage = (props) => {
  //   const maxNumber = 8;
  const { selectedRemarkImagesLength, remarkId, isDisabled } = props;
  const {
    remarkImageToUpload,
    setRemarkImageToUpload,
    setSelectedRemarkImagesLengthStore,
    setRemarkIdToUploadImage,
  } = useRemarkStore();
  const onChange = (imageList) => {
    setRemarkImageToUpload(imageList);
    setRemarkIdToUploadImage(remarkId);
    setSelectedRemarkImagesLengthStore(selectedRemarkImagesLength);
  };
  return (
    <ImageUploading
      // multiple
      value={remarkImageToUpload}
      onChange={onChange}
      // maxNumber={maxNumber}
      dataURLKey="data_url"
      acceptType={["jpg", "jpeg"]}
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => {
        if (isDisabled) {
          return (
            // write your building UI
            <div
              className={styles.uploadImageBtn}
              // style={isDragging ? { color: "red" } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              {/* Click or Drop here */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M7.9 10.1V2.95C7.9 1.87304 8.77304 1 9.85 1C10.927 1 11.8 1.87304 11.8 2.95V10.1C11.8 12.2539 10.0539 14 7.9 14C5.74609 14 4 12.2539 4 10.1V4.9"
                  stroke="#6C6C6C"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          );
        } else {
          return (
            <div
              className={`${styles.uploadImageBtn} ${styles.disabled}`}
              // style={isDragging ? { color: "red" } : undefined}
              // {...dragProps}
            >
              {/* Click or Drop here */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M7.9 10.1V2.95C7.9 1.87304 8.77304 1 9.85 1C10.927 1 11.8 1.87304 11.8 2.95V10.1C11.8 12.2539 10.0539 14 7.9 14C5.74609 14 4 12.2539 4 10.1V4.9"
                  stroke="#6C6C6C"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          );
        }
      }}
    </ImageUploading>
  );
};

export default UploadImage;
