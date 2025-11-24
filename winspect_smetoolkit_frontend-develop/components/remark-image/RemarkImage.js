import styles from "./remark-image.module.scss";
const RemarkImage = (props) => {
  const { setSelectedImageToShow, selectedImageToShow } = props;
  let fileName = selectedImageToShow.template_image.originalImageKey;

  if (selectedImageToShow.template_image.reportImageKey !== null) {
    fileName = selectedImageToShow.template_image.reportImageKey;
  }
  fileName = fileName.split("/").pop();
  const imageUrl = `${selectedImageToShow.template_image.location}${selectedImageToShow.template_image.originalImageKey}`;
  return (
    <div className={styles.remarkImageWrapper}>
      <div className={styles.header}>
        <div className={styles.fileName}>{fileName}</div>
        <div className={styles.right}>
          <div
            onClick={() => setSelectedImageToShow(null)}
            className={styles.close}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <rect width="32" height="32" rx="5" fill="#505050" />
              <path
                d="M22 10L10 22M10 10L22 22"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className={styles.mainImageWrapper}>
        <img className={styles.mainImage} src={imageUrl} />
      </div>
    </div>
  );
};
export default RemarkImage;
