import React, { useState } from "react";
import settingCSS from "../../../style/Setting.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../../../redux/slices/authentication/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { deleteAccount } from "../../../redux/asyncThunkFuntions/user";
import deleteHero from "src/assets/delete.png";
export const DeletePopUp = ({
  deleteFunction = null,
  id,
  deleteState,
  setDeleteState,
  // functionCall,
  access,
}) => {
  let [msg, setMsg] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [btnState, setBtnState] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const handleDeleteAccount = async () => {
    if (btnState) return;
    try {
      if (deleteFunction !== null) {
        deleteFunction(
          access == "appointment" ? { ...id, ["reason"]: msg } : id
        );
        if (access !== "doctor") {
          setBtnState(false);
          setDeleteState(false);
          // functionCall();
          return;
        } else {
          if (userInfo?.email == id) {
            dispatch(logout());
            navigate("/account/user/login");
          }
        }
        // functionCall();
        setBtnState(false);
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
        setBtnState(false);
      }
    } catch (error) {
      setBtnState(false);
      console.error(error);
      toast.error(`Failed to delete : ${error}`);
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
              <h3>
                {access == "appointment"
                  ? "Appointment Cancellation"
                  : "Final Confirmation Required"}
              </h3>
              {access == "appointment" ? null : (
                <p className={settingCSS.popUph2}>
                  Once confirmed, this operation cannot be undone. Proceed only
                  if you're confident with the decision.
                </p>
              )}
              {access == "appointment" && (
                <>
                  <div className={settingCSS.trash}>
                    <div className={settingCSS.trashLeft}>
                      <span className={settingCSS.popUph2}>
                        Clarification on Appointment Cancellation?
                      </span>
                      <br />
                      <br />
                      <label htmlFor="1">
                        <input
                          id="1"
                          type="radio"
                          name="msg"
                          checked={msg == "Doctor Unavailability"}
                          onClick={(e) => setMsg(e.target.value)}
                          value="Doctor Unavailability"
                        />
                        <span>Doctor Unavailability</span>
                      </label>
                      <br />
                      <label htmlFor="2">
                        <input
                          id="2"
                          type="radio"
                          name="msg"
                          checked={msg == "Overbooking or Long Delays"}
                          onClick={(e) => setMsg(e.target.value)}
                          value="Overbooking or Long Delays"
                        />
                        <span>Overbooking or Long Delays</span>
                      </label>
                      <br />
                      <label htmlFor="3">
                        <input
                          id="3"
                          type="radio"
                          name="msg"
                          checked={msg == "Doctor's Health Issues"}
                          onClick={(e) => setMsg(e.target.value)}
                          value="Doctor's Health Issues"
                        />
                        <span>Doctor's Health Issues</span>
                      </label>
                      <br />
                      <label htmlFor="4">
                        <input
                          id="4"
                          type="radio"
                          onClick={(e) => setMsg(e.target.value)}
                          name="msg"
                          checked={msg == "Change in Doctor's Schedule"}
                          value="Change in Doctor's Schedule"
                        />
                        <span>Change in Doctor's Schedule</span>
                      </label>
                      <br />
                      <span>Other Reason ?</span>
                      <br />
                      <textarea
                        name="msg"
                        cols={40}
                        rows={5}
                        onChange={(e) => setMsg(e.target.value)}
                      ></textarea>
                    </div>
                    <div className={settingCSS.trashRight}>
                      <img src={deleteHero} alt="" />
                    </div>
                  </div>
                </>
              )}
              <div className={settingCSS.btnContainer}>
                <button
                  disabled={btnState}
                  onClick={() => {
                    setDeleteState(false);
                  }}
                  className={settingCSS.btnContainerCancel}
                >
                  {access == "appointment" ? "Close" : "Cancel"}
                </button>
                <button
                  disabled={btnState}
                  onClick={() => {
                    console.log(btnState);
                    if (btnState) {
                      return;
                    } else {
                      handleDeleteAccount();
                    }
                  }}
                  className={settingCSS.deleteBtn}
                >
                  {access == "appointment" ? "Proceed" : "Delete"}
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
