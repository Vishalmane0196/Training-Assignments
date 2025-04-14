import React, { useEffect } from "react";
import tableCSS from "../../style/UserPatientTable.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchPatientsInfo } from "../../redux/asyncThunkFuntions/user";
import { Button } from "src/components/Button/Button";
import { setBookPatientId } from "src/redux/slices/appointment/bookSlice";

const UserPatientTable = () => {
  const dispatch = useDispatch();
  const { patientList } = useSelector((state) => state.patient);
  const navigate = useNavigate();

  const handlePatientView = (patientId) => {
    navigate(`/user/dashboard/viewpatients/patientdetails/${patientId}`);
  };

  const handleBookAppointment = (id) =>{
    dispatch(setBookPatientId(id))
    navigate('/user/dashboard/viewpatients/bookAppointment')
  }

  useEffect(() => {
    const getPatient = async () => {
      dispatch(await fetchPatientsInfo("get"));
    };
    getPatient();
  }, []);

  return (
    <>
      <div className={tableCSS.tableContainer}>
        <div className={tableCSS["table-wrapper"]}>
          <table>
            <thead>
              <tr className={tableCSS.heading}>
                <th>Patient ID</th>
                <th>Patient Name</th>
                <th>Disease Type</th>
                <th>Mobile</th>
                <th>View</th>
                <th>Appointment</th>
              </tr>
            </thead>
            <tbody>
              {patientList.length === 0 ? (
                <tr>
                  <td colSpan="6">No patients found.</td>
                </tr>
              ) : null}

              {patientList?.map((obj, index) => (
                <tr key={index}>
                  <td>{obj.patient_id}</td>
                  <td> {obj.patient_name}</td>
                  <td>{obj.disease_type}</td>
                  <td>{obj.mobile_number}</td>
                  <td>
                    <div className={tableCSS.iconDiv}>
                      <i
                        title="view patient"
                        onClick={() => {
                          handlePatientView(obj.patient_id);
                        }}
                        className="fa-solid fa-eye"
                      ></i>
                    </div>
                  </td>
                  <td>
                    <Button text="Book Now" style={tableCSS.bookBtn} onClick={()=>{handleBookAppointment(obj.patient_id)}}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={tableCSS.footerDiv}></div>
      </div>
    </>
  );
};
export default UserPatientTable;
