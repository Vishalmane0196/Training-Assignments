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
import { Input } from "src/components/Input/Input";

export const DiseaseInfo = ({ count, setCount, setStep, patientId }) => {
  const [diseaseInfo, setDiseaseInfo] = useState(null);
  const dispatch = useDispatch();

  const {
    register,
    reset,
    trigger,
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
            <Input
              label="Disease Type"
              require="Disease Type"
              register={register}
              trigger={trigger}
              fieldName="disease_type"
              errors={errors}
              type="text"
              placeholder="Enter Disease Name."
            />

            <Input
              label="Disease Description"
              require="Description require"
              register={register}
              trigger={trigger}
              fieldName="disease_description"
              errors={errors}
              type="text"
              placeholder="Enter Description."
            />
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
