import React, { useContext, useEffect, useState } from "react";
import PersonalCSS from "../../style/Personal.module.css";
import { useForm } from "react-hook-form";
import { MyContext } from "../../utils/ContextApi";
import { toast } from "react-toastify";

export const PersonalInfo = ({ setStep, setPatientId, patientId }) => {
  const contextdata = useContext(MyContext);
  const [PersonalData, setPersonalData] = useState(null);
  const {
    register,
    handleSubmit,
    trigger,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      patient_name: PersonalData?.patient_name || "",
      date_of_birth: PersonalData?.date_of_birth || "",
      gender: PersonalData?.gender || "",
      weight: PersonalData?.weight || "",
      height: PersonalData?.height || "",
      country_of_origin: PersonalData?.country_of_origin || "",
      is_diabetic: PersonalData?.is_diabetic ?? "",
      cardiac_issue: PersonalData?.cardiac_issue ?? "",
      blood_pressure: PersonalData?.blood_pressure ?? "",
    },
  });

  const handleSendPersonalInfoServer = async (data) => {
    const formattedData = {
      ...data,
      blood_pressure: data.blood_pressure === "true" ? 1 : 0,
      is_diabetic: data.is_diabetic === "true" ? 1 : 0,
      cardiac_issue: data.cardiac_issue === "true" ? 1 : 0,
      patient_id: patientId,
    };
    

    try {
      let response;
      if (PersonalData) {
        response = await contextdata.axiosInstance.put(
          "/patient/updatePersonalInfo",
          formattedData
        );
        toast.success("Personal Information updated successfully!");
      } else {
        console.log(data)
        let data2 = {
          ...data,
          is_diabetic:data.is_diabetic == 1 ? true : false,
          cardiac_issue: data.cardiac_issue == 1? true : false,
          blood_pressure: data.blood_pressure == 1? true : false,
        }
        response = await contextdata.axiosInstance.post(
          "/patient/addPersonalInfo",
          data2
        );

        toast.success("Personal Information Added successfully!");

        setPatientId(()=>{
          localStorage.setItem('patientId', response.data.data.patient_id);
          return response.data.data.patient_id;
        }
         );
        console.log("Response:", response.data.data.patient_id);
      }
      setStep((prev) =>{
        localStorage.setItem("step", prev+1);
        return prev+1;
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to add/update Personal Information");
    }
  };

  const handleSubmitPersonalData = (data) => {
    setPersonalData(data);
    if(errors)
    {
      toast.error(errors);
    }
    handleSendPersonalInfoServer(data);
  };
  
  useEffect(() => {
    const getpersonaldata = async () => {
      if (patientId === null) {
        return;
      } else {
        try {
          console.log("Patient_ID", patientId);
          let response = await contextdata.axiosInstance.get(
            `/patient/getPersonalInfo/${patientId}`
          );
          if (response.data.data[0]) {
            setPersonalData(response.data.data[0]);
          }

          reset({
            blood_pressure:
              response.data.data[0].blood_pressure == 1 ? "true" : "false",
            cardiac_issue:
              response.data.data[0].cardiac_issue == 1 ? "true" : "false",
            country_of_origin: response.data.data[0].country_of_origin,
            date_of_birth: new Date(response.data.data[0].date_of_birth)
              .toISOString()
              .split("T")[0],
            gender: response.data.data[0].gender,
            height: response.data.data[0].height,
            is_diabetic:
              response.data.data[0].is_diabetic == 1 ? "true" : "false",
            patient_name: response.data.data[0].patient_name,
            weight: response.data.data[0].weight,
          });
        } catch (error) {
          console.log(error);
        }
      }
    };
    getpersonaldata();
  }, []);

  return (
    <>
      <div className={PersonalCSS.container}>
        <h1 className={PersonalCSS.title}>Personal Information</h1>
        <form onSubmit={handleSubmit(handleSubmitPersonalData)}>
          <div style={{ display: "flex", gap: "3rem" }}>
            <div className={PersonalCSS.fieldcoverdiv}>
              <label className={PersonalCSS.fieldlabel}>
                Patient Name <span className={PersonalCSS.star}>*</span>
              </label>
              <input
                className={PersonalCSS.inputfield}
                {...register("patient_name", { required: "Name is required" })}
                onChange={(e) => {
                  setValue("patient_name", e.target.value);
                  trigger("patient_name");
                }}
                type="text"
                placeholder="Enter Full Name..."
              />
              <p className={PersonalCSS.fielderror}>
                {
                  errors.patient_name &&
                  <span className="error">{errors.patient_name.message}</span>
                }
              </p>

            </div>

            <div className={PersonalCSS.fieldcoverdiv}>
              <label className={PersonalCSS.fieldlabel}>
                Birth date <span className={PersonalCSS.star}>*</span>
              </label>
              <input
                className={PersonalCSS.inputfield}
                {...register("date_of_birth", {
                  required: "Date of birth is required",
                })}
                type="date"
              />
            <p className={PersonalCSS.fielderror}>
              {
                errors.date_of_birth &&
                <span className="error">{errors.date_of_birth.message}</span>
              }
            </p>
            </div>

            <div className={PersonalCSS.fieldcoverdiv}>
              <label className={PersonalCSS.fieldlabel}>
                Gender <span className={PersonalCSS.star}>*</span>
              </label>
              <select
                className={PersonalCSS.inputfield}
                {...register("gender", { required: "Gender is required" })}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
             
            </div>
            <div className={PersonalCSS.fieldcoverdiv}>
              <label className={PersonalCSS.fieldlabel}>
                Country <span className={PersonalCSS.star}>*</span>
              </label>
              <input
                className={PersonalCSS.inputfield}
                {...register("country_of_origin", {
                  required: true,
                })}
                onChange={(e) => {
                  const { onChange } = register("country_of_origin");
                  onChange(e);
                  trigger("country_of_origin");
                }}
                type="text"
                placeholder="Enter country."
              />
              <p className={PersonalCSS.fielderror}>
                {
                  errors.country_of_origin &&
                  <span className="error">{errors.country_of_origin.message}</span>
                }
              </p>
             
            </div>
          </div>

          <div style={{ display: "flex", gap: "3rem", marginTop: "1rem" }}>
            <div className={PersonalCSS.fieldcoverdiv}>
              <label className={PersonalCSS.fieldlabel}>
                Weight <span className={PersonalCSS.star}>*</span>
              </label>
              <input
                className={PersonalCSS.inputfield}
                {...register("weight", { required: "Weight is required" })}
                type="number"
                placeholder="Enter weight"
              />
              <p className={PersonalCSS.fielderror}>
                {
                  errors.weight &&
                  <span className="error">{errors.weight.message}</span>
                }
              </p>
           
            </div>

            <div className={PersonalCSS.fieldcoverdiv}>
              <label className={PersonalCSS.fieldlabel}>
                Height <span className={PersonalCSS.star}>*</span>
              </label>
              <input
                className={PersonalCSS.inputfield}
                {...register("height", { required: "Height is required" })}
                type="number"
                placeholder="Enter height"
              />
             <p className={PersonalCSS.fielderror}>
              {
                errors.height &&
                  <span className="error">{errors.height.message}</span>
  
              }
             </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "3rem", marginTop: "1rem" }}>
            <div className={PersonalCSS.fieldcoverdiv}>
              <label className={PersonalCSS.fieldlabel}>
                Blood Pressure <span className={PersonalCSS.star}>*</span>
              </label>
              <label>
                <input
                  {...register("blood_pressure", { required: 'blood_pressure is required' })}
                  type="radio"
                  value="true"
                />{" "}
                Yes
              </label>
              <label>
                <input
                  {...register("blood_pressure", { required: 'blood_pressure is required' })}
                  type="radio"
                  value="false"
                />{" "}
                No
              </label>
              <p className={PersonalCSS.fielderror}>
                {
                  errors.blood_pressure &&
                  <span className="error">{errors.blood_pressure.message}</span>
                }
              </p>
              
            </div>

            <div className={PersonalCSS.fieldcoverdiv}>
              <label className={PersonalCSS.fieldlabel}>
                Diabetic <span className={PersonalCSS.star}>*</span>
              </label>
              <label>
                <input
                  {...register("is_diabetic", { required: ' is_diabetic is required' })}
                  type="radio"
                  value="true"
                />{" "}
                Yes
              </label>
              <label>
                <input
                  {...register("is_diabetic", { required: 'is_diabetic is required' })}
                  type="radio"
                  value="false"
                />{" "}
                No
              </label>
              <p className={PersonalCSS.fielderror}>
                {
                  errors.is_diabetic &&
                  <span className="error">{errors.is_diabetic.message}</span>
                }
              </p>

            </div>

            <div className={PersonalCSS.fieldcoverdiv}>
              <label className={PersonalCSS.fieldlabel}>
                Cardiac Issue <span className={PersonalCSS.star}>*</span>
              </label>
              <label>
                <input
                  {...register("cardiac_issue", { required: 'cardiac_issue is require' })}
                  type="radio"
                  value="true"
                />{" "}
                Yes
              </label>
              <label>
                <input
                  {...register("cardiac_issue", { required:  'cardiac_issue is require' })}
                  type="radio"
                  value="false"
                />{" "}
                No
              </label>
              <p className={PersonalCSS.fielderror}>
                {
                  errors.cardiac_issue &&
                  <span className="error">{errors.cardiac_issue.message}</span>
                }
              </p>
             
            </div>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: "0.3rem",
              justifyContent: "right",
            }}
          >
            {PersonalData ? (
              <button className={PersonalCSS.submitbtn} type="submit">
                Update
              </button>
            ) : (
              <button className={PersonalCSS.submitbtn} type="submit">
                Next
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};
