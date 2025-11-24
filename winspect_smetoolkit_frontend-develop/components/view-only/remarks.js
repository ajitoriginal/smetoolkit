import styles from "./remarks.module.scss";
import RemarkInner from "./remark-inner";
import { useEffect, useState } from "react";
import Link from "next/link";
import { url } from "../../utils/url";
import { useRouter } from "next/router";
import useCopyToStore from "../../stores/copyToStore";
import CopyCountItemWrapper from "../copy-count-item-wrapper";
export default function Remarks({
  aboutNotes,
  subcategories,
  draft,
  passingSubCat,
  aboutAndNotesFunc,
  findFavorite,
  passingCat,
}) {
  const router = useRouter();
  const { mastertemplate, template } = router.query;
  //filter remark on the basis of type
  const issue = aboutNotes?.remarks?.filter((item) => {
    return item.type == "Issue";
  });
  const functional = aboutNotes?.remarks?.filter((item) => {
    return item.type == "Functional";
  });
  const informational = aboutNotes?.remarks?.filter((item) => {
    return item.type == "Informational";
  });
  const limitation = aboutNotes?.remarks?.filter((item) => {
    return item.type == "Limitation";
  });
  const notinspected = aboutNotes?.remarks?.filter((item) => {
    return item.type == "Not Inspected";
  });

  const remarkUrl = `${
    draft ? url.draftTemplates : url.publishTemplates
  }/${mastertemplate}/${template}/remarks?category=${passingCat}&subcategory=${passingSubCat}`;

  const [active, setActive] = useState(0);
  const [favoriteUpdated, setFavoriteUpdated] = useState(false);
  const [favoritesLimitReached, setFavoritesLimitReached] = useState(false);

  const [remarkAdd, setRemarkAdd] = useState(false);
  const handleAdd = (value) => {
    setRemarkAdd(value);
  };

  const typesRemark = [
    "Functional",
    "Issue",
    "Informational",
    "Limitation",
    "Not Inspected",
  ];

  const favoriteRemarksLimit = (data) => {
    const favLength = data?.filter((x) => x.isFavourite === true)?.length;
    if (favLength >= 8) {
      setFavoritesLimitReached(true);
    } else {
      setFavoritesLimitReached(false);
    }
  };

  useEffect(() => {
    favoriteRemarksLimit(aboutNotes?.remarks);
  }, [aboutNotes?.remarks, favoriteUpdated]);

  const {
    setShowRemarkCheckboxes,
    setShowCopyToPopup,
    setCopyTo,
    selectedRemarkToCopy,
    setSelectedRemarkToCopy,
    showRemarkCheckboxes,
  } = useCopyToStore();

  const handleCopyTo = () => {
    setShowCopyToPopup(true);
    setCopyTo("remark");
  };

  return (
    <div className={`${styles.slideWrapper}`}>
      <div className={`${styles.slideHeader} dFlex alignC justifySB`}>
        <div className={styles.titleWrapper}>
          <h3>Remarks</h3>
          {/* <div className={styles.copyRemarkLink}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <g clip-path="url(#clip0_171_2535)">
                <path
                  d="M3.33398 10.0007C2.71273 10.0007 2.4021 10.0007 2.15707 9.89916C1.83037 9.76383 1.5708 9.50427 1.43548 9.17756C1.33398 8.93253 1.33398 8.62191 1.33398 8.00065V3.46732C1.33398 2.72058 1.33398 2.34721 1.47931 2.062C1.60714 1.81111 1.81111 1.60714 2.062 1.47931C2.34721 1.33398 2.72058 1.33398 3.46732 1.33398H8.00065C8.62191 1.33398 8.93253 1.33398 9.17756 1.43548C9.50427 1.5708 9.76383 1.83037 9.89916 2.15707C10.0007 2.4021 10.0007 2.71273 10.0007 3.33398M8.13398 14.6673H12.534C13.2807 14.6673 13.6541 14.6673 13.9393 14.522C14.1902 14.3942 14.3942 14.1902 14.522 13.9393C14.6673 13.6541 14.6673 13.2807 14.6673 12.534V8.13398C14.6673 7.38725 14.6673 7.01388 14.522 6.72866C14.3942 6.47778 14.1902 6.27381 13.9393 6.14598C13.6541 6.00065 13.2807 6.00065 12.534 6.00065H8.13398C7.38725 6.00065 7.01388 6.00065 6.72866 6.14598C6.47778 6.27381 6.27381 6.47778 6.14598 6.72866C6.00065 7.01388 6.00065 7.38725 6.00065 8.13398V12.534C6.00065 13.2807 6.00065 13.6541 6.14598 13.9393C6.27381 14.1902 6.47778 14.3942 6.72866 14.522C7.01388 14.6673 7.38725 14.6673 8.13398 14.6673Z"
                  stroke="#2F80ED"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_171_2535">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Copy Remarks
          </div> */}
        </div>
        {!draft &&
          (showRemarkCheckboxes ? (
            <div
              onClick={() => {
                setShowRemarkCheckboxes(false);
                setSelectedRemarkToCopy([]);
              }}
              className={styles.selectLink}
            >
              Cancel
            </div>
          ) : (
            <div
              onClick={() => setShowRemarkCheckboxes(true)}
              className={styles.selectLink}
            >
              Select
            </div>
          ))}
        {subcategories?.length > 0 && (
          <Link href={remarkUrl} className={styles.expand}>
            <img src="/images/expand.svg" alt="expand" />
          </Link>
        )}
      </div>

      <CopyCountItemWrapper
        itemsLength={selectedRemarkToCopy?.length}
        setItems={setSelectedRemarkToCopy}
        handleCopyTo={handleCopyTo}
      />

      <ul className={`${styles.tabbing} dFlex`}>
        {typesRemark?.map((item, index) => (
          <li
            key={index}
            className={`${active == index ? styles.active : ""}`}
            onClick={() => {
              setActive(index);
            }}
          >
            {item}
          </li>
        ))}
      </ul>

      <div className={`bgBox ${styles.sliderBox}`}>
        {active == 0 && (
          <div className={styles.slide}>
            <RemarkInner
              draft={draft}
              remark={functional}
              subcategories={subcategories}
              findFavorite={findFavorite}
              handleAdd={handleAdd}
              aboutAndNotesFunc={aboutAndNotesFunc}
              passingSubCat={passingSubCat}
              type="Functional"
              favoritesLimitReached={favoritesLimitReached}
              setFavoriteUpdated={setFavoriteUpdated}
            />
          </div>
        )}
        {active == 1 && (
          <div className={styles.slide}>
            <RemarkInner
              draft={draft}
              remark={issue}
              subcategories={subcategories}
              findFavorite={findFavorite}
              handleAdd={handleAdd}
              aboutAndNotesFunc={aboutAndNotesFunc}
              passingSubCat={passingSubCat}
              type="Issue"
              favoritesLimitReached={favoritesLimitReached}
              setFavoriteUpdated={setFavoriteUpdated}
            />
          </div>
        )}
        {active == 2 && (
          <div className={styles.slide}>
            <RemarkInner
              draft={draft}
              remark={informational}
              subcategories={subcategories}
              findFavorite={findFavorite}
              handleAdd={handleAdd}
              aboutAndNotesFunc={aboutAndNotesFunc}
              passingSubCat={passingSubCat}
              type="Informational"
              favoritesLimitReached={favoritesLimitReached}
              setFavoriteUpdated={setFavoriteUpdated}
            />
          </div>
        )}
        {active == 3 && (
          <div className={styles.slide}>
            <RemarkInner
              draft={draft}
              remark={limitation}
              subcategories={subcategories}
              findFavorite={findFavorite}
              handleAdd={handleAdd}
              aboutAndNotesFunc={aboutAndNotesFunc}
              passingSubCat={passingSubCat}
              type="Limitation"
              favoritesLimitReached={favoritesLimitReached}
              setFavoriteUpdated={setFavoriteUpdated}
            />
          </div>
        )}
        {active == 4 && (
          <div className={styles.slide}>
            <RemarkInner
              draft={draft}
              remark={notinspected}
              subcategories={subcategories}
              findFavorite={findFavorite}
              handleAdd={handleAdd}
              aboutAndNotesFunc={aboutAndNotesFunc}
              passingSubCat={passingSubCat}
              type="Not Inspected"
              favoritesLimitReached={favoritesLimitReached}
              setFavoriteUpdated={setFavoriteUpdated}
            />
          </div>
        )}
      </div>
    </div>
  );
}
