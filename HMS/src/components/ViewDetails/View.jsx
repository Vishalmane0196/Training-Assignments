import React from "react";
import settingCSS from "src/style/Setting.module.css";

export const View = ({ deleteState, setDeleteState, data }) => {
  return (
    <>
      {deleteState && (
        <div className={settingCSS.modal} onClick={() => setDeleteState(false)}>
          <div
            className={settingCSS.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className={settingCSS.close}
              onClick={() => setDeleteState(false)}
            >
              &times;
            </span>
            <div className={settingCSS.popup}>
              <div className={settingCSS.cover}>
                <h3>Disease Discription :</h3>

                <div className={settingCSS.btnContainer}>
                  <div className={settingCSS.setHeight}>
                    {data == "" ? "Empty Description ." : data}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default View;
