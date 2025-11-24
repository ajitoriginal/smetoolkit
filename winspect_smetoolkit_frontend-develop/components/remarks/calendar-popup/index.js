import styles from "./index.module.scss";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { useState } from "react";
import { addDays } from "date-fns";
import useFilterStore from "../../../stores/filterStore";
import PrimaryButton from "../../../atoms/primary-button";
import SecondaryButton from "../../../atoms/secondary-button";
import dayjs from "dayjs";
import { formateTime } from "../../../utils/utils";
const CalendarPopup = () => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const { showCalendar, setShowCalendar, setDateRange } = useFilterStore();

  const handleApplyClick = () => {
    setDateRange({
      startDate: formateTime(state[0]?.startDate),
      endDate: formateTime(state[0]?.endDate),
    });
    setShowCalendar(false);
  };

  if (showCalendar) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.popup}>
          <DateRangePicker
            onChange={(item) => setState([item.selection])}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={state}
            direction="horizontal"
            showDateDisplay={false}
            maxDate={new Date()}
          />
          <div className={styles.bottom}>
            <div className={styles.dateWrapper}>
              <div className={styles.date}>
                {dayjs(state[0]?.startDate).format("MMM D[,] YYYY")}
              </div>
              <div className={styles.separator}>–</div>
              <div className={styles.date}>
                {dayjs(state[0]?.endDate).format("MMM D[,] YYYY")}
              </div>
            </div>
            <div className={styles.buttonWrapper}>
              <SecondaryButton
                onClick={() => setShowCalendar(false)}
                text="Cancel"
              />
              <PrimaryButton onClick={handleApplyClick} text="Apply" />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default CalendarPopup;
