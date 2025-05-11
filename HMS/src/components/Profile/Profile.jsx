import React, { useEffect, useState } from "react";
import styles from "../../style/AdminProfile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getDoctorProfile } from "src/redux/asyncThunkFuntions/doctor";
import { getUserInfo } from "src/redux/asyncThunkFuntions/user";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const { isAdmin, isDoctor, isSuper } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const getData = async () => {
    let response = {};
    try {
      if (isDoctor) {
        response = await dispatch(getDoctorProfile()).unwrap();
        console.log(response.data[0]);
        setProfile(response.data[0]);
      } else {
        response = await dispatch(getUserInfo()).unwrap();
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>My Profile</h2>

      <section className={styles.card}>
        <div className={styles.profileHeader}>
          {/* <img src={profilePic} alt="Profile" className={styles.avatar} /> */}
          <div>
            <h3 className={styles.name}></h3>
            <p className={styles.role}>Team Manager</p>
            <p className={styles.location}>Leeds, United Kingdom</p>
          </div>
        </div>
      </section>

      <section className={styles.card}>
        <div className={styles.sectionHeader}>
          <h4>Personal Information</h4>
        </div>
        <div className={styles.grid}>
          <div>
            <label>First Name</label>
            <p>Rafiqur</p>
          </div>
          <div>
            <label>Last Name</label>
            <p>Rahman</p>
          </div>
          <div>
            <label>Email address</label>
            <p>rafiqurrahman51@gmail.com</p>
          </div>
          <div>
            <label>Phone</label>
            <p>+09 345 346 46</p>
          </div>
          <div className={styles.fullWidth}>
            <label>Bio</label>
            <p>Team Manager</p>
          </div>
        </div>
      </section>

      <section className={styles.card}>
        <div className={styles.sectionHeader}>
          <h4>Address</h4>
        </div>
        <div className={styles.grid}>
          <div>
            <label>Country</label>
            <p>United Kingdom</p>
          </div>
          <div>
            <label>City/State</label>
            <p>Leeds, East London</p>
          </div>
          <div>
            <label>Postal Code</label>
            <p>ERT 2354</p>
          </div>
          <div>
            <label>TAX ID</label>
            <p>AS45645756</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
