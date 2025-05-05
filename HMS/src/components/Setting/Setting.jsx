import React, { useState } from "react";
import settingCSS from "../../style/Setting.module.css";
import { DeletePopUp } from "./Delete/DeletePopUp";
import { Edit } from "./Edit/Edit.jsx";
import EditPassword from "./Edit/EditPassword.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Setting = () => {
  const navigate = useNavigate();
  const [deleteState, setDeleteState] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [reset, setReset] = useState(false);

  const { isAdmin, isSuper } = useSelector((state) => state.auth);

  const handleAdminEmail = () => {
    navigate("/setting/accessControl");
  };

  return (
    <>
      <div className={settingCSS.containerCoverAdmin}>
        <div className={settingCSS.container}>
          <div>
            <div className={settingCSS.verticalLine}></div>
            <h3 className={settingCSS.headerSecond}>Settings</h3>
          </div>

          {/* Shared Section - Edit Profile */}
          <div className={settingCSS.featureCover}>
            <h3 className={settingCSS.h3header}>Change personal info</h3>
            <div className={settingCSS.line}></div>
            <p className={settingCSS.p3tag}>
              You can change your email, password, and other details here.
            </p>
            <button
              className={settingCSS.editBtn}
              onClick={() => setEditProfile(true)}
            >
              Edit Profile
            </button>
          </div>

          {/* Admin-only Section */}

          {isAdmin == 1 && (
            <div className={settingCSS.featureCover}>
              <h3 className={settingCSS.h3header}>Control admin access</h3>
              <div className={settingCSS.line}></div>
              <p className={settingCSS.p3tag}>
                You can modify admin access, including adding or removing
                administrators.
              </p>
              <div className={settingCSS.inputBtnCover}>
                <div className={settingCSS.butCover}>
                  <button
                    onClick={handleAdminEmail}
                    className={settingCSS.editBtn}
                  >
                    Manage Admins
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Delete Account – Hidden for super admin */}
          {!isSuper && (
            <div className={settingCSS.featureCover}>
              <h3 className={settingCSS.h3head}>Delete Account</h3>
              <div className={settingCSS.line}></div>
              <p className={settingCSS.p3tag}>
                Once you delete your account, there is no going back. Please be
                certain.
              </p>
              <button
                onClick={() => setDeleteState(true)}
                className={settingCSS.deleteBtn}
              >
                Delete Account
              </button>
            </div>
          )}

          {/* Modals */}
          {editProfile && (
            <Edit editProfile={editProfile} setEditProfile={setEditProfile} />
          )}
          {deleteState && (
            <DeletePopUp
              deleteState={deleteState}
              setDeleteState={setDeleteState}
            />
          )}
          {reset && <EditPassword reset={reset} setReset={setReset} />}
        </div>
      </div>
    </>
  );
};

export default Setting;
