import React, { useContext, useEffect } from "react";
import { Navbar } from "../Navbar/Navbar";
import AdminCSS from "../../style/AdminDashboard.module.css";
import { NavLink, Outlet } from "react-router-dom";
import { MyContext } from "../../utils/ContextApi";

export const Dashboard = () => {
  const contextData = useContext(MyContext);
  useEffect(() => {
    const getuserInfo = async () => {
      let response = await contextData.axiosInstance.get("user/getUser");
      contextData.setUserInfo({ ...response.data.data[0] });
    };
    getuserInfo();
  }, []);
  return (
    <>
      <Navbar />
      <div className={AdminCSS.container}>
        {/* <!-- Sidebar --> */}
        <aside className={AdminCSS.sidebar}>
          <h2>
            {" "}
            <i className="fa-solid fa-window-maximize "></i> Dashboard
          </h2>
          <ul className={AdminCSS.ullink}>
          <li>
              <NavLink
                to="/admin/dashboard/addpatient"
                className={({ isActive }) => {
                  return isActive ? AdminCSS.active : AdminCSS.linktext;
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
                  return isActive ? AdminCSS.active : AdminCSS.linktext;
                }}
              >
                <i class="fa-solid fa-list"></i>{" "}
                <span style={{ marginLeft: "0.5rem" }}> view Patients </span>
              </NavLink>
            </li>
           
            <li>
              <NavLink
                to="/admin/dashboard/mypatients"
                className={({ isActive }) => {
                  return isActive ? AdminCSS.active : AdminCSS.linktext;
                }}
              >
                <i class="fa-solid fa-window-restore"></i>  {" "}
                <span style={{ marginLeft: "0.5rem" }}>My Patient </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/dashboard/setting"
                className={({ isActive }) => {
                  return isActive ? AdminCSS.active : AdminCSS.linktext;
                }}
              >
                <i class="fa-solid fa-gear"></i>{" "}
                <span style={{ marginLeft: "0.5rem" }}>Setting </span>
              </NavLink>
            </li>
           
          </ul>
        </aside>

        {/* <!-- Main Content --> */}
        <div className={AdminCSS.outletcontainer}>
          <Outlet />
        </div>
      </div>
    </>
  );
};
