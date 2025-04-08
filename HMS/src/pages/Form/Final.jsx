import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
export const Final = ({ setStep, setPatientId }) => {
  const dispatch = useDispatch();
  const resetAllValues = async () => {
    localStorage.removeItem("file_preview");
    localStorage.removeItem("upload_status");
    dispatch(setStep(0));
    await dispatch(setPatientId(null));
  };
  useEffect(() => {
    resetAllValues();
  },[]);
  return (
    <>
      <h1>Form Submitted Successfully!</h1>
      <p>Thank you for filling out the form.</p>
    </>
  );
};

Final.prototype = {
  setStep: PropTypes.func,
  setPatientId: PropTypes.func,
};
