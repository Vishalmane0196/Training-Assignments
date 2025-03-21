import React, { useContext, useState } from 'react'
import SettingCSS from '../../style/Setting.module.css'
import { DeletePopUp } from './Delete/DeletePopUp';
import { MyContext } from '../../utils/ContextApi';

export const Setting = () => {
    const [deleteState, setDeleteState] = useState(false);
    const contextData = useContext(MyContext);
  return (
    <>
    <div className={SettingCSS.container}>
        <div>
        <h3 className={SettingCSS.h3header}>
            Change personal info
        </h3>
        <div className={SettingCSS.line}>

        </div>
       <p  className={SettingCSS.p3tag} >
       You can change your email, password, and other details here.
       </p>
       <button className={SettingCSS.editbtn}>Edit Profile</button>
        </div>

       {/* Theme Toggle */}
       <div>
                <h3 className={SettingCSS.h3header}>Theme</h3>
                <div className={SettingCSS.line}></div>
                <p className={SettingCSS.p3tag}>Choose between light and dark mode.</p>
                <label className={SettingCSS.switch}>
                    <input 
                        type="checkbox" 
                        checked={contextData.isDark} 
                        onChange={() => contextData.setIsDark(!contextData.isDark)} 
                    />
                    <span className={SettingCSS.slider}></span>
                </label>
                <span className={contextData.isDark ? SettingCSS.themeTextb : SettingCSS.themeText}>
                    {contextData.isDark ? "Dark Mode" : "Light Mode"}
                </span>
            </div>


        <div>
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
      {deleteState  && <DeletePopUp setDeleteState ={setDeleteState}/>}
    </div>

    </>
  )
}


