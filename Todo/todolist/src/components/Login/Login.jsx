import React, { useState } from 'react'
import RegisterCSS from '../../styles/register.module.css'
import { useNavigate } from 'react-router'
import { Data } from '../../App'
import { useContext } from 'react'
import {  toast } from 'react-toastify';



export const Login = () => {
    
     const [errors, setErrors] = useState(false);
    let navigate = useNavigate();
    let datac = useContext(Data);
    const [LoginData , setLoginData]=useState({})
    const handleLoginData = (e) =>{
        setLoginData({...LoginData,[e.target.name] : e.target.value})
    }
    const handleLogin = async(e) => {
        e.preventDefault();
        try {
            let response = await datac.client.post('/user/login', LoginData);
           
            if (response.data.token) {
                console.log("Login successful");
                datac.setIsLogin((pre)=>{
                    localStorage.setItem('isLogin',true);
                    return true;
                }
                );
                datac.settoken((pre)=>{
                    localStorage.setItem('token',response.data.token);
                    return response.data.token})
            } else {
                console.log("Login failed:", response.data.message);
                datac.setIsLogin(false);
                setErrors(true);
            }

            navigate('/');    
            toast.success('Login successful!...', { position: 'top-right' });
            console.log("i am at login toast")
        } catch (error) {
            console.error("Login  failed:", error);
            toast.error("Login failed. Please try again.");
            datac.setIsLogin(false);
            setErrors(true);
        }
        // Navigate to dashboard page after login is successfull
    }
    return (
        <>
            <div className={RegisterCSS.container}>
                <div className={RegisterCSS.content}>
                    <img src="https://res.cloudinary.com/debbsefe/image/upload/f_auto,c_fill,dpr_auto,e_grayscale/image_fz7n7w.webp" alt="header-image" className="cld-responsive" />
                    <h1 className={RegisterCSS.formtitle}>Login Here</h1>
                    <form >
                        <input name='username'  className={RegisterCSS.inputinform}  onChange={handleLoginData} type="text" placeholder="Username" />
                        <input name='password' className={RegisterCSS.inputinform} onChange={handleLoginData} type="password" placeholder="password " />
                        <br />
                        {errors ? <span className={RegisterCSS.error}>Invalid Username or password.</span> : null}
                       <br />
                        <button  className={RegisterCSS.loginbtn} type="button" onClick={handleLogin}>Submit</button>
                    </form>

                </div>
                 {/* <ToastContainer/> */}
            </div>
        </>
    )
}

