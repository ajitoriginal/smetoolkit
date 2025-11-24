import styles from "./filter.module.scss";
import Select from "react-select";
import DropdownIndicator from "../../common/dropdown-indicator";
import useFilterStore from "../../../stores/filterStore";
import { addDays } from "date-fns";
import { formateTime } from "../../../utils/utils";

const DateFilter = () => {
  const options = [
    { label: "Any time", value: "" },
    { label: "Last 30 Days", value: "last-30-days" },
    { label: "30 - 60 Days", value: "30-60-days" },
    { label: "Last 3 months", value: "last-3-months" },
    { label: "Range...", value: "range" },
  ];

  const formatOptionLabel = ({ label }) => {
    return (
      <div className={`${styles.optionWrapper} optionWrapper`}>
        <div className={styles.templateName}>{label}</div>
      </div>
    );
  };

  const setDates = (key) => {
    switch (key) {
      case "":
        setDateRange({
          startDate: null,
          endDate: null,
        });
        break;
      case "last-30-days":
        setDateRange({
          startDate: formateTime(addDays(new Date(), -30)),
          endDate: formateTime(new Date()),
        });
        break;

      case "30-60-days":
        setDateRange({
          startDate: formateTime(addDays(new Date(), -60)),
          endDate: formateTime(addDays(new Date(), -30)),
        });
        break;

      case "last-3-months":
        setDateRange({
          startDate: formateTime(addDays(new Date(), -90)),
          endDate: formateTime(new Date()),
        });
        break;

      default:
        break;
    }
  };
  const { setShowCalendar, setDateRange, dateOption, setDateOption } =
    useFilterStore();
  const handleChange = (e) => {
    setDateOption({ label: e.label });
    if (e.value == "range") {
      setShowCalendar(true);
    } else {
      setDates(e.value);
    }
  };
  return (
    <div className={`${styles.selectWrapper} remark-filter`}>
      <Select
        placeholder="Date"
        options={options}
        formatOptionLabel={formatOptionLabel}
        components={{ DropdownIndicator }}
        name="templateId"
        value={dateOption}
        onChange={handleChange}
      />
    </div>
  );
};

export default DateFilter;
