import React from "react";
import loadingCSS from "../../style/Loading.module.css";
export const Loading = () => {
  return (
    <div className={loadingCSS.content}>
      <div className={loadingCSS.loadingBar}>
        <div class={loadingCSS.blueBar}></div>
      </div>
    </div>
  );
};
