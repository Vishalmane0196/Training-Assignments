import React, { useEffect, useState } from "react";
import styles from "src/style/Edit.module.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import InputComponent from "../Input/InputComponent";
import { addAdmin } from "../../redux/asyncThunkFuntions/admin.js";
import {
  getAllAdminEmails,
  getAllDoctorEmails,
} from "../../redux/asyncThunkFuntions/admin.js";
import { addDoctor } from "../../redux/asyncThunkFuntions/admin.js";
const AddDoctorAdminComponent = ({
  fetchData,
  control,
  onPopup,
  setPopupOff,
}) => {
  const [btnState, setBtnState] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: control
      ? {
          specialization: "",
          email: "",
          doctorInTime: "",
          doctorOutTime: "",
          user_password: "",
          first_name: "",
          last_name: "",
          contact_number: "",
        }
      : {
          email: "",
          first_name: "",
          last_name: "",
          mobile_number: "",
        },
  });

  const sendDataToUpdate = async (data) => {
    if (btnState) return;
    let addPromise = control
      ? dispatch(addDoctor(data)).unwrap()
      : dispatch(addAdmin(data)).unwrap();
    toast.promise(addPromise, {
      pending: "Please wait while we add...",
      success: "Added Successfully",
      error: "Error While Registering...",
    });
    setBtnState(true);
    try {
      let response;
      response = await addPromise;
      fetchData();
      setPopupOff(false);
      console.log(response);
    } catch (error) {
      setBtnState(false);
      console.error(error);
    }
  };

  const handleUpdateData = (data) => {
    sendDataToUpdate(data);
  };
  const getAllAdminEmailsFun = async () => {
    try {
      await dispatch(getAllAdminEmails()).unwrap();
    } catch (error) {
      toast.error(error);
    }
  };
  const getAllDoctorEmailsFun = async () => {
    try {
      await dispatch(getAllDoctorEmails()).unwrap();
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    control ? getAllDoctorEmailsFun() : getAllAdminEmailsFun();
  }, []);
  return (
    <div>
      {onPopup && (
        <div className={styles.modal} onClick={() => setPopupOff(false)}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <span className={styles.close} onClick={() => setPopupOff(false)}>
              &times;
            </span>
            <h2 className={styles.h2tag}>
              {control == true ? " Register Doctor" : "Invite Admin"}
            </h2>
            <form action="" onSubmit={handleSubmit(handleUpdateData)}>
              <div className={styles.coverLeftRight}>
                <div className={styles.coverLeft}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <label htmlFor=""> First Name </label>
                    {errors.first_name && (
                      <span>{errors.first_name.message}</span>
                    )}
                  </div>

                  <InputComponent
                    require="first name "
                    register={register}
                    trigger={trigger}
                    fieldName="first_name"
                    type="text"
                    pattern={{
                      message: "Invalid Pattern",
                      value: /^[A-Za-z]{2,}(?:[ '-][A-Za-z]+)*$/,
                    }}
                    maxLength={20}
                    style={styles.inputTag}
                    placeholder="Enter First Name"
                  />
                </div>
                <div className={styles.coverRight}>
                  {" "}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <label htmlFor=""> Last Name </label>
                    {errors.last_name && (
                      <span>{errors.last_name.message}</span>
                    )}
                  </div>
                  <InputComponent
                    require="last name "
                    maxLength={20}
                    register={register}
                    trigger={trigger}
                    fieldName="last_name"
                    type="text"
                    pattern={{
                      message: "Invalid Pattern",
                      value: /^[A-Za-z]{2,}(?:[ '-][A-Za-z]+)*$/,
                    }}
                    style={styles.inputTag}
                    placeholder="Enter Last Name"
                  />
                </div>
              </div>
              {control == true ? null : (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <label htmlFor=""> Contact Number </label>
                    {errors.contact_number && (
                      <span>{errors.contact_number.message}</span>
                    )}
                  </div>
                  <InputComponent
                    require="number "
                    register={register}
                    trigger={trigger}
                    fieldName="contact_number"
                    type="number"
                    pattern={{
                      message: "Invalid Pattern",
                      value: /^\d{10}$/,
                    }}
                    maxLength={11}
                    style={styles.inputTag}
                    placeholder="Enter Phone Number"
                  />
                </>
              )}
              {control == true ? (
                <div>
                  <div className={styles.coverLeftRight}>
                    <div className={styles.coverLeft}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <label htmlFor="">Specialization</label>
                        {errors.specialization && (
                          <span>{errors.specialization.message}</span>
                        )}
                      </div>
                      <InputComponent
                        require="Specialization"
                        register={register}
                        trigger={trigger}
                        fieldName="specialization"
                        type="text"
                        style={styles.inputTag}
                        pattern={{
                          value: /^[A-Za-z]{2,}(?:[ '-][A-Za-z]+)*$/,
                          message: "Invalid format",
                        }}
                        maxLength={20}
                        placeholder="Specialization."
                      />
                    </div>
                    <div className={styles.coverRight}>
                      {" "}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <label htmlFor=""> Contact Number </label>
                        {errors.contact_number && (
                          <span>{errors.contact_number.message}</span>
                        )}
                      </div>
                      <InputComponent
                        require="number "
                        register={register}
                        trigger={trigger}
                        fieldName="contact_number"
                        type="number"
                        style={styles.inputTag}
                        placeholder="Enter Phone Number"
                      />
                    </div>
                  </div>

                  <div className={styles.coverLeftRight}>
                    <div className={styles.coverLeft}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <label htmlFor=""> Doctor In-Time</label>
                        {errors.doctorInTime && (
                          <span>{errors.doctorInTime.message}</span>
                        )}
                      </div>
                      <InputComponent
                        require="In-Time "
                        register={register}
                        trigger={trigger}
                        fieldName="doctorInTime"
                        type="time"
                        style={styles.inputTag}
                        pattern={"(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)"}
                        placeholder="In Time."
                      />
                    </div>
                    <div className={styles.coverRight}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <label htmlFor=""> Doctor Out-Time</label>
                        {errors.doctorOutTime && (
                          <span>{errors.doctorOutTime.message}</span>
                        )}
                      </div>
                      <InputComponent
                        require="Out-Time "
                        register={register}
                        trigger={trigger}
                        fieldName="doctorOutTime"
                        type="time"
                        style={styles.inputTag}
                        pattern={"(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)"}
                        placeholder="Out Time."
                      />
                    </div>
                  </div>
                </div>
              ) : null}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <label htmlFor=""> Email </label>
                {errors.email && <span>{errors.email.message}</span>}
              </div>

              <InputComponent
                require="Email "
                register={register}
                trigger={trigger}
                fieldName="email"
                type="email"
                style={styles.inputTag}
                placeholder="Enter Email"
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <label htmlFor=""> Password </label>
                {errors.user_password && (
                  <span>{errors.user_password.message}</span>
                )}
              </div>

              <InputComponent
                require="password "
                register={register}
                trigger={trigger}
                fieldName="user_password"
                type="password"
                style={styles.inputTag}
                placeholder="Enter Password"
              />
              <button
                type="submit"
                disabled={btnState}
                className={styles.submitBtn}
              >
                {control == true ? "Add Doctor" : "Add Admin"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddDoctorAdminComponent;
