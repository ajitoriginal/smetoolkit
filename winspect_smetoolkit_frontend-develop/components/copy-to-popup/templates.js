import { useEffect, useState } from "react";
import PrimaryButton from "../../atoms/primary-button";
import SecondaryButton from "../../atoms/secondary-button";
import styles from "../common/modal.module.scss";
import copyStyle from "./styles.module.scss";
import { debounce } from "../../utils/utils";
import TemplateServices from "../../api/services/TemplateServices";
import { useRouter } from "next/router";
import useCopyToStore from "../../stores/copyToStore";
import CategoryServices from "../../api/services/CategoryServices";

const Templates = (props) => {
  const router = useRouter();
  const { template } = router.query;
  const {
    setSelectedTemplate,
    selectedTemplate,
    setStep,
    selectedSubCategoriesToCopy,
    setShowCopyToPopup,
    selectedCategoriesToCopy,
    setSelectedCategoriesToCopy,
    copyTo,
    setShowCategoryCheckboxes,
    selectedAboutToCopy,
    selectedRemarkToCopy,
  } = useCopyToStore();

  const [loader, setLoader] = useState(false);
  const [draft, setDraft] = useState([]);
  const [filterDraft, setFilteredDraft] = useState([]);
  //for draft template
  async function Draft() {
    let result = await TemplateServices.getDraftTemplate(router);
    if (result.status == 200) {
      setDraft(result.body.rows);
      setFilteredDraft(result.body.rows);
    }
  }

  useEffect(() => {
    Draft();
  }, []);
  const delayedTemplateSearch = debounce((e) => {
    let searchText = e.target.value.toLowerCase();
    const filtered = draft.filter((item) =>
      item.master_template.name
        .toLowerCase()
        .includes(searchText.toLowerCase()),
    );
    if (searchText !== "") {
      setFilteredDraft([...filtered]);
    } else {
      setFilteredDraft([...draft]);
    }
  }, 300);

  const handleTemplateSearch = (event) => {
    // setSearchTerm(event.target.value);
    delayedTemplateSearch(event);
  };

  const handleTemplateClick = async (template) => {
    setSelectedTemplate(template);
    if (copyTo !== "category") {
      setStep(2);
    }
  };

  const close = () => {
    setShowCopyToPopup(false);
    setSelectedTemplate("");
    setStep(1);
  };

  const handleCopyClick = async () => {
    setLoader(true);
    const data = {
      copyFromPubTemplateId: template,
      copyFromCategoryIds: selectedCategoriesToCopy,
      copyToDraftTemplateId: selectedTemplate.templateId,
    };

    let result = await CategoryServices.copyCategory(data, router, true);
    setLoader(false);
    if (result.status == 200) {
      setSelectedCategoriesToCopy([]);
      setShowCategoryCheckboxes(false);
      close();
    }
  };

  let count = selectedCategoriesToCopy.length;
  if (copyTo == "subcategory") {
    count = selectedSubCategoriesToCopy.length;
  } else if (copyTo == "about") {
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
        <div className={copyStyle.searchTemplatesWrapper}>
          <label>Search for Destination</label>
          <div className={copyStyle.inputWrapper}>
            <input
              type="text"
              placeholder="Search"
              onChange={handleTemplateSearch}
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
      </div>

      <div className={copyStyle.templateListWrapper}>
        <div className={copyStyle.templateList}>
          {filterDraft?.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => handleTemplateClick(item)}
                className={`${copyStyle.templateItem} ${
                  selectedTemplate?.templateId === item.templateId &&
                  copyStyle.activeTemplate
                }`}
              >
                <div className={copyStyle.icon}>
                  <img src={`${item.iconImageLocation}${item.iconImageKey}`} />
                </div>
                <div className={copyStyle.leftPart}>
                  <div className={copyStyle.templateName}>
                    {item.master_template.name} v{item.version}
                  </div>
                  <div className={copyStyle.meta}>
                    <div className={copyStyle.createdBy}>
                      Created by:
                      {`${item?.createdBy?.first}${item?.createdBy?.last}`}
                    </div>
                    <div className={copyStyle.templateCreated}>
                      Date: {item.createdAt}
                    </div>
                  </div>
                </div>
                {copyTo == "category" ? (
                  <div className={copyStyle.radio} />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="9"
                    height="16"
                    viewBox="0 0 9 16"
                    fill="none"
                    className={copyStyle.arrowIcon}
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0.300284 15.766C0.63165 16.078 1.16755 16.078 1.49808 15.766L8.50388 9.15515C8.6607 9.00942 8.78557 8.83404 8.87089 8.63965C8.95622 8.44526 9.00021 8.23594 9.00021 8.02441C9.0002 7.81287 8.9562 7.60354 8.87086 7.40916C8.78553 7.21477 8.66065 7.03938 8.50382 6.89366L1.44695 0.233996C1.28679 0.085161 1.0747 0.0015061 0.853755 2.02834e-05C0.632806 -0.00146553 0.419564 0.0793291 0.257335 0.225996C0.17697 0.298424 0.112668 0.386213 0.0684115 0.483926C0.0241547 0.581639 0.000885352 0.687195 4.4445e-05 0.794059C-0.000796462 0.900922 0.0208089 1.00682 0.0635228 1.10519C0.106237 1.20356 0.169149 1.29231 0.248365 1.36594L6.70714 7.45923C6.78561 7.5321 6.84811 7.61982 6.89081 7.71705C6.93352 7.81428 6.95554 7.91899 6.95555 8.0248C6.95555 8.13062 6.93353 8.23533 6.89083 8.33256C6.84813 8.42979 6.78564 8.51751 6.70717 8.59038L0.300255 14.6357C0.221803 14.7085 0.159328 14.7961 0.116637 14.8933C0.0739456 14.9904 0.0519308 15.0951 0.0519336 15.2008C0.0519363 15.3066 0.0739566 15.4112 0.116653 15.5084C0.159349 15.6056 0.221828 15.6932 0.300284 15.766Z"
                      fill="#005982"
                    />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
        <div className={copyStyle.buttonWrapper}>
          <SecondaryButton text="Cancel" onClick={close} />
          {copyTo == "category" ? (
            loader ? (
              <PrimaryButton text="Please wait..." />
            ) : (
              <PrimaryButton text="Copy Here" onClick={handleCopyClick} />
            )
          ) : (
            <PrimaryButton text="Copy Here" disabled />
          )}
        </div>
      </div>
    </div>
  );
};

export default Templates;
