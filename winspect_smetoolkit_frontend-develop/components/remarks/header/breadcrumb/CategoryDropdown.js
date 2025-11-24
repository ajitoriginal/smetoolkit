import styles from "./dropdown.module.scss";
import Select from "react-select";
import DropdownIndicator from "../../../common/dropdown-indicator";
import CategoryServices from "../../../../api/services/CategoryServices";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useCategoryStore from "../../../../stores/categoryStore";
import useGenerateStore from "../../../../stores/generalStore";
import { url } from "../../../../utils/url";

const CategoryDropdown = () => {
  const router = useRouter();
  const [options, setOptions] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const { setCategoryLength, setCategoryId } = useCategoryStore();
  const { mastertemplate, category, template } = router.query;
  const { isDraft } = useGenerateStore();
  useEffect(() => {
    const { template } = router.query;
    if (template) {
      getCategories(template);
    }
  }, [router]);

  async function getCategories(templateID) {
    let result = await CategoryServices.getCategories(templateID, router);
    const optionArray = [];
    result?.body?.map((item) => {
      optionArray.push({ label: item.name, value: item });
    });
    setOptions(optionArray);
    let categoryObj = result?.body.find(
      (obj) => obj.templateCategoryId === category,
    );
    setSelectedCategory(categoryObj);
    setCategoryId(categoryObj?.templateCategoryId);
    setCategoryLength(result?.body?.length);
  }

  const formatOptionLabel = ({ value, label }) => {
    return (
      <div className={`${styles.optionWrapper} optionWrapper`}>
        <div className={styles.templateName}>{label}</div>
      </div>
    );
  };

  const handleChange = (e) => {
    setSelectedCategory(e.value);
    setCategoryId(e.value.templateCategoryId);
    const remarkUrl = `${
      isDraft ? url.draftTemplates : url.publishTemplates
    }/${mastertemplate}/${template}/remarks?category=${
      e.value.templateCategoryId
    }`;

    router.push(remarkUrl);
  };
  return (
    <div className={styles.selectWrapper}>
      <Select
        className="category-dropdown"
        options={options}
        formatOptionLabel={formatOptionLabel}
        components={{ DropdownIndicator }}
        name="templateId"
        value={{ label: selectedCategory?.name }}
        onChange={handleChange}
      />
    </div>
  );
};

export default CategoryDropdown;
