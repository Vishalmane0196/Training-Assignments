import React from "react";
import settingCSS from "../../../style/Setting.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../../../redux/slices/authentication/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { deleteAccount } from "../../../redux/asyncThunkFuntions/user";

export const DeletePopUp = ({
  deleteFunction = null,
  id,
  deleteState,
  setDeleteState,
  functionCall,
  access,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const handleDeleteAccount = async () => {
    try {
      if (deleteFunction !== null) {
        await dispatch(deleteFunction(id)).unwrap();
        functionCall();
        if (access !== "doctor") {
          return;
        } else {
          console.log("here i am ");

          if (userInfo?.email == id) {
            console.log("aat nahi aalo");

            dispatch(logout());
            navigate("/account/user/login");
          }
        }
        setDeleteState(false);

        toast.success("Record Deleted Successfully");
      } else {
        await dispatch(deleteAccount("delete")).unwrap();
        setDeleteState(false);
        localStorage.clear();
        dispatch(logout());
        navigate("/account/user/login");
        toast.success("Account deleted successfully! Redirecting to login...", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error(`Failed to delete : ${error.response.data.message}`);
    }
  };

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
              <p className={settingCSS.popUph2}>
                Are you sure you want to delete?
              </p>
              <div className={settingCSS.btnContainer}>
                <button
                  onClick={() => {
                    setDeleteState(false);
                  }}
                  className={settingCSS.btnContainerCancel}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className={settingCSS.deleteBtn}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeletePopUp;
