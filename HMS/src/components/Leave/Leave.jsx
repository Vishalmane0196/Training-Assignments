import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../../style/Edit.module.css";
import { useDispatch } from "react-redux";
import { ApplyLeave } from "src/redux/asyncThunkFuntions/doctor";
import { toast } from "react-toastify";

export const Leave = ({ applyStatus, setReset }) => {
  const today = new Date().toISOString().split("T")[0];
  const dispatch = useDispatch();
  const [apply, setApplyStatus] = useState(false);
  const { register, handleSubmit, trigger } = useForm({
    defaultValues: {
      from: "",
      to: "",
    },
  });
  const handleDateToServer = async (data) => {
    if (apply) return;
    let y = dispatch(
      ApplyLeave({
        is_available: false,
        unavailable_from_date: data.from,
        unavailable_to_date: data.to,
      })
    ).unwrap();

    toast.promise(y, {
      pending: "Applying",
      success: "Leave application sent successfully. ",
      error: "Error while Applying",
    });

    try {
      setApplyStatus(true);
      await y;
      setReset(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleLeaveData = (data) => {
    handleDateToServer(data);
  };

  return (
    <>
      {applyStatus && (
        <div className={styles.modal} onClick={() => setReset(false)}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <span className={styles.close} onClick={() => setReset(false)}>
              &times;
            </span>
            <h2 className={styles.h2tag}>Leave Application</h2>
            <form action="" onSubmit={handleSubmit(handleLeaveData)}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <label htmlFor=""> Start date </label>
              </div>
              <input
                className={styles.inputTag}
                {...register("from", {
                  required: true,
                })}
                onChange={(e) => {
                  const { onChange } = register("from");
                  onChange(e);
                  trigger("from");
                }}
                type="date"
                min={today}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <label htmlFor="">End date</label>
              </div>
              <input
                className={styles.inputTag}
                {...register("to", {
                  required: true,
                })}
                onChange={(e) => {
                  const { onChange } = register("to");
                  onChange(e);
                  trigger("to");
                }}
                type="Date"
                min={today}
              />

              <button type="submit" className={styles.submitBtn}>
                Apply
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
