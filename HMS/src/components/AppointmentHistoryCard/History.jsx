import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAppointmentId } from "src/redux/slices/appointment/bookSlice";
import styles from "src/style/HistoryCard.module.css";

const History = ({ obj }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const date = new Date(obj.appointment_date);
  const options = { month: "long" };
  const handleRescheduleBooking = (id) => {
    dispatch(setAppointmentId(id));
  };
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.sellerName}>{`Dr.${obj.doctorName}`}</h2>
        <span className={styles.location}>
          <span className={styles.dot}></span> {obj.status}
        </span>
      </div>
      <div className={styles.subdata}>
        <span>
          {new Date(obj.appointment_date).toISOString().split("T")[0]}
        </span>{" "}
        · <span>{obj.appointment_time}</span>
      </div>
      <p className={styles.description}>
        Appointment is scheduled for {date.toLocaleString("en-US", options)}{" "}
        {date.getUTCDate()}, {date.getUTCFullYear()} at 11:00 AM for a patient
        suffering from a headache, described as 'pain is so much'.
      </p>

      <div className={styles.footer}>
        <div>
          <span className={styles.priceMin}></span>
        </div>
        <div>
          <span className={styles.priceMax}></span>
        </div>
        {obj.status == "Cancelled" ? null : (
          <div
            onClick={() => {
              handleRescheduleBooking(obj?.appointment_id);
              navigate("/mypatients/history/reschedule/bookAppointment");
            }}
            className={styles.priceNow}
          >
            Reschedule
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
