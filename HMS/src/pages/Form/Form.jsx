import React, { useState } from "react";
import { PersonalInfo } from "./PersonalInfo";
import formCSS from "../../style/Form.module.css";
import { FamilyInfo } from "../Form/FamilyInfo";
import { DocumentInfo } from "./DocumentInfo";
import { DiseaseInfo } from "./DiseaseInfo";
import { Final } from "./Final";
export const Form = () => {
  const [step, setStep] = useState(parseInt (localStorage.getItem("step")) || 0);
  const [patientId, setPatientId] = useState(((localStorage.getItem('patientId')) || null));
  const[count,setCount] =useState(0);
  const handleMultiStepForm = (step) => {
    switch (step) {
      case 0:
        return (
          <PersonalInfo
            patientId={patientId}
            setPatientId={setPatientId}
            setStep={setStep}
            setCount={setCount}
          />
        );
      case 1:
        return <FamilyInfo count={count} setCount={setCount} patientId={patientId} setStep={setStep} />;
      case 2:
        return <DiseaseInfo count={count} setCount={setCount}  setStep={setStep} patientId={patientId} />;
      case 3:
        return <DocumentInfo patientId={patientId} setStep={setStep} />;
        case 4 :
          return <Final setStep={setStep} setPatientId={setPatientId}/>;
      case 5:
      default:
        return null;
    }
  };

  return (
    <>
      <div className={formCSS.container}>
        <div className={formCSS.stepCover}>
          {["Personal Info", "Family Info","Disease Info", "File Upload", "Completed"].map(
            (label, index) => (
              <div
                key={index}
                className={`${formCSS.step} ${
                  step >= index ? formCSS.active : ""
                }`}
              >
                <h3 className={formCSS.stepNo}>{index + 1}</h3>
                <p className={formCSS.stepDetail}>{label}</p>
              </div>
            )
          )}
        </div>
        <div className={formCSS.line}> </div>
        {handleMultiStepForm(step)}
      </div>
    </>
  );
};
