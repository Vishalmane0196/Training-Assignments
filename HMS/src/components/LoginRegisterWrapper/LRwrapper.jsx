import React from "react";

import leftRightWrapperCSS from "../../style/LRwrapper.module.css";

import video from "../../assets/video.mp4";
import { Outlet } from "react-router-dom";
export const LRwrapper = () => {
  return (
    <>
      <div className={leftRightWrapperCSS.lrWrapper}>
        <div className={leftRightWrapperCSS.lrWrapperLeftPanel}>
          <div className={leftRightWrapperCSS.titleWrapper}>
            <video
              className={leftRightWrapperCSS.lrVideo}
              src={video}
              autoPlay
              muted
              loop
            ></video>
            <p className={leftRightWrapperCSS.decs}>
              Connect with healthcare professionals and access medical records.
            </p>
          </div>
        </div>
        <div className={leftRightWrapperCSS.lrWrapperRightPanel}>
          <Outlet />
        </div>
      </div>
    </>
  );
};
