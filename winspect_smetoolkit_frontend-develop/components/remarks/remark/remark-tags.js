import { useEffect, useState } from "react";
import useGenerateStore from "../../../stores/generalStore";
import useRemarkStore from "../../../stores/remarkStore";
import styles from "./remark.module.scss";
import ViewGroupBtn from "./view-group-btn";
import RemarkServices from "../../../api/services/RemarkServices";
import useSubCategoryStore from "../../../stores/subCategoryStore";
import { useRouter } from "next/router";

const RemarkTags = (props) => {
  const router = useRouter();
  const {
    sliderRemark,
    remark,
    frequencyCount,
    frequencyTemplate,
    nearestTemplateRemarkId,
    frequencyData,
    similarRemarkType,
  } = props;
  const [favLoader, setFavLoader] = useState(false);
  const [isFavourite, setIsFavourite] = useState();

  const {
    setShowRemarkUtilization,
    setSelectedRemarkForFrequencies,
    setTemplateFrequency,
    remarkList,
    setRemarkList,
    setShowDeselectDefault,
    setShowAddDefaultPopup,
    setSelectRemarkForDeselect,
  } = useRemarkStore();
  const { subCategoryId } = useSubCategoryStore();
  const { isDraft, isCustom } = useGenerateStore();
  const [usedTimes, setUsedTimes] = useState(0);
  const [usedByTimes, setUsedByTimes] = useState(0);

  const handleTagClick = () => {
    if (frequencyData) {
      setSelectedRemarkForFrequencies(frequencyData);
    } else {
      setSelectedRemarkForFrequencies(remark);
    }
    setTemplateFrequency(frequencyTemplate);
    setShowRemarkUtilization(true);
  };

  const handleDeselectClick = (remark) => {
    setSelectRemarkForDeselect(remark);
    setShowDeselectDefault(true);
  };

  useEffect(() => {
    if (isDraft) {
      setUsedByTimes(
        remark?.oldTemplateRemark?.totalFrequency
          ? remark?.oldTemplateRemark?.totalFrequency
          : 0,
      );
      setUsedTimes(
        remark?.oldTemplateRemark?.template_remark_frequencies?.length
          ? remark?.oldTemplateRemark?.template_remark_frequencies?.length
          : 0,
      );
    } else {
      setUsedByTimes(remark?.totalFrequency);
      setUsedTimes(remark?.template_remark_frequencies?.length);
    }
    setIsFavourite(remark.isFavourite);
  }, [remark]);

  const updateRemark = () => {
    const updatedData = remarkList.map((obj) => {
      if (obj.templateRemarkId == remark.templateRemarkId) {
        return { ...obj, isFavourite: !remark.isFavourite };
      }

      if (
        remark.templateRemarkId ==
        obj.oldTemplateRemark?.template_remark_similarity?.nearestTemplateRemark
          ?.newTemplateRemark?.templateRemarkId
      ) {
        return {
          ...obj,
          oldTemplateRemark: {
            ...obj.oldTemplateRemark,
            template_remark_similarity: {
              ...obj.oldTemplateRemark.template_remark_similarity,
              nearestTemplateRemark: {
                ...obj.oldTemplateRemark.template_remark_similarity
                  .nearestTemplateRemark,
                newTemplateRemark: {
                  ...obj.oldTemplateRemark.template_remark_similarity
                    .nearestTemplateRemark.newTemplateRemark,
                  isFavourite: !remark.isFavourite,
                },
              },
            },
          },
        };
      }
      return obj;
    });
    setRemarkList(updatedData);
  };

  const handleFavClick = async () => {
    setFavLoader(true);
    const data = {
      templateSubCategoryId: subCategoryId,
      remark: remark.remark,
      title: remark.title,
      templateRemarkId: remark.templateRemarkId,
      isFavourite: !remark.isFavourite,
    };
    let result = await RemarkServices.editRemark(data, router, true);
    if (result.status == 200) {
      updateRemark();
    }
    setTimeout(() => {
      setFavLoader(false);
    }, 1000);
  };
  let similarityScore = 0;
  if (isDraft) {
    similarityScore =
      remark.oldTemplateRemark?.template_remark_similarity?.nearestRemarkScore;
    if (similarRemarkType == "Template") {
      similarityScore =
        remark.oldTemplateRemark?.template_remark_similarity
          ?.nearestTemplateScore;
    }
    if (similarityScore == null) {
      similarityScore =
        remark.oldTemplateRemark?.template_remark_similarity
          ?.nearestTemplateScore;
    }
    if (similarityScore == null) {
      similarityScore = remark.nearestScore;
    }
  } else {
    similarityScore = remark.template_remark_similarity?.nearestRemarkScore;
    if (similarRemarkType == "Template") {
      similarityScore =
        remark?.template_remark_similarity?.nearestTemplateScore;
    }
    if (similarityScore == null) {
      similarityScore = remark.template_remark_similarity?.nearestTemplateScore;
    }
    if (similarityScore == null) {
      similarityScore = remark.nearestScore;
    }
  }
  if (similarityScore !== null) {
    similarityScore = similarityScore * 100;
  }
  similarityScore = similarityScore.toFixed(2);
  return (
    <>
      {/* {remark.type !== "Issue" && (
        <div
          onClick={() => (remark.hide ? "" : handleFavClick())}
          className={`${styles.favourite} ${isFavourite ? styles.active : ""}`}
        >
          {favLoader ? (
            <img className={styles.loader} src="/images/loader.webp" />
          ) : isFavourite ? (
            <svg width="12" height="11" viewBox="0 0 12 11" fill="none">
              <path
                d="M11.2152 4.98895C11.3445 4.89267 11.4403 4.75836 11.4894 4.60486C11.5384 4.45135 11.5382 4.28634 11.4887 4.13297C11.4393 3.9796 11.3431 3.84555 11.2136 3.74962C11.0841 3.6537 10.9278 3.6007 10.7667 3.59807L7.63721 3.47985C7.62182 3.47878 7.60707 3.4733 7.59473 3.46404C7.58239 3.45479 7.57299 3.44216 7.56766 3.42769L6.48626 0.506853C6.43192 0.358251 6.33324 0.229936 6.20356 0.139278C6.07389 0.0486202 5.91949 0 5.76126 0C5.60304 0 5.44864 0.0486202 5.31896 0.139278C5.18929 0.229936 5.0906 0.358251 5.03627 0.506853L3.95834 3.43812C3.95301 3.45259 3.94361 3.46522 3.93127 3.47447C3.91894 3.48373 3.90418 3.48922 3.8888 3.49028L0.75933 3.6085C0.598199 3.61113 0.441932 3.66413 0.312439 3.76005C0.182947 3.85598 0.0867235 3.99003 0.0372605 4.1434C-0.0122025 4.29678 -0.0124244 4.46178 0.0366259 4.61529C0.0856761 4.7688 0.181539 4.9031 0.310773 4.99938L2.76567 6.92921C2.77795 6.93888 2.78714 6.95194 2.79208 6.96677C2.79702 6.98161 2.79751 6.99756 2.79348 7.01267L1.94853 10.0065C1.90474 10.159 1.90898 10.3212 1.96068 10.4712C2.01237 10.6211 2.109 10.7515 2.23743 10.8446C2.36586 10.9377 2.51984 10.989 2.67844 10.9915C2.83704 10.9939 2.99255 10.9475 3.12382 10.8584L5.7178 9.11984C5.73058 9.11102 5.74574 9.10629 5.76126 9.10629C5.77679 9.10629 5.79195 9.11102 5.80473 9.11984L8.39871 10.8584C8.5282 10.9505 8.68315 11 8.84205 11C9.00095 11 9.1559 10.9505 9.28539 10.8584C9.41385 10.7662 9.51058 10.6365 9.56226 10.487C9.61394 10.3376 9.61804 10.1758 9.574 10.0239L8.72209 7.01962C8.71757 7.00454 8.71782 6.98843 8.7228 6.9735C8.72778 6.95856 8.73724 6.94553 8.7499 6.93617L11.2152 4.98895Z"
                fill="#005982"
              />
              <path
                d="M11.0658 4.78838L11.0659 4.78846C11.1533 4.72337 11.2181 4.63256 11.2512 4.52877C11.2844 4.42497 11.2843 4.31341 11.2508 4.2097C11.2174 4.106 11.1523 4.01537 11.0647 3.95051C10.9772 3.88565 10.8715 3.84982 10.7626 3.84804L10.7572 3.84795L10.7572 3.84789L7.62777 3.72967L7.61998 3.72937L7.61999 3.72925C7.55651 3.72487 7.49564 3.70223 7.44473 3.66404L7.59473 3.46404L7.44473 3.66404C7.39395 3.62595 7.35523 3.57403 7.33321 3.51449L11.0658 4.78838ZM11.0658 4.78838L11.0603 4.79276L8.597 6.73836L11.0658 4.78838ZM6.25181 0.593654L7.33305 3.51405L8.7228 6.9735L8.48563 6.89443C8.48563 6.89443 8.48563 6.89444 8.48563 6.89444C8.46463 6.95745 8.46335 7.02532 8.48191 7.08902L9.33348 10.0921L9.33389 10.0935C9.36354 10.1958 9.36078 10.3047 9.32599 10.4053C9.29125 10.5058 9.22628 10.593 9.14001 10.6551C9.05294 10.7168 8.94882 10.75 8.84205 10.75C8.73508 10.75 8.63077 10.7167 8.54359 10.6547L8.54365 10.6546L8.5379 10.6508L5.94481 8.91277C5.89069 8.87598 5.82674 8.85629 5.76126 8.85629C5.69578 8.85629 5.63182 8.87598 5.57768 8.9128L2.98463 10.6508L2.98347 10.6515C2.89472 10.7118 2.78957 10.7432 2.68234 10.7415C2.5751 10.7398 2.47099 10.7051 2.38415 10.6422C2.29732 10.5793 2.23198 10.4911 2.19703 10.3897C2.16208 10.2883 2.15921 10.1786 2.18882 10.0755L2.18913 10.0744L3.03408 7.08057L3.03411 7.08058L3.03504 7.07707C3.05166 7.01474 3.04965 6.94891 3.02925 6.88772C3.00885 6.82652 2.97096 6.77265 2.92027 6.73275L2.92017 6.73267L0.465277 4.80284L0.465329 4.80277L0.460126 4.79889C0.372745 4.7338 0.307929 4.64299 0.274764 4.5392C0.241599 4.43541 0.241749 4.32384 0.275193 4.22014L0.0383858 4.14376L0.275193 4.22014C0.308637 4.11643 0.373698 4.0258 0.461252 3.96094C0.548807 3.89608 0.654465 3.86025 0.763412 3.85847L0.763413 3.85853L0.768767 3.85832L3.89824 3.7401L3.89824 3.74022L3.90602 3.73968C3.9695 3.7353 4.03036 3.71266 4.08127 3.67447L4.08128 3.67447C4.13218 3.63629 4.17097 3.5842 4.19295 3.52448L4.19298 3.5244L5.27091 0.593137L5.27107 0.592703C5.3078 0.492227 5.37453 0.405468 5.46221 0.344171C5.54988 0.282874 5.65428 0.25 5.76126 0.25C5.86824 0.25 5.97264 0.282874 6.06032 0.344171C6.148 0.405468 6.21472 0.492227 6.25146 0.592703L6.25181 0.593654Z"
                stroke="#005982"
                strokeOpacity="0.3"
                strokeWidth="0.5"
              />
            </svg>
          ) : (
            <img
              className={styles.favIcon}
              src="/images/blue-star-stroke.png"
            />
          )}
        </div>
      )} */}
      <div
        onClick={() => (remark.hide ? "" : handleTagClick())}
        className={`${styles.tag} ${styles.tagByTime}`}
      >
        Used {frequencyCount ? frequencyCount : usedByTimes} times
      </div>
      {!isCustom && (
        <div
          onClick={() => (remark.hide ? "" : handleTagClick())}
          className={`${styles.tag} ${styles.tagByUser}`}
        >
          Used by {usedTimes} SPs
        </div>
      )}
      {similarityScore !== null && !isNaN(similarityScore) && (
        <div
          onClick={() => (remark.hide ? "" : handleTagClick())}
          className={`${styles.tag} ${styles.similar} similar-tag`}
        >
          {similarityScore}% Similar
        </div>
      )}
      {remark?.remarkType == "Template" && (
        <div className={`${styles.tag} ${styles.template}`}>Template</div>
      )}
      {sliderRemark && remark?.remarkType == "Template" && (
        <ViewGroupBtn
          remark={remark}
          nearestTemplateRemarkId={nearestTemplateRemarkId}
        />
      )}
      {/* {remark.isFavourite && remark.type !== "Issue" && (
        <div
          onClick={() => (remark.hide ? "" : handleDeselectClick(remark))}
          className={`${styles.deselectDefault}`}
        >
          {isCustom ? (
            <div className={styles.includeUserIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="12"
                viewBox="0 0 15 12"
                fill="none"
              >
                <path
                  d="M11.875 4.25V0.5M10 2.375H13.75M10 11.125V10.375C10 9.3249 10 8.79985 9.79564 8.39877C9.61587 8.04596 9.32904 7.75913 8.97623 7.57936C8.57515 7.375 8.0501 7.375 7 7.375H4.25C3.1999 7.375 2.67485 7.375 2.27377 7.57936C1.92096 7.75913 1.63413 8.04596 1.45436 8.39877C1.25 8.79985 1.25 9.3249 1.25 10.375V11.125M7.8125 2.6875C7.8125 3.89562 6.83312 4.875 5.625 4.875C4.41688 4.875 3.4375 3.89562 3.4375 2.6875C3.4375 1.47938 4.41688 0.5 5.625 0.5C6.83312 0.5 7.8125 1.47938 7.8125 2.6875Z"
                  stroke="#2F80ED"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          ) : (
            "   Deselect Default"
          )}
        </div>
      )} */}
    </>
  );
};

export default RemarkTags;
