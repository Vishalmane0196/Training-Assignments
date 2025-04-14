import React, { useEffect, useState } from "react";
import styles from "../../style/Slot.module.css";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "motion/react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { fetchDoctorSlots } from "src/redux/asyncThunkFuntions/user";
export const Slot = ({ doctors, date, book, setBook }) => {
  const [slots, setSlots] = useState([]);
  const dispatch = useDispatch();

  const { patientId, selectedDoctor } = useSelector((state) => state.book);

  const showTimes = [
    { time: "10:00:00 AM" },
    { time: "10:30:00 AM" },
    { time: "11:00:00 AM" },
    { time: "11:30:00 AM" },
    { time: "12:00:00 PM" },
    { time: "12:30:00 PM" },
    { time: "13:00:00 PM" },
    { time: "13:30:00 PM" },
    { time: "14:00:00 PM" },
    { time: "14:30:00 PM" },
    { time: "15:00:00 PM" },
    { time: "15:30:00 PM" },
    { time: "16:00:00 PM" },
    { time: "16:30:00 PM" },
  ];
  const fetchDoctorAvailableSlots = async () => {
    try {
      let res = await dispatch(
        fetchDoctorSlots({
          date: date,
          patientId: patientId,
          doctorId: selectedDoctor.Id,
        })
      ).unwrap();
      console.log(res);
      setSlots(res.bookedSlots);
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    fetchDoctorAvailableSlots();
  }, []);

  return (
    <div>
      {book && (
        <div className={styles.modal} onClick={() => setBook(false)}>
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <span className={styles.close} onClick={() => setBook(false)}>
              &times;
            </span>
            <h2>Select Time Slot</h2>
            <div className={styles.slotDiv}>
              <div className={styles.container}>
                <div className={styles.header}>
                  <div className={styles.theaterInfo}>
                    <div>
                      <div style={{ fontWeight: "600", fontSize: "18px" }}>
                        {selectedDoctor.name}
                      </div>
                      <div className={styles.icons}>
                        <div className={styles.icon}>
                          <img
                            src="https://static.vecteezy.com/system/resources/previews/006/085/777/original/business-specialist-icon-on-white-background-free-vector.jpg"
                            alt="specialist"
                          />
                          <span>{selectedDoctor.specialist}</span>
                        </div>
                        <div className={styles.icon}>
                          <img
                            src="https://static.vecteezy.com/system/resources/previews/000/574/255/original/sign-of-time-icon-vector.jpg"
                            alt="time"
                          />
                          <span style={{ color: "#f90" }}>
                            {`${selectedDoctor.inTime} - ${selectedDoctor.outTime}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.slotsGrid}>
                  {showTimes.map((slot, idx) => (
                    <div key={idx} className={styles.slot}>
                      {slot.time}
                      {slot?.tag && (
                        <div className={styles.slotSubText}>{slot?.tag}</div>
                      )}
                    </div>
                  ))}
                </div>
                <div className={styles.bookBtnCover}>
                  <button className={styles.bookBtn}>Book Now</button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

Slot.prototype = {
  doctors: PropTypes.object,
  date: PropTypes.string,
  book: PropTypes.any,
  setBook: PropTypes.func,
};

export default Slot;
