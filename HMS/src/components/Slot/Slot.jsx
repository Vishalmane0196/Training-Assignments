import React, { useEffect, useState } from "react";
import styles from "../../style/Slot.module.css";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "motion/react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { fetchDoctorSlots } from "src/redux/asyncThunkFuntions/user";
import { bookAppointment } from "src/redux/asyncThunkFuntions/user";
import { useNavigate } from "react-router-dom";
export const Slot = ({ date, book, setBook }) => {
  const navigate = useNavigate();
  const [slots, setSlots] = useState([]);
  const [timeSlot, setTimeSlot] = useState([]);
  const [pendingSlot, setPendingSlot] = useState([]);
  const dispatch = useDispatch();
  const [time, setTime] = useState(null);
  const { patientId, selectedDoctor } = useSelector((state) => state.book);

  const generateTimeSlots = (startTime, endTime, intervalMinutes) => {
    const slots = [];

    let [startHour, startMin, startSec] = startTime.split(":").map(Number);
    let [endHour, endMin, endSec] = endTime.split(":").map(Number);

    const start = new Date();
    start.setHours(startHour, startMin, startSec, 0);
    console.log(start);
    const end = new Date();
    end.setHours(endHour, endMin, endSec, 0);
    console.log(end);
    while (start < end) {
      const endSlot = new Date(start.getTime() + intervalMinutes * 60000);
      if (endSlot > end) break;

      const format = (date) => date.toTimeString().slice(0, 8);

      slots.push(`${format(start)} - ${format(endSlot)}`);
      start.setTime(endSlot.getTime());
    }

    return slots;
  };

  const fetchDoctorAvailableSlots = async () => {
    try {
      let res = await dispatch(
        fetchDoctorSlots({
          date: date,
          patientId: patientId,
          doctorId: selectedDoctor.id,
        })
      ).unwrap();

      setSlots(() => {
        setTimeSlot(
          generateTimeSlots(res.data.doctorInTime, res.data.doctorOutTime, 30)
        );
        setPendingSlot(res.data.pendingSlots || []);
        console.log(
          generateTimeSlots(res.data.doctorInTime, res.data.doctorOutTime, 30)
        );
        return [
          ...(res.data.scheduleSlots || []),
          ...(res.data.pendingSlots || []),
        ];
      });
    } catch (error) {
      toast.error(error);
    }
  };
  const handleAppointment = async () => {
    try {
      await dispatch(
        bookAppointment({
          date: date,
          patient_id: patientId,
          doctor_id: selectedDoctor.id,
          time: time.slice(0, 8),
        })
      ).unwrap();
      setBook(false);
      navigate("/admin/dashboard/mypatients");
      toast.success("Appointment confirmed successfully.");
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
                        {`Dr. ${selectedDoctor.name}`}
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
                <h4>Available Slots</h4>
                <div className={styles.slotsGrid}>
                  {console.log(timeSlot)}
                  {timeSlot?.map((slot, idx) =>
                    slots.includes(slot.slice(0, 8)) ? null : (
                      <div
                        key={idx}
                        onClick={() => {
                          setTime(slot);
                        }}
                        className={
                          time == slot
                            ? `${styles.selectedTime} `
                            : `${styles.slot} `
                        }
                      >
                        {slot.slice(0, 8)}
                      </div>
                    )
                  )}
                </div>

                {pendingSlot.length !== 0 ? (
                  <>
                    <h4>Tentative Slots</h4>
                    <div className={styles.slotsGrid}>
                      {timeSlot?.map((slot, idx) =>
                        pendingSlot?.includes(slot.slice(0, 8)) ? (
                          <div key={idx} className={styles.disabled}>
                            {" "}
                            {slot.slice(0, 8)}
                          </div>
                        ) : null
                      )}
                    </div>
                  </>
                ) : null}
                <div className={styles.bookBtnCover}>
                  <button
                    onClick={handleAppointment}
                    className={styles.bookBtn}
                  >
                    Book Now
                  </button>
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
  date: PropTypes.string,
  book: PropTypes.any,
  setBook: PropTypes.func,
};

export default Slot;
