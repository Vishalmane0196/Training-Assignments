import React, { useContext } from "react";
import styles from '../../../style/Edit.module.css'
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { MyContext } from "../../../utils/ContextApi";


export const Edit = ({editProfile,setEditProfile}) => {
    const Contextdata =  useContext(MyContext);
    const {
      register,
      handleSubmit,
      trigger,
      formState: { errors },
    } = useForm({
      defaultValues: {
        email: Contextdata.userInfo.email,
        first_name: Contextdata.userInfo.first_name,
        last_name: Contextdata.userInfo.last_name,
        mobile_number : Contextdata.userInfo.mobile_number
      },
    });
    
    const sendDataToUpdate = async(data)=>{
        try {
            let response =  await Contextdata.axiosInstance.put('/user/updateUser',data)
            console.log(response)
            setEditProfile(false);
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.log(error)
            toast.error(error);
        }
    }
const handleUpdateData = (data) =>{
   console.log(data);
   sendDataToUpdate(data)
}
    return (
        <div>
            {editProfile && (
                <div className={styles.modal} onClick={() => setEditProfile(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <span className={styles.close} onClick={() => setEditProfile(false)}>
                            &times;
                        </span>
                        <h2 className={styles.h2tag}>Update Profile</h2>
                        <form action="" onSubmit={handleSubmit(handleUpdateData)}>
                            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                            <label htmlFor=""> Email</label>
                                {errors.email && <span>{errors.email.message}</span> }
                            </div>
                        
                        <input
                                       className={styles.inputtag}
                                       {...register("email", {
                                         required: true,
                                        
                                         pattern: {
                                            value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                                           message: "Invalid format",
                                         },
                                       })}
                                       onChange={(e) => {
                                         const { onChange } = register("email");
                                         onChange(e);
                                         trigger("email");
                                       }}
                                       type="email"
                                       placeholder="Enter your email"
                                     />
                         <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                            <label htmlFor=""> First Name</label>
                                {errors.first_name && <span>{errors.first_name.message}</span> }
                            </div>
                        <input
                                       className={styles.inputtag}
                                       {...register("first_name", {
                                         required: true,
                                         maxLength: 20,
                                         pattern: {
                                           value: /^[A-Za-z]+$/,
                                           message: "Invalid format",
                                         },
                                       })}
                                       onChange={(e) => {
                                         const { onChange } = register("first_name");
                                         onChange(e);
                                         trigger("first_name");
                                       }}
                                       type="text"
                                       placeholder="Enter your First Name"
                                     />
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                            <label htmlFor=""> Last Name</label>
                                {errors.last_name && <span>{errors.last_name.message}</span> }
                            </div>
                        <input
                                       className={styles.inputtag}
                                       {...register("last_name", {
                                         required: true,
                                         
                                         pattern: {
                                           value: /^[A-Za-z]+$/,
                                           message: "Invalid format",
                                         },
                                       })}
                                       onChange={(e) => {
                                         const { onChange } = register("last_name");
                                         onChange(e);
                                         trigger("last_name");
                                       }}
                                       type="text"
                                       placeholder="Enter your Last Name"
                                     />
                         <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                            <label htmlFor=""> Mobile Number</label>
                                {errors.mobile_number && <span>{errors.mobile_number.message}</span> }
                            </div>
                        <input
                                       className={styles.inputtag}
                                       {...register("mobile_number", {
                                         required: true,
                                         maxLength: 20,
                                         pattern: {
                                            value: /^[0-9]{10}$/,
                                           message: "Invalid format",
                                         },
                                       })}
                                       onChange={(e) => {
                                         const { onChange } = register("mobile_number");
                                         onChange(e);
                                         trigger("mobile_number");
                                       }}
                                       type="number"
                                       placeholder="Enter your number"
                                     />
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                            <label htmlFor=""> Password</label>
                                {errors.user_password && <span>{errors.user_password.message}</span> }
                            </div>
                        <input
                                       className={styles.inputtag}
                                       {...register("user_password", {
                                         required: true,
                                        
                                         pattern: {
                                           
                                         },
                                       })}
                                       onChange={(e) => {
                                         const { onChange } = register("user_password");
                                         onChange(e);
                                         trigger("user_password");
                                       }}
                                       type="password"
                                       placeholder="Enter your Password"
                                     />
                        <button type="submit" className={styles.submitBtn}>Change Profile</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
