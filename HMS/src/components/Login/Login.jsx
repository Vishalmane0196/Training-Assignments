import React, { useContext } from "react";

import { GoogleLogin } from "@react-oauth/google";
import login from "../../style/login.module.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import { MyContext } from "../../utils/ContextApi";
import { toast } from "react-toastify";

export const Login = () => {
  const navigate =  useNavigate();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();
   const  contextData = useContext(MyContext);
  const responseMessage = (response) => {
    console.log(response);
  };
  const handleSubmitLoginData = async(data)=>{
    
    try {
      let response =  await contextData.axiosInstance.post('/user/login',data);
     if(response.status === 200)
     {
      if(response.data.isAdmin === true)
      {
        contextData.setIsAdmin(()=>{
          localStorage.setItem('isAdmin',true);
          return true;
        })
      }
      contextData.setToken(()=>{
        localStorage.setItem('token',response.data.token);
        return response.data.token;
      })
      navigate('/user/dashboard/profile')
      toast.success('Login successful! Redirecting to dashboard...', { position: 'top-right' });
     }
     
    } catch (error) {
      console.log(error.response.data.message);
      toast.error('Invalid credentials!', { position: 'top-right' });
    }
  }
  const errorMessage = (error) => {
    console.log(error);
  };
  const submitLoginData = (data) => {
    // Use a strong key
    const textToEncrypt = "Hello, World!";
    const encryptedData = CryptoJS.AES.encrypt(textToEncrypt,contextData.secretKey).toString();
    console.log(encryptedData);

    // handleSubmitLoginData({...data,['user_password']:encryptedData});
    handleSubmitLoginData(data);
  };
  return (
    <>
      <div className={login.container}>
        <h2>Sign in User</h2>
        <div className={login.googlebtn}>
          <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />

          <div className={login.ordiv}>
            <div className={login.line}></div>
            <span className={login.or}>or sign in with</span>
            <div className={login.line}></div>
          </div>
        </div>

        <form className={login.form} onSubmit={handleSubmit(submitLoginData)}>
          <div className={login.inputgroup}>
            <div className={login.labelError}>
              <label className={login.labell}> Email</label>
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
              className={login.inputt}
              placeholder="Enter your email"
            />
          </div>

          <div className={login.inputgroup}>
            <div className={login.labelError}>
              <label className={login.labell}>Password </label>
              <label className={login.error}>
                {errors.user_password && errors.user_password.message}
              </label>
              {}
            </div>

            <input
              className={login.inputt}
              {...register("user_password", {
                required: true,
                minLength: {
                  value: 6,
                  message: "More then 6 characters",
                },
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
              <pre> Sign In </pre>{" "}
            </button>
          </div>
          <div className={login.signup}>
            Don't have an account?
            <Link to="/account/new/register">Sign up</Link>
          </div>
        </form>
      </div>
    </>
  );
};
