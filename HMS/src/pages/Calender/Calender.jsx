import React, { useState } from "react";
import dayjs from "dayjs";
import styles from "src/style/Calender.module.css";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());


const today = dayjs();
const days = Array.from({ length: 7 }, (_, i) => today.add(i, "day"));

  const handleSelectDate = (date) => {
    console.log("date",date)
    setSelectedDate(date);
  };

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
