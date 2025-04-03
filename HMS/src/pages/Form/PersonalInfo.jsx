import React, { useContext, useEffect, useState } from "react";
import personalCSS from "../../style/Personal.module.css";
import { useForm } from "react-hook-form";
import { MyContext } from "../../utils/ContextApi";
import { toast } from "react-toastify";

export const PersonalInfo = ({setCount, setStep, setPatientId, patientId }) => {
  const contextData = useContext(MyContext);
  
  const [PersonalData, setPersonalData] = useState(null);
  const [countryName, setCountryName] = useState('');
  const [country ,setCountry] = useState(null); 

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
  const checkCountyValid = ()=>{
    if(!countryName)
    {
      return;
    }
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Country not found');
        }
        
        return response.json();
    })
    .then(data => {
        console.log('Country is valid:', data);
        setCountry(null);
    })
    .catch(error => {
        console.error('Error:', error);
        errors.country_of_origin = error
        
        setCountry(error.message);
    });
  }
  const handleSendPersonalInfoServer = async (data) => {
    const formattedData = {
      ...data,
      blood_pressure: data.blood_pressure === "true" ? 1 : 0,
      is_diabetic: data.is_diabetic === "true" ? 1 : 0,
      cardiac_issue: data.cardiac_issue === "true" ? 1 : 0,
      patient_id: patientId,
      weight: data.weight.toString()
    };
    

    try {
      let response;
      if (PersonalData) {
        response = await contextData.axiosInstance.put(
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
        response = await contextData.axiosInstance.post(
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
      setCount(pre=>pre+1);
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
    const getPersonalData = async () => {
      if (patientId === null) {
        return;
      } else {
        try {
          console.log("Patient_ID", patientId);
          let response = await contextData.axiosInstance.get(
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
    getPersonalData();
  }, []);

  useEffect(()=>{
       // debouncing 
     const debouncingFunction = setTimeout(()=>{
         checkCountyValid();
      },3000)

      return ()=>clearTimeout(debouncingFunction);
  },[countryName])

  return (
    <>
      <div className={personalCSS.container}>
        {/* <h1 className={personalCSS.title}>Personal Information</h1> */}
        <form onSubmit={handleSubmit(handleSubmitPersonalData)}>
          <div style={{ display: "flex", gap: "3rem" }}>
            <div className={personalCSS.fieldCoverDiv}>
              <label className={personalCSS.fieldLabel}>
                Patient Name <span className={personalCSS.star}>*</span>
              </label>
              <input
                className={personalCSS.inputfield}
                {...register("patient_name", { required: "Name is required" })}
                onChange={(e) => {
                  setValue("patient_name", e.target.value);
                  trigger("patient_name");
                }}
                type="text"
                placeholder="Enter Full Name..."
              />
              <p className={personalCSS.fielderror}>
                {
                  errors.patient_name &&
                  <span className="error">{errors.patient_name.message}</span>
                }
              </p>

            </div>

            <div className={personalCSS.fieldCoverDiv}>
              <label className={personalCSS.fieldLabel}>
                Birth date <span className={personalCSS.star}>*</span>
              </label>
              <input
                className={personalCSS.inputfield}
                {...register("date_of_birth", {
                  required: "Date of birth is required",
                })}
                type="date"
              />
            <p className={personalCSS.fielderror}>
              {
                errors.date_of_birth &&
                <span className="error">{errors.date_of_birth.message}</span>
              }
            </p>
            </div>

            <div className={personalCSS.fieldCoverDiv}>
              <label className={personalCSS.fieldLabel}>
                Gender <span className={personalCSS.star}>*</span>
              </label>
              <select
                className={personalCSS.inputfield}
                {...register("gender", { required: "Gender is required" })}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
             
            </div>
            <div className={personalCSS.fieldCoverDiv}>
              <label className={personalCSS.fieldLabel}>
                Country <span className={personalCSS.star}>*</span>
              </label>
              <input
                className={personalCSS.inputfield}
                {...register("country_of_origin", {
                  required: true,
                })}
                onChange={(e) => {
                  setCountryName(e.target.value)
                  const { onChange } = register("country_of_origin");
                  onChange(e);
                  trigger("country_of_origin");
                }}
                type="text"
                placeholder="Enter country."
              />
              <p className={personalCSS.fielderror}>
                
                {
                 country &&
                  <span className="error">{country}</span>
                }
              </p>
             
            </div>
          </div>

          <div style={{ display: "flex", gap: "3rem", marginTop: "1rem" }}>
            <div className={personalCSS.fieldCoverDiv}>
              <label className={personalCSS.fieldLabel}>
                Weight <span className={personalCSS.star}>*</span>
              </label>
              <input
                className={personalCSS.inputfield}
                {...register("weight", { required: "Weight is required" })}
                type="number"
                placeholder="Enter weight"
              />
              <p className={personalCSS.fielderror}>
                {
                  errors.weight &&
                  <span className="error">{errors.weight.message}</span>
                }
              </p>
           
            </div>

            <div className={personalCSS.fieldCoverDiv}>
              <label className={personalCSS.fieldLabel}>
                Height <span className={personalCSS.star}>*</span>
              </label>
              <input
                className={personalCSS.inputfield}
                {...register("height", { required: "Height is required" })}
                type="number"
                placeholder="Enter height"
                min="4.50"
                max="9.90"
                step="0.01"
              />
             <p className={personalCSS.fielderror}>
              {
                errors.height &&
                  <span className="error">{errors.height.message}</span>
  
              }
             </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "3rem", marginTop: "1rem" }}>
            <div className={personalCSS.fieldCoverDiv}>
              <label className={personalCSS.fieldLabel}>
                Blood Pressure <span className={personalCSS.star}>*</span>
              </label>
              <label>
                <input
                  {...register("blood_pressure", { required: 'Blood pressure is required' })}
                  type="radio"
                  value="true"
                />{" "}
                Yes
              </label>
              <label>
                <input
                  {...register("blood_pressure", { required: 'Blood pressure is required' })}
                  type="radio"
                  value="false"
                />{" "}
                No
              </label>
              <p className={personalCSS.fielderror}>
                {
                  errors.blood_pressure &&
                  <span className="error">{errors.blood_pressure.message}</span>
                }
              </p>
              
            </div>

            <div className={personalCSS.fieldCoverDiv}>
              <label className={personalCSS.fieldLabel}>
                Diabetic <span className={personalCSS.star}>*</span>
              </label>
              <label>
                <input
                  {...register("is_diabetic", { required: ' Diabetic field is required' })}
                  type="radio"
                  value="true"
                />{" "}
                Yes
              </label>
              <label>
                <input
                  {...register("is_diabetic", { required: 'Diabetic field is required' })}
                  type="radio"
                  value="false"
                />{" "}
                No
              </label>
              <p className={personalCSS.fielderror}>
                {
                  errors.is_diabetic &&
                  <span className="error">{errors.is_diabetic.message}</span>
                }
              </p>

            </div>

            <div className={personalCSS.fieldCoverDiv}>
              <label className={personalCSS.fieldLabel}>
                Cardiac Issue <span className={personalCSS.star}>*</span>
              </label>
              <label>
                <input
                  {...register("cardiac_issue", { required:'Cardiac field is require' })}
                  type="radio"
                  value="true"
                />{" "}
                Yes
              </label>
              <label>
                <input
                  {...register("cardiac_issue", { required:'Cardiac field is require' })}
                  type="radio"
                  value="false"
                />{" "}
                No
              </label>
              <p className={personalCSS.fielderror}>
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
              <button className={personalCSS.submitBtn} type="submit">
                Update
              </button>
            ) : (
              <button className={personalCSS.submitBtn} type="submit">
                Next
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};
