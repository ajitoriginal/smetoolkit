import useRemarkStore from "../../../stores/remarkStore";
import styles from "./remark.module.scss";
const RemarkCheckbox = (prop) => {
  const { remark } = prop;
  const { setSelectedCheckboxesRemark, selectedCheckboxesRemark } =
    useRemarkStore();
  let foundItem = selectedCheckboxesRemark.find(
    (item) => item.templateRemarkId === remark.templateRemarkId,
  );
  const handleChange = (e) => {
    let checkedArray = selectedCheckboxesRemark;
    if (e.target.checked) {
      checkedArray.push(remark);
    } else {
      let index = checkedArray.findIndex(
        (item) => item.templateRemarkId === remark.templateRemarkId,
      );

      checkedArray.splice(index, 1);
    }
    setSelectedCheckboxesRemark(checkedArray);
  };
  return (
    <div className={styles.checkWrapper}>
      <input
        onChange={(e) => (remark.hide ? "" : handleChange(e))}
        checked={foundItem !== undefined}
        type="checkbox"
      />
      <span className={styles.check}>
        <svg
          width="14"
          height="10"
          viewBox="0 0 14 10"
          fill="none"
          className={styles.checkIcon}
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.41913 6.65218L11.6124 0.458896C11.9847 0.086618 12.5883 0.086618 12.9606 0.458896C13.3328 0.831174 13.3328 1.43476 12.9606 1.80703L5.41913 9.34846L1.03897 4.9683C0.666696 4.59603 0.666696 3.99244 1.03897 3.62017C1.41125 3.24789 2.01483 3.24789 2.38711 3.62017L5.41913 6.65218Z"
            fill="white"
          />
        </svg>
      </span>
    </div>
  );
};

export default RemarkCheckbox;
