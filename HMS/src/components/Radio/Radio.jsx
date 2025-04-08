import React from 'react'
import personalCSS from "../../style/Personal.module.css";
export const Radio = ({label,require,register,fieldName,errors,type,...rest}) => {
  return (
    <>
     <div className={personalCSS.fieldCoverDiv}>
                  <label className={personalCSS.fieldLabel}>
                    {label} <span className={personalCSS.star}>*</span>
                  </label>
                  <label>
                    <input 
                      {...register(fieldName, {
                        required: `${require} is required`,
                      })}
                      {
                        ...rest
                      }
                      type={type}
                      value="true"
                    />{" "}
                    Yes
                  </label>
                  <label>
                    <input
                      {...register(fieldName, {
                        required: `${require} is required`,
                      })}
                      {
                        ...rest
                      }
                      type={type}
                      value="false"
                      
                    
                    />{" "}
                    No
                  </label>
                  <p className={personalCSS.fielderror}>
                    {errors[fieldName] && (
                      <span className="error">{errors[fieldName].message}</span>
                    )}
                  </p>
                </div>
    </>
  )
}
