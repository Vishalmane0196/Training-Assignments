import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../../style/Edit.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  ApplyLeave,
  getDoctorProfile,
} from "src/redux/asyncThunkFuntions/doctor";
import { toast } from "react-toastify";
import { getUserInfo } from "src/redux/asyncThunkFuntions/user";

export const Leave = ({ applyStatus, setReset }) => {
  const today = new Date().toISOString().split("T")[0];
  const dispatch = useDispatch();
  const [apply, setApplyStatus] = useState(false);

  const { isAdmin, isDoctor, isSuper, userInfo } = useSelector(
    (state) => state.auth
  );
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
        is_available: userInfo?.is_available == true ? false : true,
        unavailable_from_date: data?.from,
        unavailable_to_date: data?.to,
      })
    ).unwrap();

    toast.promise(y, {
      pending: "Processing",
      success: "Successfully Done. ",
      error: "Error while Applying",
    });

    try {
      setApplyStatus(true);
      await y;
      await dispatch(getUserInfo()).unwrap();
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
            {userInfo?.is_available == 1 && (
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
            )}
            {userInfo?.is_available == 0 && (
              <>
                <p>You have already apply for leave : </p>
                <button onClick={handleDateToServer} className={styles.reject}>
                  {" "}
                  Cancel Leave
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
