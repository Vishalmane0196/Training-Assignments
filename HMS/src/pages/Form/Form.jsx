import React, { useState } from "react";
import { PersonalInfo } from "./PersonalInfo";
import formCSS from "../../style/Form.module.css";
import { FamilyInfo } from "../Form/FamilyInfo";
import { DocumentInfo } from "./DocumentInfo";
import { DiseaseInfo } from "./DiseaseInfo";
import { Final } from "./Final";
import { useDispatch, useSelector } from "react-redux";
import { setStep } from "../../redux/slices/multistepform/formSlice";
import { setPatientID } from "../../redux/slices/multistepform/formSlice";
import { toast } from "react-toastify";
export const Form = () => {
  const dispatch = useDispatch();
  const { step, patientID } = useSelector((state) => state.form);
  const [count, setCount] = useState(0);
  const handleMultiStepForm = (step) => {
    switch (step) {
      case 0:
        return (
          <PersonalInfo
            patientId={patientID}
            setPatientId={setPatientID}
            setStep={setStep}
            setCount={setCount}
          />
        );
      case 1:
        return (
          <FamilyInfo
            count={count}
            setCount={setCount}
            patientId={patientID}
            setStep={setStep}
          />
        );
      case 2:
        return (
          <DiseaseInfo
            count={count}
            setCount={setCount}
            setStep={setStep}
            patientId={patientID}
          />
        );
      case 3:
        return <DocumentInfo patientId={patientID} setStep={setStep} />;
      case 4:
        return <Final setStep={setStep} setPatientId={setPatientID} />;
      case 5:
      default:
        return null;
    }
  };

  return (
    <>
      <div className={formCSS.container}>
        <div className={formCSS.stepCover}>
          {[
            "Personal Info",
            "Family Info",
            "Disease Info",
            "File Upload",
            "Completed",
          ].map((label, index) => (
            <label
              htmlFor={index}
              onClick={() => {
                if (count >= index) {
                  dispatch(setStep(index));
                } else {
                  toast.warn("Complete previous form.");
                }
              }}
            >
              <div
                id={index}
                key={index}
                className={`${formCSS.step} ${
                  step >= index ? formCSS.active : ""
                }`}
              >
                <h3 className={formCSS.stepNo}>{index + 1}</h3>
                <p className={formCSS.stepDetail}>{label}</p>
              </div>
            </label>
          ))}
        </div>
        <div className={formCSS.line}> </div>
        {handleMultiStepForm(step)}
      </div>
    </>
  );
};
