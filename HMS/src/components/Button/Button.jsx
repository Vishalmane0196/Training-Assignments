import React from "react";
export const Button = ({text,style,type,...rest}) => {
  return (
    <>
      <button className={style} {...rest} type={type}>
        {text}
      </button>
    </>
  );
};
