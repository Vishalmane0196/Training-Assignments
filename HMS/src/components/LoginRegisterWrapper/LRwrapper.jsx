import React from "react";
import { Login } from "../Login/Login.jsx";
import LRwrapperCSS from "../../style/LRwrapper.module.css";
import { Register } from "../Register/Register.jsx";
import video from "../../assets/video.mp4";
import { Outlet } from "react-router-dom";
export const LRwrapper = () => {
  return (
    <>
      <div className={LRwrapperCSS.lrwrapper}>
        <div className={LRwrapperCSS.lrwrapperleftpanel}>
          <div className={LRwrapperCSS.titlewrapper}>
           
            <p className={LRwrapperCSS.decs}>
              Connect with healthcare professionals and
              access medical records seamlessly.
            </p>
            
          </div>
          <video className={LRwrapperCSS.lrvideo} src={video}  autoPlay muted loop></video>
        </div>
        <div className={LRwrapperCSS.lrwrapperrightpanel}>
          <Outlet/>
        </div>
      </div>
    </>
  );
};
