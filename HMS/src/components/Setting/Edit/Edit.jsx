import React, { useContext } from "react";
import styles from "../../../style/Edit.module.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { MyContext } from "../../../utils/ContextApi";

export const Edit = ({ editProfile, setEditProfile }) => {
  const contextData = useContext(MyContext);
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: contextData.userInfo.first_name,
      last_name: contextData.userInfo.last_name,
      mobile_number: contextData.userInfo.mobile_number,
    },
  });

  const sendDataToUpdate = async (data) => {
    try {
      let response = await contextData.axiosInstance.put(
        "/user/updateUser",
        data
      );
      console.log(response);
      setEditProfile(false);
      toast.success("Profile updated successfully!");
      response = await contextData.axiosInstance.get("user/getUser");
      contextData.setUserInfo({ ...response.data.data[0] });
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  const handleUpdateData = (data) => {
    console.log(data);
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
                <label htmlFor=""> First Name</label>
                {errors.first_name && <span>{errors.first_name.message}</span>}
              </div>
              <input
                className={styles.inputTag}
                {...register("first_name", {
                  required: true,
                  maxLength: 20,
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Invalid format",
                  },
                })}
                onChange={(e) => {
                  const { onChange } = register("first_name");
                  onChange(e);
                  trigger("first_name");
                }}
                type="text"
                placeholder="Enter your First Name"
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <label htmlFor=""> Last Name</label>
                {errors.last_name && <span>{errors.last_name.message}</span>}
              </div>
              <input
                className={styles.inputTag}
                {...register("last_name", {
                  required: true,

                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Invalid format",
                  },
                })}
                onChange={(e) => {
                  const { onChange } = register("last_name");
                  onChange(e);
                  trigger("last_name");
                }}
                type="text"
                placeholder="Enter your Last Name"
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <label htmlFor=""> Mobile Number</label>
                {errors.mobile_number && (
                  <span>{errors.mobile_number.message}</span>
                )}
              </div>
              <input
                className={styles.inputTag}
                {...register("mobile_number", {
                  required: true,
                  maxLength: 20,
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Invalid format",
                  },
                })}
                onChange={(e) => {
                  const { onChange } = register("mobile_number");
                  onChange(e);
                  trigger("mobile_number");
                }}
                type="number"
                placeholder="Enter your number"
              />
              
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
