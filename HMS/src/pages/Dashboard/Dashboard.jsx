import React from "react";
import { Navbar } from "../../components/Navbar/Navbar.jsx";
import adminCSS from "../../style/AdminDashboard.module.css";
import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const Dashboard = () => {
  const { patientID } = useSelector((state) => state.form);
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
            <span className={adminCSS.menuHeader}>Menu</span>
            <li>
              <NavLink
                to="/dashboard/addpatient"
                className={({ isActive }) => {
                  return isActive ? adminCSS.active : adminCSS.linkText;
                }}
              >
                <i className="fa-solid fa-plus"></i>{" "}
                <span style={{ marginLeft: "0.5rem" }}>Add Patient </span>
                {console.log(window.location)}
                {patientID !== null && (
                  <i
                    title="Form incomplete"
                    className={`fa-solid fa-triangle-exclamation ${adminCSS.warning}`}
                  ></i>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/allpatients"
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
                to="/dashboard/mypatients"
                className={({ isActive }) => {
                  return isActive ? adminCSS.active : adminCSS.linkText;
                }}
              >
                <i class="fa-solid fa-window-restore"></i>{" "}
                <span style={{ marginLeft: "0.5rem" }}>My Patient </span>
              </NavLink>
            </li>
            <span className={adminCSS.menuHeader}>Manage</span>
            <br />

            <li>
              <NavLink
                to="/dashboard/manageDoctor"
                className={({ isActive }) => {
                  return isActive ? adminCSS.active : adminCSS.linkText;
                }}
              >
                <i class="fa-solid fa-stethoscope"></i>{" "}
                <span style={{ marginLeft: "0.5rem" }}>Doctor Overview </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/manageAppointment"
                className={({ isActive }) => {
                  return isActive ? adminCSS.active : adminCSS.linkText;
                }}
              >
                <i class="fa-regular fa-calendar-check"></i>{" "}
                <span style={{ marginLeft: "0.5rem" }}>Appointments </span>
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
