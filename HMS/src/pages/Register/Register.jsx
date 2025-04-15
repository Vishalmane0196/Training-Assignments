import React from "react";
import login from "../../style/login.module.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/asyncThunkFuntions/auth";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";

const Register = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();

  const handleRegisterForm = async (data) => {
    let registerPromise = dispatch(registerUser(data)).unwrap();

    toast.promise(registerPromise, {
      pending: "Loading...",
      success: "Registration successful!",
      error: "",
    });

    try {
      await registerPromise;
      navigate("/account/user/login");
    } catch (error) {
      console.error("register fail", error);
      toast.error(error);
    }
  };

  const submitRegisterData = (data) => {
    handleRegisterForm(data);
  };
  return (
    <>
      <div className={login.container}>
        <div className={login.googleBtn}>
          <h2 className={login.signinHeader}>Sign Up </h2>
        </div>
        <form
          className={login.form}
          onSubmit={handleSubmit(submitRegisterData)}
        >
          <div className={login.FLwrapper}>
            <div className={login.inputGroupp}>
              <div className={login.labelError}>
                <label className={login.labelL}> First Name </label>
                <label className={login.error}>
                  {errors.first_name && errors.first_name.message}
                </label>
              </div>
              <input
                className={login.inpuTTT}
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
                placeholder="Enter your first name"
              />
            </div>
            <div className={login.inputGroupp}>
              <div className={login.labelError}>
                <label className={login.labelL}> Last Name </label>
                <label className={login.error}>
                  {errors.last_name && errors.last_name.message}
                </label>
              </div>
              <input
                className={login.inpuTTT}
                {...register("last_name", {
                  required: true,
                  maxLength: 10,
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
                placeholder="Enter your last name"
              />
            </div>
          </div>
          <div className={login.inputgroup}>
            <div className={login.labelError}>
              <label className={login.labelL}> Email</label>
              <label className={login.error}>
                {errors.email && errors.email.message}
              </label>
            </div>
            <input
              type="email"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: "Invalid email format",
                },
              })}
              onChange={(e) => {
                const { onChange } = register("email");
                onChange(e);
                trigger("email");
              }}
              className={login.inputT}
              placeholder="Enter your email"
            />
          </div>

          <div className={login.inputgroup}>
            <div className={login.labelError}>
              <label className={login.labelL}>Mobile </label>
              <label className={login.error}>
                {errors.mobile_number && errors.mobile_number.message}
              </label>
            </div>
            <input
              className={login.inputT}
              {...register("mobile_number", {
                required: true,
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Invalid phone number format",
                },
              })}
              onChange={(e) => {
                const { onChange } = register("mobile_number");
                onChange(e);
                trigger("mobile_number");
              }}
              type="number"
              placeholder="Enter your phone"
            />
          </div>
          <div className={login.inputgroup}>
            <div className={login.labelError}>
              <label className={login.labelL}>Password </label>
              <label className={login.error}>
                {errors.user_password && errors.user_password.message}
              </label>
            </div>
            <input
              className={login.inputT}
              required
              {...register("user_password", {
                required: true,
                minLength: 6,
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

          <div className={login.signbtndiv}>
            <button type="submit" className={login.signInBtn}>
              {" "}
              <pre> Sign Up </pre>{" "}
            </button>
          </div>

          <div className={login.signup}>
            Already have an account?{" "}
            <Link to="/account/user/login">sign in</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
