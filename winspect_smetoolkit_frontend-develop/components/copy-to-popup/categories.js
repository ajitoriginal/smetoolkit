import { useEffect, useState } from "react";
import PrimaryButton from "../../atoms/primary-button";
import SecondaryButton from "../../atoms/secondary-button";
import styles from "../common/modal.module.scss";
import copyStyle from "./styles.module.scss";
import { debounce } from "../../utils/utils";
import { useRouter } from "next/router";
import CategoryServices from "../../api/services/CategoryServices";
import useCopyToStore from "../../stores/copyToStore";
import SubcategoryServices from "../../api/services/SubcategoryServices";

const Categories = () => {
  const router = useRouter();
  const { template } = router.query;
  const {
    selectedTemplate,
    setSelectedCategory,
    selectedCategory,
    setStep,
    selectedSubCategoriesToCopy,
    setShowCopyToPopup,
    setShowSubCategoryCheckboxes,
    setSelectedSubCategoriesToCopy,
    selectedAboutToCopy,
    setSelectedTemplate,
    copyTo,
    selectedRemarkToCopy,
  } = useCopyToStore();
  const [categories, setCategories] = useState([]);
  const [loader, setLoader] = useState(false);
  const [filterCategories, setFilteredCategories] = useState([]);
  //for draft template

  const getCategories = async () => {
    let result = await CategoryServices.getCategories(
      selectedTemplate.templateId,
      router,
    );
    setCategories(result.body);
    if (result.body.length > 0) {
      setFilteredCategories(result.body);
    } else {
      setFilteredCategories(null);
    }
  };

  useEffect(() => {
    if (selectedTemplate) {
      getCategories();
    }
  }, [selectedTemplate]);

  const delayedCategorySearch = debounce((e) => {
    let searchText = e.target.value.toLowerCase();
    const filtered = categories.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()),
    );
    if (searchText !== "") {
      setFilteredCategories([...filtered]);
    } else {
      setFilteredCategories([...categories]);
    }
  }, 300);

  const handleCategorySearch = async (event) => {
    delayedCategorySearch(event);
  };

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    if (copyTo !== "subcategory") {
      setStep(3);
    }
  };
  const close = () => {
    setShowCopyToPopup(false);
    setStep(1);
    setSelectedTemplate("");
    setSelectedCategory("");
  };

  const handleCopyClick = async () => {
    setLoader(true);
    const data = {
      copyFromPubTemplateId: template,
      copyFromSubCategoryIds: selectedSubCategoriesToCopy,
      copyToDraftCategoryId: selectedCategory.templateCategoryId,
    };

    let result = await SubcategoryServices.copySubCategory(data, router, true);
    setLoader(false);
    if (result.status == 200) {
      setSelectedSubCategoriesToCopy([]);
      setShowSubCategoryCheckboxes(false);
      setSelectedCategory("");
      close();
    }
  };
  let count = selectedSubCategoriesToCopy.length;
  if (copyTo == "about") {
    count = selectedAboutToCopy.length;
  } else if (copyTo == "remark") {
    count = selectedRemarkToCopy.length;
  }
  return (
    <div>
      <div className={`${styles.header} ${copyStyle.header}`}>
        <div>
          <h3>Copy {count} Items to Draft Template</h3>
        </div>
        <span className={copyStyle.closeIcon} onClick={close}>
          <img alt="close icon" src="/images/close-white-icon.svg" />
        </span>
        {filterCategories !== null && (
          <div className={copyStyle.searchTemplatesWrapper}>
            <label>Search for Destination</label>
            <div className={copyStyle.inputWrapper}>
              <input
                type="text"
                placeholder="Search"
                onChange={handleCategorySearch}
              />
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={copyStyle.searchIcon}
              >
                <g clip-path="url(#clip0_156_14841)">
                  <path
                    d="M12.0482 11.5737L15 14.5248L14.0248 15.5L11.0737 12.5482C9.9757 13.4285 8.60993 13.9072 7.20262 13.9052C3.77877 13.9052 1 11.1265 1 7.70262C1 4.27877 3.77877 1.5 7.20262 1.5C10.6265 1.5 13.4052 4.27877 13.4052 7.70262C13.4072 9.10993 12.9285 10.4757 12.0482 11.5737ZM10.6657 11.0624C11.5404 10.1629 12.0289 8.95722 12.0269 7.70262C12.0269 5.03687 9.86768 2.87836 7.20262 2.87836C4.53687 2.87836 2.37836 5.03687 2.37836 7.70262C2.37836 10.3677 4.53687 12.5269 7.20262 12.5269C8.45722 12.5289 9.66291 12.0404 10.5624 11.1657L10.6657 11.0624Z"
                    fill="#ACACAC"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_156_14841">
                    <rect
                      width="16"
                      height="16"
                      fill="white"
                      transform="translate(0 0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        )}
      </div>
      <div className={copyStyle.categoryListWrapper}>
        <div
          onClick={() => {
            setStep(1);
          }}
          className={copyStyle.backButton}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <rect
              x="0.5"
              y="0.5"
              width="23"
              height="23"
              rx="3.5"
              stroke="black"
              stroke-opacity="0.2"
            />
            <path
              d="M14 7L9 12L14 17"
              stroke="black"
              stroke-opacity="0.5"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span className={copyStyle.name}>
            {selectedTemplate?.master_template?.name} v
            {selectedTemplate?.version}
          </span>
        </div>
        <div className={`${copyStyle.categoryList} categoryList`}>
          {filterCategories !== null ? (
            <>
              <div className={copyStyle.selectTitle}>Select Category</div>
              {filterCategories?.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => handleCategoryClick(item)}
                    className={`${copyStyle.categoryItem} ${
                      selectedCategory?.templateCategoryId ===
                        item.templateCategoryId && copyStyle.activeCategory
                    }`}
                  >
                    <div className={copyStyle.icon}>
                      <img
                        src={`${item.iconImageLocation}${item.iconImageKey}`}
                      />
                    </div>
                    <div className={copyStyle.leftPart}>
                      <div className={copyStyle.categoryName}>
                        {item.name}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="7"
                          height="12"
                          viewBox="0 0 7 12"
                          fill="none"
                          className={copyStyle.arrowIcon}
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M0.225213 11.8245C0.473738 12.0585 0.875662 12.0585 1.12356 11.8245L6.37791 6.86636C6.49552 6.75707 6.58918 6.62553 6.65317 6.47974C6.71716 6.33395 6.75016 6.17695 6.75016 6.0183C6.75015 5.85965 6.71715 5.70266 6.65315 5.55687C6.58914 5.41108 6.49548 5.27954 6.37786 5.17025L1.08521 0.175497C0.965095 0.0638707 0.806028 0.00112957 0.640316 1.52125e-05C0.474604 -0.00109915 0.314673 0.0594968 0.193002 0.169497C0.132728 0.223818 0.0845012 0.28966 0.0513086 0.362944C0.018116 0.436229 0.000664014 0.515397 3.33338e-05 0.595544C-0.000597347 0.675692 0.0156067 0.755113 0.0476421 0.82889C0.0796774 0.902667 0.126862 0.969229 0.186274 1.02445L5.03035 5.59442C5.08921 5.64907 5.13608 5.71486 5.16811 5.78779C5.20014 5.86071 5.21666 5.93924 5.21666 6.0186C5.21666 6.09797 5.20015 6.1765 5.16812 6.24942C5.1361 6.32234 5.08923 6.38813 5.03037 6.44278L0.225191 10.9768C0.166352 11.0313 0.119496 11.0971 0.0874778 11.17C0.0554592 11.2428 0.0389481 11.3213 0.0389502 11.4006C0.0389522 11.4799 0.0554674 11.5584 0.0874898 11.6313C0.119512 11.7042 0.166371 11.7699 0.225213 11.8245Z"
                            fill="black"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className={copyStyle.radio} />
                  </div>
                );
              })}
            </>
          ) : (
            <div className={copyStyle.noData}>No Categories Found</div>
          )}
        </div>
        <div className={copyStyle.buttonWrapper}>
          <SecondaryButton text="Cancel" onClick={close} />
          {copyTo !== "subcategory" ||
          selectedCategory == "" ||
          selectedCategory == null ? (
            <PrimaryButton
              text="Copy Here"
              disabled
              //   onClick={close}
            />
          ) : loader ? (
            <PrimaryButton text="Please wait..." />
          ) : (
            <PrimaryButton text="Copy Here" onClick={handleCopyClick} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
