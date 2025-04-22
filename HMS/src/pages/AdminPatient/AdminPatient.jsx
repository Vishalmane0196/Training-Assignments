import React, { useEffect, useState } from "react";
import patientCSS from "../../style/AdminPatient.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchPatientsInfo } from "../../redux/asyncThunkFuntions/user";
import { setBookPatientId } from "src/redux/slices/appointment/bookSlice";
import { changeAppointmentStatusToCancel } from "src/redux/asyncThunkFuntions/admin";
import {
  deletePatient,
  getAppointments,
  changeAppointmentStatus,
} from "src/redux/asyncThunkFuntions/admin";
import { toast } from "react-toastify";
import { Button } from "src/components/Button/Button";
import DeletePopUp from "src/components/Setting/Delete/DeletePopUp";
import { NoRecord } from "src/components/NoRecord/NoRecord";
const AdminPatient = ({ access }) => {
  const [deleteState, setState] = useState(false);
  const [id, setID] = useState(null);
  const dispatch = useDispatch();
  const { patientList } = useSelector((state) => state.patient);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      await dispatch(fetchPatientsInfo());
    } catch (error) {
      console.error(error);
    }
  };
  const getAppointment = async () => {
    try {
      await dispatch(getAppointments()).unwrap();
    } catch (error) {
      toast.error(error);
    }
  };

  const handleBookAppointment = (id) => {
    dispatch(setBookPatientId(id));
    navigate("/admin/dashboard/viewpatients/bookAppointment");
  };

  const handleAdminAllPatient = (id) => {
    navigate(`/admin/dashboard/allpatients/patientdetails/${id}`);
  };

  const changeStatus = async (data) => {
    try {
      if (data?.status == "Cancelled") {
        let y = dispatch(changeAppointmentStatusToCancel(data)).unwrap();
        toast.promise(y, {
          pending: "Cancelling Appointment...",
          success: "Cancelled Successfully",
          error: "Error while Cancelling",
        });
        await y;
      } else {
        await dispatch(changeAppointmentStatus(data)).unwrap();
      }

      getAppointment();
      setState(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleAppointmentStatus = async (id, status) => {
    if (status == "Cancelled") {
      setID({ id: id, status: status });
      setState(true);
    } else {
      changeStatus({ id: id, status: status });
    }
  };

  useEffect(() => {
    if (access == "appointment") {
      getAppointment();
    } else {
      getData();
    }
  }, [access]);

  return (
    <>
      <div className={patientCSS.containerCover}>
        <div className={patientCSS.container}>
          <h1 className={patientCSS.titleHeader}>
            {access == "appointment"
              ? "Manage Appointment"
              : "Admin Patient Details"}
          </h1>
          <div className={patientCSS.title}>
            <p>{access == "appointment" ? "Patient Name" : "Sr. No"}</p>
            <p>{access == "appointment" ? "Disease Type" : "Patient Name"}</p>
            <p> {access == "appointment" ? "Doctor" : "Disease Type"} </p>
            <p>{access == "appointment" ? "Time" : "Age"}</p>
            <p> {access == "appointment" ? "Date" : "view"} </p>
            <p>{access == "appointment" ? "Status" : "Book Slot"}</p>
          </div>
          <ul className={patientCSS.ulList}>
            {patientList.length == 0 ? <NoRecord /> : null}
            {patientList?.map((patient) => (
              <li className={patientCSS.liList}>
                <p className={patientCSS.p}>
                  {access == "appointment"
                    ? patient.patient_name
                    : patient.patient_id}
                </p>
                <p className={patientCSS.p}>
                  {access == "appointment"
                    ? patient.disease_type
                    : patient.patient_name}
                </p>
                <p className={patientCSS.p}>
                  {access == "appointment"
                    ? patient.name
                    : patient.disease_type}
                </p>
                <p className={patientCSS.p}>
                  {access == "appointment"
                    ? patient.appointment_time
                    : patient.age}
                </p>

                <p className={patientCSS.iconDiv}>
                  {access == "appointment" ? (
                    patient.appointment_id ? (
                      new Date(patient?.appointment_date)
                        .toISOString()
                        .slice(2, 10)
                    ) : (
                      ""
                    )
                  ) : (
                    <>
                      <i
                        title="view patient"
                        onClick={() => {
                          handleAdminAllPatient(patient.patient_id);
                        }}
                        className="fa-solid fa-eye"
                      ></i>
                      <i
                        title="delete patient"
                        onClick={() => {
                          setID(patient.patient_id);
                          setState(true);
                        }}
                        className="fa-solid fa-trash"
                      ></i>
                    </>
                  )}
                </p>
                {access == "appointment" ? (
                  <div className={`${patientCSS.selectTag} ${patient.status}`}>
                    <select
                      name=""
                      value={patient?.status}
                      onChange={(e) =>
                        handleAppointmentStatus(
                          patient?.appointment_id,
                          e.target.value
                        )
                      }
                      className={patientCSS[patient.status]}
                      id=""
                    >
                      {patient?.status == "Cancelled" ||
                      patient?.status == "Completed" ? (
                        <option
                          className={patientCSS.Cancelled}
                          value={`${patient?.status}`}
                        >
                          {patient?.status}
                        </option>
                      ) : (
                        <>
                          {" "}
                          <option
                            className={patientCSS.Scheduled}
                            value="Scheduled"
                          >
                            Scheduled
                          </option>
                          <option
                            disabled
                            className={patientCSS.Pending}
                            value="Pending"
                          >
                          
                            Pending
                          </option>
                          <option
                            className={patientCSS.Completed}
                            value="Completed"
                          >
                            Completed
                          </option>
                          <option
                            className={patientCSS.Cancelled}
                            value="Cancelled"
                          >
                            Cancelled
                          </option>
                        </>
                      )}
                    </select>
                  </div>
                ) : (
                  <Button
                    text={
                      patient.appointment_status == null
                        ? "Book Now"
                        : patient.appointment_status
                    }
                    style={patientCSS.bookBtn}
                    onClick={
                      patient.appointment_status == null
                        ? () => {
                            handleBookAppointment(patient.patient_id);
                          }
                        : null
                    }
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
        {deleteState && (
          <DeletePopUp
            deleteFunction={
              access == "appointment" ? changeStatus : deletePatient
            }
            id={id}
            functionCall={access == "appointment" ? getAppointment : getData}
            deleteState={deleteState}
            setDeleteState={setState}
            access={access}
          />
        )}
      </div>
    </>
  );
};

export default AdminPatient;
