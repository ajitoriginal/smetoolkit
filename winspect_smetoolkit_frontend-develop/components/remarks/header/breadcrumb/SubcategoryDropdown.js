import styles from "./dropdown.module.scss";
import Select from "react-select";
import DropdownIndicator from "../../../common/dropdown-indicator";
import useCategoryStore from "../../../../stores/categoryStore";
import { useEffect, useState } from "react";
import SubcategoryServices from "../../../../api/services/SubcategoryServices";
import { useRouter } from "next/router";
import useSubCategoryStore from "../../../../stores/subCategoryStore";
import useGenerateStore from "../../../../stores/generalStore";
import { url } from "../../../../utils/url";

const SubcategoryDropdown = () => {
  const categoryId = useCategoryStore((state) => state.categoryId);
  const { setSubCategoryLength, setSubCategoryId } = useSubCategoryStore();
  const [options, setOptions] = useState();
  const [selectedSubCategory, setSelectedSubCategory] = useState();
  const router = useRouter();
  const { mastertemplate, template, category, subcategory } = router.query;
  const { isDraft } = useGenerateStore();

  async function subCategory(categoryId) {
    let result = await SubcategoryServices.getSubcategories(
      categoryId,
      router,
      false,
    );
    const optionArray = [];
    if (Array.isArray(result?.body)) {
      result?.body?.map((item) => {
        optionArray.push({ label: item.name, value: item });
      });
      setOptions(optionArray);
      setSubCategoryLength(result?.body?.length);
      let subcategoryObj;
      if (subcategory && subcategory !== "undefined") {
        subcategoryObj = await result?.body.find(
          (obj) => obj.templateSubCategoryId === subcategory,
        );
      } else {
        subcategoryObj = await result?.body[0];
      }
      if (subcategoryObj) {
        setSelectedSubCategory(subcategoryObj);
        setSubCategoryId(subcategoryObj?.templateSubCategoryId);

        const remarkUrl = `${
          isDraft ? url.draftTemplates : url.publishTemplates
        }/${mastertemplate}/${template}/remarks?category=${categoryId}&subcategory=${
          subcategoryObj?.templateSubCategoryId
        }`;
      }
    }
  }

  useEffect(() => {
    if (categoryId !== "") {
      subCategory(categoryId);
    }
  }, [categoryId]);

  const formatOptionLabel = ({ value, label }) => {
    return (
      <div className={`${styles.optionWrapper} optionWrapper`}>
        <div className={styles.templateName}>{label}</div>
      </div>
    );
  };

  const handleChange = (e) => {
    setSelectedSubCategory(e.value);
    setSubCategoryId(e.value.templateSubCategoryId);
    const remarkUrl = `${
      isDraft ? url.draftTemplates : url.publishTemplates
    }/${mastertemplate}/${template}/remarks?category=${category}&subcategory=${
      e.value.templateSubCategoryId
    }`;
    router.push(remarkUrl);
  };
  return (
    <div className={styles.selectWrapper}>
      <Select
        classNames={styles.select}
        className="subcategory-dropdown"
        options={options}
        formatOptionLabel={formatOptionLabel}
        components={{ DropdownIndicator }}
        name="templateId"
        value={{
          label: selectedSubCategory?.name,
        }}
        onChange={handleChange}
      />
    </div>
  );
};

export default SubcategoryDropdown;
