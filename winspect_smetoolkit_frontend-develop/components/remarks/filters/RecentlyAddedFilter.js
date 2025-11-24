import styles from "./filter.module.scss";
import Select from "react-select";
import DropdownIndicator from "../../common/dropdown-indicator";
import useSortStore from "../../../stores/sortStore";
import useGenerateStore from "../../../stores/generalStore";
import useShowCompareStore from "../../../stores/showCompareStore";

const RecentlyAddedFilter = () => {
  const options = [
    { label: "Recently Added", value: "Recently Added" },
    { label: "Least Used", value: "Least Used" },
    { label: "Most Used", value: "Most Used" },
  ];
  const { isCustom } = useGenerateStore();
  const { showCompare } = useShowCompareStore();
  let customRemarkOptions = [
    { label: "Most Similar", value: "Most Similar" },
    { label: "Least Similar", value: "Least Similar" },
  ];
  if (isCustom && showCompare) {
    options.push(...customRemarkOptions);
  }

  const formatOptionLabel = ({ value, label }) => {
    let serviceLength = value?.services?.length;
    return (
      <div
        className={`${
          sortByLabel.label == label ? "active" : ""
        } optionWrapper`}
      >
        <div className="templateName">{label}</div>
      </div>
    );
  };
  const { setSortBy, setSortLoader, setSortByLabel, sortByLabel } =
    useSortStore();
  const handleChange = (e) => {
    setSortBy(e.value);
    setSortLoader(true);
    setSortByLabel({ label: e.label, value: e.value });
  };

  return (
    <div
      className={`${styles.selectWrapper} my-custom-select-wrapper remark-filter sort-filter select-dropdown`}
    >
      <Select
        options={options}
        defaultValue={options[0]}
        formatOptionLabel={formatOptionLabel}
        components={{ DropdownIndicator }}
        name="templateId"
        onChange={handleChange}
        className="my-custom-select"
        classNamePrefix="custom"
        value={{
          label: sortByLabel.label,
        }}
      />
    </div>
  );
};

export default RecentlyAddedFilter;
