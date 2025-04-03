import React, { useContext } from 'react'
import settingCSS from '../../../style/Setting.module.css'
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
                        <div className={settingCSS.modal} onClick={() => setDeleteState(false)}>
                            <div className={settingCSS.modalContent} onClick={(e) => e.stopPropagation()}>
                                <span className={settingCSS.close} onClick={() => setDeleteState(false)}>
                                    &times;
                                </span>
                                <div className={settingCSS.popup}>
                
                <p className={settingCSS.popUph2}>Are you sure you want to delete?</p>
                <div className={settingCSS.btnContainer}>
                    <button onClick={()=>{
                        setDeleteState(false)
                    }} className={settingCSS.btnContainerCancel}>Cancel</button>
                    <button onClick={handleDeleteAccount} className={settingCSS.deleteBtn}>Delete</button>
                </div>
            </div>
                            </div>
                        </div>
                    )}
    </>
  )
}
