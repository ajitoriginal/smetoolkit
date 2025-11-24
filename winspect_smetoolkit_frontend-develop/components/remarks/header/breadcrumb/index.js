import { useEffect, useState } from "react";
import { removeTemplateIfLastWord } from "../../../../utils/utils";
import CategoryDropdown from "./CategoryDropdown";
import SubcategoryDropdown from "./SubcategoryDropdown";
import styles from "./breadcrumb.module.scss";
import { useRouter } from "next/router";
import TemplateServices from "../../../../api/services/TemplateServices";
import useSubCategoryStore from "../../../../stores/subCategoryStore";
import useCategoryStore from "../../../../stores/categoryStore";
import useGenerateStore from "../../../../stores/generalStore";
import useLoaderStore from "../../../../stores/loaderStore";
import useTemplateStore from "../../../../stores/templateStore";
const Breadcrumb = () => {
  const router = useRouter();
  const [templateDetail, setTemplateDetail] = useState();
  const { setLoader } = useLoaderStore();
  const { categoryLength, setProgressReportCount } = useCategoryStore();
  const { subCategoryLength } = useSubCategoryStore();
  const { isDraft } = useGenerateStore();
  const { setCurrentTemplateDetail } = useTemplateStore();

  useEffect(() => {
    const { template } = router.query;
    if (template) {
      getTemplateDetail(template);
    }
  }, [router]);

  //for draft template
  async function getTemplateDetail(templateID) {
    setLoader(true);
    let result = await TemplateServices.getTemplateDetail(templateID, router);
    setLoader(false);
    setTemplateDetail(result.body);
    setCurrentTemplateDetail(result.body);
    setProgressReportCount(result.body.inProgressReports);
  }
  let oldTemplate = templateDetail?.oldTemplate;
  let oldTemplateTitle = oldTemplate?.master_template.name
    ? `${removeTemplateIfLastWord(oldTemplate?.master_template.name)} v${
        oldTemplate ? oldTemplate.version : ""
      } Template`
    : "";
  let currentTemplate = `${isDraft ? "Draft " : ""}${
    templateDetail
      ? removeTemplateIfLastWord(templateDetail.masterTemplate.name)
      : ""
  } v${templateDetail ? templateDetail.version : ""} Template`;
  return (
    <div className={`${styles.wrapper} breadcrumb-wrapper`}>
      <ul className={styles.list}>
        {oldTemplate?.master_template && (
          <li className={styles.templateName} title={oldTemplateTitle}>
            <span>{oldTemplateTitle}</span>
          </li>
        )}
        <li className={styles.templateName} title={currentTemplate}>
          <span>{currentTemplate}</span>
        </li>
        <li className={categoryLength == 0 ? styles.hide : ""}>
          <CategoryDropdown />
        </li>
        <li className={subCategoryLength == 0 ? styles.hide : ""}>
          <SubcategoryDropdown />
        </li>
      </ul>
    </div>
  );
};

export default Breadcrumb;
