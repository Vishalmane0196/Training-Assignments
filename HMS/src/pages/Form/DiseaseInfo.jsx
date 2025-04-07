import React, { useEffect, useState } from "react";
import diseaseCSS from "../../style/Disease.module.css";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import {
  addDiseaseInfo,
  updateDiseaseInfo,
  getDiseaseInfo,
} from "../../redux/asyncThunkFuntions/user";

export const DiseaseInfo = ({ count, setCount, setStep, patientId }) => {
  const [diseaseInfo, setDiseaseInfo] = useState(null);
  const dispatch = useDispatch();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      disease_type: diseaseInfo?.disease_type || "",
      disease_description: diseaseInfo?.disease_description || "",
    },
  });
  const handleSendToDiseaseServer = async (data) => {
    try {
      if (diseaseInfo) {
        dispatch(updateDiseaseInfo(data));
        toast.success("Personal Information updated successfully!");
      } else {
        await dispatch(
          addDiseaseInfo({
            diseaseDetails: data,
          })
        );

        toast.success("Disease Information Added successfully!");
      }
      dispatch(setStep(3));
      setCount((pre) => pre + 1);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add/update disease Information");
    }
  };
  const handleSubmitDiseaseData = (data) => {

    handleSendToDiseaseServer({ ...data, patient_id: patientId });
  };

  const handleBackBtn = () => {
    dispatch(setStep(1));
  };
  useEffect(() => {
    const getDiseaseInfoFun = async () => {
      if (patientId === null) {
        return;
      } else {
        if (count <= 2) {
          return;
        }
        try {
      
          let response = await dispatch(getDiseaseInfo(patientId)).unwrap();
         
          setDiseaseInfo(response.data[0]);
          reset({
            disease_type: response.data[0].disease_type || "",
            disease_description: response.data[0].disease_description || "",
          });
        } catch (error) {
          console.error(error);
        }
      }
    };
    getDiseaseInfoFun();
  }, []);
  return (
    <>
      <div className={diseaseCSS.container}>
        {/* <h1 className={diseaseCSS.title}>Disease Information</h1> */}
        <form onSubmit={handleSubmit(handleSubmitDiseaseData)}>
          <div style={{ display: "flex", gap: "3rem", height: "42.5vh" }}>
            <div className={diseaseCSS.fieldCoverDiv}>
              <label className={diseaseCSS.fieldLabel}>
                Disease Type <span className={diseaseCSS.star}>*</span>
              </label>
              <input
                className={diseaseCSS.inputfield}
                {...register("disease_type", { required: "Type required" })}
                type="text"
                placeholder="Enter Type ..."
              />
              <p className={diseaseCSS.fielderror}>
                {errors.disease_type && (
                  <span>{errors.disease_type.message}</span>
                )}
              </p>
            </div>

            <div className={diseaseCSS.fieldCoverDiv}>
              <label className={diseaseCSS.fieldLabel}>
                Disease Description <span className={diseaseCSS.star}>*</span>
              </label>
              <input
                className={diseaseCSS.inputfield}
                {...register("disease_description", {
                  required: "Description require",
                })}
                type="text"
                placeholder="Enter Description"
              />
              <p className={diseaseCSS.fielderror}>
                {errors.disease_description && (
                  <span>{errors.disease_description.message}</span>
                )}
              </p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "1rem",
              justifyContent: "right",
            }}
          >
            <button
              onClick={handleBackBtn}
              className={diseaseCSS.backBtn}
              type="button"
            >
              Back
            </button>
            {diseaseInfo ? (
              <button className={diseaseCSS.submitBtn} type="submit">
                Update
              </button>
            ) : (
              <button className={diseaseCSS.submitBtn} type="submit">
                Next
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

DiseaseInfo.propTypes = {
  setCount: PropTypes.func.isRequired,
  setStep: PropTypes.func.isRequired,
  setPatientId: PropTypes.func.isRequired,
  patientID: PropTypes.any,
};
