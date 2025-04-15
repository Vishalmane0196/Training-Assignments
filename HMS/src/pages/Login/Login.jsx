import React, { useEffect } from "react";

import { GoogleLogin } from "@react-oauth/google";
import login from "../../style/login.module.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../redux/asyncThunkFuntions/auth.js";
import { getUserInfo } from "../../redux/asyncThunkFuntions/user.js";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAdmin, isDoctor, isLoggedIn } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();

  const responseMessage = (response) => {
    console.log(response);
  };

  const handleNavigate = () => {
    if (isAdmin == 1) {
      navigate("/admin/dashboard/allpatients");
    } else if (isDoctor == 1) {
      navigate("/doctor/dashboard/profile");
    } else {
      navigate("/user/dashboard/profile");
    }
  };

  const handleSubmitLoginData = async (data) => {
    try {
      await dispatch(loginUser(data)).unwrap();
      await dispatch(getUserInfo("get")).unwrap();
    } catch (error) {
      toast.error(`Login failed : ${error}`);
    }
  };
  const errorMessage = (error) => {
    console.error(error);
  };
  const submitLoginData = (data) => {
    const textToEncrypt = "Hello, World!";
    const secretKey = import.meta.env.VITE_API_SECRETKEY;
    const encryptedData = CryptoJS.AES.encrypt(
      textToEncrypt,
      secretKey
    ).toString();
    console.log(encryptedData);

    handleSubmitLoginData(data);
  };

  useEffect(() => {
    if (!isLoggedIn) return;
    handleNavigate();
  }, [isAdmin, isDoctor, isLoggedIn]);
  return (
    <>
      <div className={login.container}>
        <h2>Sign in User</h2>
        <div className={login.googleBtn}>
          <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />

          <div className={login.orDiv}>
            <div className={login.line}></div>
            <span className={login.or}>or sign in with</span>
            <div className={login.line}></div>
          </div>
        </div>

        <form className={login.form} onSubmit={handleSubmit(submitLoginData)}>
          <div className={login.inputGroup}>
            <div className={login.labelError}>
              <label className={login.labelL}> Email</label>
              <label className={login.error}>
                {errors.email && errors.email.message}
              </label>
            </div>
            <input
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              type="text"
              onChange={(e) => {
                const { onChange } = register("email");
                onChange(e);
                trigger("email");
              }}
              className={login.inputT}
              placeholder="Enter your email"
            />
          </div>

          <div className={login.inputGroup}>
            <div className={login.labelError}>
              <div className={login.forgetCover}>
                <label className={login.labelL}>Password </label>
                <Link to="/account/forget" className={login.forget}>
                  {" "}
                  Forgot?{" "}
                </Link>
              </div>
              <label className={login.error}>
                {errors.user_password && errors.user_password.message}
              </label>
              {}
            </div>

            <input
              className={login.inputT}
              {...register("user_password", {
                required: true,
              })}
              onChange={(e) => {
                const { onChange } = register("user_password");
                onChange(e);
                trigger("user_password");
              }}
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <div className={login.signBtnDiv}>
            <button type="submit" className={login.signInBtn}>
              {" "}
              <pre> Sign In </pre>{" "}
            </button>
          </div>
          <div className={login.signup}>
            Don't have an account?
            <Link to="/account/new/register"> sign up</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
