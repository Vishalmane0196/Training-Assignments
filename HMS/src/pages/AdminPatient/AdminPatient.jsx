import React, { useEffect,  } from "react";
import patientCSS from "../../style/AdminPatient.module.css";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { fetchPatientsInfo } from "../../redux/asyncThunkFuntions/user";

export const AdminPatient = () => {
    const dispatch = useDispatch();
    const {patientList} = useSelector(state => state.patient)
    const navigate =  useNavigate();
  

  const getData = async () => {
    try {
     dispatch(fetchPatientsInfo());
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleAdminAllPatient  = (id)=>{
   
    navigate(`/admin/dashboard/allpatients/patientdetails/${id}`)
      
  } 
  const handleDeletePatient = async(id) => {
    try {
        await axiosInstance.delete(`/patient/adminDeletePatientData?patient_id=${id}`);
        getData();
      } catch (error) {
        console.log(error);
      }
  }
  return (
    <>
      <div className={patientCSS.containerCover}>
        <div className={patientCSS.container}>
          <h1 className={patientCSS.titleHeader}>Admin Patient Details</h1>
          <div className={patientCSS.title}>
            <p>Patient ID</p>
            <p>Patient Name</p>
            <p>Disease Type</p>
            <p>Age</p>
            <p>View</p>
          </div>
          <ul className={patientCSS.ulList}>
            {patientList?.map((patient) => (
              <li className={patientCSS.liList}>
                <p>{patient.patient_id}</p>
                <p>{patient.patient_name}</p>
                <p>{patient.disease_type}</p>
                <p>{patient.age}</p>
                <p className={patientCSS.iconDiv}>
                  <i  title="view patient"
                   onClick={()=>{
                   handleAdminAllPatient(patient.patient_id)
                  }} className="fa-solid fa-eye"></i>
                  <i
                    title="delete patient"
                    onClick={() => {
                      handleDeletePatient(patient.patient_id);
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
