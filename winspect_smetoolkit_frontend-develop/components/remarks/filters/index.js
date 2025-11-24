import ClearFilter from "./ClearFilter";
import CompareCheckBox from "./CompareCheckBox";
import DateFilter from "./DateFilter";
import FrequencyFilter from "./FrequencyFilter";
import RecentlyAddedFilter from "./RecentlyAddedFilter";
import UsedByFilter from "./UsedByFilter";
import AddedByFilter from "./AddedByFilter";
import styles from "./filter.module.scss";
import useGenerateStore from "../../../stores/generalStore";
import useSortStore from "../../../stores/sortStore";
import SimilarityFilter from "../similiarity-filter";
import useShowCompareStore from "../../../stores/showCompareStore";

const Filters = () => {
  const { isCustom } = useGenerateStore();
  const { sortLoader } = useSortStore();
  const { showCompare } = useShowCompareStore();
  return (
    <div className={styles.filterSection}>
      <DateFilter />
      <UsedByFilter />
      <AddedByFilter />
      {/* <FrequencyFilter /> */}

      {/* {isCustom && showCompare && <SimilarityFilter />} */}
      <ClearFilter />
      <div className={styles.rightAlign}>
        {sortLoader && <div className={styles.pleaseWait}>Please wait...</div>}
        {/* {isCustom && <CompareCheckBox />} */}
        <RecentlyAddedFilter />
      </div>
    </div>
  );
};

export default Filters;
