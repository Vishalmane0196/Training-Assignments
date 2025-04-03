
import React, { useContext, useEffect } from 'react'
import tableCSS from '../../style/UserPatientTable.module.css'
import { MyContext } from '../../utils/ContextApi';
import { useNavigate } from 'react-router-dom';

export const UserPatientTable = () => {
  const contextData = useContext(MyContext);
  const navigate =  useNavigate();
  
  const handlePatientView = (patientId) => {
    
    navigate(`/user/dashboard/viewpatients/patientdetails/${patientId}`)
    console.log('View Patient', patientId);
    
  }
   
  useEffect(()=>{
      const getPatient = async() =>{
         let response = await contextData.axiosInstance.get('/patient/getPatientInfo');
         contextData.setAllPatients(response.data.data);
      }
      getPatient();
  },[])
   
  return (
    <>
      <div className={tableCSS.tableContainer}>
        <div className={tableCSS["table-wrapper"]}>
          <table>
            <thead style={contextData.isDark ? {backgroundColor:'#161b22'}: {backgroundColor:'#dddddd'}}>
              <tr className={tableCSS.heading}>
                <th>Patient ID</th>
                <th>Patient Name</th>
                <th>Disease Type</th>
                <th>Mobile</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {
               
              contextData.allPatients?.map((obj, index) => (
                <tr key={index}>
                  <td>{obj.patient_id}</td>
                  <td> {obj.patient_name}</td>
                  <td>{obj.disease_type}</td>
                  <td>{obj.mobile_number}</td>
                  <td>
                    <div className={tableCSS.iconDiv}>
                   
                    <i onClick={()=>{handlePatientView(obj.patient_id)} } className="fa-solid fa-eye"></i>
                   
                    </div>
                  </td>
                </tr>
              ))

              }
             
              
            </tbody>
          </table>
        </div>
        <div className={tableCSS.footerDiv}></div>
      </div>
    </>
  )
}
