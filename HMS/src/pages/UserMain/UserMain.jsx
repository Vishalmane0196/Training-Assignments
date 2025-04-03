import React, { useContext, useEffect, useRef } from "react";
import { MyContext } from "../../utils/ContextApi";
import userDashboardCSS from "../../style/Userdashboard.module.css";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
export const UserMain = () => {
  const navigate = useNavigate();
  const darkRef = useRef();
  const contextData = useContext(MyContext);

  useEffect(() => {
    if (contextData.isDark) {
      darkRef.current.style.backgroundColor = "#161b22";
      darkRef.current.style.color = "white";
    } else {
      darkRef.current.style.backgroundColor = "white";
      darkRef.current.style.color = "#161b22";
    }
  }, [contextData.isDark]);

  useEffect(() => {
    const getUserInfo = async () => {
      let response = await contextData.axiosInstance.get("user/getUser");
      contextData.setUserInfo({ ...response.data.data[0] });
    };
    getUserInfo();
  }, []);

  return (
    <>
      <main ref={darkRef} className={userDashboardCSS.content}>
        {/* <!-- User Profile Section --> */}
        <div className={userDashboardCSS.profile}>
          <div className={userDashboardCSS.profileDiv}>
            <img
              src="https://ud2.spinehrm.in/SUD/ELLICI/UserData/EmpPhotoes/EmpPhoto.jpg"
              className={userDashboardCSS.avatar}
              alt="User Profile"
            />
            <div>
              <h2 style={contextData.isDark ? { color: "white" } : {}}>
                {contextData.userInfo?.first_name}
              </h2>
              <p>Your personal account</p>
            </div>
          </div>
          <button
            onClick={() => {
              navigate("/user/dashboard/addpatient/");
            }}
            className={userDashboardCSS.addPatientBtn}
          >
            Add Patient
          </button>
        </div>

        <Outlet />
      </main>
    </>
  );
};
