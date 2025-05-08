import React from "react";
import userDashboardCSS from "../../style/Userdashboard.module.css";
import { NavLink, Outlet } from "react-router-dom";
import { logout } from "src/redux/slices/authentication/authSlice";
import { useDispatch } from "react-redux";
import { Button } from "src/components/Button/Button";
import UserMain from "../UserMain/UserMain";
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
                to={access == "doctor" ? "/profile" : "/profile"}
                className={({ isActive }) => {
                  return isActive
                    ? userDashboardCSS.active
                    : userDashboardCSS.linkText;
                }}
              >
                <i class="fa-solid fa-user"></i>{" "}
                <span style={{ marginLeft: "0.5rem" }}> Profile</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={access == "doctor" ? "/mypatients" : "/mypatients"}
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
                  to="/appointment"
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
                to={access == "doctor" ? "/setting" : "/setting"}
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
          <UserMain />
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
