import React, {  useState } from 'react'
import SettingCSS from '../../style/Setting.module.css'
import { DeletePopUp } from './Delete/DeletePopUp';
import { MyContext } from '../../utils/ContextApi';
import {Edit} from '../Setting/Edit/Edit.jsx'

export const AdminSetting = () => {
    const [deleteState, setDeleteState] = useState(false);
    const [editProfile,setEditProfile] = useState(false);
    
  return (
    <>
      <div className={SettingCSS.containercover}>
      <div className={SettingCSS.container}>
       <div >
        <div className={SettingCSS.vertivcalLine}></div>
        <h3 className={SettingCSS.h3headerse}>
            Admin Settings
        </h3>
       </div>
        <div className={SettingCSS.featurecover}>
        <h3 className={SettingCSS.h3header}>
            Change personal info
        </h3>
        <div className={SettingCSS.line}>

        </div>
       <p  className={SettingCSS.p3tag} >
       You can change your email, password, and other details here.
       </p>
       <button className={SettingCSS.editbtn} onClick={()=>{
        setEditProfile(true)
       }}>Edit Profile</button>
        </div>

       {/* Theme Toggle */}
       <div className={SettingCSS.featurecover}>
                <h3 className={SettingCSS.h3header}>Add or remove admin</h3>
                <div className={SettingCSS.line}></div>
                <p className={SettingCSS.p3tag}>Choose between light and dark mode.</p>
               <div className={SettingCSS.inputbtncover}>
               <input type="text" className={SettingCSS.adminmailinput} placeholder='Enter Mail'/>
                <div className={SettingCSS.butcover}>
                  <button className={SettingCSS.addmainbtn}>Add</button>
                  <button className={SettingCSS.delmail}>Remove</button>
                </div>
               </div>
                
            </div>


        <div className={SettingCSS.featurecover}>
        <h3  className={SettingCSS.h3head} >
            Delete Account
        </h3>
        <div className={SettingCSS.line}>

        </div>
       <p  className={SettingCSS.p3tag} >
       Once you delete your account, there is no going back. Please be certain.
       </p>

       <button onClick={()=>{
         setDeleteState(true)
       }} className={SettingCSS.deletebtn}>Delete Account</button>
        </div>
      {editProfile && <Edit editProfile={editProfile} setEditProfile={setEditProfile} />}
      {deleteState  && <DeletePopUp deleteState={deleteState} setDeleteState ={setDeleteState}/>}
    </div>
      </div>

    </>
  )
}


