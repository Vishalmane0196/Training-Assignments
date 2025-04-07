import React from "react";
import styles from "../../../style/Edit.module.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {useDispatch, useSelector} from 'react-redux'
import { getUserInfo } from "../../../redux/asyncThunkFuntions/user";
import { updateUserInfo } from "../../../redux/asyncThunkFuntions/user";
export const Edit = ({ editProfile, setEditProfile }) => {

 const {userInfo} = useSelector(state => state.auth);
 const dispatch =  useDispatch()
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
      mobile_number: userInfo.mobile_number,
    },
  });

  const sendDataToUpdate = async (data) => {
    try {
      await dispatch(updateUserInfo(data)).unwrap();
      
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
