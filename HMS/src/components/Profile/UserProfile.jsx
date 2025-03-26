import React, { useContext, useState } from "react";
import UserProfileCSS from "../../style/UserProfile.module.css";
import { MyContext } from "../../utils/ContextApi";
import { Edit } from "../Setting/Edit/Edit";

export const UserProfile = () => {
  const [editProfile,setEditProfile] = useState(false);
  const handleEdit = () => {
    setEditProfile(pre => !pre)
  };
  const Contexdata = useContext(MyContext);
  return (
    <>
      <div className={UserProfileCSS.container}>
        <h3 className={UserProfileCSS.h3tag}>Profile</h3>
        <div className={UserProfileCSS.line}></div>
        <div style={{ display: "flex", gap: "3rem" }}>
          <div className={UserProfileCSS.fieldcoverdiv}>
            <label className={UserProfileCSS.fieldlabel}>First Name</label>
            <h3 className={UserProfileCSS.inputfield}>
              {Contexdata.userInfo?.first_name}
            </h3>
          </div>

          <div className={UserProfileCSS.fieldcoverdiv}>
            <label className={UserProfileCSS.fieldlabel}>Last Name</label>
            <h3 className={UserProfileCSS.inputfield}>
              {Contexdata.userInfo?.last_name}
            </h3>
          </div>

          <div className={UserProfileCSS.fieldcoverdiv}>
            <label className={UserProfileCSS.fieldlabel}>Email</label>
            <h3 className={UserProfileCSS.inputfield}>
              {Contexdata.userInfo?.email}
            </h3>
          </div>
          <div className={UserProfileCSS.fieldcoverdiv}>
            <label className={UserProfileCSS.fieldlabel}>Mobile</label>
            <h3 className={UserProfileCSS.inputfield}>
              {Contexdata.userInfo?.mobile_number}
            </h3>
          </div>
        </div>
        <button onClick={handleEdit} className={UserProfileCSS.editbtn}>
          Edit Profile
        </button>
        {editProfile && <Edit editProfile={editProfile} setEditProfile={setEditProfile}/>}
      </div>
    </>
  );
};
