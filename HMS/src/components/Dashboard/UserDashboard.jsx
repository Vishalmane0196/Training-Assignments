import React from 'react'
import { Navbar } from '../Navbar/Navbar'
import UserDashboardCSS from '../../style/Userdashboard.module.css'
import { UserNavbar } from '../Navbar/UserNavbar'
import { Link, NavLink, Outlet }from 'react-router-dom';
import { UserPatientTable } from '../Table/UserPatientTable';
import { MyContext } from '../../utils/ContextApi';
export const UserDashboard = () => {
 


  
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
        <Outlet/>
    </div>
    </>
  )
}
