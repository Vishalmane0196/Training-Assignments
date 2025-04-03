import React from 'react'
import userDashboardCSS from '../../style/Userdashboard.module.css'
import { UserNavbar } from '../../components/Navbar/UserNavbar'
import {  NavLink, Outlet }from 'react-router-dom';
export const UserDashboard = () => {
    
  return (
    <>  
       <UserNavbar/>
        <div className={userDashboardCSS.container}>
        {/* <!-- Sidebar --> */}
        <aside className={userDashboardCSS.sidebar}>
            <h2> <i className="fa-solid fa-window-maximize "></i> Dashboard</h2>
            <ul className={userDashboardCSS.ulLink}>
             
               <li>
                 <NavLink
                 to='/user/dashboard/profile'
                 className={({isActive})=>{
                  return isActive?userDashboardCSS.active : userDashboardCSS.linkText
                 }}>
                 <i class="fa-solid fa-user"></i> <span  style={{marginLeft:"0.5rem"}}>  profile</span>
                 </NavLink>
               </li>
               <li>
                 <NavLink
                 to='/user/dashboard/viewpatients'
                 className={({isActive})=>{
                  return isActive?userDashboardCSS.active : userDashboardCSS.linkText
                 }}>
                 <i class="fa-solid fa-list"></i> <span style={{marginLeft:"0.5rem"}}>  View Patients </span>
                 </NavLink>
               </li>
               <li>
                 <NavLink
                 to='/user/dashboard/setting'
                 className={({isActive})=>{
                  return isActive?userDashboardCSS.active : userDashboardCSS.linkText
                 }}>
                 <i class="fa-solid fa-gear"></i> <span style={{marginLeft:"0.5rem"}}>Settings </span> 
                 </NavLink>
               </li>

            </ul>
        </aside>

        {/* <!-- Main Content --> */}
        <div className={userDashboardCSS.outletContainer}>
        <Outlet/>
        </div>
      
    </div>
    </>
  )
}
