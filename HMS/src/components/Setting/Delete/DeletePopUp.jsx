import React from 'react'
import SettingCSS from '../../../style/Setting.module.css'
export const DeletePopUp = ({setDeleteState}) => {
    const handleDeleteAccount = () => {
        // Your delete API call goes here
        console.log('Deleting account...');
        setDeleteState(false);
    }

  return (
    <>
        <div className={SettingCSS.overlay}>
            <div className={SettingCSS.popup}>
                <h2 className={SettingCSS.popuph2}>Delete Account</h2>
                <p className={SettingCSS.popuph2}>Are you sure you want to delete?</p>
                <div className={SettingCSS.btncontainer}>
                    <button onClick={()=>{
                        setDeleteState(false)
                    }} className={SettingCSS.btncontainercancel}>Cancel</button>
                    <button onClick={handleDeleteAccount} className={SettingCSS.deletebtn}>Delete Account</button>
                </div>
            </div>
        </div>
    </>
  )
}
