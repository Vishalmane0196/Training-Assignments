import React, { useEffect, useState } from "react";
import styles from "src/style/HistoryAppointment.module.css";
import { FaCalendarAlt, FaHistory } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import History from "src/components/AppointmentHistoryCard/History";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAppointmentHistory } from "src/redux/asyncThunkFuntions/user";
import { Loading } from "src/components/Loading/Loading";
import { setAppointmentId } from "src/redux/slices/appointment/bookSlice";
const HistoryAppointment = () => {
  const [searchAppointment, setSearchAppointment] = useState("");
  const [activeTab, setActiveTab] = useState("upcoming");
  const [appointmentHistory, setAppointmentHistory] = useState(null);
  const [filterAppointmentHistory, setFilterAppointmentHistory] = useState([]);
  const [searchBackUpData, setSearchDataBackUp] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [param, setParam] = useSearchParams();

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
            return <History id={param.get("id")} key={index} obj={obj} />;
          })}
        </div>
      ) : (
        `You currently have no ${activeTab} appointments.`
      )}
    </motion.div>
  );
  const fetchAppointmentDataFun = async () => {
    try {
      let response = await dispatch(
        fetchAppointmentHistory(param.get("id"))
      ).unwrap();

      setAppointmentHistory(response.data);

      functionFilterAppointment(response.data);

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    dispatch(setAppointmentId(null));
    if (param.id) return;
    fetchAppointmentDataFun();
  }, []);

  useEffect(() => {
    functionFilterAppointment(appointmentHistory);
  }, [activeTab]);

  const functionFilterAppointment = (data) => {
    if (activeTab == "upcoming") {
      const asd = data?.filter(
        (obj) => obj.status === "Scheduled" || obj.status === "Pending"
      );

      setFilterAppointmentHistory(asd);
      setSearchDataBackUp(asd);
    } else {
      const asd = data?.filter(
        (obj) => obj.status === "Cancelled" || obj.status === "Completed"
      );

      setFilterAppointmentHistory(asd);
      setSearchDataBackUp(asd);
    }
  };

  const searchAppointmentFunction = () => {
    if (searchAppointment == "") {
      if (searchBackUpData.length == 0) return;
      functionFilterAppointment(searchBackUpData);
      return;
    }
    const y = searchBackUpData.filter((appointment) => {
      return Object.values(appointment).some((values) => {
        return String(values)
          .toLowerCase()
          .includes(searchAppointment.toLowerCase());
      });
    });
    setFilterAppointmentHistory(y);
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      searchAppointmentFunction();
    }, 200);
    return () => {
      clearTimeout(debounce);
    };
  }, [searchAppointment]);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>Appointment History</h2>
        <div className={styles.featuresDiv}>
          <div className={styles.tabSwitcher}>
            <button
              className={`${styles.tab} ${
                activeTab === "upcoming" ? styles.active : ""
              }`}
              onClick={() => {
                setSearchDataBackUp([]);
                setSearchAppointment("");
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
                setSearchDataBackUp([]);
                setSearchAppointment("");
                setActiveTab("past");
              }}
            >
              <FaHistory className={styles.icon} />
              PAST
            </button>
          </div>
          <div className={styles.SearchFilterDIv}>
            <input
              onChange={(e) => {
                setSearchAppointment(e.target.value);
              }}
              value={searchAppointment}
              className={styles.search}
              type="text"
              placeholder="Search Appointment"
            />
            <hr />
          </div>
        </div>

        <AnimatePresence mode="wait">{renderMessage()}</AnimatePresence>
      </div>
    </>
  );
};

export default HistoryAppointment;
