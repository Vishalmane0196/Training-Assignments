import React from 'react'
import login from '../../style/login.module.css'
export const Login = () => {
  return (
    <>

<div class={login.container}>
        <h2>Sign in to Dribbble</h2>
        <div class={login.googlebtn}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" alt="Google"/> Sign in with Google
        </div>
        <div class={login.separator}>or sign in with email</div>
        <div className={login.inputgroup}>
            <label className={login.labell}>Username or Email</label>
            <input type="text" className={login.inputt} placeholder="Enter your email"/>
        </div>
        <div className={login.inputgroup}>
            <label className={login.labell}>Password <a href="#" class="forgot">Forgot?</a></label>
            <input className={login.inputt} type="password" placeholder="Enter your password"/>
        </div>
        <button  className={login.signinbtn}>Sign In</button>
        <div className={login.signup} >Don't have an account? <a href="#">Sign up</a></div>
    </div>
    </>
  )
}
