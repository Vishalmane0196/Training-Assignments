import React, {  useContext, useRef, useState } from 'react'
import settingCSS from '../../style/Setting.module.css'
import { DeletePopUp } from './Delete/DeletePopUp';
import { MyContext } from '../../utils/ContextApi';
import {Edit} from '../Setting/Edit/Edit.jsx'
import { toast } from 'react-toastify';

export const AdminSetting = () => {
    const [deleteState, setDeleteState] = useState(false);
    const [editProfile,setEditProfile] = useState(false);
   const mailRef =  useRef(null);
   const contextApi = useContext(MyContext);
    const handleAdminEmail = async(type) =>{
           if(mailRef.current.value == '')
           {
            toast.error('Please enter email address');
            return;
           }
         try {
             if(type == 'edit')
             {
                let response = await contextApi.axiosInstance.put('/user/addAdmin',{
                  email:mailRef.current.value
                })
                response.data.status == 200 ? toast.success("Admin added") : null;

             }
             else
             {
               let response = await contextApi.axiosInstance.put('/user/removeAdmin',{
                  email:mailRef.current.value
                })
                response.data.status == 200 ? toast.success("Admin deleted") : null;
               
             }
           

             
         } catch (error) {
          console.log(error);
          toast.error(error.response.data.message);
         }
    }
  return (
    <>
      <div className={settingCSS.containerCoverAdmin}>
      <div className={settingCSS.container}>
       <div >
        <div className={settingCSS.verticalLine}></div>
        <h3 className={settingCSS.headerSecond}>
            Admin Settings
        </h3>
       </div>
        <div className={settingCSS.featureCover}>
        <h3 className={settingCSS.h3header}>
            Change personal info
        </h3>
        <div className={settingCSS.line}>

        </div>
       <p  className={settingCSS.p3tag} >
       You can change your email, password, and other details here.
       </p>
       <button className={settingCSS.editBtn} onClick={()=>{
        setEditProfile(true)
       }}>Edit Profile</button>
        </div>

       {/* Theme Toggle */}
       <div className={settingCSS.featureCover}>
                <h3 className={settingCSS.h3header}>Add or remove admin</h3>
                <div className={settingCSS.line}></div>
                <p className={settingCSS.p3tag}>To add or remove an admin, enter the user's email  here.</p>
               <div className={settingCSS.inputBtnCover}>
               <input type="text" ref={mailRef} className={settingCSS.adminMailInput} placeholder='Enter Mail'/>
                <div className={settingCSS.butCover}>
                  <button onClick={()=>handleAdminEmail('edit')} className={settingCSS.addMainBtn}>Add</button>
                  <button onClick={()=>handleAdminEmail('delete')} className={settingCSS.delMail}>Remove</button>
                </div>
               </div>
                
            </div>


        <div className={settingCSS.featureCover}>
        <h3  className={settingCSS.h3head} >
            Delete Account
        </h3>
        <div className={settingCSS.line}>

        </div>
       <p  className={settingCSS.p3tag} >
       Once you delete your account, there is no going back. Please be certain.
       </p>

       <button onClick={()=>{
         setDeleteState(true)
       }} className={settingCSS.deleteBtn}>Delete Account</button>
        </div>
      {editProfile && <Edit editProfile={editProfile} setEditProfile={setEditProfile} />}
      {deleteState  && <DeletePopUp deleteState={deleteState} setDeleteState ={setDeleteState}/>}
    </div>
      </div>

    </>
  )
}


