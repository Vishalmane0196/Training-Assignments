import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import styles from "src/style/Calender.module.css";

const Calendar = ({ setDate }) => {
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );

  const today = dayjs();
  const days = Array.from({ length: 7 }, (_, i) => today.add(i, "day"));

  const handleSelectDate = (date) => {
    setSelectedDate(date.format("YYYY-MM-DD"));
    setDate(date.format("YYYY-MM-DD"));
  };

  useEffect(() => {
    setDate(dayjs().format("YYYY-MM-DD"));
  }, []);

  return (
    <div className={styles.calendar}>
      {days.map((date) => {
        const isSelected = date.isSame(selectedDate, "day");
        return (
          <div
            key={date.format("YYYY-MM-DD")}
            className={`${styles.day} ${isSelected ? styles.selected : ""}`}
            onClick={() => handleSelectDate(date)}
          >
            <span className={styles.dayName}>{date.format("ddd")}</span>
            <span className={styles.dayNumber}>{date.format("DD")}</span>
            <span className={styles.month}>{date.format("MMM")}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Calendar;
