

import React, { useContext, useState } from 'react';
import RegisterCSS from '../../styles/register.module.css';
import { useNavigate } from 'react-router';
import { Data } from '../../App';

import { toast } from 'react-toastify';
const validateName = (name) => {
    const spaceRegex = /\s{3,}/;
    const numberRegex = /\d/;
    return !spaceRegex.test(name) && !numberRegex.test(name);
};

const validateUsername = (username) => {
    const usernameRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,}$/;
    return usernameRegex.test(username);
};

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
};

const validatePassword = (password) => {
    return !/\s/.test(password);
};

export const Register = () => {
    const [RegisterData, setRegisterData] = useState({
        name: '',
        username: '',
        email: '',
        contact_no: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    let navigate = useNavigate();
    let datac = useContext(Data);

    const handleRegisterData = (e) => {
        setRegisterData({ ...RegisterData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!validateName(RegisterData.name)) newErrors.name = 'Numbers and more than one space not allowed';
        if (!validateUsername(RegisterData.username)) newErrors.username = 'Username must contain letters and numbers';
        if (!validateEmail(RegisterData.email)) newErrors.email = 'Invalid email address';
        if (!validatePhone(RegisterData.contact_no)) newErrors.contact_no = 'Phone number must be 10 digits';
        if (!validatePassword(RegisterData.password)) newErrors.password = '" " Not Allowed'

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                let response = await datac.client.post('/user/register', RegisterData);
                if (response.data.status === 201) {
                    console.log("Registration successful");
                    
                   
                        navigate('/login');
                        toast.success('Registration successful! Redirecting to login...', { position: 'top-right' });
                   
                    
                } else {
                    console.log("Registration failed:", response.data.message);
                }
            } catch (error) {
                console.error("Registration failed:", error);
                
                toast.error(`Registration failed : ${error.response.data.message}`);
                datac.setIsLogin(false);
            }
        }
    };

    return (
        <div className={RegisterCSS.container}>
            <div className={RegisterCSS.content}>
                <img src="https://res.cloudinary.com/debbsefe/image/upload/f_auto,c_fill,dpr_auto,e_grayscale/image_fz7n7w.webp" alt="header-image" className="cld-responsive" />
                <h1 className={RegisterCSS.formtitle}>Register Here</h1>
                <form onSubmit={handleSubmit}>
                    <input name='name' className={RegisterCSS.inputinform} onChange={handleRegisterData} type="text" placeholder="Name" required />
                    {errors.name && <span className={RegisterCSS.error}>{errors.name}</span>}

                    <input name='username' className={RegisterCSS.inputinform} onChange={handleRegisterData} type="text" placeholder="Username" required />
                    {errors.username && <span className={RegisterCSS.error}>{errors.username}</span>}

                    {/* <div className={RegisterCSS.beside}> </div> */}
                        <input name='contact_no' type="number" className={RegisterCSS.inputinform} placeholder="Phone No" onChange={handleRegisterData} required />
                    
                        {errors.contact_no && <span className={RegisterCSS.error}>{errors.contact_no}</span>}
                    

                    <input name='email' className={RegisterCSS.inputinform} type="email" placeholder="Email" onChange={handleRegisterData} required />
                    {errors.email && <span className={RegisterCSS.error}>{errors.email}</span>}

                    <input name='password' className={RegisterCSS.inputinform} type="password" placeholder="Password" onChange={handleRegisterData} required />
                    <br />
                    <div style={{ display: 'flex',justifyContent:"space-between" ,alignItems:"center"}}>
                        <button type="submit" className={RegisterCSS.submitbtn}>Submit</button>
                        <div style={{display:'flex',alignItems:"center",marginTop:"15px"}}>
                            <p style={{fontSize:"12px",marginRight:"5px"}}>
                                Already registered? 
                            </p>
                            <button type="button" className={RegisterCSS.rightbtn} onClick={() => navigate('/login')}>Login</button>
                        </div>

                    </div>

                </form>
            </div>
           
        </div>
    );
};