import React, { useState } from "react";
import styles from "src/style/AppointmentCard.module.css";
import { FaClock, FaCalendarAlt } from "react-icons/fa";
import SelectItem from "../SelectItem/SelectItem";

const getStatusClass = (status) => {
  switch (status) {
    case "Scheduled":
      return styles.approved;
    case "Pending":
      return styles.pending;
    case "Cancelled":
      return styles.cancelled;
    default:
      return "";
  }
};
export const AppointmentInfo = ({
  setObservation,
  id,
  setId,
  appt,
  setObj,
  setPopUpState,
}) => {
  const [uploadState, setUploadState] = useState(false);
  return (
    <>
      <div className={styles.card}>
        <div className={styles.header}>
          <h3>{`${appt?.patient_name}`}</h3>
          <span className={`${styles.status} ${getStatusClass(appt.status)}`}>
            {appt.status}
          </span>
        </div>
        <div className={styles.details}>
          <div
            className={styles.first_div}
          >{` is consulting for "${appt.disease_type}".`}</div>
          <div>
            <FaClock className={styles.icon} /> {appt.appointment_time}
          </div>
          <div>
            <FaCalendarAlt className={styles.icon} />{" "}
            {appt.appointment_date &&
              new Date(
                new Date(appt.appointment_date).toISOString().split("T")[0]
              )
                .toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
                .replace(/ /g, "-")}
          </div>
        </div>
        <div className={styles.uploadBtnCover}>
          <p
            onClick={() => {
              setObj(appt);
              setPopUpState(true);
            }}
            className={styles.link}
          >
            Full Info
          </p>
          {appt.status == "Scheduled" || appt.status == "Completed" ? (
            <button
              onClick={() => {
                setId((pre) => {
                  return pre == null ? appt.appointment_id : null;
                });
                setUploadState((pre) => !pre);
              }}
              className={styles.uploadBtn}
            >
              Upload
            </button>
          ) : null}
        </div>
        {id == appt.appointment_id && (
          <SelectItem
            setObservation={setObservation}
            setId={setId}
            obj={appt}
          />
        )}
      </div>
    </>
  );
};
