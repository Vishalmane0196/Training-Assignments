import React, {  useEffect } from "react";
import userDashboardCSS from "../../style/Userdashboard.module.css";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../redux/asyncThunkFuntions/user";

export const UserMain = () => {
 
  const {userInfo } = useSelector(state => state.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserInfoFun = async () => {
     dispatch(getUserInfo());
    };
    getUserInfoFun();
  }, []);

  return (
    <>
      <main  className={userDashboardCSS.content}>
        {/* <!-- User Profile Section --> */}
        <div className={userDashboardCSS.profile}>
          <div className={userDashboardCSS.profileDiv}>
            <img
              src="https://ud2.spinehrm.in/SUD/ELLICI/UserData/EmpPhotoes/EmpPhoto.jpg"
              className={userDashboardCSS.avatar}
              alt="User Profile"
            />
            <div>
              <h2 >
                {userInfo?.first_name}
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
