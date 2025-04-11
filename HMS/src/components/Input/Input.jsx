import React from "react";
import personalCSS from "../../style/Personal.module.css";
export const Input = ({
  label,
  require,
  register,
  trigger,
  fieldName,

  errors,
  type,
  placeholder,
  ...rest
}) => {
  return (
    <>
      <div className={personalCSS.fieldCoverDiv}>
        <label className={personalCSS.fieldLabel}>
          {label} <span className={personalCSS.star}>*</span>
        </label>
        <input
          className={personalCSS.inputfield}
          {...register(fieldName, { required: `${require} is required` })}
          onChange={(e) => {
            const { onChange } = register(fieldName);
            onChange(e);
            trigger(fieldName);
          }}
          {...rest}
          type={type}
          placeholder={placeholder}
        />
        <p className={personalCSS.fielderror}>
          {errors[fieldName] && (
            <span className="error">{errors[fieldName].message}</span>
          )}
        </p>
      </div>
    </>
  );
};
