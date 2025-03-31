import React, { useContext, useEffect,  } from "react";
import patientCSS from "../../style/AdminPatient.module.css";
import { MyContext } from "../../utils/ContextApi";
import { useNavigate } from "react-router-dom";
export const AdminPatient = () => {
    const navigate =  useNavigate();
  const contextApi = useContext(MyContext);
  const getData = async () => {
    try {
      let response = await contextApi.axiosInstance.get(
        "/patient/getPatientInfo"
      );
      contextApi.setAllPatients(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const handleview  = (id)=>{
   
        navigate(`/admin/dashboard/allpatients/patientdetails/${id}`)
      
  } 
  const handledelete = async(id) => {
    try {
        let response = await contextApi.axiosInstance.delete(`/patient/adminDeletePatientData?patient_id=${id}`);
  
        console.log(response);
        getData();
      } catch (error) {
        console.log(error);
      }
  }
  return (
    <>
      <div className={patientCSS.containercover}>
        <div className={patientCSS.container}>
          <h1 className={patientCSS.titleheader}>Admin Patient Details</h1>
          <div className={patientCSS.title}>
            <p>Patient ID</p>
            <p>Patient Name</p>
            <p>Dieases Type</p>
            <p>Age</p>
            <p>View</p>
          </div>
          <ul className={patientCSS.ullist}>
            {contextApi.allPatients?.map((patient) => (
              <li className={patientCSS.lilist}>
                <p>{patient.patient_id}</p>
                <p>{patient.patient_name}</p>
                <p>{patient.disease_type}</p>
                <p>{patient.age}</p>
                <p className={patientCSS.icondiv}>
                  <i   onClick={()=>{
                    handleview(patient.patient_id)
                  }} className="fa-solid fa-eye"></i>
                  <i
                    onClick={() => {
                      handledelete(patient.patient_id);
                    }}
                    className="fa-solid fa-trash"
                  ></i>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
