import { useEffect, useState } from "react";
import useRemarkStore from "../../../stores/remarkStore";
import styles from "./remarkUtilizationPopup.module.scss";
import dayjs from "dayjs";
import useGenerateStore from "../../../stores/generalStore";

const RemarkUtilizationPopup = () => {
  const {
    setShowRemarkUtilization,
    showRemarkUtilization,
    selectedRemarkForFrequencies,
    templateFrequency,
  } = useRemarkStore();
  const { isDraft } = useGenerateStore();
  const [companyList, setCompanyList] = useState("");

  useEffect(() => {
    if (isDraft) {
      if (selectedRemarkForFrequencies?.oldTemplateRemark) {
        setCompanyList(
          selectedRemarkForFrequencies.oldTemplateRemark
            ?.template_remark_frequencies,
        );
      } else {
        setCompanyList(selectedRemarkForFrequencies);
      }
    } else {
      setCompanyList(selectedRemarkForFrequencies?.template_remark_frequencies);
    }
  }, [selectedRemarkForFrequencies]);

  useEffect(() => {
    if (templateFrequency !== null) {
      setCompanyList(templateFrequency);
    }
  }, [templateFrequency]);

  if (showRemarkUtilization) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>Remark Utilisation</div>
          <div
            onClick={() => {
              setShowRemarkUtilization(false);
            }}
            className={styles.close}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M13 1L1 13M1 1L13 13"
                stroke="white"
                strokeWidth="1.67"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <div className={styles.contentWrapper}>
          <h2>{selectedRemarkForFrequencies.title}</h2>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{
              __html: selectedRemarkForFrequencies.remark,
            }}
          />
          <div className={styles.lastUpdated}>
            Last updated:{" "}
            {dayjs(selectedRemarkForFrequencies.updatedAt).format(
              "MMM D[,] YYYY [at] h:mm A",
            )}
          </div>
          {companyList?.length > 0 && (
            <div className={styles.tableWrapper}>
              <table>
                <tr>
                  <th>Inspector Name</th>
                  <th>Company Key</th>
                  <th>Frequency</th>
                </tr>
                {companyList.map((item, index) => {
                  const { name, companyKey, manager } = item.office;
                  return (
                    <tr key={index}>
                      <td>{manager !== "" ? manager : "WIN SP"}</td>
                      <td className={styles.companykey}>CK: {companyKey}</td>
                      <td>
                        <div className={styles.tag}>{item.frequency} times</div>
                      </td>
                    </tr>
                  );
                })}
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default RemarkUtilizationPopup;
