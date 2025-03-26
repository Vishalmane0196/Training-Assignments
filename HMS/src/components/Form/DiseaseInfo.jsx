import React, { useContext, useEffect, useState } from "react";
import DiseaseCSS from "../../style/Disease.module.css";
import { useForm } from "react-hook-form";
import { MyContext } from "../../utils/ContextApi";
import { toast } from "react-toastify";

export const DiseaseInfo = ({setStep, patientId }) => {
    const contextData  =  useContext(MyContext);
    const [ DiseaseInfo,setDiseaseInfo] = useState(null)
  const { register, reset,handleSubmit,formState:{ errors }} = useForm({
    defaultValues:{
      disease_type: DiseaseInfo?.disease_type || "",
      disease_description:DiseaseInfo?.disease_description|| "",
    }
  });
  const handleSendtoDiseaseServer = async(data) =>{
    try {
          
          if (DiseaseInfo) {
             await contextData.axiosInstance.put(
              "/patient/updateDiseaseInfo",
              data
            );
            toast.success("Personal Information updated successfully!");
          } else {
             await contextData.axiosInstance.post(
              "/patient/addDiseaseInfo",
              {
                "diseaseDetails":data
              }
             
            );
            
            toast.success("Personal Information Added successfully!");
          }
          setStep((prev) =>{
            localStorage.setItem("step", prev+1);
            return prev+1;
          });
        } catch (error) {
          console.log(error);
          toast.error("Failed to add/update disease Information");
        }
    

  }
  const handleSubmitDiseaseData = (data) => {
    console.log(data)

    handleSendtoDiseaseServer({...data, patient_id: patientId})
    
  };

  const handleBackBtn = () => {
    setStep((prev) =>{
      localStorage.setItem("step", prev-1);
      return prev-1;
    });
  };
   useEffect(()=>{
     const getDiseaseInfo = async() =>{
       if(patientId === null)
       {
         return;
       }
       else{
        try {
          let response =  await contextData.axiosInstance.get(`/patient/getDiseaseInfo/${patientId}`);
          setDiseaseInfo(response.data.data[0])
          reset({
            disease_type: response.data.data[0].disease_type || "",
            disease_description: response.data.data[0].disease_description || "",
          })
        } catch (error) {
          console.log(error)
        }
       }
     }
     getDiseaseInfo();
   },[])
  return (
    <>
      <div className={DiseaseCSS.container}>
        <h1 className={DiseaseCSS.title}>Disease Information</h1>
        <form onSubmit={handleSubmit(handleSubmitDiseaseData)}>
          <div style={{ display: "flex", gap: "3rem",height:"42.5vh" }}>
            <div className={DiseaseCSS.fieldcoverdiv}>
              <label className={DiseaseCSS.fieldlabel}>
                Disease Type <span className={DiseaseCSS.star}>*</span>
              </label>
              <input
                className={DiseaseCSS.inputfield}
                {...register("disease_type", { required: "Type required" })}
                type="text"
                placeholder="Enter Type ..."
              />
              <p className={DiseaseCSS.fielderror}>
                   {
                    errors.disease_type && 
                    (
                      <span>
                        {errors.disease_type.message}
              
                      </span>
                    )
                   }
              </p >
             
            </div>

            <div className={DiseaseCSS.fieldcoverdiv}>
              <label className={DiseaseCSS.fieldlabel}>
                Disease Description <span className={DiseaseCSS.star}>*</span>
              </label>
              <input
                className={DiseaseCSS.inputfield}
                {...register("disease_description", {
                  required: "Description require",
                })}
                type="text"
                placeholder="Enter Description"
              />
            <p className={DiseaseCSS.fielderror}>
              {
                    errors.disease_description && 
                    (
                      <span>
                        {errors.disease_description.message}
                      </span>
                    )
                   }
              
            </p>
            </div>
          </div>
            <div style={{ display: 'flex', marginTop: '1rem', justifyContent: 'right' }}>
                      <button onClick={handleBackBtn} className={DiseaseCSS.backbtn} type="button">
                        Back
                      </button>
                      {DiseaseInfo ? (
                        <button className={DiseaseCSS.submitbtn} type="submit">
                          Update
                        </button>
                      ) : (
                        <button className={DiseaseCSS.submitbtn} type="submit">
                          Next
                        </button>
                      )}
                    </div>
        </form>

      </div>
    </>
  );
};
