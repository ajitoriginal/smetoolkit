import useFilterStore from "../../../stores/filterStore";
import styles from "./filter.module.scss";

const ClearFilter = () => {
  const {
    setDateOption,
    setDateRange,
    setSimilarityOption,
    setSimilarityRange,
    setUsedByOption,
    setSelectedOfficeIds,
  } = useFilterStore();
  const handleClick = () => {
    setDateOption({ label: "Any time" });
    setDateRange({ startDate: null, endDate: null });

    setSimilarityOption({ label: "All" });
    setSimilarityRange({
      similarityStart: null,
      similarityEnd: null,
    });

    setUsedByOption([]);
    setSelectedOfficeIds("");
  };
  return (
    <div className={styles.clear} onClick={handleClick}>
      Clear Filter
    </div>
  );
};

export default ClearFilter;
