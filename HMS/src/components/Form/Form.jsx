import React, { useState } from "react";
import { PersonalInfo } from "./PersonalInfo";
import FormCSS from "../../style/Form.module.css";
import { FamilyInfo } from "../Form/FamilyInfo";
import { DocumentInfo } from "./DocumentInfo";
import { DiseaseInfo } from "./DiseaseInfo";
import { Final } from "./Final";
export const Form = () => {
  const [step, setStep] = useState(parseInt (localStorage.getItem("step")) || 0);
  const [patientId, setPatientId] = useState(((localStorage.getItem('patientId')) ||null));
  const handleMultiStepForm = (step) => {
    switch (step) {
      case 0:
        return (
          <PersonalInfo
            patientId={patientId}
            setPatientId={setPatientId}
            setStep={setStep}
          />
        );
      case 1:
        return <FamilyInfo patientId={patientId} setStep={setStep} />;
      case 2:
        return <DiseaseInfo setStep={setStep} patientId={patientId} />;
      case 3:
        return <DocumentInfo patientId={patientId} setStep={setStep} />;
        case 4 :
          return <Final />;
      case 5:
      default:
        return null;
    }
  };

  return (
    <>
      <div className={FormCSS.container}>
        <div className={FormCSS.stepcover}>
          {["Personal Info", "Family Info","Disease Info", "Document Info", "Completed"].map(
            (label, index) => (
              <div
                key={index}
                className={`${FormCSS.step} ${
                  step >= index ? FormCSS.active : ""
                }`}
              >
                <h3 className={FormCSS.stepno}>{index + 1}</h3>
                <p className={FormCSS.stepdetail}>{label}</p>
              </div>
            )
          )}
        </div>
        <div className={FormCSS.line}> </div>
        {handleMultiStepForm(step)}
      </div>
    </>
  );
};
