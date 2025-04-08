import React, { useState } from "react";
import forgetCSS from "../../style/Forget.module.css";
import { toast } from "react-toastify";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";
import { forgetPassword } from "../../redux/asyncThunkFuntions/auth";
import { useDispatch } from "react-redux";

const Forget = () => {
  const dispatch = useDispatch();
  const [otpInput, setOtpInput] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [forgetEmail, setForgetEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [changePassStatus, setChangePassStatus] = useState(false);

  const navigate = useNavigate();

  const handleChangePassword = async () => {
    bcrypt.compare(otpInput, otp, (err, res) => {
      if (res) {
        setChangePassStatus(false);

        if (newPassword === "") {
          toast.warn("Not Allowed Password Format", { position: "top-right" });
        } else {
          axiosInstance.put("/user/resetPassword", {
            email: forgetEmail,
            newPassword: newPassword,
          });
          toast.success("Password changed successfully!", {
            position: "top-right",
          });
          navigate("/account/user/login");
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
      let forgetPasswordPromise = dispatch(forgetPassword(forgetEmail));
      toast.promise(forgetPasswordPromise, {
        pending: "Sending OTP to your email...",
        success: "Check your email for OTP",
        error: "Failed to send OTP",
      });

      try {
        let response = await forgetPasswordPromise.unwrap();
        setOtp(response?.data?.hashOtp);
        setChangePassStatus(true);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <>
      <div className={forgetCSS.container}>
        <div className={forgetCSS.cover}>
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
            <div className={forgetCSS.inputCoverDiv}>
              <label htmlFor="">Enter OTP</label>
              <input
                type="text"
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value)}
                placeholder="Enter One Time Password"
              />
            </div>
          ) : (
            <div className={forgetCSS.inputCoverDiv}>
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
            <div className={forgetCSS.inputCoverDiv}>
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
              className={forgetCSS.submitBtn}
              onClick={handleChangePassword}
              type="submit"
            >
              Change Password
            </button>
          ) : (
            <button
              className={forgetCSS.submitBtn}
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

export default Forget;
