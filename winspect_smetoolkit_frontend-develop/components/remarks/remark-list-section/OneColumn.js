import { useRouter } from "next/router";
import useSubCategoryStore from "../../../stores/subCategoryStore";
import Column from "./Column";
import styles from "./remarkListSection.module.scss";
import { useEffect, useState } from "react";
import useRemarkStore from "../../../stores/remarkStore";
import { getRemarkCountForCategory } from "../../../utils/utils";
import useGenerateStore from "../../../stores/generalStore";
import useFilterStore from "../../../stores/filterStore";
import useSortStore from "../../../stores/sortStore";
import RemarkServices from "../../../api/services/RemarkServices";
import useRmarkPaginationStore from "../../../stores/remarkPagination";
import useLoaderStore from "../../../stores/loaderStore";

const OneColumn = () => {
  const [noData, setNoData] = useState(false);
  const { subCategoryId } = useSubCategoryStore();
  const {
    selectedRemarkType,
    setRemarkTypeTabsCount,
    setRemarkCatTabsCount,
    remarkList,
    setRemarkList,
    reloadRemarksState,
  } = useRemarkStore();

  const { isCustom } = useGenerateStore();
  const { setTotalPages, currentPage } = useRmarkPaginationStore();
  const router = useRouter();
  const {
    dateRange,
    debouncedSearchTerm,
    similarityRange,
    selectedOfficeIds,
    customRemarkAuthors,
  } = useFilterStore();
  const { sortBy, setSortLoader } = useSortStore();
  const { setLoader } = useLoaderStore();
  async function getSubCategoryDetail() {
    setRemarkList([]);
    let remarkType = isCustom ? "Custom" : "Template";
    let startDate =
      dateRange?.startDate !== null ? `&start=${dateRange.startDate}` : "";
    let endDate =
      dateRange?.startDate !== null ? `&end=${dateRange.endDate}` : "";
    startDate = startDate !== "" ? startDate?.split(" ")[0] + " 00:00:01" : "";
    endDate = endDate !== "" ? endDate?.split(" ")[0] + " 23:59:59" : "";
    let searchText =
      debouncedSearchTerm !== "" ? `&search=${debouncedSearchTerm}` : "";
    let similarityStart =
      similarityRange.similarityStart !== null
        ? `&similarityStart=${similarityRange.similarityStart / 100}`
        : "";
    let similarityEnd =
      similarityRange.similarityEnd !== null
        ? `&similarityEnd=${similarityRange.similarityEnd / 100}`
        : "";
    let selectedOfficeIdsQuery =
      selectedOfficeIds !== "" ? `&officeIds=${selectedOfficeIds}` : "";
    let customRemarkAuthorsQuery =
      customRemarkAuthors !== ""
        ? `&customRemarkAuthors=${customRemarkAuthors}`
        : "";
    let sort = "";
    if (sortBy !== null) {
      sort = `&sort=${sortBy}`;
    }
    setLoader(true);
    let query = `templateSubCategoryId=${subCategoryId}&pageIndex=0&pageSize=100&type=${selectedRemarkType}&remarkType=${remarkType}${sort}${startDate}${endDate}${searchText}${similarityStart}${similarityEnd}${selectedOfficeIdsQuery}${customRemarkAuthorsQuery}`;
    let result = await RemarkServices.getTemplateRemark(query, router);
    setLoader(false);
    setRemarkCatTabsCount(
      getRemarkCountForCategory(result?.body.remarkTypeCount),
    );
    setRemarkList(result?.body.remarks?.rows);
    setSortLoader(false);
    const count = {
      template: result?.body?.templateRemarkCount,
      custom: result?.body?.customRemarkCount,
    };
    if (result?.body.remarks?.rows.length == 0) {
      setNoData(true);
    } else {
      setNoData(false);
    }
    setRemarkTypeTabsCount(count);
  }
  useEffect(() => {
    if (subCategoryId !== "") {
      getSubCategoryDetail();
    }
  }, [
    subCategoryId,
    selectedRemarkType,
    sortBy,
    isCustom,
    dateRange,
    debouncedSearchTerm,
    similarityRange,
    selectedOfficeIds,
    currentPage,
    reloadRemarksState,
    customRemarkAuthors,
  ]);
  return (
    <div className={styles.wrapper}>
      <Column remarkList={remarkList} noData={noData} />
    </div>
  );
};

export default OneColumn;
