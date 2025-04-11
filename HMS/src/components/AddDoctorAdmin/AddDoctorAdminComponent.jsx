import React from "react";
import styles from "src/style/Edit.module.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import InputComponent from "../Input/InputComponent";
import { addAdmin } from "../../redux/asyncThunkFuntions/admin.js";
import { addDoctor } from "../../redux/asyncThunkFuntions/admin.js";
const AddDoctorAdminComponent = ({
  fetchData,
  control,
  onPopup,
  setPopupOff,
}) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: control
      ? {
          name: "",
          specialization: "",
          contact_number: "",
          email: "",
          doctorInTime: "",
          doctorOutTime: "",
        }
      : {
          email: "",
        },
  });

  const sendDataToUpdate = async (data) => {
    try {
      let response;
      if (control) {
        response = await dispatch(addDoctor(data)).unwrap();
      } else {
        response = await dispatch(addAdmin(data.email)).unwrap();
      }
      fetchData();
      setPopupOff(false);
      console.log(response);
      toast.success(response.data.message);
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
              {control == true ? (
                <div>
                  {" "}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <label htmlFor="">Doctor Name</label>
                    {errors.name && <span>{errors.name.message}</span>}
                  </div>
                  <InputComponent
                    require="Name"
                    register={register}
                    trigger={trigger}
                    fieldName="name"
                    type="text"
                    style={styles.inputTag}
                    pattern={{
                      value: /^[A-Za-z]/,
                      message: "Invalid format",
                    }}
                    placeholder="Enter Doctor Name"
                  />
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
                      value: /^[A-Za-z]+$/,
                      message: "Invalid format",
                    }}
                    placeholder="Specialization."
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <label htmlFor=""> Mobile Number</label>
                    {errors.contact_number && (
                      <span>{errors.contact_number.message}</span>
                    )}
                  </div>
                  <InputComponent
                    require="Contact Number"
                    register={register}
                    trigger={trigger}
                    fieldName="contact_number"
                    type="text"
                    style={styles.inputTag}
                    pattern={{
                      value: /^[0-9]{10}$/,
                      message: "Invalid format",
                    }}
                    placeholder="Enter contact number."
                  />
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
                    pattern={{
                      value: /^[0-9]/,
                      message: "Invalid format",
                    }}
                    placeholder="Time"
                  />
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
                    pattern={{
                      value: /^[0-9]/,
                      message: "Invalid format",
                    }}
                    placeholder="Out Time."
                  />
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
                require="Email"
                register={register}
                trigger={trigger}
                fieldName="email"
                type="email"
                style={styles.inputTag}
                placeholder={
                  control ? "Enter Doctor Email." : "Enter Admin Email."
                }
              />

              <button type="submit" className={styles.submitBtn}>
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
