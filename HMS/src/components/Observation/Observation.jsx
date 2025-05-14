import React, { useState } from "react";
import styles from "src/style/AppointmentPopup.module.css";
import { FaCheckCircle, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { TbClockCancel } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  addObservation,
  deleteObservation,
  updateObservation,
} from "src/redux/asyncThunkFuntions/doctor";

export const Observation = ({ getAllAppointment, obj, setDeleteState }) => {
  const dispatch = useDispatch();

  const [reason, setReason] = useState(obj?.observation);
  const [btnState, setBtnState] = useState(false);

  const handleAppointment = async (data) => {
    if (btnState) return;
    if (reason == null) {
      toast.warn("Enter Observation Field.");
      return;
    }
    let y;
    if (data == "update") {
      y = dispatch(
        updateObservation({
          observation: reason,
          id: obj.appointment_id,
        })
      ).unwrap();

      toast.promise(y, {
        pending: "Updating Observation...",
        success: "Updated Successfully",
        error: "Error while Updating",
      });
    } else if (data == "add") {
      y = dispatch(
        addObservation({
          observation: reason,
          id: obj.appointment_id,
        })
      ).unwrap();

      toast.promise(y, {
        pending: "Adding Observation...",
        success: "Added Successfully",
        error: "Error while Adding",
      });
    } else {
      y = dispatch(
        deleteObservation({
          id: obj.appointment_id,
        })
      ).unwrap();

      toast.promise(y, {
        pending: "Deleting Observation...",
        success: "Deleted Successfully",
        error: "Error while Deleting",
      });
    }

    try {
      setBtnState(true);
      await y;
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
          <p>
            Kindly write your clinical observations and remarks about the
            patient below:
          </p>
          <div className={styles.inputReason}>
            <input
              className={styles.inputReasonTag}
              onChange={(e) => {
                setReason(e.target.value);
              }}
              maxLength={100}
              value={reason}
              type="text"
              placeholder="Write clinical observations and remarks here."
            />
          </div>
          {obj.observation == null ? null : (
            <button
              onClick={() => {
                btnState ? null : handleAppointment("delete");
              }}
              className={styles.reject}
            >
              Delete
            </button>
          )}

          <button
            onClick={() => {
              btnState
                ? null
                : handleAppointment(obj.observation ? "update" : "add");
            }}
            className={styles.button}
          >
            {obj.observation ? "Update" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};
