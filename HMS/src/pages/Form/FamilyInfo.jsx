import React, { useEffect, useState } from "react";
import familyCSS from "../../style/Family.module.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import {
  addFamilyInfo,
  updateFamilyInfo,
  getFamilyInfo,
} from "../../redux/asyncThunkFuntions/user";
import { useDispatch } from "react-redux";
export const FamilyInfo = ({ count, setCount, setStep, patientId }) => {
  const [FamilyData, setFamilyData] = useState(null);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      father_name: FamilyData?.father_name || "",
      father_country_origin: FamilyData?.father_country_origin || "",
      father_age: FamilyData?.father_age || "",
      mother_name: FamilyData?.mother_name || "",
      mother_country_origin: FamilyData?.mother_country_origin || "",
      mother_age: FamilyData?.mother_age || "",
     
      mother_diabetic: FamilyData?.mother_diabetic || "",
      mother_cardiac_issue: FamilyData?.mother_cardiac_issue || "",
      mother_bp: FamilyData?.mother_bp || "",
      father_diabetic: FamilyData?.father_diabetic || "",
      father_cardiac_issue: FamilyData?.father_cardiac_issue || "",
      father_bp: FamilyData?.father_bp || "",
    },
  });

  const handleSendFamilyInfoServer = async (data) => {
    const formattedData = {
      ...data,
      mother_diabetic: data.mother_diabetic === "true" ? 1 : 0,
      mother_cardiac_issue: data.mother_cardiac_issue === "true" ? 1 : 0,
      mother_bp: data.mother_bp === "true" ? 1 : 0,
      father_diabetic: data.father_diabetic === "true" ? 1 : 0,
      father_cardiac_issue: data.father_cardiac_issue === "true" ? 1 : 0,
      father_bp: data.father_bp === "true" ? 1 : 0,
      father_age: parseInt(data.father_age, 10),
      mother_age: parseInt(data.mother_age, 10),
      patient_id: patientId,
    };

    try {
      if (FamilyData) {
    
        dispatch(updateFamilyInfo(formattedData));
        toast.success("Family Information updated successfully!");
      } else {
        let data2 = {
          ...data,
          mother_diabetic: data.mother_diabetic === "true" ? true : false,
          mother_cardiac_issue:
            data.mother_cardiac_issue === "true" ? true : false,
          mother_bp: data.mother_bp === "true" ? true : false,
          father_diabetic: data.father_diabetic === "true" ? true : false,
          father_cardiac_issue:
            data.father_cardiac_issue === "true" ? true : false,
          father_bp: data.father_bp === "true" ? true : false,
          patient_id: patientId,
        };
        dispatch(
          addFamilyInfo({
            familyDetails: data2,
          })
        );
        toast.success("Family Information Added successfully!");
      }
      dispatch(setStep(2));

      setCount((pre) => pre + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitPersonalData = (data) => {
    
    handleSendFamilyInfoServer(data);
  };

  const handleBackBtn = () => {
    dispatch(setStep(0));
  };
  useEffect(() => {
    const getFamilyInfoFun = async () => {
      if (patientId === null) {
        return;
      } else {
        if (count <= 1) {
          return;
        }

        try {
          let response = await dispatch(getFamilyInfo(patientId)).unwrap();
        
          if (response.data[0]) {
            setFamilyData(response.data[0]);
          }
          reset({
            father_name: response.data[0]?.father_name || "",
            father_country_origin:
              response.data[0]?.father_country_origin || "",
            father_age: response.data[0]?.father_age || "",
            mother_name: response.data[0]?.mother_name || "",
            mother_country_origin:
              response.data[0]?.mother_country_origin || "",
            mother_age: response.data[0]?.mother_age || "",
            mother_diabetic:
              response.data[0]?.mother_diabetic == 1 ? "true" : "false",
            mother_cardiac_issue:
              response.data[0]?.mother_cardiac_issue == 1 ? "true" : "false",
            mother_bp: response.data[0]?.mother_bp == 1 ? "true" : "false",
            father_diabetic:
              response.data[0]?.father_diabetic == 1 ? "true" : "false",
            father_cardiac_issue:
              response.data[0]?.father_cardiac_issue == 1 ? "true" : "false",
            father_bp: response.data[0]?.father_bp == 1 ? "true" : "false",
          });
        } catch (error) {
          console.error(error);
        }
      }
    };
    getFamilyInfoFun();
  }, []);

  return (
    <>
      <div className={familyCSS.container}>
        {/* <h1 className={familyCSS.title}>Family Information</h1> */}
        <form onSubmit={handleSubmit(handleSubmitPersonalData)}>
          <div style={{ display: "flex", gap: "3rem" }}>
            <div className={familyCSS.fieldCoverDiv}>
              <label className={familyCSS.fieldLabel}>
                Father Name <span className={familyCSS.star}>*</span>
              </label>
              <input
                className={familyCSS.inputfield}
                {...register("father_name", {
                  required: "Father name is required",
                })}
                type="text"
                placeholder="Enter Full Name..."
              />
              <p className={familyCSS.fielderror}>
                {errors.father_name && (
                  <span>{errors.father_name.message}</span>
                )}
              </p>
            </div>

            <div className={familyCSS.fieldCoverDiv}>
              <label className={familyCSS.fieldLabel}>
                Father Country <span className={familyCSS.star}>*</span>
              </label>
              <input
                className={familyCSS.inputfield}
                {...register("father_country_origin", {
                  required: "Country is required",
                })}
                type="text"
                placeholder="Enter Country"
              />
              <p className={familyCSS.fielderror}>
                {errors.father_country_origin && (
                  <span>{errors.father_country_origin.message}</span>
                )}
              </p>
            </div>

            <div className={familyCSS.fieldCoverDiv}>
              <label className={familyCSS.fieldLabel}>
                Father Age <span className={familyCSS.star}>*</span>
              </label>
              <input
                className={familyCSS.inputfield}
                {...register("father_age", { required: "Age is required" })}
                min={0}
                max={150}
                type="number"
                placeholder="Enter Age."
              />
              <p className={familyCSS.fielderror}>
                {errors.father_age && <span>{errors.father_age.message}</span>}
              </p>
            </div>

            <div className={familyCSS.fieldCoverDiv}>
              <label className={familyCSS.fieldLabel}>
                Father BP <span className={familyCSS.star}>*</span>
              </label>
              <select
                className={familyCSS.inputfield}
                {...register("father_bp", {
                  required: "Blood pressure is required",
                })}
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
              <p className={familyCSS.fielderror}>
                {errors.father_bp && <span>{errors.father_bp.message}</span>}
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "3rem", marginTop: "1rem" }}>
            <div className={familyCSS.fieldCoverDiv}>
              <label className={familyCSS.fieldLabel}>
                Mother Name <span className={familyCSS.star}>*</span>
              </label>
              <input
                className={familyCSS.inputfield}
                {...register("mother_name", {
                  required: "Mother name is required",
                })}
                type="text"
                placeholder="Enter Full Name"
              />
              <p className={familyCSS.fielderror}>
                {errors.mother_name && (
                  <span>{errors.mother_name.message}</span>
                )}
              </p>
            </div>

            <div className={familyCSS.fieldCoverDiv}>
              <label className={familyCSS.fieldLabel}>
                Mother Country <span className={familyCSS.star}>*</span>
              </label>
              <input
                className={familyCSS.inputfield}
                {...register("mother_country_origin", {
                  required: "Country is required",
                })}
                type="text"
                placeholder="Enter Country"
              />
              <p className={familyCSS.fielderror}>
                {errors.mother_country_origin && (
                  <span>{errors.mother_country_origin.message}</span>
                )}
              </p>
            </div>

            <div className={familyCSS.fieldCoverDiv}>
              <label className={familyCSS.fieldLabel}>
                Mother Age <span className={familyCSS.star}>*</span>
              </label>
              <input
                className={familyCSS.inputfield}
                {...register("mother_age", { required: "Age is required" })}
                type="number"
                min={0}
                max={150}
                placeholder="Enter Age"
              />
              <p className={familyCSS.fielderror}>
                {errors.mother_age && <span>{errors.mother_age.message}</span>}
              </p>
            </div>

            <div className={familyCSS.fieldCoverDiv}>
              <label className={familyCSS.fieldLabel}>
                Mother BP <span className={familyCSS.star}>*</span>
              </label>
              <select
                className={familyCSS.inputfield}
                {...register("mother_bp", {
                  required: "Blood pressure is required",
                })}
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>

              <p className={familyCSS.fielderror}>
                {errors.mother_bp && <span>{errors.mother_bp.message}</span>}
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "3rem", marginTop: "1rem" }}>
            <div className={familyCSS.fieldCoverDiv}>
              <label className={familyCSS.fieldLabel}>
                Mother Diabetic <span className={familyCSS.star}>*</span>
              </label>
              <div>
                <label>Yes</label>
                <input
                  {...register("mother_diabetic", {
                    required: "mother diabetic is required",
                  })}
                  type="radio"
                  value="true"
                />
              </div>
              <div>
                <label>No</label>
                <input
                  {...register("mother_diabetic", {
                    required: "mother diabetic is required",
                  })}
                  type="radio"
                  value="false"
                />
              </div>
              <p className={familyCSS.fielderror}>
                {errors.mother_diabetic && (
                  <span>{errors.mother_diabetic.message}</span>
                )}
              </p>
            </div>

            <div className={familyCSS.fieldCoverDiv}>
              <label className={familyCSS.fieldLabel}>
                Mother Cardiac Issue<span className={familyCSS.star}>*</span>
              </label>
              <div>
                <label>Yes</label>
                <input
                  {...register("mother_cardiac_issue", {
                    required: "This field is  required",
                  })}
                  type="radio"
                  value="true"
                />
              </div>
              <div>
                <label>No</label>
                <input
                  {...register("mother_cardiac_issue", {
                    required: "This field is  required",
                  })}
                  type="radio"
                  value="false"
                />
              </div>
              <p className={familyCSS.fielderror}>
                {errors.mother_cardiac_issue && (
                  <span>{errors.mother_cardiac_issue.message}</span>
                )}
              </p>
            </div>

            <div className={familyCSS.fieldCoverDiv}>
              <label className={familyCSS.fieldLabel}>
                Father Diabetic <span className={familyCSS.star}>*</span>
              </label>
              <div>
                <label>Yes</label>
                <input
                  {...register("father_diabetic", {
                    required: "This filed is required",
                  })}
                  type="radio"
                  value="true"
                />
              </div>
              <div>
                <label>No</label>
                <input
                  {...register("father_diabetic", {
                    required: "This filed is required",
                  })}
                  type="radio"
                  value="false"
                />
              </div>
              <p className={familyCSS.fielderror}>
                {errors.father_diabetic && (
                  <span>{errors.father_diabetic.message}</span>
                )}
              </p>
            </div>
            <div className={familyCSS.fieldCoverDiv}>
              <label className={familyCSS.fieldLabel}>
                Father Cardiac Issue <span className={familyCSS.star}>*</span>
              </label>
              <div>
                <label>Yes</label>
                <input
                  {...register("father_cardiac_issue", {
                    required: "This field is  required",
                  })}
                  type="radio"
                  value="true"
                />
              </div>
              <div>
                <label>No</label>
                <input
                  {...register("father_cardiac_issue", {
                    required: "This field is  required",
                  })}
                  type="radio"
                  value="false"
                />
              </div>
              <p className={familyCSS.fielderror}>
                {errors.father_cardiac_issue && (
                  <span>{errors.father_cardiac_issue.message}</span>
                )}
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "right",
              marginTop: "0.5rem",
            }}
          >
            <button
              onClick={handleBackBtn}
              className={familyCSS.backBtn}
              type="button"
            >
              Back
            </button>
            {FamilyData ? (
              <button className={familyCSS.submitBtn} type="submit">
                Update
              </button>
            ) : (
              <button className={familyCSS.submitBtn} type="submit">
                Next
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

FamilyInfo.propTypes = {
  setCount: PropTypes.func.isRequired,
  setStep: PropTypes.func.isRequired,
  setPatientId: PropTypes.func.isRequired,
  patientId: PropTypes.any,
};
