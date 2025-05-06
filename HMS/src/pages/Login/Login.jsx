import React, { useEffect, useState } from "react";

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
  const [loginStatus, setLoginStatus] = useState(false);
  const { isAdmin, isDoctor, isLoggedIn } = useSelector((state) => state.auth);

  const {
    register,
    getValues,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();

  const responseMessage = (response) => {
    console.log(response);
  };

  const handleNavigate = () => {
    if (isAdmin == 1) {
      navigate("/allpatients");
    } else if (isDoctor == 1) {
      navigate("/profile");
    } else {
      navigate("/profile");
    }
  };

  const handleSubmitLoginData = async (data) => {
    try {
      if (data.user_password) {
        data.user_password = btoa(data.user_password);
      }
      await dispatch(
        loginUser(
          data.email.includes("@")
            ? { email: data.email, user_password: data.user_password }
            : { userCode: data.email, user_password: data.user_password }
        )
      ).unwrap();

      await dispatch(getUserInfo("get")).unwrap();
    } catch (error) {
      console.error(error);
      toast.error(`Login failed `);
      setLoginStatus(true);
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
              <label className={login.labelL}> Email or UserID</label>
              <label className={login.error}>
                {errors.email && errors.email.message}
              </label>
            </div>
            <input
              {...register("email", {
                required: true,
                pattern: {
                  value:
                    /^((DR|ADM)\d{3}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                  message: "Invalid  format",
                },
              })}
              tabindex="0"
              type="text"
              onChange={(e) => {
                const { onChange } = register("email");
                onChange(e);
                trigger("email");
              }}
              className={login.inputT}
              placeholder="Enter your email or ID"
            />
          </div>

          <div className={login.inputGroup}>
            <div className={login.labelError}>
              <div className={login.forgetCover}>
                <label className={login.labelL}>Password </label>
                {loginStatus ? (
                  <Link
                    tabIndex={-1}
                    to={`/account/forget/${btoa(getValues("email"))}`}
                    className={login.forget}
                  >
                    {" "}
                    Forgot?{" "}
                  </Link>
                ) : null}
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
              tabindex="0"
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
