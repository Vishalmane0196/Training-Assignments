
import React, { useContext, useEffect } from 'react'
import TableCSS from '../../style/UserPatientTable.module.css'
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
      <div className={TableCSS.tablecontainer}>
        <div className={TableCSS["table-wrapper"]}>
          <table>
            <thead>
              <tr className={TableCSS.heading}>
                <th>Patient ID</th>
                <th>Patient Name</th>
                <th>Dieases Type</th>
                <th>Mobile</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {
               contextData.allPatients?.length === 0 ? <div><h1>No Patient</h1></div> 
               :
              contextData.allPatients?.map((obj, index) => (
                <tr key={index}>
                  <td>{obj.patient_id}</td>
                  <td> {obj.patient_name}</td>
                  <td>{obj.disease_type}</td>
                  <td>{obj.mobile_number}</td>
                  <td>
                    <div className={TableCSS.icondiv}>
                   
                    <i onClick={()=>{handlePatientView(obj.patient_id)} } className="fa-solid fa-eye"></i>
                   
                    </div>
                  </td>
                </tr>
              ))

              }
             
              
            </tbody>
          </table>
        </div>
        <div className={TableCSS.footerdiv}></div>
      </div>
    </>
  )
}
