import React, { useState } from "react";
import styles from "src/style/AppointmentPopup.module.css";
import { FaCheckCircle, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { TbClockCancel } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  changeAppointmentStatus,
  changeAppointmentStatusToCancel,
  changeAppointmentStatusToSchedule,
} from "src/redux/asyncThunkFuntions/admin";

export const AppointmentPopup = ({
  getAllAppointment,
  obj,
  setDeleteState,
}) => {
  const dispatch = useDispatch();

  const [reason, setReason] = useState("");
  const [cancelState, setCancelState] = useState(false);
  const [btnState, setBtnState] = useState(false);

  const handleAppointment = async (data) => {
    if (btnState) return;
    try {
      setBtnState(true);
      if (data?.status == "Cancelled") {
        if (reason == "") {
          return;
        }
        let y = dispatch(
          changeAppointmentStatusToCancel({
            reason: reason,
            id: data.appointment_id,
          })
        ).unwrap();
        setBtnState(true);
        toast.promise(y, {
          pending: "Cancelling Appointment...",
          success: "Cancelled Successfully",
          error: "Error while Cancelling",
        });
        await y;
      } else if (data?.status == "Scheduled") {
        let y = dispatch(
          changeAppointmentStatusToSchedule({ id: data.appointment_id })
        ).unwrap();
        setBtnState(true);
        toast.promise(y, {
          pending: "Scheduling appointment please wait...",
          success: " Successfully Scheduled.",
          error: "Error while Cancelling",
        });

        await y;
      } else {
        await dispatch(
          changeAppointmentStatus({ id: data.appointment_id })
        ).unwrap();
        setBtnState(true);
      }
      getAllAppointment();
      setBtnState(false);
      setDeleteState(false);
    } catch (error) {
      setBtnState(false);
      console.error(error);
    }
  };
  return (
    <div className={styles.modal} onClick={() => setDeleteState(false)}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <span className={styles.close} onClick={() => setDeleteState(false)}>
          &times;
        </span>
        <div className={styles.card}>
          <p
            className={
              obj.status == "Pending" ? styles.pending : styles.confirmation
            }
          >
            {obj.status == "Pending" ? (
              <TbClockCancel className={styles.checkIcon} />
            ) : (
              <FaCheckCircle className={styles.checkIcon} />
            )}{" "}
            {obj.status == "Pending"
              ? `Appointment is in pending.`
              : `Appointment is Scheduled.`}
          </p>

          <h2 className={styles.title}>
            {obj.status == "Pending"
              ? `Please schedule appointment`
              : `Appointment scheduled.`}
          </h2>
          <div className={styles.withPerson}>
            <span>with {obj.patient_name}</span>
          </div>

          <p className={styles.locationTitle}>
            who is experiencing a {obj.disease_type} problem.
          </p>
          <p className={styles.location}>
            <FaMapMarkerAlt className={styles.icon} /> MD City Hospital
            ,warje-416410.
          </p>

          <div className={styles.datetimeBox}>
            {/* <FaCalendarAlt className={styles.dateIcon} /> */}
            <div>
              <p className={styles.datetimeLabel}>Date & Time</p>
              <p>
                {`${new Date(
                  new Date(obj.appointment_date).toISOString().split("T")[0]
                )
                  .toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                  .replace(/ /g, "-")} •  ${obj.appointment_time}`}
              </p>
            </div>
          </div>
          <div
            style={cancelState ? { display: "flex" } : { display: "none" }}
            className={styles.inputReason}
          >
            <input
              className={styles.inputReasonTag}
              onChange={(e) => {
                setReason(e.target.value);
              }}
              value={reason}
              type="text"
              placeholder="Reason For Cancellation."
            />
          </div>
          <button
            onClick={() => {
              setCancelState(true);
              console.log(reason, btnState);
              if (reason == "") {
                toast.warn("Enter Reason for Cancellation.");
                return;
              }
              btnState
                ? null
                : handleAppointment({ ...obj, status: "Cancelled" });
            }}
            className={styles.reject}
          >
            Reject appointment
          </button>
          {obj.status == "Scheduled" ? (
            <button
              onClick={() => {
                btnState
                  ? null
                  : handleAppointment({ ...obj, status: "Completed" });
              }}
              className={styles.button}
            >
              Complete appointment
            </button>
          ) : (
            <button
              onClick={() => {
                btnState
                  ? null
                  : handleAppointment({ ...obj, status: "Scheduled" });
              }}
              className={styles.button}
            >
              Approve appointment
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
