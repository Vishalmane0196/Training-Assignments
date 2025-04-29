import PropTypes from "prop-types";
import React from "react";
const InputComponent = ({
  require,
  register,
  trigger,
  fieldName,
  type,
  style,
  pattern,
  placeholder,
  ...rest
}) => {
  return (
    <>
      <input
        className={style}
        {...register(fieldName, {
          required: `${require} is required`,
          pattern: pattern,
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
    </>
  );
};
export default InputComponent;

InputComponent.propTypes = {
  require: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  trigger: PropTypes.func.isRequired,
  fieldName: PropTypes.string.isRequired,
  type: PropTypes.string,
  style: PropTypes.string,
  pattern: PropTypes.shape({
    value: PropTypes.instanceOf(RegExp),
    message: PropTypes.string,
  }),
  placeholder: PropTypes.string,
};
