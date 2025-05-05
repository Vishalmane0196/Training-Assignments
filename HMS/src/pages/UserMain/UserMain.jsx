import React, { useEffect } from "react";
import userDashboardCSS from "../../style/Userdashboard.module.css";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../redux/asyncThunkFuntions/user";
import { Note } from "src/components/FloatingNote/Note";
const UserMain = () => {
  const { userInfo, isDoctor } = useSelector((state) => state.auth);
  const { patientID } = useSelector((state) => state.form);
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
      <main className={userDashboardCSS.content}>
        {/* <!-- User Profile Section --> */}
        <div className={userDashboardCSS.profile}>
          <div className={userDashboardCSS.profileDiv}>
            <img
              src="https://ud2.spinehrm.in/SUD/ELLICI/UserData/EmpPhotoes/EmpPhoto.jpg"
              className={userDashboardCSS.avatar}
              alt="User Profile"
            />
            <div>
              <h2>
                {isDoctor
                  ? ` Dr. ${userInfo?.first_name}`
                  : userInfo?.first_name}
              </h2>
              <p> {isDoctor ? `Doctor` : `User`}</p>
            </div>
          </div>
          <button
            onClick={() => {
              isDoctor
                ? navigate("/dashboard/addpatient/")
                : navigate("/dashboard/addpatient/");
            }}
            className={userDashboardCSS.addPatientBtn}
          >
            Add Patient
          </button>
        </div>

        <Outlet />

        {patientID !== null && <Note />}
      </main>
    </>
  );
};

export default UserMain;
