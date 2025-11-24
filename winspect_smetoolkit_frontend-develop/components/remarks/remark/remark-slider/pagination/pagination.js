import styles from "./pagination.module.scss";
const Pagination = (props) => {
  const { index, setIndex, count } = props;
  return (
    <div className={`${styles.wrapper} pagination-wrapper`}>
      <div
        className={`${styles.previous} ${styles.arrow}`}
        onClick={() => index > 0 && setIndex(index - 1)}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M15.8337 9.99935H4.16699M4.16699 9.99935L10.0003 15.8327M4.16699 9.99935L10.0003 4.16602"
            stroke="#667085"
            strokeWidth="1.67"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className={styles.count}>
        {index + 1} <span>of</span> {count}
      </div>
      <div
        className={`${styles.next} ${styles.arrow}`}
        onClick={() => index < count - 1 && setIndex(index + 1)}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M4.16699 9.99935H15.8337M15.8337 9.99935L10.0003 4.16602M15.8337 9.99935L10.0003 15.8327"
            stroke="#667085"
            strokeWidth="1.67"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};
export default Pagination;
