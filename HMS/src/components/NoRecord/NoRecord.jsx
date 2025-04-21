import React from "react";
import img from "src/assets/norecord.jpg";
import style from 'src/style/NoRecord.module.css'
export const NoRecord = () => {
  return (
    <div className={style.container} >
      <img className={style.images} src={img} alt="no record img" />
    </div>
  );
};
