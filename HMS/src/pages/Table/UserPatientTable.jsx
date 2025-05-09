import React, { useCallback, useEffect } from "react";
import tableCSS from "../../style/UserPatientTable.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchPatientsInfo } from "../../redux/asyncThunkFuntions/user";
import { Button } from "src/components/Button/Button";
import { setBookPatientId } from "src/redux/slices/appointment/bookSlice";
import { getDoctorAppointmentsList } from "src/redux/asyncThunkFuntions/doctor";
import { NoRecord } from "src/components/NoRecord/NoRecord";
import { changeAppointmentStatus } from "src/redux/asyncThunkFuntions/admin";
const UserPatientTable = ({ access }) => {
  const dispatch = useDispatch();
  const { patientList } = useSelector((state) => state.patient);
  const { isDoctor } = useSelector((state) => state.auth);
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const handlePatientView = (patientId) => {
    if (isDoctor) {
      navigate(`/viewpatients/patientdetails/${patientId}`);
      return;
    }
    navigate(`/viewpatients/patientdetails/${patientId}`);
  };

  const handleBookAppointment = (id) => {
    dispatch(setBookPatientId(id));
    if (isDoctor) {
      navigate("/viewpatients/bookAppointment");
      return;
    }
    navigate("/viewpatients/bookAppointment");
  };
  const getPatient = useCallback(async () => {
    dispatch(fetchPatientsInfo("get"));
  }, [dispatch]);

  const handleAppointmentStatus = async (status, id) => {
    try {
      await dispatch(
        changeAppointmentStatus({
          status: status,
          id: id,
        })
      ).unwrap();
      getAllAppointment();
    } catch (error) {
      console.log(error);
    }
  };

  const getAllAppointment = useCallback(async () => {
    try {
      await dispatch(getDoctorAppointmentsList(userInfo.doctor_id)).unwrap();
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (access == "doctor") {
      getAllAppointment();
    } else {
      getPatient();
    }
  }, [access]);

  return (
    <>
      <div className={tableCSS.tableContainer}>
        <div className={tableCSS["table-wrapper"]}>
          <table>
            <thead>
              <tr className={tableCSS.heading}>
                <th>{access == "doctor" ? "" : "Sr. No"}</th>
                <th>Patient Name</th>
                <th>{access == "doctor" ? "Disease Type" : "BMI"}</th>
                <th>{access == "doctor" ? "Time" : "Mobile"}</th>
                <th>{access == "doctor" ? "Date" : "View"}</th>
                <th>{access == "doctor" ? "Prescription" : "Appointment"}</th>
              </tr>
            </thead>
            {patientList.length === 0 ? (
              <tr>
                <td colSpan="6">
                  <NoRecord />
                </td>
              </tr>
            ) : (
              <tbody>
                {patientList?.map((obj, index) => (
                  <tr key={index}>
                    <td>
                      {" "}
                      <input
                        type="checkbox"
                        onChange={() =>
                          handleAppointmentStatus(
                            "Completed",
                            obj?.appointment_id
                          )
                        }
                      />
                    </td>
                    <td> {obj?.patient_name}</td>
                    <td>{obj?.disease_types || obj?.bmi}</td>
                    <td>
                      {access == "doctor"
                        ? obj?.appointment_time
                        : obj?.mobile_number}
                    </td>
                    <td>
                      {access == "doctor" ? (
                        obj?.appointment_date ? (
                          new Date(obj?.appointment_date)
                            .toISOString()
                            .slice(0, 10)
                        ) : null
                      ) : (
                        <div className={tableCSS.iconDiv}>
                          <i
                            title="view patient"
                            onClick={() => {
                              handlePatientView(obj?.patient_id);
                            }}
                            className="fa-solid fa-eye"
                          ></i>
                        </div>
                      )}
                    </td>
                    <td>
                      <Button
                        text={
                          access == "doctor"
                            ? obj?.prescription_id
                              ? "Edit Prescription"
                              : "Add Prescription"
                            : obj?.appointment_status == null
                            ? "Book Now"
                            : obj?.appointment_status
                        }
                        style={tableCSS.bookBtn}
                        onClick={
                          obj.appointment_status == null
                            ? () => {
                                access == "doctor"
                                  ? navigate(
                                      `/appointment/prescription?id=${obj.appointment_id}&edit=${obj.prescription_id}`
                                    )
                                  : handleBookAppointment(obj.patient_id);
                              }
                            : null
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
        <div className={tableCSS.footerDiv}></div>
      </div>
    </>
  );
};
export default UserPatientTable;
