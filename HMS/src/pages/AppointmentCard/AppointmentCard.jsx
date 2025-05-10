import React, { useCallback, useEffect, useState } from "react";
import styles from "src/style/AppointmentCard.module.css";
import { FaClock, FaCalendarAlt } from "react-icons/fa";
import { AppointmentPopup } from "src/components/AppointmentPopup/AppointmentPopup";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getDoctorAppointmentsList } from "src/redux/asyncThunkFuntions/doctor";


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

const AppointmentCard = () => {
  const [obj, setObj] = useState(null);
  const { userInfo } = useSelector((state) => state.auth);
  const { patientList } = useSelector((state) => state.patient);
  const [popUpState, setPopUpState] = useState(false);
  const dispatch = useDispatch();

  const getAllAppointment = useCallback(async () => {
    try {
      await dispatch(getDoctorAppointmentsList(userInfo.doctor_id)).unwrap();
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  useEffect(() => {
    getAllAppointment();
  }, []);

  const renderMessage = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className={styles.grid}
    >
      {patientList.length !== 0
        ? patientList.map((appt, index) => (
            <div className={styles.card} key={index}>
              <div className={styles.header}>
                <h3>{`${appt?.patient_name}`}</h3>
                <span
                  className={`${styles.status} ${getStatusClass(appt.status)}`}
                >
                  {appt.status}
                </span>
              </div>
              <div className={styles.details}>
                <div>
                  <FaClock className={styles.icon} /> {appt.appointment_time}
                </div>
                <div>
                  <FaCalendarAlt className={styles.icon} />{" "}
                  {appt.appointment_date &&
                    new Date(
                      new Date(appt.appointment_date)
                        .toISOString()
                        .split("T")[0]
                    )
                      .toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                      .replace(/ /g, "-")}
                </div>
              </div>
              <p
                onClick={() => {
                  setObj(appt);
                  setPopUpState(true);
                }}
                className={styles.link}
              >
                Full Info
              </p>
            </div>
          ))
        : `You currently have no appointments.`}
    </motion.div>
  );

  return (
    <div className={styles.container}>
      <h2>My Appointments</h2>

      <AnimatePresence mode="wait">{renderMessage()}</AnimatePresence>
      {popUpState && (
        <AppointmentPopup
          obj={obj}
          getAllAppointment={getAllAppointment}
          popUpState={popUpState}
          setDeleteState={setPopUpState}
        />
      )}
    </div>
  );
};

export default AppointmentCard;
