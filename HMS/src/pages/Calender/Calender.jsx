import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import styles from "src/style/Calender.module.css";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const Calendar = ({ dateSelected, setDate }) => {
  
  const [startDate, setStartDate] = useState(dayjs().startOf("day"));
  const parsedDate = dateSelected ? dayjs.utc(dateSelected) : dayjs();
  const [selectedDate, setSelectedDate] = useState(parsedDate);

  const days = Array.from({ length: 7 }, (_, i) => startDate.add(i, "day"));

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setDate(date.format("YYYY-MM-DD"));
  };
  const handlePrevWeek = () => {
    setStartDate((prev) => prev.subtract(7, "day"));
  };

  const handleNextWeek = () => {
    setStartDate((prev) => prev.add(7, "day"));
  };
  useEffect(() => {
    if (dateSelected) {
      setSelectedDate(dayjs.utc(dateSelected));
    }
    setDate(parsedDate.format("YYYY-MM-DD"));
  }, [dateSelected]);

  return (
    <div className={styles.calendar}>
      <div className={styles.navButtons}>
        <button onClick={handlePrevWeek} className={styles.navButton}>
          ◀
        </button>
        <button onClick={handleNextWeek} className={styles.navButton}>
          ▶
        </button>
      </div>

      {days.map((date) => {
        const isSelected =
          date.format("YYYY-MM-DD") === selectedDate.format("YYYY-MM-DD");
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
