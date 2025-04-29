import React from "react";
import personalCSS from "../../style/Personal.module.css";
import PropTypes from "prop-types";
export const Input = ({
  label,
  require,
  register,
  trigger,
  pattern,
  fieldName,
  errors,
  type,
  validate,
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
          {...register(fieldName, {
            required: `${require} is required`,
            validate: validate || "",
            pattern : pattern
          })}
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
Input.propTypes = {
  label: PropTypes.string.isRequired,
  require: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  trigger: PropTypes.func.isRequired,
  pattern: PropTypes.shape({
    value: PropTypes.instanceOf(RegExp),
    message: PropTypes.string,
  }),
  fieldName: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  type: PropTypes.string,
  validate: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]),
  placeholder: PropTypes.string,
};