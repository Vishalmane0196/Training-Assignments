import React, { useEffect, useState } from "react";
import styles from "src/style/HistoryAppointment.module.css";
import { FaCalendarAlt, FaHistory } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import History from "src/components/AppointmentHistoryCard/History";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAppointmentHistory } from "src/redux/asyncThunkFuntions/user";
import { Loading } from "src/components/Loading/Loading";
import { setAppointmentId } from "src/redux/slices/appointment/bookSlice";

const HistoryAppointment = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [appointmentHistory, setAppointmentHistory] = useState(null);
  const [filterAppointmentHistory, setFilterAppointmentHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const param = useParams();
  const renderMessage = () => (
    <motion.div
      key={activeTab}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className={styles.message}
    >
      {filterAppointmentHistory.length !== 0 ? (
        <div className={styles.CardCover}>
          {filterAppointmentHistory?.map((obj, index) => {
            return <History key={index} obj={obj} />;
          })}
        </div>
      ) : (
        `You currently have no ${activeTab} appointments.`
      )}
    </motion.div>
  );
  const fetchAppointmentDataFun = async () => {
    try {
      let response = await dispatch(fetchAppointmentHistory(param.id)).unwrap();

      setAppointmentHistory(response.data);

      functionFilterAppointment(response.data);

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    dispatch(setAppointmentId(null));
    if (!param.id) return;
    fetchAppointmentDataFun();
  }, []);

  useEffect(() => {
    functionFilterAppointment(appointmentHistory);
  }, [activeTab]);

  const functionFilterAppointment = (data) => {
    console.log("i am running ");
    if (activeTab == "upcoming") {
      console.log("i am in upcoming tab filter");
      const asd = data?.filter(
        (obj) => obj.status === "Scheduled" || obj.status === "Pending"
      );
      console.log("upcoming", asd);
      console.log("data", data);

      setFilterAppointmentHistory(asd);
    } else {
      console.log("i am in past tab filter");
      const asd = data?.filter(
        (obj) => obj.status === "Cancelled" || obj.status === "Completed"
      );
      console.log("past", asd);
      console.log("data", data);
      setFilterAppointmentHistory(asd);
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div className={styles.breadcrumbs}>
        <div className={styles.container2}>
          <ul className={styles.breadcrumbs__list}>
            <li>
              <a> Dashboard</a>
            </li>
            <li>
              <a onClick={() => history.back()}>Patients </a>
            </li>
            <li>
              <a>History</a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.container}>
        <h2 className={styles.title}>Appointment History</h2>
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
      </div>
    </>
  );
};

export default HistoryAppointment;
