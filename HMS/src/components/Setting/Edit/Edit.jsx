import React from "react";
import styles from "../../../style/Edit.module.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../../redux/asyncThunkFuntions/user";
import { updateUserInfo } from "../../../redux/asyncThunkFuntions/user";
import InputComponent from "src/components/Input/InputComponent";
import { updateDoctorProfile } from "src/redux/asyncThunkFuntions/doctor";

export const Edit = ({ editProfile, setEditProfile }) => {
  const { userInfo, isDoctor } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues:
      isDoctor == 1
        ? {
            name: "",
            specialization: "",
            contact_number: "",
            doctorInTime: "",
            doctorOutTime: "",
          }
        : {
            first_name: userInfo.first_name,
            last_name: userInfo.last_name,
            mobile_number: userInfo.mobile_number,
          },
  });

  const sendDataToUpdate = async (data) => {
    try {
      if (isDoctor) { 
       await dispatch(updateDoctorProfile(data)).unwrap();
      } else {
        await dispatch(updateUserInfo(data)).unwrap();
      }

      setEditProfile(false);
      toast.success("Profile updated successfully!");
      dispatch(getUserInfo());
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  };
  const handleUpdateData = (data) => {
    sendDataToUpdate(data);
  };
  
  return (
    <div>
      {editProfile && (
        <div className={styles.modal} onClick={() => setEditProfile(false)}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className={styles.close}
              onClick={() => setEditProfile(false)}
            >
              &times;
            </span>
            <h2 className={styles.h2tag}>Update Profile</h2>
            <form action="" onSubmit={handleSubmit(handleUpdateData)}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <label htmlFor="">
                  {isDoctor == 1 ? "Name" : "First Name"}{" "}
                </label>
                {errors[isDoctor == 1 ? "name" : "first_name "] && (
                  <span>
                    {errors[isDoctor == 1 ? "name" : "first_name "].message}
                  </span>
                )}
              </div>
              <InputComponent
                require={isDoctor == 1 ? "Name" : "First Name"}
                register={register}
                trigger={trigger}
                fieldName={isDoctor == 1 ? "name" : "first_name"}
                type={"text"}
                style={styles.inputTag}
                pattern={{
                  value: /^[A-Za-z]/,
                  message: "Invalid format",
                }}
                placeholder={
                  isDoctor == 1 ? "Enter Your Name" : "Enter Your First Name"
                }
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <label htmlFor="">
                  {isDoctor == 1 ? "Specialization" : "Last Name"}{" "}
                </label>
                {errors[isDoctor == 1 ? "specialization" : "last_name"] && (
                  <span>
                    {errors[isDoctor ? "specialization" : "last_name"].message}
                  </span>
                )}
              </div>

              <InputComponent
                require={isDoctor == 1 ? "specialization" : "Last Name"}
                register={register}
                trigger={trigger}
                fieldName={isDoctor == 1 ? "specialization" : "last_name"}
                type={"text"}
                style={styles.inputTag}
                pattern={{
                  value: /^[A-Za-z]/,
                  message: "Invalid format",
                }}
                placeholder={
                  isDoctor == 1
                    ? "Enter Specialization"
                    : "Enter Your Last Name"
                }
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <label htmlFor="">
                  {" "}
                  {isDoctor ? "Contact Number" : "Mobile Number"}
                </label>
                {errors[isDoctor ? "contact_number" : "mobile_number"] && (
                  <span>
                    {
                      errors[isDoctor ? "contact_number" : "mobile_number"]
                        .message
                    }
                  </span>
                )}
              </div>
              <InputComponent
                require={isDoctor == 1 ? "Phone Number" : "Phone Number"}
                register={register}
                trigger={trigger}
                fieldName={isDoctor == 1 ? "contact_number" : "mobile_number"}
                type={"number"}
                style={styles.inputTag}
                pattern={{
                  value: /^[0-9]{10}$/,
                  message: "Invalid format",
                }}
                placeholder={
                  isDoctor == 1
                    ? "Enter Contact number"
                    : "Enter  Contact Number"
                }
              />
              {isDoctor ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <label htmlFor="">In-Time</label>
                    {errors.doctorInTime && (
                      <span>{errors.doctorInTime.message}</span>
                    )}
                  </div>

                  <InputComponent
                    require={"doctorInTime"}
                    register={register}
                    trigger={trigger}
                    fieldName={"doctorInTime"}
                    type={"time"}
                    style={styles.inputTag}
                  />

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <label htmlFor=""> Out-Time</label>
                    {errors.doctorOutTime && (
                      <span>{errors.doctorOutTime.message}</span>
                    )}
                  </div>
                  <InputComponent
                    require={"doctorOutTime"}
                    register={register}
                    trigger={trigger}
                    fieldName={"doctorOutTime"}
                    type={"time"}
                    style={styles.inputTag}
                  />
                </>
              ) : null}

              <button type="submit" className={styles.submitBtn}>
                Update Profile
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Edit;
