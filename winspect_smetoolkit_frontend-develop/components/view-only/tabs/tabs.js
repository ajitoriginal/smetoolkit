import Switch from "react-switch";
import styles from "../view-only-content.module.scss";
import TemplateServices from "../../../api/services/TemplateServices";
import { useEffect, useRef, useState } from "react";
import useCopyToStore from "../../../stores/copyToStore";
import useGenerateStore from "../../../stores/generalStore";

const Tabs = (props) => {
  const mainTabs = [
    "Categories",
    "Location",
    "Important Information",
    "Explanation of Terms",
    "Infographic Images",
  ];

  const {
    active,
    setActive,
    tabState,
    checkDraft,
    templateID,
    setFavoritepopup,
  } = props;

  const [requireTableofContent, setTableofContent] = useState(
    tabState?.tableofContent,
  );
  const [hasLocation, setHasLocation] = useState(false);
  const [hasDisclouser, setHasDisclouser] = useState(false);
  const [hasDefinition, setHasDefinition] = useState(false);
  const [requireAttachment, setRequireAttachment] = useState(false);

  const [dropdownShow, setDropdownShow] = useState(false);

  const {
    setShowCategoryCheckboxes,
    showCategoryCheckboxes,
    setSelectedCategoriesToCopy,
  } = useCopyToStore();

  const { isDraft } = useGenerateStore();
  console.log("isDraft", isDraft);

  useEffect(() => {
    setHasLocation(tabState?.location);
    setHasDisclouser(tabState?.disclouser);
    setHasDefinition(tabState?.definition);
    setRequireAttachment(tabState?.attachment);
    setTableofContent(tabState?.tableofContent);
    console.log("tabState", tabState);
  }, [tabState]);

  const wrapperRef = useRef(null);
  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setDropdownShow(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  useOutsideAlerter(wrapperRef);

  async function toggleReview(
    requireAttachment,
    requireT,
    hasLocation,
    hDefinition,
    hDisclouser,
  ) {
    let data = {
      templateId: templateID,
      requireAttachment: requireAttachment,
      hasToc: requireT,
      hasLocation: hasLocation,
      hasDefinition: hDefinition,
      hasDisclosure: hDisclouser,
    };
    await TemplateServices.updateDraftTemplate(data);
  }

  return (
    <ul className={`${styles.tabbing} dFlex`}>
      {mainTabs.map((item, index) => (
        <li
          key={index}
          className={`
                ${active == index ? styles.active : ""} 
                ${!hasLocation && index == 1 ? styles.hideBox : ""}
                ${!hasDisclouser && index == 2 ? styles.hideBox : ""}
                ${!hasDefinition && index == 3 ? styles.hideBox : ""}
              `}
          onClick={() => setActive(index)}
          id={`tabsCont-${index}`}
        >
          <h3>{item}</h3>
        </li>
      ))}
      <li
        className={styles.dropDown}
        ref={wrapperRef}
        onClick={() => {
          setDropdownShow(!dropdownShow);
        }}
      >
        <img src="/images/bulletdrop.svg" alt="toggle icon" />
        {dropdownShow && (
          <ul
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <li
              className={`alignC ${styles.attachementMandate}`}
              id="attachmentMandatory"
            >
              Table of content
              <Switch
                checked={requireTableofContent}
                onChange={() => {
                  localStorage.setItem(
                    "Toc",
                    JSON.stringify(!requireTableofContent),
                  );
                  toggleReview(
                    requireAttachment,
                    !requireTableofContent,
                    hasLocation,
                    hasDefinition,
                    hasDisclouser,
                  );
                  setTableofContent(!requireTableofContent);
                }}
                offColor="#A8A8A8"
                onColor="#34C759"
                disabled={checkDraft ? false : true}
              />
            </li>
            <li
              className={`alignC ${styles.attachementMandate}`}
              id="attachmentMandatory"
            >
              Attachment
              <Switch
                checked={requireAttachment}
                onChange={() => {
                  localStorage.setItem(
                    "requireAttachment",
                    JSON.stringify(!requireAttachment),
                  );
                  toggleReview(
                    !requireAttachment,
                    requireTableofContent,
                    hasLocation,
                    hasDefinition,
                    hasDisclouser,
                  );
                  setRequireAttachment(!requireAttachment);
                }}
                offColor="#A8A8A8"
                onColor="#34C759"
                disabled={checkDraft ? false : true}
              />
            </li>
            <li className={`alignC ${styles.attachementMandate}`}>
              Location
              <Switch
                checked={hasLocation}
                onChange={() => {
                  localStorage.setItem(
                    "hasLocation",
                    JSON.stringify(!hasLocation),
                  );
                  toggleReview(
                    requireAttachment,
                    requireTableofContent,
                    !hasLocation,
                    hasDefinition,
                    hasDisclouser,
                  );
                  setHasLocation(!hasLocation);
                  setActive(0);
                }}
                offColor="#A8A8A8"
                onColor="#34C759"
                disabled={checkDraft ? false : true}
              />
            </li>
            <li className={`alignC ${styles.attachementMandate}`}>
              Important Information
              <Switch
                checked={hasDisclouser}
                onChange={() => {
                  localStorage.setItem(
                    "hasDisclosure",
                    JSON.stringify(!hasDisclouser),
                  );
                  toggleReview(
                    requireAttachment,
                    requireTableofContent,
                    hasLocation,
                    hasDefinition,
                    !hasDisclouser,
                  );
                  setHasDisclouser(!hasDisclouser);
                  setActive(0);
                }}
                offColor="#A8A8A8"
                onColor="#34C759"
                disabled={checkDraft ? false : true}
              />
            </li>
            <li className={`alignC ${styles.attachementMandate}`}>
              Explanation of Terms
              <Switch
                checked={hasDefinition}
                onChange={() => {
                  localStorage.setItem(
                    "hasDefinition",
                    JSON.stringify(!hasDefinition),
                  );
                  toggleReview(
                    requireAttachment,
                    requireTableofContent,
                    hasLocation,
                    !hasDefinition,
                    hasDisclouser,
                  );
                  setHasDefinition(!hasDefinition);
                  setActive(0);
                }}
                offColor="#A8A8A8"
                onColor="#34C759"
                disabled={checkDraft ? false : true}
              />
            </li>
            {/* <li onClick={() => setFavoritepopup(true)}>View default remarks</li> */}
            {!isDraft &&
              (showCategoryCheckboxes ? (
                <li
                  className={styles.selectCategory}
                  onClick={() => {
                    setShowCategoryCheckboxes(false);
                    setDropdownShow(false);
                    setSelectedCategoriesToCopy([]);
                  }}
                >
                  Cancel
                </li>
              ) : (
                <li
                  className={styles.selectCategory}
                  onClick={() => {
                    setShowCategoryCheckboxes(true);
                    setDropdownShow(false);
                  }}
                >
                  Select Category
                </li>
              ))}
          </ul>
        )}
      </li>
    </ul>
  );
};
export default Tabs;
