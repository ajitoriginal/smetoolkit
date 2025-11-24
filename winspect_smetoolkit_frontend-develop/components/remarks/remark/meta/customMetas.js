import dayjs from "dayjs";
import styles from "./meta.module.scss";
const CustomMetas = (props) => {
  const { metaData } = props;
  const { addedDate, addedBy, lastEdited } = metaData;
  return (
    <div className={styles.metaSection}>
      <div className={styles.metaWrapper}>
        <div className={`${styles.meta} ${styles.bold}`}>
          {addedBy && addedBy !== null && (
            <>
              <div className={styles.label}>Added by: </div>
              <div className={styles.value}>{addedBy}</div>
              <div className={styles.extraValue}>
                {dayjs(addedDate).format("MMM D[,] YYYY")}
              </div>
            </>
          )}
        </div>
      </div>
      {lastEdited && (
        <div className={styles.metaWrapper}>
          <div className={`${styles.meta}`}>
            <div className={styles.label}>Last Edited: </div>
            <div className={styles.value}>
              {dayjs(lastEdited).format("MMM D[,] YYYY")}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomMetas;
