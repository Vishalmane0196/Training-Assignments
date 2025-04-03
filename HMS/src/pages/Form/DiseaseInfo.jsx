import React, { useContext, useEffect, useState } from "react";
import diseaseCSS from "../../style/Disease.module.css";
import { useForm } from "react-hook-form";
import { MyContext } from "../../utils/ContextApi";
import { toast } from "react-toastify";

export const DiseaseInfo = ({ count, setCount, setStep, patientId }) => {
  const contextData = useContext(MyContext);
  const [DiseaseInfo, setDiseaseInfo] = useState(null);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      disease_type: DiseaseInfo?.disease_type || "",
      disease_description: DiseaseInfo?.disease_description || "",
    },
  });
  const handleSendToDiseaseServer = async (data) => {
    try {
      if (DiseaseInfo) {
        await contextData.axiosInstance.put("/patient/updateDiseaseInfo", data);
        toast.success("Personal Information updated successfully!");
      } else {
        await contextData.axiosInstance.post("/patient/addDiseaseInfo", {
          diseaseDetails: data,
        });

        toast.success("Disease Information Added successfully!");
      }
      setStep((prev) => {
        localStorage.setItem("step", prev + 1);
        return prev + 1;
      });
      setCount((pre) => pre + 1);
    } catch (error) {
      console.log(error);
      toast.error("Failed to add/update disease Information");
    }
  };
  const handleSubmitDiseaseData = (data) => {
    console.log(data);

    handleSendToDiseaseServer({ ...data, patient_id: patientId });
  };

  const handleBackBtn = () => {
    setStep((prev) => {
      localStorage.setItem("step", prev - 1);
      return prev - 1;
    });
  };
  useEffect(() => {
    const getDiseaseInfo = async () => {
      if (patientId === null) {
        return;
      } else {
        if (count <= 2) {
          return;
        }
        try {
          let response = await contextData.axiosInstance.get(
            `/patient/getDiseaseInfo/${patientId}`
          );
          setDiseaseInfo(response.data.data[0]);
          reset({
            disease_type: response.data.data[0].disease_type || "",
            disease_description:
              response.data.data[0].disease_description || "",
          });
        } catch (error) {
          console.log(error);
        }
      }
    };
    getDiseaseInfo();
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
            {DiseaseInfo ? (
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
