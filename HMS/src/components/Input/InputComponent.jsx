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
