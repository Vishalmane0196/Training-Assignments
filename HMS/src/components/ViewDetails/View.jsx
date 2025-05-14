import React from "react";
import settingCSS from "src/style/Setting.module.css";

export const View = ({
  deleteState,
  setDeleteState,
  data,
  label = "Description",
}) => {
  return (
    <>
      {deleteState && (
        <div className={settingCSS.modal} onClick={() => setDeleteState(false)}>
          <div
            className={settingCSS.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            {console.log(data)}
            <span
              className={settingCSS.close}
              onClick={() => setDeleteState(false)}
            >
              &times;
            </span>
            <div className={settingCSS.popup}>
              <div className={settingCSS.cover}>
                <h3> {label}:</h3>

                <div className={settingCSS.btnContainer}>
                  <div className={settingCSS.setHeight}>
                    {data == null ? "Please upload to see ." : data}
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
