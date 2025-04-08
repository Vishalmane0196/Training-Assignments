import React, { useEffect, useState } from "react";
import styles from "../../style/AdminProfile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatientsInfo } from "../../redux/asyncThunkFuntions/user";

const Profile = () => {
  const { userInfo, isAdmin } = useSelector((state) => state.auth);
  const { totalPatient } = useSelector((state) => state.patient);
  const dispatch = useDispatch();

  const [patient, setPatient] = useState(0);
  useEffect(() => {
    const fun = async () => {
      let response2 = await dispatch(fetchPatientsInfo("get")).unwrap();
      setPatient(response2.data.length);
    };
    fun();
  }, []);
  return (
    <div>
      <div className={styles.profileContainer}>
        <div
          style={{
            display: "flex",
            width: "100%",
            gap: "1rem",
            height: "48vh",
          }}
        >
          <div className={styles.profileCard}>
            <div className={styles.imgDiv}>
              <div>
                <img
                  src="https://ud2.spinehrm.in/SUD/ELLICI/UserData/EmpPhotoes/EmpPhoto.jpg" // Replace with actual image
                  alt="Profile"
                  className={styles.profileImage}
                />
                <h2 className={styles.userName}>
                  {userInfo?.first_name} {userInfo?.last_name}
                </h2>
                <p className={styles.trustText}>{isAdmin ? "Admin" : "User"}</p>

                <p className={styles.trustText}>{}</p>
              </div>
            </div>
          </div>

          {/* Right Section - User Details */}
          <div className={styles.userDetails}>
            <div className={styles.detailRow}>
              <p className={styles.label}>First Name:</p>
              <p className={styles.value}>{userInfo?.first_name} </p>
              <p style={{ marginLeft: "9rem" }} className={styles.label}>
                Last Name:
              </p>
              <p className={styles.value}>{userInfo?.last_name}</p>
            </div>

            <div className={styles.detailRow}>
              <p className={styles.label}>Email:</p>
              <p className={styles.value}>{userInfo?.email}</p>
            </div>

            <div className={styles.detailRow}>
              <p className={styles.label}>Mobile:</p>
              <p className={styles.value}>{userInfo?.mobile_number}</p>
            </div>

            <div className={styles.detailRow}>
              <p className={styles.label}>Role :</p>
              <p className={styles.value}>{isAdmin ? "Admin" : "User"}</p>
            </div>
          </div>
        </div>
        <br />
        <div className={styles.userDetails}>
          <div className={styles.detailRow}>
            <p className={styles.label}>Patient Information :</p>
          </div>

          <div className={styles.detailRow}>
            {isAdmin == 1 && <p className={styles.label}>Total Patient : </p>}
            {isAdmin == 1 && <p className={styles.value}>{totalPatient}</p>}
            <br />
            {isAdmin == 0 && (
              <>
                {" "}
                <p className={styles.label}>Your Patient</p>
                <p className={styles.value}>{patient}</p>
              </>
            )}
          </div>
          {isAdmin == 1 && (
            <div className={styles.detailRow}>
              <p className={styles.label}>Your Patient</p>
              <p className={styles.value}>{patient}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
