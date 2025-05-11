import React, { useCallback, useEffect, useState } from "react";
import styles from "src/style/AppointmentCard.module.css";
import { FaCalendarAlt, FaHistory } from "react-icons/fa";
import { AppointmentPopup } from "src/components/AppointmentPopup/AppointmentPopup";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getDoctorAppointmentsList } from "src/redux/asyncThunkFuntions/doctor";
import { AppointmentInfo } from "src/components/AppointmentCard/AppointmentInfo";
import { Observation } from "src/components/Observation/Observation";
import { Loading } from "src/components/Loading/Loading";

const AppointmentCard = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [filterAppointmentHistory, setFilterAppointmentHistory] = useState([]);
  const [observation, setObservation] = useState(false);
  const [obj, setObj] = useState(null);
  const [loading, setLoading] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const { patientList } = useSelector((state) => state.patient);
  const [popUpState, setPopUpState] = useState(false);
  const dispatch = useDispatch();
  const [id, setId] = useState(null);

  const getAllAppointment = useCallback(async () => {
    try {
      let response = await dispatch(
        getDoctorAppointmentsList(userInfo.doctor_id)
      ).unwrap();
      console.log(response.data);
      functionFilterAppointment(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  useEffect(() => {
    getAllAppointment();
  }, []);

  const functionFilterAppointment = (data) => {
    if (activeTab == "upcoming") {
      const asd = data?.filter(
        (obj) => obj.status === "Scheduled" || obj.status === "Pending"
      );
      setFilterAppointmentHistory(asd);
    } else {
      const asd = data?.filter(
        (obj) => obj.status === "Cancelled" || obj.status === "Completed"
      );

      setFilterAppointmentHistory(asd);
    }
  };

  useEffect(() => {
    functionFilterAppointment(patientList);
  }, [activeTab]);

  const renderMessage = () => (
    <motion.div
      key={activeTab}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className={styles.grid}
    >
      {filterAppointmentHistory.length !== 0
        ? filterAppointmentHistory.map((appt, index) => (
            <AppointmentInfo
              appt={appt}
              id={id}
              setId={setId}
              key={index}
              setObj={setObj}
              setObservation={setObservation}
              setPopUpState={setPopUpState}
            />
          ))
        : `You currently have no appointments.`}
    </motion.div>
  );

  if (loading) {
    return <Loading />;
  }
  return (
    <div className={styles.container}>
      <h2>My Appointments</h2>
      <div className={styles.tabSwitcher}>
        <button
          className={`${styles.tab} ${
            activeTab === "upcoming" ? styles.active : ""
          }`}
          onClick={() => {
            setActiveTab("upcoming");
          }}
        >
          <FaCalendarAlt className={styles.icon} />
          UPCOMING
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "past" ? styles.active : ""
          }`}
          onClick={() => {
            setActiveTab("past");
          }}
        >
          <FaHistory className={styles.icon} />
          PAST
        </button>
      </div>
      <AnimatePresence mode="wait">{renderMessage()}</AnimatePresence>
      {popUpState && (
        <AppointmentPopup
          obj={obj}
          getAllAppointment={getAllAppointment}
          popUpState={popUpState}
          setDeleteState={setPopUpState}
        />
      )}
      {observation && (
        <Observation
          setDeleteState={setObservation}
          getAllAppointment={getAllAppointment}
          obj={id}
        />
      )}
    </div>
  );
};

export default AppointmentCard;
