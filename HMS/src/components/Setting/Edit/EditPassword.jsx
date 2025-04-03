import React, { useContext } from "react";
import styles from "../../../style/Edit.module.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { MyContext } from "../../../utils/ContextApi";

export const EditPassword = ({ reset,setReset }) => {
  const contextData = useContext(MyContext);
  const {
    register,
    handleSubmit,
    trigger,
   
  } = useForm({
    defaultValues: {
      Password: contextData.userInfo.email,
      newPassword:""
    },
  });

  const sendDataToUpdate = async (data) => {
    try {
      let response = await contextData.axiosInstance.put(
        "/user/resetPassword",
        {
            email: contextData.userInfo.email,
            newPassword: data.newPassword,
        }
      );
      console.log(response);
      setReset(false);
      toast.success("Password updated successfully!");
      
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
      {reset && (
        <div className={styles.modal} onClick={() => setReset(false)}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className={styles.close}
              onClick={() => setReset(false)}
            >
              &times;
            </span>
            <h2 className={styles.h2tag}>Reset Password</h2>
            <form action="" onSubmit={handleSubmit(handleUpdateData)}>
         
            
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <label htmlFor=""> Password</label>
                
              </div>
              <input
                className={styles.inputTag}
                {...register("newPassword", {
                  required: true,
                })}
                onChange={(e) => {
                  const { onChange } = register("newPassword");
                  onChange(e);
                  trigger("newPassword");
                }}
                type="password"
                placeholder="Enter your Password"
              />
              
              <button type="submit" className={styles.submitBtn}>
                Reset
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
