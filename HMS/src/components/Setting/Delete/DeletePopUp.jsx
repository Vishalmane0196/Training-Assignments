import React, { useContext } from 'react'
import SettingCSS from '../../../style/Setting.module.css'
import { MyContext } from '../../../utils/ContextApi'
import { useNavigate } from 'react-router-dom'
export const DeletePopUp = ({setDeleteState}) => {
   const navigate =  useNavigate();
    const contextData =  useContext(MyContext);
    
    const handleDeleteAccount =async() => {
        try {
            let response = await contextData.axiosInstance.delete('/user/deleteUser');
              console.log(response);
              setDeleteState(false);
              localStorage.clear();
              contextData.setToken(null);
              contextData.setIsAdmin(false);
              navigate('/account/user/login');
        } catch (error) {
            console.log(error)
        }
        console.log('Deleting account...');

        
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
