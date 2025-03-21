import React, { useContext } from 'react'
import { Navbar } from '../Navbar/Navbar'
import UserDashboardCSS from '../../style/Userdashboard.module.css'
import { UserNavbar } from '../Navbar/UserNavbar'
import { Link, NavLink, Outlet }from 'react-router-dom';
import { UserPatientTable } from '../Table/UserPatientTable';
import { useRef } from 'react';
import { MyContext } from '../../utils/ContextApi';
export const UserDashboard = () => {
  const darkRef =  useRef();
  const contextData =useContext(MyContext);
 if(contextData.isDark){
   darkRef.current.style.backgroundColor = '#161b22';
     darkRef.current.style.color = 'white';
 }
 else{
   darkRef.current.style.backgroundColor = 'white';
     darkRef.current.style.color = '#161b22';
 }


  
  return (
    <>  
       <UserNavbar/>
        <div className={UserDashboardCSS.container}>
        {/* <!-- Sidebar --> */}
        <aside className={UserDashboardCSS.sidebar}>
            <h2> <i className="fa-solid fa-window-maximize "></i> Dashboard</h2>
            <ul className={UserDashboardCSS.ullink}>
             
               <li>
                 <NavLink
                 to='/user/dashboard/profile'
                 className={({isActive})=>{
                  return isActive?UserDashboardCSS.active : UserDashboardCSS.linktext
                 }}>
                  profile
                 </NavLink>
               </li>
               <li>
                 <NavLink
                 to='/user/dashboard/viewpatients'
                 className={({isActive})=>{
                  return isActive?UserDashboardCSS.active : UserDashboardCSS.linktext
                 }}>
                  view Patients
                 </NavLink>
               </li>
               <li>
                 <NavLink
                 to='/user/dashboard/setting'
                 className={({isActive})=>{
                  return isActive?UserDashboardCSS.active : UserDashboardCSS.linktext
                 }}>
                  Setting
                 </NavLink>
               </li>

            </ul>
        </aside>

        {/* <!-- Main Content --> */}
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
               <button className={UserDashboardCSS.addpatientbtn}>Add Patient</button>
            </div>

          
            <Outlet/>
            
          
        </main>
    </div>
    </>
  )
}
