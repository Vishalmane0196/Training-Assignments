import React from "react";
import styles from "../../style/Slot.module.css";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "motion/react";

export const Slot = ({ book, setBook }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const showtimes = [
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
                        Dr Vishal Mane
                      </div>
                      <div className={styles.icons}>
                        <div className={styles.icon}>
                          <img
                            src="https://static.vecteezy.com/system/resources/previews/006/085/777/original/business-specialist-icon-on-white-background-free-vector.jpg"
                            alt="specialist"
                          />
                          <span>Surgeon</span>
                        </div>
                        <div className={styles.icon}>
                          <img
                            src="https://static.vecteezy.com/system/resources/previews/000/574/255/original/sign-of-time-icon-vector.jpg"
                            alt="time"
                          />
                          <span style={{ color: "#f90" }}>
                            10:00 am - 06:00 pm
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.slotsGrid}>
                  {showtimes.map((slot, idx) => (
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

export default Slot;
