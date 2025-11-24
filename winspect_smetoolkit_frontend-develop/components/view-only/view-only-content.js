import { useState, useEffect, useRef } from "react";
import styles from "./view-only-content.module.scss";
import dayjs from "dayjs";
import CategoryList from "./category-list";
import SubCategoryList from "./subcategory-list";
import AboutAndNotes from "./about-and-notes";
import Remarks from "./remarks";
import { useRouter } from "next/router";
import Modal from "../common/modal";
import { APIurl } from "../../utils/storage";
import Select from "react-select";
import Disclosure from "../disclouser/disclouser";
import Switch from "react-switch";
import Definitions from "../definition/definition";
import Location from "../location/location";
import DropdownIndicator from "../common/dropdown-indicator";
import WarningModal from "../common/modals/warning-modal";
import FavouriteRemarkModal from "../common/modals/favourite-remark";
import { url } from "../../utils/url";
import { removeTemplateIfLastWord } from "../../utils/utils";
import InfographicImages from "../infographics/infographics";

export default function ViewOnlyContent() {
  const api = APIurl();
  const [loader, setLoader] = useState(true);
  //tabbing action
  const [active, setActive] = useState(0);

  //for getting local values
  const [local, setlocal] = useState();
  const [serviceId, setServiceId] = useState();
  const [templateName, setTemplateName] = useState();
  const [templateID, setTemplateID] = useState();
  const [masterTemplateID, setMasterTemplateID] = useState();
  const [checkDraft, setCheckDraft] = useState();

  const [requireAttachment, setRequireAttachment] = useState(false);
  const [requireTableofContent, setTableofContent] = useState(false);
  const [hasLocation, setHasLocation] = useState(true);
  const [hasDisclouser, setHasDisclouser] = useState(true);
  const [hasDefinition, setHasDefinition] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [postCheckChanged, setPostCheckChanged] = useState(false);

  useEffect(() => {
    const isStored = typeof window !== "undefined" && window.localStorage;
    const local = isStored && JSON.parse(localStorage.getItem("userInfo"));
    const requireAttachment =
      isStored && JSON.parse(localStorage.getItem("requireAttachment"));
    const requireTOC = isStored && JSON.parse(localStorage.getItem("Toc"));
    const Hlocation =
      isStored && JSON.parse(localStorage.getItem("hasLocation"));
    const Hdefinition =
      isStored && JSON.parse(localStorage.getItem("hasDefinition"));
    const Hdisclouser =
      isStored && JSON.parse(localStorage.getItem("hasDisclosure"));
    const tempID = isStored && JSON.parse(localStorage.getItem("templateID"));
    const masterTempID =
      isStored && JSON.parse(localStorage.getItem("masterTempID"));
    let serID = "";
    if (
      localStorage.getItem("services") !== undefined &&
      localStorage.getItem("services") !== "undefined"
    ) {
      serID = isStored && JSON.parse(localStorage.getItem("services"));
    }
    const draftval = isStored && JSON.parse(localStorage.getItem("isDraft"));
    const templateName = isStored && JSON.parse(localStorage.getItem("name"));
    setlocal(local);
    setRequireAttachment(requireAttachment);
    setTableofContent(requireTOC);
    setHasLocation(Hlocation);
    setHasDisclouser(Hdisclouser);
    setHasDefinition(Hdefinition);
    setTemplateID(tempID);
    setMasterTemplateID(masterTempID);
    setServiceId(serID);
    setCheckDraft(draftval);
    setTemplateName(removeTemplateIfLastWord(templateName));
  }, []);

  //for publish template header
  const [publish, setPublish] = useState();
  const [publishFilter, setPublishFilter] = useState();
  async function publishedTemplate(id) {
    let result = await fetch(
      `${api}api/v1/template/published?masterTemplateId=${masterTemplateID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
        },
      },
    );
    result = await result.json();
    setPublish(result?.body);
    let resultFilter = result?.body?.filter((item) => item?.templateId == id);
    setPublishFilter(resultFilter);
  }

  async function getTemplateDetail(id) {
    let result = await fetch(`${api}api/v1/template/detail?templateId=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
    });
    result = await result.json();
    setPublish([result?.body]);

    setPublishFilter([result?.body]);
  }

  const options = [];
  publish?.map((item) =>
    options.push({
      value: item?.templateId,
      label: `${
        checkDraft ? item?.masterTemplate.name : item?.master_template.name
      }.V${item?.version} (${dayjs(item?.createdAt).format(
        "M/DD/YYYY",
      )} to ${dayjs(item?.publishedAt).format("M/DD/YYYY")})`,
    }),
  );

  //for category
  const [activeCat, setActiveCat] = useState(0);
  const [category, setCategory] = useState([]);
  async function Categories(id) {
    let result = await fetch(
      `${api}api/v1/template/categories?templateId=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
        },
      },
    );
    result = await result.json();
    setCategory(result?.body);
    if (result?.body?.length > 0) {
      subCategory(result?.body[0]?.templateCategoryId);
      setPassingCat(result?.body[0]?.templateCategoryId);
    } else {
      setLoader(false);
    }
  }

  useEffect(() => {
    if (local != null && templateID != null) {
      Categories(templateID);
      if (checkDraft) {
        getTemplateDetail(templateID);
      } else {
        publishedTemplate(templateID);
      }
    }
  }, [local]);

  const categoryClick = (id, index) => {
    subCategory(id);
    setActiveCat(index);
    setActiveSubCat(0);
    setLoader(true);
  };

  //for subcategory
  const [activeSubCat, setActiveSubCat] = useState(0);
  const [subcategories, setSubcategories] = useState();

  // to set active category
  const [passingCat, setPassingCat] = useState();
  ``;
  const setCatForSub = (id) => {
    setPassingCat(id);
  };

  // to set active subcategory
  const [passingSubCat, setPassingSubCat] = useState("");
  const setSubCatForAbout = (id) => setPassingSubCat(id);
  async function subCategory(id) {
    let result = await fetch(
      `${api}api/v1/template/sub-categories?templateCategoryId=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
        },
      },
    );
    result = await result.json();
    setSubcategories(result?.body);
    aboutAndNotes(result?.body[0]?.templateSubCategoryId);
    setPassingSubCat(result?.body[0]?.templateSubCategoryId);
  }
  const subCategoryClick = (id, index) => {
    aboutAndNotes(id);
    setActiveSubCat(index);
    setLoader(true);
  };

  //for about and note category
  const [aboutNotes, setAboutNotes] = useState();

  async function aboutAndNotes(id) {
    let result = await fetch(
      `${api}api/v1/template/sub-categories/detail?templateSubCategoryId=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
        },
      },
    );
    result = await result.json();
    setAboutNotes(result?.body);
    setLoader(false);
  }

  //rebuplish the template
  const [absol, setAbsol] = useState(true);
  async function republishTheTemplate(id) {
    setLoader(true);
    let result = await fetch(`${api}api/v1/template/republish`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
      body: JSON.stringify({
        templateId: id,
      }),
    });
    result = await result.json();
    if (result.status == 200) {
      setLoader(false);
    }
    publishedTemplate(id);
  }

  //publish draft template
  const [modal, setModal] = useState(false);

  const router = useRouter();
  async function publishTheTemplate() {
    setLoader(true);
    let result = await fetch(`${api}api/v1/template/publish`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
      body: JSON.stringify({
        templateId: templateID,
      }),
    });
    result = await result.json();
    setModal(false);
    if (result.status == 200) {
      setLoader(false);
      setToastMessage("Template published, redirecting to dashboard..");
      setTimeout(function () {
        router.push(url.publishTemplates);
      }, 2000);
      toastFunc(true);
    } else if (result.status == 400) {
      setLoader(false);
      toastFunc(true, true);
      setToastMessage(result.message);
    }
  }
  const [toast, setToast] = useState("");
  const [redToast, setRedToast] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const toastFunc = (value, red = false) => {
    if (red) {
      setRedToast(value);
    } else {
      setToast(value);
    }
    setTimeout(function () {
      setToast("");
      setRedToast("");
    }, 4000);
  };

  const [forAboutProperty, setForAboutProperty] = useState();

  async function toggleReview(
    requireAttachment,
    requireT,
    hasLocation,
    hDefinition,
    hDisclouser,
  ) {
    await fetch(`${api}api/v1/template/draft`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
      },
      body: JSON.stringify({
        templateId: templateID,
        requireAttachment: requireAttachment,
        hasToc: requireT,
        hasLocation: hasLocation,
        hasDefinition: hDefinition,
        hasDisclosure: hDisclouser,
      }),
    });
  }

  const mainTabs = [
    "Categories",
    "Location",
    "Important Information",
    "Explanation of Terms",
    "Infographic Images",
  ];

  const [dropdownShow, setDropdownShow] = useState(false);
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

  const [favoritepopup, setFavoritepopup] = useState(false);
  const [favorioteLits, setFavorioteLits] = useState();
  async function findFavorite(templateID) {
    let result = await fetch(
      `${api}api/v1/template/remark/favourite?templateId=${templateID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
        },
      },
    );
    result = await result.json();
    setFavorioteLits(result?.body);
  }

  useEffect(() => {
    if (local != null && templateID != null) {
      findFavorite(templateID);
    }
  }, [local]);
  let publishDetail = null;
  if (publishFilter !== undefined) {
    publishDetail = publishFilter[0];
    if (checkDraft && publishDetail) {
      publishDetail.master_template = publishFilter[0]?.masterTemplate;
    }
  }

  let serviceLength = publishDetail?.master_template.services.length;
  return (
    <>
      <div className={styles.viewHeaderWrapper}>
        {/* Header Area */}
        {!checkDraft ? (
          <div className={`${styles.viewHeader} dFlex justifySB alignC`}>
            <div className={`${styles.headerLeft} headerLeft`}>
              <Select
                options={options}
                placeholder=""
                onChange={(e) => {
                  Categories(e.value);
                  setLoader(true);
                  setActiveCat(0);
                  setActiveSubCat(0);
                  localStorage.setItem("templateID", JSON.stringify(e.value));
                  publishedTemplate(e.value);
                  setAbsol(false);
                  setForAboutProperty(e.value);
                  setActive(0);
                }}
                components={{ DropdownIndicator }}
                classNamePrefix="filter"
                value={{
                  label: `${
                    publishFilter ? publishFilter[0]?.master_template.name : ""
                  } . V${publishFilter ? publishFilter[0]?.version : ""}`,
                }}
              />
            </div>
            {publishFilter?.map((item, index) => (
              <div className={`${styles.headerRight}`} key={index}>
                <div className="dFlex alignC">
                  <p className={styles.publishedDetail}>
                    {dayjs(item?.publishedAt).format(
                      "[Published on] M/DD/YYYY [at] h:mm A",
                    )}{" "}
                    by {item?.publishedBy?.first} {item?.publishedBy?.last}
                  </p>
                  {item?.isActive ? (
                    <span className={styles.active}>In use</span>
                  ) : (
                    <span
                      className={styles.publish}
                      onClick={() => republishTheTemplate(item?.templateId)}
                      id="useThisTemplate"
                    >
                      Use this template
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`${styles.viewHeader} dFlex justifySB alignC`}>
            <div className={styles.headerLeft}>
              <h2 className={styles.templateName}>
                Creating a {templateName} v{publishDetail?.version} template
              </h2>
            </div>
            <div className={`${styles.headerRight}`}>
              <span
                className={styles.publish}
                onClick={() => setModal(true)}
                id="publishButton"
              >
                Publish
              </span>
            </div>
          </div>
        )}
        <div className={styles.publishDetailWrapper}>
          {!checkDraft ? (
            <>
              <div className={styles.publishDetail}>
                <div className={styles.label}>Version:</div>
                <div className={styles.value}>{publishDetail?.version}</div>
              </div>
              <div className={styles.publishDetail}>
                <div className={styles.label}>Created by:</div>
                <div className={styles.value}>
                  {publishDetail?.createdBy?.first}{" "}
                  {publishDetail?.createdBy?.last}
                </div>
              </div>
            </>
          ) : (
            <div className={styles.publishDetail}>
              <div className={styles.label}>Created by:</div>
              <div className={styles.value}>
                {publishDetail?.user?.first} {publishDetail?.user?.last}
              </div>
            </div>
          )}
          {publishDetail?.publishedAt && (
            <div className={styles.publishDetail}>
              <div className={styles.label}>Published on:</div>
              <div className={styles.value}>
                {dayjs(publishDetail?.publishedAt).format(
                  "MMM D[,] YYYY [at] h:mm A",
                )}
              </div>
            </div>
          )}
          <div className={styles.publishDetail}>
            <div className={styles.label}>Used for:</div>
            <div className={styles.value}>
              <div className={styles.serviceLink}>{serviceLength} Services</div>
              <div className={styles.serviceList}>
                {publishDetail?.master_template?.services.map(
                  (service, index) => {
                    return `${service.serviceName}${
                      index < serviceLength - 1 && serviceLength > 1 ? ", " : ""
                    }`;
                  },
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.viewContent}>
        {/* Tabbing Section */}
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
                {/* <li onClick={() => setFavoritepopup(true)}>
                  View default remarks
                </li> */}
              </ul>
            )}
          </li>
        </ul>

        {/* Category Content Section */}
        {active == 0 && (
          <div className={styles.contentArea}>
            {!checkDraft ? (
              <CategoryList
                setCatForSub={setCatForSub}
                category={category}
                activeCat={activeCat}
                categoryClick={categoryClick}
                setSelectedCategory={(item) => setSelectedCategory(item)}
                selectedCategory={selectedCategory}
              />
            ) : (
              <CategoryList
                draft
                templateID={templateID}
                categoriesFunc={Categories}
                setCatForSub={setCatForSub}
                category={category}
                activeCat={activeCat}
                setActiveCat={setActiveCat}
                categoryClick={categoryClick}
                toastFunc={toastFunc}
                setToastMessage={setToastMessage}
                setPostCheckChanged={setPostCheckChanged}
                postCheckChanged={postCheckChanged}
              />
            )}
            {category?.length > 0 && !category[activeCat]?.print && (
              <div className={styles.printOffMessage}>
                You have set the {category[activeCat]?.name} category to Not
                Print
              </div>
            )}
            <div className={`${styles.categorySection} dFlex`}>
              <div className={styles.subCategoryColumn}>
                <h3>Subcategories</h3>
                {!checkDraft ? (
                  <SubCategoryList
                    setSubCatForAbout={setSubCatForAbout}
                    subcategories={subcategories}
                    activeSubCat={activeSubCat}
                    subCategoryClick={subCategoryClick}
                  />
                ) : (
                  <SubCategoryList
                    draft
                    templateID={templateID}
                    setSubCatForAbout={setSubCatForAbout}
                    category={category}
                    passingCat={passingCat}
                    subcategories={subcategories}
                    activeSubCat={activeSubCat}
                    setActiveSubCat={setActiveSubCat}
                    subCategoryClick={subCategoryClick}
                    subCategoryFunc={subCategory}
                  />
                )}
              </div>
              <div className={styles.aboutsColumn}>
                <h3>Abouts</h3>
                {!checkDraft ? (
                  <AboutAndNotes
                    subcategories={subcategories}
                    aboutNotes={aboutNotes}
                    subCategoryFunc={subCategory}
                    passingCat={passingCat}
                    passingSubCat={passingSubCat}
                    aboutAndNotesFunc={aboutAndNotes}
                    templateID={templateID}
                  />
                ) : (
                  <AboutAndNotes
                    draft
                    subcategories={subcategories}
                    aboutNotes={aboutNotes}
                    subCategoryFunc={subCategory}
                    passingCat={passingCat}
                    passingSubCat={passingSubCat}
                    aboutAndNotesFunc={aboutAndNotes}
                    templateID={templateID}
                  />
                )}
              </div>
              <div className={` ${styles.remarksColumn} slick-box`}>
                {!checkDraft ? (
                  <Remarks aboutNotes={aboutNotes} />
                ) : (
                  <Remarks
                    aboutNotes={aboutNotes}
                    draft
                    subcategories={subcategories}
                    passingSubCat={passingSubCat}
                    aboutAndNotesFunc={aboutAndNotes}
                    findFavorite={findFavorite}
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {active == 1 && <Location />}

        {active == 2 && <Disclosure />}

        {active == 3 && <Definitions />}

        {active == 4 && <InfographicImages />}

        {/* Loader */}
        {loader && (
          <div className="loader dFlex alignC justifyC">
            <span></span>
          </div>
        )}
      </div>

      {modal && (
        <WarningModal
          heading="Publish the template"
          warning="Are you sure you want to publish this template?"
          btntext="Publish"
          redirect={publishTheTemplate}
          closeFunction={() => setModal(false)}
        />
      )}

      {favoritepopup && (
        <FavouriteRemarkModal
          heading={`Default remarks (${
            favorioteLits
              ? favorioteLits?.length > 0
                ? favorioteLits?.length
                : 0
              : 0
          })`}
          closeFunction={() => setFavoritepopup(false)}
          favoriote={true}
          favorioteLits={favorioteLits}
          findFavorite={findFavorite}
          aboutAndNotesFun={aboutAndNotes}
          passingSubCat={passingSubCat}
          templateID={templateID}
          checkDraft={checkDraft}
          local={local}
        />
      )}

      {toast && (
        <p
          className={`poped-message ${toast ? "active" : ""} ${
            styles.custompop
          }`}
        >
          {toastMessage}
        </p>
      )}
      {redToast && (
        <p
          className={`poped-message red ${redToast ? "active" : ""} ${
            styles.custompop
          }`}
        >
          {toastMessage}
        </p>
      )}
    </>
  );
}
