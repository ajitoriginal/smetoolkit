import styles from "../filters/filter.module.scss";
import Select from "react-select";
import DropdownIndicator from "../../common/dropdown-indicator";
import CustomRangePopup from "./custom-range-popup";
import useFilterStore from "../../../stores/filterStore";

const SimilarityFilter = () => {
  const options = [
    { label: "All", value: "" },
    { label: "More than 90%", value: "more-than-90" },
    { label: "90% to 75%", value: "90-to-75" },
    { label: "75% to 50%", value: "75-to-50" },
    { label: "Less than 50%", value: "less-than-50" },
    { label: "Range", value: "range" },
  ];
  const {
    setShowSimilarityRangePopup,
    setSimilarityRange,
    setSimilarityOption,
    similarityOption,
  } = useFilterStore();
  const formatOptionLabel = ({ label }) => {
    return (
      <div className={`${styles.optionWrapper} optionWrapper`}>
        <div className={styles.templateName}>{label}</div>
      </div>
    );
  };
  const setRange = (key) => {
    switch (key) {
      case "":
        setSimilarityRange({
          similarityStart: null,
          similarityEnd: null,
        });
        break;
      case "more-than-90":
        setSimilarityRange({
          similarityEnd: 100,
          similarityStart: 90,
        });
        break;
      case "90-to-75":
        setSimilarityRange({
          similarityEnd: 90,
          similarityStart: 75,
        });
        break;
      case "75-to-50":
        setSimilarityRange({
          similarityEnd: 75,
          similarityStart: 50,
        });
        break;
      case "less-than-50":
        setSimilarityRange({
          similarityEnd: 50,
          similarityStart: 0,
        });
        break;
      default:
        break;
    }
  };
  const handleChange = (e) => {
    setSimilarityOption({ label: e.label });
    if (e.value == "range") {
      setShowSimilarityRangePopup(true);
    } else {
      setRange(e.value);
    }
  };
  return (
    <div className={`${styles.selectWrapper} remark-filter`}>
      <span className={styles.dropdownLabel}>Similarity: </span>
      <Select
        placeholder="None"
        options={options}
        formatOptionLabel={formatOptionLabel}
        components={{ DropdownIndicator }}
        name="templateId"
        onChange={handleChange}
        value={similarityOption}
      />
      <CustomRangePopup />
    </div>
  );
};

export default SimilarityFilter;
