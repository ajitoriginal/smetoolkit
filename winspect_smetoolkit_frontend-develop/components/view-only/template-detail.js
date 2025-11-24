import { useState, useEffect } from "react";
import styles from "./view-only-content.module.scss";
import dayjs from "dayjs";
import CategoryList from "./category-list";
import SubCategoryList from "./subcategory-list";
import AboutAndNotes from "./about-and-notes";
import Remarks from "./remarks";
import Disclosure from "../disclouser/disclouser";
import Definitions from "../definition/definition";
import Location from "../location/location";
import FavouriteRemarkModal from "../common/modals/favourite-remark";
import TemplateServices from "../../api/services/TemplateServices";
import CategoryServices from "../../api/services/CategoryServices";
import SubcategoryServices from "../../api/services/SubcategoryServices";
import AboutNotesServices from "../../api/services/AboutNotesServices";
import RemarkServices from "../../api/services/RemarkServices";
import PublishDetail from "./publish-detail/publish-detail";
import PublishHeader from "./header/publish-header";
import DraftHeader from "./header/draft-header";
import Tabs from "./tabs/tabs";
import { useRouter } from "next/router";
import { removeTemplateIfLastWord } from "../../utils/utils";
import CopyToPopup from "../copy-to-popup";
import useCopyToStore from "../../stores/copyToStore";
import CategoryCopyToBtnPopup from "../copy-to-popup/category-copy-to-btn-popup";
import { url } from "../../utils/url";
import InfographicImages from "../infographics/infographics";

