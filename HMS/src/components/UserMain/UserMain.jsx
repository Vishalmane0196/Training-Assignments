import React, { useContext, useEffect, useRef } from 'react'
import { MyContext } from '../../utils/ContextApi';
import UserDashboardCSS from '../../style/Userdashboard.module.css'
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
export const UserMain = () => {
    const navigate  =  useNavigate();
    const darkRef =  useRef();
    const contextData =useContext(MyContext);
  
    useEffect(()=>{
      if(contextData.isDark){
        darkRef.current.style.backgroundColor = '#161b22';
          darkRef.current.style.color = 'white';
      }
      else{
        darkRef.current.style.backgroundColor = 'white';
          darkRef.current.style.color = '#161b22';
      }
    },[contextData.isDark])
  return (
    <>
    
     <main ref={darkRef} className={UserDashboardCSS.content}>
            {/* <!-- User Profile Section --> */}
            <div className={UserDashboardCSS.profile}>
               <div className={UserDashboardCSS.profilediv}>
               <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"className={UserDashboardCSS.avatar} alt="User Profile"/>
                <div>
                    <h2>Vishalmane0196</h2>
                    <p>Your personal account</p>
                </div>
               </div>
               <button onClick={()=>{
                navigate('/user/dashboard/addpatient/')
               }} className={UserDashboardCSS.addpatientbtn}>Add Patient</button>
            </div>

          
            <Outlet/>
            
          
        </main>
    </>
  )
}
