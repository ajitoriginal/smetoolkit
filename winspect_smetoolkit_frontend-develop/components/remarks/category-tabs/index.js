import { useEffect, useState } from "react";
import styles from "./categoryTabs.module.scss";
import useRemarkStore from "../../../stores/remarkStore";
import useRmarkPaginationStore from "../../../stores/remarkPagination";

const CategoryTabs = () => {
  const { setSelectedRemarkType, remarkCatTabsCount, selectedRemarkType } =
    useRemarkStore();
  const { setCurrentPage } = useRmarkPaginationStore();
  const { functional, issue, limitation, notInspected, informational } =
    remarkCatTabsCount;
  const tabArray = [
    {
      label: "Functional",
      key: "Functional",
      count: functional,
    },
    {
      label: "Issues",
      key: "Issue",
      count: issue,
    },
    {
      label: "Limitations",
      key: "Limitation",
      count: limitation,
    },
    {
      label: "Not Inspected",
      key: "Not Inspected",
      count: notInspected,
    },
    {
      label: "Informational",
      key: "Informational",
      count: informational,
    },
  ];

  const [active, setActive] = useState(0);

  useEffect(() => {
    let index = tabArray.findIndex((item) => item.key === selectedRemarkType);
    setActive(index);
  }, [selectedRemarkType]);

  const handleClick = (item, index) => {
    setActive(index);
    setSelectedRemarkType(item.key);
    setCurrentPage(0);
  };

  return (
    <div className={styles.wrapper}>
      {tabArray.map((tab, index) => {
        return (
          <div
            key={index}
            className={`${styles.tab} ${active == index ? styles.active : ""}`}
            onClick={() => handleClick(tab, index)}
          >
            {tab.label}({tab.count})
          </div>
        );
      })}
    </div>
  );
};
export default CategoryTabs;
