import React from "react";
import userDashboardCSS from "../../style/Userdashboard.module.css";
import { NavLink, Outlet } from "react-router-dom";
import { logout } from "src/redux/slices/authentication/authSlice";
import { useDispatch } from "react-redux";
import { Button } from "src/components/Button/Button";
const UserDashboard = ({ access }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className={userDashboardCSS.container}>
        {/* <!-- Sidebar --> */}
        <aside className={userDashboardCSS.sidebar}>
          <h2>
            {" "}
            <i className="fa-solid fa-window-maximize "></i> Dashboard
          </h2>
          <ul className={userDashboardCSS.ulLink}>
            <li>
              <NavLink
                to={
                  access == "doctor"
                    ? "/doctor/dashboard/profile"
                    : "/user/dashboard/profile"
                }
                className={({ isActive }) => {
                  return isActive
                    ? userDashboardCSS.active
                    : userDashboardCSS.linkText;
                }}
              >
                <i class="fa-solid fa-user"></i>{" "}
                <span style={{ marginLeft: "0.5rem" }}> profile</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={
                  access == "doctor"
                    ? "/doctor/dashboard/viewpatients"
                    : "/user/dashboard/viewpatients"
                }
                className={({ isActive }) => {
                  return isActive
                    ? userDashboardCSS.active
                    : userDashboardCSS.linkText;
                }}
              >
                <i class="fa-solid fa-list"></i>{" "}
                <span style={{ marginLeft: "0.5rem" }}> View Patients</span>
              </NavLink>
            </li>
            {access == "doctor" ? (
              <li>
                <NavLink
                  to="/doctor/dashboard/viewAppointment"
                  className={({ isActive }) => {
                    return isActive
                      ? userDashboardCSS.active
                      : userDashboardCSS.linkText;
                  }}
                >
                  <i class="fa-regular fa-calendar-check"></i>{" "}
                  <span style={{ marginLeft: "0.5rem" }}> Appointments</span>
                </NavLink>
              </li>
            ) : null}
            <li>
              <NavLink
                to={
                  access == "doctor"
                    ? "/doctor/dashboard/setting"
                    : "/user/dashboard/setting"
                }
                className={({ isActive }) => {
                  return isActive
                    ? userDashboardCSS.active
                    : userDashboardCSS.linkText;
                }}
              >
                <i class="fa-solid fa-gear"></i>{" "}
                <span style={{ marginLeft: "0.5rem" }}>Settings </span>
              </NavLink>
            </li>
          </ul>
          <Button
            text={"Log Out"}
            style={userDashboardCSS.logout}
            onClick={() => {
              dispatch(logout());
            }}
          />
        </aside>

        {/* <!-- Main Content --> */}
        <div className={userDashboardCSS.outletContainer}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
