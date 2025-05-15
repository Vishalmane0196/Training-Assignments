import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAppointmentId } from "src/redux/slices/appointment/bookSlice";
import styles from "src/style/HistoryCard.module.css";
import { FaClock, FaCalendarAlt } from "react-icons/fa";

const History = ({ obj, id }) => {
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
        <h2 className={styles.sellerName}>{`Dr.${obj?.doctorName}`}</h2>
        <span className={styles.location}>
          <span className={styles.dot}></span> {obj.status}
        </span>
      </div>
      <div className={styles.subdata}>
        <span>
          <FaCalendarAlt className={styles.icon} />{" "}
          <pre>
            {new Date(obj?.appointment_date).toISOString().split("T")[0]}
          </pre>
        </span>{" "}
        ·{" "}
        <span>
          <FaClock className={styles.icon} /> <pre>{obj?.appointment_time}</pre>
        </span>
      </div>
      <p className={styles.description}>
        {`Appointment is scheduled for ${date.toLocaleString("en-US", options)}
        ${date.getUTCDate()}, ${date.getUTCFullYear()} at ${
          obj?.appointment_time
        }  for a patient
        suffering from a ${obj?.disease_type}.`}
      </p>

      <div className={styles.footer}>
        <div>
          <span className={styles.priceMin}></span>
        </div>
        <div>
          <span className={styles.priceMax}></span>
        </div>
        {obj.status == "Cancelled" || obj.status == "Completed" ? null : (
          <button
            onClick={() => {
              handleRescheduleBooking(obj?.appointment_id);
              navigate(`/patients/history/bookAppointment?id=${id}`);
            }}
            className={styles.priceNow}
          >
            Reschedule
          </button>
        )}
      </div>
    </div>
  );
};

export default History;
