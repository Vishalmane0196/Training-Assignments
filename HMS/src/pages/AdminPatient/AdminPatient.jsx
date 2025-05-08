import React, { useCallback, useEffect, useState } from "react";
import patientCSS from "../../style/AdminPatient.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchPatientsInfo } from "../../redux/asyncThunkFuntions/user";
import {
  setBookPatientId,
  setAppointmentId,
} from "src/redux/slices/appointment/bookSlice";
import { changeAppointmentStatusToCancel } from "src/redux/asyncThunkFuntions/admin";
import { changeAppointmentStatusToSchedule } from "src/redux/asyncThunkFuntions/admin";
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
  const [btnState, setBtnState] = useState(false);
  const [deleteState, setState] = useState(false);
  const [id, setID] = useState(null);
  const dispatch = useDispatch();
  const { patientList } = useSelector((state) => state.patient);
  const navigate = useNavigate();

  const getData = useCallback(async () => {
    try {
      await dispatch(fetchPatientsInfo()).unwrap();
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  // const getData = async () => {
  //   try {
  //     await dispatch(fetchPatientsInfo());
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const getAppointment = useCallback(async () => {
    try {
      await dispatch(getAppointments()).unwrap();
    } catch (error) {
      toast.error(error);
    }
  }, [dispatch]);

  // const getAppointment = async () => {
  //   try {
  //     await dispatch(getAppointments()).unwrap();
  //   } catch (error) {
  //     toast.error(error);
  //   }
  // };

  const handleBookAppointment = (id) => {
    dispatch(setBookPatientId(id));
    navigate("/mypatients/viewpatients/bookAppointment");
  };

  const handleAdminAllPatient = (id) => {
    navigate(`/mypatients/patientdetails/${id}`);
  };

  const changeStatus = async (data) => {
    if (btnState) return;
    try {
      setBtnState(true);
      if (data?.status == "Cancelled") {
        let y = dispatch(changeAppointmentStatusToCancel(data)).unwrap();
        toast.promise(y, {
          pending: "Cancelling Appointment...",
          success: "Cancelled Successfully",
          error: "Error while Cancelling",
        });
        await y;
      } else if (data?.status == "Scheduled") {
        let y = dispatch(changeAppointmentStatusToSchedule(data)).unwrap();
        toast.promise(y, {
          pending: "Scheduling appointment please wait...",
          success: " Successfully Scheduled.",
          error: "Error while Cancelling",
        });
        await y;
      } else {
        await dispatch(changeAppointmentStatus(data)).unwrap();
      }
      getAppointment();
      setState(false);
      setBtnState(false);
    } catch (error) {
      setBtnState(false);
      console.error(error);
    }
  };

  const deletePatientFun = async (id) => {
    try {
      await dispatch(deletePatient(id)).unwrap();
      getData();
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
  const showHistoryOfAppointment = (id) => {
    dispatch(setBookPatientId(id));
    navigate(`/mypatients/history/${id}`);
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
            <p>{access == "appointment" ? "Gender" : "Patient Name"}</p>
            <p> {access == "appointment" ? "Consulting" : "Mobile No"} </p>
            <p>{access == "appointment" ? "Time" : "Age"}</p>
            <p> {access == "appointment" ? "Date" : "view"} </p>
            <p>{access == "appointment" ? "Status" : "Book Slot"}</p>
          </div>
          <ul className={patientCSS.ulList}>
            {patientList.length == 0 ? <NoRecord /> : null}
            {patientList?.map((patient, index) => (
              <li key={index} className={patientCSS.liList}>
                <p className={patientCSS.p}>
                  {access == "appointment" ? patient?.patient_name : index + 1}
                </p>
                <p className={patientCSS.p}>
                  {access == "appointment"
                    ? patient?.gender
                    : patient?.patient_name}
                </p>
                <p className={patientCSS.p}>
                  {access == "appointment"
                    ? `Dr. ${patient?.name}`
                    : patient?.mobile_number}
                </p>
                <p className={patientCSS.p}>
                  {access == "appointment"
                    ? patient?.appointment_time
                    : patient?.age}
                </p>

                <p className={patientCSS.iconDiv}>
                  {access == "appointment" ? (
                    patient?.appointment_date ? (
                      new Date(patient?.appointment_date)
                        .toISOString()
                        .split("T")[0]
                    ) : (
                      ""
                    )
                  ) : (
                    <>
                      <i
                        title="view patient"
                        onClick={() => {
                          handleAdminAllPatient(patient?.patient_id);
                        }}
                        className="fa-solid fa-eye"
                      ></i>
                      <i
                        title="delete patient"
                        disabled={
                          patient?.appointment_status == "Cancelled" ||
                          patient?.appointment_status == null
                        }
                        onClick={() => {
                          if (
                            patient?.appointment_status == "Cancelled" ||
                            patient?.appointment_status == null
                          ) {
                            setState(true);
                            setID(patient?.patient_id);
                          } else {
                            return;
                          }
                        }}
                        className={`fa-solid fa-trash ${
                          patient?.appointment_status == "Cancelled" ||
                          patient?.appointment_status == null
                            ? null
                            : patientCSS.disabled
                        }`}
                      ></i>
                      <i
                        title="view appointments"
                        onClick={() =>
                          showHistoryOfAppointment(patient?.patient_id)
                        }
                        className="fa-solid fa-clock-rotate-left"
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
                      className={patientCSS[patient?.status]}
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
                      patient?.appointment_status == null
                        ? "Book Now"
                        : "Book Now"
                    }
                    style={patientCSS.bookBtn}
                    onClick={
                      patient?.appointment_status == null
                        ? () => {
                            handleBookAppointment(patient?.patient_id);
                          }
                        : () => {
                            handleBookAppointment(patient?.patient_id);
                          }
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
              access == "appointment" ? changeStatus : deletePatientFun
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
