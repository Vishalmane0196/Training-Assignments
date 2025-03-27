import React, { useContext, useEffect, useState } from "react";
import styles from "../../style/AdminProfile.module.css";
import { MyContext } from "../../utils/ContextApi";

export const AdminProgile = () => {
    const contextApi = useContext(MyContext);
    const [ToatlPatient ,setToatlPatient] = useState(0)
    const [patient , setPatient] = useState(0);
    useEffect(()=>{
        const fun = async()=>{
                  let response =   await contextApi.axiosInstance.get('/patient/getAllInfo?page=1&limit=5');
                  
                  let response2 = await contextApi.axiosInstance.get('/patient/getPatientInfo');

                  
                  console.log(response)
                    setToatlPatient(()=>{
               return response.data.pagination.totalPatients
                    })
                    setPatient(response2.data.data.length)
                    
        }
        fun();
        
    },[])
  return (
    <div className={styles.profilecover}>
    <div className={styles.profileContainer}>
      {/* Left Section - Profile Info */}

      <div style={{display:'flex',width:"100%",gap:'1rem'}}>
      <div className={styles.profileCard}>
        <div className={styles.imgdiv}>
          <div>
            <img
              src="https://ud2.spinehrm.in/SUD/ELLICI/UserData/EmpPhotoes/EmpPhoto.jpg" // Replace with actual image
              alt="Profile"
              className={styles.profileImage}
            />
            <h2 className={styles.userName}>{contextApi.userInfo?.first_name} {contextApi.userInfo?.last_name}</h2>
            <p className={styles.trustText}>Admin</p>
            
            <p className={styles.trustText}>{}</p>
          </div>
        </div>
      </div>

      {/* Right Section - User Details */}
      <div className={styles.userDetails}>
        <div className={styles.detailRow}>
          <p className={styles.label}>Personal :</p>
        
          <p className={styles.label}>First Name:</p>
          <p className={styles.value}>{contextApi.userInfo?.first_name} </p>
          <p className={styles.label}>Last Name:</p>
          <p className={styles.value}>
          {contextApi.userInfo?.last_name}
          </p>
        </div>

        <div className={styles.detailRow}>
          <p className={styles.label}>Mail :</p>
         
          <p className={styles.label}>Email:</p>
          <p className={styles.value}>{contextApi.userInfo?.email}</p>
          
      
        </div>

        <div className={styles.detailRow}>
          <p className={styles.label}>Mobile :</p>
          <p className={styles.label}>Mobile:</p>
          <p className={styles.value}>{contextApi.userInfo?.mobile_number}</p>
          <p className={styles.label}>Telephone</p>
          <p className={styles.value}>----</p>
          
        </div>

        <div className={styles.detailRow}>
          <p className={styles.label}>Role :</p>
          <p className={styles.value}>Admin</p>
          
        </div>
      </div>
      </div>
      <br />
      <div className={styles.userDetails}>
        <div className={styles.detailRow}>
          <p className={styles.label}>Patient Information :</p>
        
         
        </div>

        <div className={styles.detailRow}>
          <p className={styles.label}>Patients Deatils</p>
         
          <p className={styles.label}>Total Patient : </p>
          <p className={styles.value}>{ToatlPatient}</p>
          <p className={styles.label}>Your Patient</p>
          <p className={styles.value}>{patient}</p>
      
        </div>

      

        <div className={styles.detailRow}>
          <p className={styles.label}>Role :</p>
          <p className={styles.value}>Admin</p>
          
        </div>
      </div>
    </div>
    
    </div>
  );
};
