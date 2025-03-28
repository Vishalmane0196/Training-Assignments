import React, {  useContext, useRef, useState } from 'react'
import SettingCSS from '../../style/Setting.module.css'
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
                let reponse = await contextApi.axiosInstance.put('/user/addAdmin',{
                  email:mailRef.current.value
                })
                reponse.data.status == 200 ? toast.success("Admin added") : null;

             }
             else
             {
               let reponse = await contextApi.axiosInstance.put('/user/removeAdmin',{
                  email:mailRef.current.value
                })
                reponse.data.status == 200 ? toast.success("Admin deleted") : null;
               
             }
           

             
         } catch (error) {
          console.log(error);
          toast.error(error.response.data.message);
         }
    }
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
                <p className={SettingCSS.p3tag}>To add or remove an admin, enter the user's email  here.</p>
               <div className={SettingCSS.inputbtncover}>
               <input type="text" ref={mailRef} className={SettingCSS.adminmailinput} placeholder='Enter Mail'/>
                <div className={SettingCSS.butcover}>
                  <button onClick={()=>handleAdminEmail('edit')} className={SettingCSS.addmainbtn}>Add</button>
                  <button onClick={()=>handleAdminEmail('delete')} className={SettingCSS.delmail}>Remove</button>
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


