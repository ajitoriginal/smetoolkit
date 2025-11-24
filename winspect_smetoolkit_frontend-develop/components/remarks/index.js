import { useRouter } from "next/router";
import Template from "../../components/layouts/template/Template";
import CategoryTabs from "../../components/remarks/category-tabs";
import Filters from "../../components/remarks/filters";
import RemarkHeader from "../../components/remarks/header";
import RemarkListSection from "../../components/remarks/remark-list-section";
import Search from "../../components/remarks/search";
import StatusBox from "../../components/remarks/status-box";
import TypeTabs from "../../components/remarks/type-tabs";
import useRemarkStore from "../../stores/remarkStore";
import { url } from "../../utils/url";
import RemarkPopups from "./RemarkPopups";
import styles from "./remarks.module.scss";
import useCategoryStore from "../../stores/categoryStore";
import Loader from "../../atoms/loader";
import useLoaderStore from "../../stores/loaderStore";
import CopyToPopup from "../copy-to-popup";
import useCopyToStore from "../../stores/copyToStore";
import useRmarkPaginationStore from "../../stores/remarkPagination";
import ReactPaginate from "react-paginate";
import { useState } from "react";

const RemarksComp = (props) => {
  const { loader } = useLoaderStore();
  const { showCopyToPopup } = useCopyToStore();
  const { isDraft } = props;
  const router = useRouter();
  const { mastertemplate, template, category, subcategory } = router.query;
  const { progressReportCount } = useCategoryStore();
  const { showRemarkUtilization, selectedCheckboxesRemark } = useRemarkStore();
  const { totalPages, setCurrentPage, currentPage } = useRmarkPaginationStore();

  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  // const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = totalPages;
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % totalPages;
    setCurrentPage(event.selected);
    setItemOffset(newOffset);
  };
  const remarkUrl = `${
    isDraft ? url.draftTemplates : url.publishTemplates
  }/${mastertemplate}/${template}?category=${category}&subcategory=${subcategory}`;

  return (
    <>
      <Template
        backLink={remarkUrl}
        className={`remark-template ${
          showRemarkUtilization ? "utilization-popup" : ""
        }`}
      >
        <div
          className={`${styles.remarksPage} ${
            selectedCheckboxesRemark.length > 0 ? styles.withMultiPopup : ""
          }`}
        >
          <RemarkHeader />
          <div className={styles.tabSearchWrapper}>
            <TypeTabs isDraft={isDraft} />
            <StatusBox
              text={`${progressReportCount} Report${
                progressReportCount > 1 ? "s" : ""
              } In Progress`}
            />
            <div className={styles.searchWrapper}>
              <Search />
            </div>
          </div>
          <div className={styles.categoryWrapper}>
            <CategoryTabs />
          </div>
          <Filters />
          <RemarkListSection />
          <RemarkPopups />
        </div>
        {loader && <Loader />}
        {pageCount > 1 && (
          <div className="remark-pagination">
            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={10}
              pageCount={pageCount}
              previousLabel="<"
              renderOnZeroPageCount={null}
            />
          </div>
        )}
      </Template>
      {showCopyToPopup && <CopyToPopup />}
    </>
  );
};

export default RemarksComp;