export default function TemplateDetailComponent(props) {
  const router = useRouter();
  const { template, checkDraft = false, mastertemplate } = props;
  const [loader, setLoader] = useState(true);
  //tabbing action
  const [active, setActive] = useState(0);

  //for getting local values
  const [local, setlocal] = useState();

  const [templateName, setTemplateName] = useState();
  const [templateID, setTemplateID] = useState();
  const [masterTemplateID, setMasterTemplateID] = useState();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [postCheckChanged, setPostCheckChanged] = useState(false);

  const {
    showCopyToPopup,
    selectedCategoriesToCopy,
    setShowCategoryCheckboxes,
    setSelectedSubCategoriesToCopy,
    setSelectedCategoriesToCopy,
    setShowSubCategoryCheckboxes,
    setShowAboutCheckboxes,
    showSubCategoryCheckboxes,
    showAboutCheckboxes,
    setSelectedAboutToCopy,
  } = useCopyToStore();

  useEffect(() => {
    if (template) {
      setTemplateID(template);
      setMasterTemplateID(mastertemplate);
    }
  }, [template]);

  useEffect(() => {
    const isStored = typeof window !== "undefined" && window.localStorage;
    const local = isStored && JSON.parse(localStorage.getItem("userInfo"));
    setlocal(local);
    setShowCategoryCheckboxes(false);
    setShowSubCategoryCheckboxes(false);
    setSelectedSubCategoriesToCopy([]);
    setSelectedCategoriesToCopy([]);
  }, []);

  //for publish template header
  const [publish, setPublish] = useState();
  const [publishFilter, setPublishFilter] = useState();
  async function publishedTemplate(id) {
    let result = await TemplateServices.getMasterTemplateDetail(
      masterTemplateID,
      router,
    );
    setPublish(result?.body);
    let resultFilter = result?.body?.filter((item) => item?.templateId == id);
    setPublishFilter(resultFilter);
  }

  const [tabState, setTabState] = useState(null);
  async function getTemplateDetail(templateID) {
    let result = await TemplateServices.getTemplateDetail(templateID, router);
    setTemplateName(
      removeTemplateIfLastWord(result?.body?.masterTemplate.name),
    );
    if (checkDraft) {
      setPublish([result?.body]);
      setPublishFilter([result?.body]);
    }
    if (result?.status == 200) {
      // setRequireAttachment(requireAttachment);
      let data = {
        tableofContent: result.body.hasToc,
        location: result.body.hasLocation,
        disclouser: result.body.hasDisclosure,
        definition: result.body.hasDefinition,
        attachment: result.body.requireAttachment,
      };
      setTabState({ ...data });
    }
  }

  //for category
  const [activeCat, setActiveCat] = useState(0);
  const [category, setCategory] = useState([]);
  async function Categories(templateID) {
    const { category } = router.query;
    let result = await CategoryServices.getCategories(templateID, router);
    setCategory(result?.body);
    if (result?.body?.length > 0) {
      let categoryObj;
      if (category) {
        categoryObj = result?.body.find(
          (obj) => obj.templateCategoryId === category,
        );
        const index = result?.body.findIndex(
          (obj) => obj.templateCategoryId === category,
        );
        setActiveCat(index);
      } else {
        categoryObj = result?.body[0];
      }
      subCategory(categoryObj?.templateCategoryId);
      setPassingCat(categoryObj?.templateCategoryId);
    } else {
      setLoader(false);
    }
  }

  useEffect(() => {
    if (local && templateID) {
      Categories(templateID);
      getTemplateDetail(templateID);
      if (!checkDraft) {
        findFavorite(templateID);
        publishedTemplate(templateID);
      }
    }
  }, [local, templateID]);

  const categoryClick = (id, index) => {
    subCategory(id);
    setActiveCat(index);
    setActiveSubCat(0);
    setLoader(true);
    const remarkUrl = `${
      checkDraft ? url.draftTemplates : url.publishTemplates
    }/${mastertemplate}/${template}?category=${id}`;

    router.push(remarkUrl);
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
  async function subCategory(categoryId) {
    const { subcategory } = router.query;
    let result = await SubcategoryServices.getSubcategories(categoryId, router);
    setSubcategories(result?.body);
    let subcategogyObj;
    if (subcategory) {
      subcategogyObj = result?.body.find(
        (obj) => obj.templateSubCategoryId === subcategory,
      );
      const index = result?.body.findIndex(
        (obj) => obj.templateSubCategoryId === subcategory,
      );
      setActiveSubCat(index);
      aboutAndNotes(subcategory);
      setPassingSubCat(subcategory);
    } else {
      subcategogyObj = result?.body[0];
    }
    aboutAndNotes(subcategogyObj?.templateSubCategoryId);
    setPassingSubCat(subcategogyObj?.templateSubCategoryId);
  }
  const subCategoryClick = (id, index) => {
    aboutAndNotes(id);
    setActiveSubCat(index);
    setLoader(true);
    const remarkUrl = `${
      checkDraft ? url.draftTemplates : url.publishTemplates
    }/${mastertemplate}/${template}?category=${passingCat}&subcategory=${id}`;
    router.push(remarkUrl);
  };

  //for about and note category
  const [aboutNotes, setAboutNotes] = useState();

  async function aboutAndNotes(subcategoryId) {
    let result = await AboutNotesServices.getAboutNotes(subcategoryId, router);
    setAboutNotes(result?.body);
    setLoader(false);
  }

  const [favoritepopup, setFavoritepopup] = useState(false);
  const [favorioteLits, setFavorioteLits] = useState();
  async function findFavorite(templateId) {
    let result = await RemarkServices.getFavouriteRemarks(templateId, router);
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

  return (
    <>
      <div className={styles.viewHeaderWrapper}>
        {/* Header Area */}
        {!checkDraft ? (
          <PublishHeader
            publishFilter={publishFilter}
            publish={publish}
            Categories={Categories}
            setLoader={setLoader}
            setActiveCat={setActiveCat}
            setActiveSubCat={setActiveSubCat}
            publishedTemplate={publishedTemplate}
            setActive={setActive}
            masterTemplateID={masterTemplateID}
            isActive={publishDetail?.isActive}
          />
        ) : (
          <DraftHeader
            publishDetail={publishDetail}
            templateName={templateName}
            setLoader={setLoader}
            templateID={templateID}
          />
        )}
        <div className={styles.publishDetailWrapper}>
          {!checkDraft && (
            <PublishDetail label="Version" value={publishDetail?.version} />
          )}
          <PublishDetail
            label="Created by"
            value={
              !checkDraft
                ? `${publishDetail?.createdBy?.first} 
                  ${publishDetail?.createdBy?.last}`
                : `${publishDetail?.user?.first} ${publishDetail?.user?.last}`
            }
          />

          {publishDetail?.publishedAt && (
            <PublishDetail
              label="Published on"
              value={dayjs(publishDetail?.publishedAt).format(
                "MMM D[,] YYYY [at] h:mm A",
              )}
            />
          )}
          <PublishDetail
            label="Used for"
            services={publishDetail?.master_template?.services}
          />
        </div>
      </div>
      <div className={styles.viewContent}>
        {/* Tabbing Section */}
        <Tabs
          active={active}
          setActive={setActive}
          tabState={tabState}
          checkDraft={checkDraft}
          templateID={templateID}
          setFavoritepopup={setFavoritepopup}
        />

        {/* Category Content Section */}
        {active == 0 && (
          <div className={styles.contentArea}>
            <CategoryList
              draft={checkDraft}
              templateID={templateID}
              categoriesFunc={Categories}
              setCatForSub={setCatForSub}
              category={category}
              activeCat={activeCat}
              setActiveCat={setActiveCat}
              categoryClick={categoryClick}
              setPostCheckChanged={setPostCheckChanged}
              postCheckChanged={postCheckChanged}
              setSelectedCategory={(item) => setSelectedCategory(item)}
              selectedCategory={selectedCategory}
            />

            {category?.length > 0 && !category[activeCat]?.print && (
              <div className={styles.printOffMessage}>
                You have set the {category[activeCat]?.name} category to Not
                Print
              </div>
            )}
            <div className={`${styles.categorySection} dFlex`}>
              <div className={styles.subCategoryColumn}>
                <div className={styles.titleWrapper}>
                  <h3>Subcategories</h3>
                  {!checkDraft &&
                    (showSubCategoryCheckboxes ? (
                      <div
                        className={styles.selectLink}
                        onClick={() => {
                          setShowSubCategoryCheckboxes(false);
                          setSelectedSubCategoriesToCopy([]);
                        }}
                      >
                        Cancel
                      </div>
                    ) : (
                      <div
                        className={styles.selectLink}
                        onClick={() => setShowSubCategoryCheckboxes(true)}
                      >
                        Select
                      </div>
                    ))}
                </div>
                <SubCategoryList
                  draft={checkDraft}
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
              </div>
              <div className={styles.aboutsColumn}>
                <div className={styles.titleWrapper}>
                  <h3>Abouts</h3>
                  {!checkDraft &&
                    (showAboutCheckboxes ? (
                      <div
                        className={styles.selectLink}
                        onClick={() => {
                          setShowAboutCheckboxes(false);
                          setSelectedAboutToCopy([]);
                        }}
                      >
                        Cancel
                      </div>
                    ) : (
                      <div
                        className={styles.selectLink}
                        onClick={() => setShowAboutCheckboxes(true)}
                      >
                        Select
                      </div>
                    ))}
                </div>
                <AboutAndNotes
                  draft={checkDraft}
                  subcategories={subcategories}
                  aboutNotes={aboutNotes}
                  subCategoryFunc={subCategory}
                  passingCat={passingCat}
                  passingSubCat={passingSubCat}
                  aboutAndNotesFunc={aboutAndNotes}
                  templateID={templateID}
                />
              </div>
              <div className={` ${styles.remarksColumn} slick-box`}>
                <Remarks
                  aboutNotes={aboutNotes}
                  draft={checkDraft}
                  passingCat={passingCat}
                  subcategories={subcategories}
                  passingSubCat={passingSubCat}
                  aboutAndNotesFunc={aboutAndNotes}
                  findFavorite={findFavorite}
                />
              </div>
            </div>
          </div>
        )}

        {active == 1 && <Location templateID={templateID} draft={checkDraft} />}

        {active == 2 && (
          <Disclosure templateID={templateID} draft={checkDraft} />
        )}

        {active == 3 && (
          <Definitions templateID={templateID} draft={checkDraft} />
        )}

        {active == 4 && (
          <InfographicImages
            templateID={templateID}
            templateName={templateName}
          />
        )}

        {/* Loader */}
        {loader && (
          <div className="loader dFlex alignC justifyC">
            <span></span>
          </div>
        )}
      </div>

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
      {showCopyToPopup && <CopyToPopup />}
      {selectedCategoriesToCopy.length > 0 && <CategoryCopyToBtnPopup />}
    </>
  );
}
