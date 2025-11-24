import styles from "./style.module.scss";
const CopyCountItemWrapper = (props) => {
  const { itemsLength, setItems, handleCopyTo } = props;
  return (
    itemsLength > 0 && (
      <div className={styles.selectedSubCategoryCountWrapper}>
        <div className={styles.leftPart}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setItems([])}
            className={styles.cancelSelectedBtn}
          >
            <path
              d="M16.875 7.125L7.125 16.875M7.125 7.125L16.875 16.875"
              stroke="#37404F"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>{" "}
          {itemsLength} Selected
        </div>
        <div className={styles.rightPart}>
          <div className={styles.copyToBtn} onClick={handleCopyTo}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <g clip-path="url(#clip0_142_13124)">
                <path
                  d="M3.33398 10.0007C2.71273 10.0007 2.4021 10.0007 2.15707 9.89916C1.83037 9.76383 1.5708 9.50427 1.43548 9.17756C1.33398 8.93253 1.33398 8.62191 1.33398 8.00065V3.46732C1.33398 2.72058 1.33398 2.34721 1.47931 2.062C1.60714 1.81111 1.81111 1.60714 2.062 1.47931C2.34721 1.33398 2.72058 1.33398 3.46732 1.33398H8.00065C8.62191 1.33398 8.93253 1.33398 9.17756 1.43548C9.50427 1.5708 9.76383 1.83037 9.89916 2.15707C10.0007 2.4021 10.0007 2.71273 10.0007 3.33398M8.13398 14.6673H12.534C13.2807 14.6673 13.6541 14.6673 13.9393 14.522C14.1902 14.3942 14.3942 14.1902 14.522 13.9393C14.6673 13.6541 14.6673 13.2807 14.6673 12.534V8.13398C14.6673 7.38725 14.6673 7.01388 14.522 6.72866C14.3942 6.47778 14.1902 6.27381 13.9393 6.14598C13.6541 6.00065 13.2807 6.00065 12.534 6.00065H8.13398C7.38725 6.00065 7.01388 6.00065 6.72866 6.14598C6.47778 6.27381 6.27381 6.47778 6.14598 6.72866C6.00065 7.01388 6.00065 7.38725 6.00065 8.13398V12.534C6.00065 13.2807 6.00065 13.6541 6.14598 13.9393C6.27381 14.1902 6.47778 14.3942 6.72866 14.522C7.01388 14.6673 7.38725 14.6673 8.13398 14.6673Z"
                  stroke="#2F80ED"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_142_13124">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Copy to
          </div>
        </div>
      </div>
    )
  );
};
export default CopyCountItemWrapper;
