import React, { useContext } from "react";
import styles from "../../style/AdminProfile.module.css";
import { MyContext } from "../../utils/ContextApi";

export const UserProfile = () => {
    const contextApi = useContext(MyContext);
  return (
   <div>
     
     <div className={styles.profilecover}>
    <div className={styles.profileContainer}>
      {/* Left Section - Profile Info */}

      <div style={{display:'flex',width:"100%",gap:'1rem', height:'64vh'}}>
      <div style={contextApi.isDark ? {backgroundColor:"rgba(128, 128, 128, 0.242)"}:{}} className={styles.profileCarduser}>
        <div className={styles.imgDiv}>
          <div>
            <img
              src="https://ud2.spinehrm.in/SUD/ELLICI/UserData/EmpPhotoes/EmpPhoto.jpg" // Replace with actual image
              alt="Profile"
              className={styles.profileImage}
            />
            <h2 className={styles.userName}>{contextApi.userInfo?.first_name} {contextApi.userInfo?.last_name}</h2>
            <p className={styles.trustText}>User</p>
            
            <p className={styles.trustText}>{}</p>
          </div>
        </div>
      </div>

      {/* Right Section - User Details */}
      <div style={contextApi.isDark ? {backgroundColor:"rgba(128, 128, 128, 0.242)"}:{}} className={styles.userDetails}>
        <div className={styles.detailRow}>
      
        
          <p className={styles.label}>First Name:</p>
          <p className={styles.value}>{contextApi.userInfo?.first_name} </p>
          <p style={{marginLeft:"9rem"}} className={styles.label}>Last Name:</p>
          <p className={styles.value}>
          {contextApi.userInfo?.last_name}
          </p>
        </div>

        <div className={styles.detailRow}>
       
         
          <p className={styles.label}>Email:</p>
          <p className={styles.value}>{contextApi.userInfo?.email}</p>
          
      
        </div>

        <div className={styles.detailRow}>
          
          <p className={styles.label}>Mobile:</p>
          <p className={styles.value}>{contextApi.userInfo?.mobile_number}</p>
     
          
        </div>

        <div className={styles.detailRow}>
          <p className={styles.label}>Role :</p>
          <p className={styles.value}>User</p>
          
        </div>
      </div>
      </div>
      <br />
     
    </div>
    
    </div>
   </div>
  );
};
