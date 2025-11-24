import { useRouter } from "next/router";
import useSubCategoryStore from "../../../stores/subCategoryStore";
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
import TwoColumnRow from "./TwoColumnRow";

const TwoColumn = () => {
  const { subCategoryId } = useSubCategoryStore();
  const [noData, setNoData] = useState(false);
  const {
    selectedRemarkType,
    setRemarkTypeTabsCount,
    setRemarkCatTabsCount,
    remarkList,
    setRemarkList,
  } = useRemarkStore();
  const { isCustom, isDraft } = useGenerateStore();
  const { setTotalPages, currentPage } = useRmarkPaginationStore();
  const { setLoader } = useLoaderStore();
  const router = useRouter();
  const { dateRange, debouncedSearchTerm, similarityRange, selectedOfficeIds } =
    useFilterStore();
  const { sortBy, setSortLoader } = useSortStore();
  async function getSubCategoryDetail() {
    setRemarkList([]);
    let remarkType = isCustom ? "Custom" : "Template";
    let startDate =
      dateRange?.startDate !== null ? `&start=${dateRange.startDate}` : "";
    startDate = startDate !== "" ? startDate.split(" ")[0] + " 00:00:00" : "";

    let endDate =
      dateRange?.startDate !== null ? `&end=${dateRange.endDate}` : "";
    endDate = endDate !== "" ? endDate.split(" ")[0] + " 23:59:59" : "";
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
    let sort = "";
    if (sortBy !== null) {
      sort = `&sort=${sortBy}`;
    }
    let query = `templateSubCategoryId=${subCategoryId}&pageIndex=${currentPage}&pageSize=10&type=${selectedRemarkType}&remarkType=${remarkType}${sort}${startDate}${endDate}${searchText}${similarityStart}${similarityEnd}${selectedOfficeIdsQuery}`;
    let result = await RemarkServices.getTemplateRemark(query, router);
    result?.body.remarkTypeCount.map((item) => {
      if (selectedRemarkType == item.type) {
        setTotalPages(item.count);
      }
    });
    setLoader(false);
    if (result?.body.remarks?.rows.length == 0) {
      setNoData(true);
    } else {
      setNoData(false);
    }
    setRemarkCatTabsCount(
      getRemarkCountForCategory(result?.body.remarkTypeCount),
    );
    setRemarkList(result?.body.remarks?.rows);
    setSortLoader(false);
    const count = {
      template: result?.body?.templateRemarkCount,
      custom: result?.body?.customRemarkCount,
    };
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
    dateRange,
    debouncedSearchTerm,
    similarityRange,
    selectedOfficeIds,
    currentPage,
  ]);
  if (noData) {
    return <div className={styles.noData}>No Remarks Found</div>;
  } else {
    return (
      <div className={`${styles.wrapper} ${styles.twoColumns}`}>
        {remarkList?.map((item, index) => {
          let similarRemarks = [];
          let nearestTemplateRemarkId = null;
          if (isDraft) {
            nearestTemplateRemarkId =
              item.oldTemplateRemark?.template_remark_similarity
                ?.nearestTemplateRemarkId;
            if (item.oldTemplateRemark?.template_remark_similarity !== null) {
              if (
                item.oldTemplateRemark?.template_remark_similarity
                  ?.nearestTemplateRemark?.newTemplateRemark
              ) {
                similarRemarks.push({
                  remark:
                    item.oldTemplateRemark?.template_remark_similarity
                      ?.nearestTemplateRemark?.newTemplateRemark,
                  frequency:
                    item.oldTemplateRemark?.template_remark_similarity
                      ?.nearestTemplateRemark?.totalFrequency,
                  frequencyData:
                    item.oldTemplateRemark?.template_remark_similarity
                      ?.nearestTemplateRemark?.template_remark_frequencies,
                });
              }
              if (
                item.oldTemplateRemark?.template_remark_similarity
                  ?.nearestRemark?.newTemplateRemark
              ) {
                similarRemarks.push({
                  remark:
                    item.oldTemplateRemark?.template_remark_similarity
                      ?.nearestRemark?.newTemplateRemark,
                  frequency:
                    item.oldTemplateRemark?.template_remark_similarity
                      ?.nearestRemark?.totalFrequency,
                  frequencyData:
                    item.oldTemplateRemark?.template_remark_similarity
                      ?.nearestRemark?.template_remark_frequencies,
                });
              }
            }
          } else {
            nearestTemplateRemarkId =
              item.template_remark_similarity?.nearestTemplateRemarkId;
            if (item.template_remark_similarity !== null) {
              if (item.template_remark_similarity?.nearestTemplateRemark) {
                similarRemarks.push({
                  remark: item.template_remark_similarity.nearestTemplateRemark,
                  frequency: item.template_remark_similarity.totalFrequency,
                  frequencyData:
                    item.template_remark_similarity.template_remark_frequencies,
                });
              }
              if (item.template_remark_similarity?.nearestRemark) {
                similarRemarks.push(
                  item.template_remark_similarity?.nearestRemark,
                );
              }
            }
          }
          return (
            <TwoColumnRow
              key={index}
              item={item}
              index={index}
              isDraft={isDraft}
            />
          );
        })}
      </div>
    );
  }
};

export default TwoColumn;
