import React, { useContext, useState } from 'react'
import RegisterCSS from '../../styles/register.module.css'
import { useNavigate } from 'react-router'
import { Data } from '../../App'
export const Register = () => {
    const [RegisterData, setRegisterData] = useState({});
    let navigate = useNavigate();
    let datac = useContext(Data);

    const handleRegisterData = (e) => {
        setRegisterData({ ...RegisterData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response = await datac.client.post('/user/register', RegisterData);
            if (response.data.status === 201) {
                console.log("Registration successful");
                navigate('/login');
            } else {
                console.log("Registration failed:", response.data.message);
            }
           
        } catch (error) {
            console.error("Registration failed:", error);
            datac.setIsLogin(false);
        }
    };

    return (
        <>
            <div className={RegisterCSS.container}>
                <div className={RegisterCSS.content}>
                    <img src="https://res.cloudinary.com/debbsefe/image/upload/f_auto,c_fill,dpr_auto,e_grayscale/image_fz7n7w.webp" alt="header-image" className="cld-responsive" />
                    <h1 className={RegisterCSS.formtitle}>Register Here</h1>
                    <form >
                        <input name='name' className={RegisterCSS.inputinform} onChange={handleRegisterData} type="text" placeholder="Name" />
                        
                        <input name='username' className={RegisterCSS.inputinform} onChange={handleRegisterData} type="text" placeholder="Username" />

                        <div className={RegisterCSS.beside}>
                            <input name='contact_no' type="number" className={RegisterCSS.inputinform} placeholder="Phone No" onChange={handleRegisterData} />
                        </div>

                        <input name='email' className={RegisterCSS.inputinform} type="email" placeholder="Email" onChange={handleRegisterData} />

                        <input name='password' className={RegisterCSS.inputinform} type="password" placeholder="password " onChange={handleRegisterData} />

                        <br />
                        <button type="submit" className={RegisterCSS.submitbtn} onClick={handleSubmit}>Submit</button>
                        <button type="button" className={RegisterCSS.rightbtn} onClick={() => navigate('/login')}>Login</button>
                    </form>

                </div>
            </div>
        </>
    )
}
