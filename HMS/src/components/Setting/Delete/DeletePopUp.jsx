import React, { useContext } from 'react'
import SettingCSS from '../../../style/Setting.module.css'
import { MyContext } from '../../../utils/ContextApi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
export const DeletePopUp = ({deleteState,setDeleteState}) => {
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
              toast.success('Account deleted successfully! Redirecting to login...', { position: 'top-right' });
        } catch (error) {
            
            toast.error(`Failed to delete account : ${error.response.data.message}`);
            
        } 
    }

  return (
    <>
        
          {deleteState && (
                        <div className={SettingCSS.modal} onClick={() => setDeleteState(false)}>
                            <div className={SettingCSS.modalContent} onClick={(e) => e.stopPropagation()}>
                                <span className={SettingCSS.close} onClick={() => setDeleteState(false)}>
                                    &times;
                                </span>
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
                        </div>
                    )}
    </>
  )
}
