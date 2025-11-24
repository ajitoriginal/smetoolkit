import styles from "./filter.module.scss";
import Select from "react-select";
import DropdownIndicator from "../../common/dropdown-indicator";
import useFilterStore from "../../../stores/filterStore";
import RemarkServices from "../../../api/services/RemarkServices";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { compile } from "sass";

const AddedByFilter = () => {
  const [inspectors, setInspectors] = useState();
  const [options, setOptions] = useState();

  const router = useRouter();
  const { template } = router.query;

  const {
    setCustomRemarkAuthors,
    setAddedByOption,
    addedByOption,
    customRemarkAuthors,
  } = useFilterStore();

  const getCompanyList = async () => {
    let result = await RemarkServices.getCustomRemarkAuthorList(template);
    // let result = await RemarkServices.getCompanyList(template);
    setInspectors(result.body);
  };

  const formatOptionLabel = ({ value, label }) => {
    return (
      <div className={`${styles.optionWrapper} optionWrapper`}>
        <div className={styles.templateName}>{label}</div>
      </div>
    );
  };

  useEffect(() => {
    if (template) {
      getCompanyList();
    }
  }, [template]);

  useEffect(() => {
    const optionList = [];

    if (inspectors?.length > 0) {
      inspectors.map((inspector) => {
        optionList.push({
          label: inspector.displayName,
          value: inspector,
        });
      });
      setOptions(optionList);
    }
  }, [inspectors]);

  const handleChange = (e) => {
    let ids = "";
    e.map((item, index) => {
      ids += `${item.value.userId}${
        e.length > 1 && index < e.length - 1 ? "," : ""
      }`;
    });
    setAddedByOption(e);
    setCustomRemarkAuthors(ids);
  };
  return (
    <div className={`${styles.selectWrapper} remark-filter`}>
      <span className={styles.dropdownLabel}>Added by: </span>
      <Select
        placeholder="None"
        options={options}
        formatOptionLabel={formatOptionLabel}
        components={{ DropdownIndicator }}
        isMulti
        name="templateId"
        onChange={handleChange}
        value={addedByOption}
      />
    </div>
  );
};

export default AddedByFilter;
