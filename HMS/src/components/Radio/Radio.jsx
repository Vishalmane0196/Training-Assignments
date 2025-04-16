import React from "react";
import personalCSS from "../../style/Personal.module.css";
export const Radio = ({
  label,
  require,
  register,
  fieldName,
  errors,
  type,
  ...rest
}) => {
  return (
    <>
      <div className={personalCSS.fieldCoverDiv}>
        <label className={personalCSS.fieldLabel}>
          {label} <span className={personalCSS.star}>*</span>
        </label>
        <label style={{ cursor: "pointer" }} htmlFor={`${fieldName}yes`}>
          <input
            {...register(fieldName, {
              required: `${require} is required`,
            })}
            {...rest}
            type={type}
            value="true"
            id={`${fieldName}yes`}
          />{" "}
          Yes
        </label>
        <label style={{ cursor: "pointer" }} htmlFor={`${fieldName}no`}>
          <input
            {...register(fieldName, {
              required: `${require} is required`,
            })}
            {...rest}
            type={type}
            value="false"
            id={`${fieldName}no`}
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
  );
};
