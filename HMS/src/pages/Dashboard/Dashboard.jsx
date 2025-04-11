import React from "react";
import { Navbar } from "../../components/Navbar/Navbar.jsx";
import adminCSS from "../../style/AdminDashboard.module.css";
import { NavLink, Outlet } from "react-router-dom";

 const Dashboard = () => {
  


  return (
    <>
      <Navbar />
      <div className={adminCSS.container}>
        {/* <!-- Sidebar --> */}
        <aside className={adminCSS.sidebar}>
          <h2>
            {" "}
            <i className="fa-solid fa-window-maximize "></i> Dashboard
          </h2>
          <ul className={adminCSS.ulLink}>
          <li>
              <NavLink
                to="/admin/dashboard/addpatient"
                className={({ isActive }) => {
                  return isActive ? adminCSS.active : adminCSS.linkText;
                }}
              >
                <i class="fa-solid fa-plus"></i>  {" "}
                <span style={{ marginLeft: "0.5rem" }}>Add Patient </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/dashboard/allpatients"
                className={({ isActive }) => {
                  return isActive ? adminCSS.active : adminCSS.linkText;
                }}
              >
                <i class="fa-solid fa-list"></i>{" "}
                <span style={{ marginLeft: "0.5rem" }}> All Patients </span>
              </NavLink>
            </li>
           
            <li>
              <NavLink
                to="/admin/dashboard/mypatients"
                className={({ isActive }) => {
                  return isActive ? adminCSS.active : adminCSS.linkText;
                }}
              >
                <i class="fa-solid fa-window-restore"></i>  {" "}
                <span style={{ marginLeft: "0.5rem" }}>My Patient </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/dashboard/manageDoctor"
                className={({ isActive }) => {
                  return isActive ? adminCSS.active : adminCSS.linkText;
                }}
              >
                <i class="fa-solid fa-stethoscope"></i> {" "}
                <span style={{ marginLeft: "0.5rem" }}>Doctor Overview </span>
              </NavLink>
            </li>
          
           
          </ul>
        </aside>

        {/* <!-- Main Content --> */}
        <div className={adminCSS.outletContainer}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;