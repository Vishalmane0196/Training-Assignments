import React, { useContext, useState } from "react";
import ForgetCSS from "../../style/Forget.module.css";
import { MyContext } from "../../utils/ContextApi";
import { toast } from "react-toastify";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";
export const Forget = () => {
  const contextAPi = useContext(MyContext);
  const [otpInput,setOtpInput] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [forgetEmail, setForgetEmail] = useState("");

  const [otp, setOtp] = useState("");
  const [changePassStatus, setChangePassStatus] = useState(false);
  const navigate = useNavigate();

  const handleChangePassword = async () => {
    bcrypt.compare(otpInput,otp,(err, res) => {
      if (res) {
        setChangePassStatus(false);
      
        if (newPassword === "") {
          toast.warn("Not Allowed Password Format", { position: "top-right" });
        } else {
          contextAPi.axiosInstance.put("/user/resetPassword", {
            email: forgetEmail,
            newPassword: newPassword,
          });
          toast.success("Password changed successfully!", {
            position: "top-right",
          });
          navigate('/account/user/login')
        }
      } else {
        toast.error("Invalid OTP!", { position: "top-right" });
      }
    });
  };

  const handleForgetPasswordEmail = async () => {
    if (forgetEmail === "") {
      toast.warn("Invalid Email!", { position: "top-right" });
      navigate("/account/user/login");
      return;
    } else {
      try {
        let response = await contextAPi.axiosInstance.post(
          "/user/forgotPassword",
          {
            email: forgetEmail,
          }
        );

        setOtp(response?.data?.data?.hashOtp);

        toast.success(response.data.message, { position: "top-right" });
        setChangePassStatus(true);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };
  return (
    <>
      <div className={ForgetCSS.container}>
        <div className={ForgetCSS.cover}>
          <h1>Forgot Password?</h1>
          <p>
            Enter the email address you used when you joined and we’ll send you
            OTP to reset your password.
            <br />
            <br />
            For security reasons, we do NOT store your password. So rest assured
            that we will never send your password via email.
          </p>

          {changePassStatus ? (
            <div className={ForgetCSS.inputCoverDiv}>
              <label htmlFor="">Enter OTP</label>
              <input
                type="text"
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value)}
                placeholder="Enter One Time Password"
              />
            </div>
           ) : (
            <div className={ForgetCSS.inputCoverDiv}>
              <label htmlFor="">Email Address</label>
              <input
                type="email"
                value={forgetEmail}
                onChange={(e) => setForgetEmail(e.target.value)}
                placeholder="Enter your email address"
              />
            </div>
          )}
          {changePassStatus ? (
            <div className={ForgetCSS.inputCoverDiv}>
              <label htmlFor="">New Password</label>
              <input
                type="text"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
              />
            </div>
          ) : null}
          {changePassStatus ? (
            <button
              className={ForgetCSS.submitBtn}
              onClick={handleChangePassword}
              type="submit"
            >
              Change Password
            </button>
          ) : (
            <button
              className={ForgetCSS.submitBtn}
              onClick={handleForgetPasswordEmail}
              type="submit"
            >
              Send Reset OTP
            </button>
          )}
        </div>
      </div>
    </>
  );
};
