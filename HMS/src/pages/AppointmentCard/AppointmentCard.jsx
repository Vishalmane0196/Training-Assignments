import React, { useCallback, useEffect, useState } from "react";
import styles from "src/style/AppointmentCard.module.css";
import { FaClock, FaCalendarAlt } from "react-icons/fa";
import { AppointmentPopup } from "src/components/AppointmentPopup/AppointmentPopup";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getDoctorAppointmentsList } from "src/redux/asyncThunkFuntions/doctor";
import { AppointmentInfo } from "src/components/AppointmentCard/AppointmentInfo";

const AppointmentCard = () => {
  const [obj, setObj] = useState(null);
  const { userInfo } = useSelector((state) => state.auth);
  const { patientList } = useSelector((state) => state.patient);
  const [popUpState, setPopUpState] = useState(false);
  const dispatch = useDispatch();
  const [id, setId] = useState(null);

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
            <AppointmentInfo
              appt={appt}
              id={id}
              setId={setId}
              key={index}
              setObj={setObj}
              setPopUpState={setPopUpState}
            />
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
