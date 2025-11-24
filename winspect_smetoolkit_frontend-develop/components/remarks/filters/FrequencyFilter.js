import styles from "./filter.module.scss";
import Select from "react-select";
import DropdownIndicator from "../../common/dropdown-indicator";

const FrequencyFilter = () => {
  const options = [
    { label: "None", value: "" },
    { label: "Most used", value: "Most Used" },
    { label: "Least used", value: "Least Used" },
  ];
  const formatOptionLabel = ({ value, label }) => {
    let serviceLength = value?.services?.length;
    return (
      <div className={`${styles.optionWrapper} optionWrapper`}>
        <div className={styles.templateName}>{label}</div>
      </div>
    );
  };
  return (
    <div className={`${styles.selectWrapper} remark-filter`}>
      <span className={styles.dropdownLabel}>Frequency: </span>
      <Select
        placeholder="None"
        options={options}
        formatOptionLabel={formatOptionLabel}
        components={{ DropdownIndicator }}
        name="templateId"
        //   value={{
        //     label: templateId,
        //   }}
        //   onChange={(e) => {
        //     handleTemplateDropdownChange(e);
        //   }}
      />
    </div>
  );
};

export default FrequencyFilter;
