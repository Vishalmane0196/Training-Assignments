import React, { useContext } from "react";
import login from "../../style/login.module.css";
import { GoogleLogin } from "@react-oauth/google";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../utils/ContextApi";
import { toast } from "react-toastify";
export const Register = () => {
  const contextData = useContext(MyContext);
  const navigate   = useNavigate();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();
  const handleRegisterForm = async (data) => {
   try {
     let response = await contextData.axiosInstance.post("/user/register", data);
     if(response.data.status)
     {
      navigate('/account/user/login');
      toast.success('Registration successful! Redirecting to dashboard...', { position: 'top-right' });
     }
   } catch (error) {
     toast.error(`Registration failed : ${error.response.data.message}`);
    console.log("register fail",error);
   }
  };
  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };
  const submitRegisterData = (data) => {
    console.log(data);
    handleRegisterForm(data);
  };
  return (
    <>
      <div className={login.container}>
        <div className={login.googlebtn}>
          <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />

          <div className={login.ordiv}>
            <div className={login.line}></div>
            <span className={login.or}>or sign up with</span>
            <div className={login.line}></div>
          </div>
        </div>
        <form
          className={login.form}
          onSubmit={handleSubmit(submitRegisterData)}
        >
          <div className={login.FLwrapper}>
            <div className={login.inputgroupp}>
              <div className={login.labelError}>
                <label className={login.labell}> First Name </label>
                <label className={login.error}>
                  {errors.first_name && errors.first_name.message}
                </label>
              </div>
              <input
                className={login.inputtt}
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
            </div>
            <div className={login.inputgroupp}>
              <div className={login.labelError}>
                <label className={login.labell}> Last Name </label>
                <label className={login.error}>
                  {errors.last_name && errors.last_name.message}
                </label>
              </div>
              <input
                className={login.inputtt}
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
                placeholder="Enter your Last Name"
              />
            </div>
          </div>
          <div className={login.inputgroup}>
            <div className={login.labelError}>
              <label className={login.labell}> Email</label>
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
              className={login.inputt}
              placeholder="Enter your email"
            />
          </div>

          <div className={login.inputgroup}>
            <div className={login.labelError}>
              <label className={login.labell}>Mobile </label>
              <label className={login.error}>
                {errors.mobile_number && errors.mobile_number.message}
              </label>
            </div>
            <input
              className={login.inputt}
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
              placeholder="Enter your Phone"
            />
          </div>
          <div className={login.inputgroup}>
            <div className={login.labelError}>
              <label className={login.labell}>Password </label>
              <label className={login.error}>
                {errors.user_password && errors.user_password.message}
              </label>
            </div>
            <input
              className={login.inputt}
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
            <button type="submit" className={login.signinbtn}>
              {" "}
              <pre> Sign Up </pre>{" "}
            </button>
          </div>

          <div className={login.signup}>
            Don't have an account?<Link to="/account/user/login">Sign in</Link>
          </div>
        </form>
      </div>
    </>
  );
};
