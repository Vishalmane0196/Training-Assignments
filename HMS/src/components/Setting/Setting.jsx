import React, {  useState } from 'react'
import SettingCSS from '../../style/Setting.module.css'
import { DeletePopUp } from './Delete/DeletePopUp';
import {Edit} from '../Setting/Edit/Edit.jsx'
import { EditPassword } from './Edit/EditPassword.jsx';

export const Setting = () => {
    const [deleteState, setDeleteState] = useState(false);
    const [editProfile,setEditProfile] = useState(false);
    const [reset , setReset] = useState(false);
    
  return (
    <>
    <div className={SettingCSS.container}>
        <div className={SettingCSS.featureCover} >
        <h3 className={SettingCSS.header}>
            Change personal info
        </h3>
        <div className={SettingCSS.line}>

        </div>
       <p  className={SettingCSS.p3tag} >
       You can change your email, password, and other details here.
       </p>
       <button className={SettingCSS.editBtn} onClick={()=>{
        setEditProfile(true)
       }}>Edit Profile</button>
        </div>

       {/* Theme Toggle */}
       <div  className={SettingCSS.featureCover} >
                <h3 className={SettingCSS.header}>Reset Password</h3>
                <div className={SettingCSS.line}></div>
                <p className={SettingCSS.p3tag}>Please enter the password you wish to change.</p>
                <button className={SettingCSS.editBtn} onClick={()=>{
        setReset(true)
       }}>Reset</button>
                
            </div>


        <div  className={SettingCSS.featureCover} >
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
       }} className={SettingCSS.deleteBtn}>Delete Account</button>
        </div>
      {editProfile && <Edit editProfile={editProfile} setEditProfile={setEditProfile} />}
      {deleteState  && <DeletePopUp deleteState={deleteState} setDeleteState ={setDeleteState}/>}
      {
        reset && <EditPassword reset={reset} setReset={setReset}/>
      }
    </div>

    </>
  )
}


