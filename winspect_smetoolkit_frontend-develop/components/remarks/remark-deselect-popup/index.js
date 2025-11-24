import { useEffect, useRef, useState } from "react";
import useRemarkStore from "../../../stores/remarkStore";
import styles from "./remarkDeselect.module.scss";
import dayjs from "dayjs";
import Checkbox from "../../../atoms/checkbox";
import RemarkServices from "../../../api/services/RemarkServices";
import useGenerateStore from "../../../stores/generalStore";

const RemarkDeselectPopup = () => {
  const {
    showDeselectDefautl,
    setShowDeselectDefault,
    selectRemarkForDeselect,
    setSelectRemarkForDeselect,
  } = useRemarkStore();
  const { isCustom } = useGenerateStore();

  // Initialize state for the deselect object and search term
  const [deselectObject, setDeselectObject] = useState([]);
  const [selectedInspectors, setSelectedInspectors] = useState([]);
  const [allInspectors, setAllInspectors] = useState([]);
  const [filteredInspectors, setFilteredInspectors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loader, setLoader] = useState(true);
  // Reference for the popup to detect outside clicks
  const popupRef = useRef(null);
  useEffect(() => {
    if (selectRemarkForDeselect) {
      getDeselectDefaultInspectors(selectRemarkForDeselect);
    }
  }, [selectRemarkForDeselect]);

  // Debounced search effect
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (searchTerm.trim()) {
        // Filter inspectors based on the search term
        const filtered = allInspectors.filter(
          (inspector) =>
            inspector.manager
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            inspector.companyKey
              .toLowerCase()
              .includes(searchTerm.toLowerCase()),
        );
        setFilteredInspectors(filtered);
      } else {
        // If no search term, show all inspectors
        setFilteredInspectors(allInspectors);
      }
    }, 300); // 300ms debounce time

    return () => clearTimeout(debounceTimeout); // Clear timeout if searchTerm changes
  }, [searchTerm, allInspectors]);

  // Get the default inspectors for the selected remark
  const getDeselectDefaultInspectors = async (remark) => {
    setLoader(true);
    const data = {
      templateRemarkId: remark.templateRemarkId,
      templateSubCategoryId: remark.templateSubCategoryId,
    };
    let result = await RemarkServices.getOfficeList(data);
    if (result.status == 200) {
      setAllInspectors(result.body);
      // Extract officeId values from office_excluded_remarks
      const officeIdsFromRemarks = result.body.flatMap((item) =>
        item[isCustom ? "office_included_remarks" : "office_excluded_remarks"]
          // item.office_excluded_remarks
          ?.map((remark) => remark.officeId),
      );

      setSelectedInspectors([...officeIdsFromRemarks]);
    }
    setLoader(false);
  };

  // Set the deselect default inspectors
  const updateInspectorList = async (officeIds) => {
    setLoader(true);
    const data = {
      officeIds,
      templateRemarkId: selectRemarkForDeselect.templateRemarkId,
      templateSubCategoryId: selectRemarkForDeselect.templateSubCategoryId,
    };

    await RemarkServices.setOfficeRemarkList(data);
    setLoader(false);
  };

  // Handle the checkbox change
  const handleCheckboxChange = (id) => {
    let selectedList = selectedInspectors;
    if (selectedList.includes(id)) {
      selectedList = selectedList.filter((item) => item !== id);
    } else {
      selectedList.push(id);
    }
    updateInspectorList(selectedList);
    setSelectedInspectors([...selectedList]);
  };

  // Handle outside click to close popup
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) && // Detect click outside popupRef
        !event.target.closest(`.Toastify`)
      ) {
        setShowDeselectDefault(false);
        setSelectRemarkForDeselect(null);
        setSelectedInspectors([]);
      }
    };

    if (showDeselectDefautl) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDeselectDefautl, setShowDeselectDefault, setSelectRemarkForDeselect]);

  if (showDeselectDefautl) {
    return (
      <div className={styles.wrapper} ref={popupRef}>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>
            {isCustom ? "Add Default Office" : "Deselect Default Office"}
          </div>
          <div
            onClick={() => {
              setShowDeselectDefault(false);
              setSelectRemarkForDeselect(null);
              setSelectedInspectors([]);
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
          <h2>{selectRemarkForDeselect.title}</h2>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{
              __html: selectRemarkForDeselect.remark,
            }}
          />
          <div className={styles.lastUpdated}>
            Last updated:{" "}
            {dayjs(selectRemarkForDeselect.updatedAt).format(
              "MMM D[,] YYYY [at] h:mm A",
            )}
          </div>
          <div className={styles.searchBox}>
            <input
              type="search"
              placeholder="Search inspectors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {loader ? (
            <div className={styles.loaderText}>Please wait...</div>
          ) : filteredInspectors?.length > 0 ? (
            <div className={styles.tableWrapper}>
              <table>
                <thead>
                  <tr>
                    <th>SP Name</th>
                    <th>Office Key</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInspectors.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.manager}</td>
                        <td>
                          <span className={styles.cKeyStyle}>
                            {item.companyKey}
                          </span>
                        </td>
                        <td>
                          <Checkbox
                            checked={selectedInspectors.includes(item.officeId)}
                            onChange={() => handleCheckboxChange(item.officeId)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className={styles.noData}>No inspectors found</div>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default RemarkDeselectPopup;
