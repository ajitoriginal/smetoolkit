import styles from "./tabs.module.scss";
import { url } from "../../../utils/url";
import { useRouter } from "next/router";
import useRemarkStore from "../../../stores/remarkStore";
import useGenerateStore from "../../../stores/generalStore";
import useShowCompareStore from "../../../stores/showCompareStore";
import { useState } from "react";
import useSortStore from "../../../stores/sortStore";
import useRmarkPaginationStore from "../../../stores/remarkPagination";

const TypeTabs = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const { mastertemplate, template } = router.query;
  const { remarkTypeTabsCount } = useRemarkStore();
  const { isDraft, setIsCustom } = useGenerateStore();
  const { setShowCompare } = useShowCompareStore();
  const { setSortByLabel } = useSortStore();
  const { setSelectedRemarkType, remarkCatTabsCount, selectedRemarkType } =
    useRemarkStore();
  const { custom } = remarkTypeTabsCount;
  const newUrl = `${
    isDraft ? url.draftTemplates : url.publishTemplates
  }/${mastertemplate}/${template}`;
  const tabArray = [
    {
      text: `Template(${remarkTypeTabsCount.template})`,
      url: `${newUrl}${url.templates}`,
    },
    {
      text: `Custom(${custom})`,
      url: `${newUrl}${url.customs}`,
    },
  ];
  const { setCurrentPage } = useRmarkPaginationStore();
  const handleClick = (tab, index) => {
    setSelectedRemarkType("Functional");
    setIsCustom(index == 1);
    setShowCompare(index == 1);
    setCurrentIndex(index);
    setSortByLabel({ label: "Recently Added", value: "Recently Added" });
    setCurrentPage(0);
  };

  return (
    <div className={styles.wrapper}>
      {tabArray.map((tab, index) => {
        return (
          <div
            onClick={() => handleClick(tab, index)}
            key={index}
            className={`${styles.tab} ${
              currentIndex == index ? styles.active : ""
            }`}
          >
            {tab.text}
          </div>
        );
      })}
    </div>
  );
};
export default TypeTabs;
