import React, { useState } from "react";
import styles from "./assignedmodal.module.scss";

export default function AssignedModal({
  type,
  templateCount,
  templateList,
  closeModal,
  searchKey,
  modalLoader,
  functionForSearch,

  accessId,
  handleSelection,
  selectAll,
  unselectAll,
  settingAccess,

  officeTemplates,
  publishedTemplates,
  fetchPublishedTemplate,
  setSelectedOffice,
  settingAccessForOneOffice,
}) {
  const [spAssignmentsModelData, setSpAssignmentsModelData] = useState(null);
  const flattenServiceList = (serviceList) => {
    if (serviceList.length > 0) {
      return serviceList.reduce((accumulator, item, index) => {
        if (index == serviceList.length - 1) {
          return accumulator + item.serviceName;
        } else return accumulator + item.serviceName + ", ";
      }, "");
    }
  };

  return (
    <div className={`${styles.modalAccess} dFlex alignC justifyC`}>
      <div className={styles.access}>
        <div
          className={`${styles.Accessheader} ${
            spAssignmentsModelData ? styles.space : ""
          } dFlex alignC justifySB`}
        >
          <div className={`${styles.titleRow}`}>
            {spAssignmentsModelData && (
              <span
                className={styles.arrowback}
                onClick={() => setSpAssignmentsModelData(null)}
              >
                <img src="/images/back-arrow-white.svg" alt="back-arrow" />
              </span>
            )}
            <h3>
              {spAssignmentsModelData
                ? spAssignmentsModelData?.office?.manager
                : type == "assignment"
                ? "SP Assignment"
                : "Give Access To"}
            </h3>
            <span
              onClick={() => {
                closeModal();
              }}
              className={styles.closeicon}
            >
              <img alt="close icon" src="/images/close.svg" />
            </span>
          </div>

          {/* Search Input */}
          {spAssignmentsModelData ? (
            <p className={styles.keyState}>
              {spAssignmentsModelData?.office?.companyKey},{" "}
              {spAssignmentsModelData?.office?.state}
            </p>
          ) : (
            <div className={styles.titleRow}>
              <div className={styles.searWrapper}>
                <input
                  type="text"
                  className={styles.searchBox}
                  onChange={(e) => functionForSearch(e.target.value)}
                  value={searchKey}
                  placeholder={
                    type == "assignment"
                      ? "Search for a SP, Company Key or a State"
                      : "Search for a SP or a Company Key"
                  }
                />
                <span
                  className={searchKey.length > 0 ? styles.activeSearch : ""}
                  onClick={() => {
                    if (searchKey.length > 0) {
                      functionForSearch("");
                    }
                  }}
                >
                  <img src="/images/cross.svg" />
                </span>
              </div>
              {type == "assignment" ? (
                ""
              ) : (
                <div
                  className={`${styles.selectAll}`}
                  onClick={
                    accessId?.length === templateList.length
                      ? unselectAll
                      : selectAll
                  }
                >
                  {accessId?.length === templateList.length
                    ? "Unselect All"
                    : "Select All"}
                </div>
              )}
            </div>
          )}
        </div>
        {modalLoader ? (
          <div className={styles.loader}>
            <span></span>
          </div>
        ) : templateList?.length > 0 ? (
          <div className={styles.accessContent}>
            {!spAssignmentsModelData && type == "assignment" ? (
              <div className={styles.accessTableHeading}>
                <span>All SPs/Company Keys ({templateList?.length})</span>
                <span>
                  Total Templates -{" "}
                  {
                    templateCount?.filter((item) => item.templates.length > 0)
                      .length
                  }
                </span>
              </div>
            ) : (
              ""
            )}
            <ul className={styles.accessList}>
              {(spAssignmentsModelData && publishedTemplates.length > 0
                ? publishedTemplates
                : templateList
              )?.map((item, index) => (
                <li key={index}>
                  <div className={styles.titlewrap}>
                    <strong>
                      {spAssignmentsModelData
                        ? item?.name
                        : type == "assignment"
                        ? item?.office?.manager
                          ? item?.office?.manager
                          : item?.office?.name
                        : item?.manager
                        ? item?.manager
                        : item?.name}
                    </strong>

                    <div className={styles.spDetails}>
                      {spAssignmentsModelData
                        ? item.services.length > 0
                          ? `${item.services.length} service${
                              item.services.length > 1 ? "s" : ""
                            }: ${flattenServiceList(item.services)}`
                          : ""
                        : type == "assignment"
                        ? item?.office?.companyKey
                        : item?.companyKey}
                      {spAssignmentsModelData ? "" : ","}
                      &nbsp;
                      {spAssignmentsModelData
                        ? ""
                        : type == "assignment"
                        ? item?.office?.state
                        : item?.state}
                    </div>
                  </div>
                  <div>
                    {!spAssignmentsModelData && type == "assignment" ? (
                      <button
                        className={styles.assingedButton}
                        onClick={() => {
                          setSpAssignmentsModelData(item);
                          fetchPublishedTemplate();
                          setSelectedOffice(item.templateData);
                        }}
                      >
                        <strong>{item?.templateData?.length} assigned</strong>
                        <img
                          src="/images/assignedarrow.svg"
                          alt="right arrow"
                        />
                      </button>
                    ) : (
                      <span
                        onClick={() =>
                          handleSelection(
                            spAssignmentsModelData
                              ? item.masterTemplateId
                              : item.officeId,
                          )
                        }
                        className={`${styles.checkbox} ${
                          spAssignmentsModelData
                            ? officeTemplates[item.masterTemplateId] == true
                              ? styles.active
                              : ""
                            : accessId?.includes(item.officeId)
                            ? styles.active
                            : ""
                        }`}
                      />
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className={styles.noResult}>No Result Found</p>
        )}
        {!spAssignmentsModelData && type == "assignment" ? (
          ""
        ) : (
          <div className={`${styles.btnWrapper} dFlex alignC justifySB`}>
            {spAssignmentsModelData ? (
              <p>
                {Object.keys(officeTemplates).reduce((acc, key) => {
                  if (officeTemplates[key] == true) {
                    acc = acc + 1;
                  }
                  return acc;
                }, 0)}
                /{publishedTemplates?.length} templates assigned
              </p>
            ) : (
              <p>{accessId?.length} company key is Selected</p>
            )}
            <button
              className="btn blue-btn"
              onClick={() => {
                if (spAssignmentsModelData) {
                  settingAccessForOneOffice(
                    spAssignmentsModelData?.office?.officeId,
                  );
                } else {
                  settingAccess();
                }
                setTimeout(() => {
                  closeModal();
                }, 500);
              }}
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
