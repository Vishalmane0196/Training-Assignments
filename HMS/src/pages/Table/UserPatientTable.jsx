import React, { useCallback, useEffect, useState } from "react";
import tableCSS from "../../style/UserPatientTable.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchPatientsInfo } from "../../redux/asyncThunkFuntions/user";
import { Button } from "src/components/Button/Button";
import { setBookPatientId } from "src/redux/slices/appointment/bookSlice";
import { getDoctorAppointmentsList } from "src/redux/asyncThunkFuntions/doctor";
import { NoRecord } from "src/components/NoRecord/NoRecord";
import { changeAppointmentStatus } from "src/redux/asyncThunkFuntions/admin";
import SelectItem from "src/components/SelectItem/SelectItem";
import {
  changeAppointmentStatusToCancel,
  changeAppointmentStatusToSchedule,
} from "src/redux/asyncThunkFuntions/admin";
import { toast } from "react-toastify";
import DeletePopUp from "src/components/Setting/Delete/DeletePopUp";

const UserPatientTable = ({ access }) => {
  const [deleteState, setState] = useState(false);
  const dispatch = useDispatch();
  const { patientList } = useSelector((state) => state.patient);
  const [data, setData] = useState(null);
  const { isDoctor } = useSelector((state) => state.auth);
  const { userInfo } = useSelector((state) => state.auth);
  const [btnState, setBtnState] = useState(false);
  const navigate = useNavigate();

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

  const handleAppointment = async (data) => {
    if (btnState) return;
    try {
      setBtnState(true);
      if (data?.status == "Cancelled") {
        let y = dispatch(
          changeAppointmentStatusToCancel({ id: data.id })
        ).unwrap();
        toast.promise(y, {
          pending: "Cancelling Appointment...",
          success: "Cancelled Successfully",
          error: "Error while Cancelling",
        });
        await y;
      } else if (data?.status == "Scheduled") {
        let y = dispatch(
          changeAppointmentStatusToSchedule({ id: data.id })
        ).unwrap();
        toast.promise(y, {
          pending: "Scheduling appointment please wait...",
          success: " Successfully Scheduled.",
          error: "Error while Cancelling",
        });
        await y;
      } else {
        await dispatch(changeAppointmentStatus({ id: data.id })).unwrap();
      }
      getAllAppointment();
      setBtnState(false);
    } catch (error) {
      setBtnState(false);
      console.error(error);
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
                <th>Patient Name</th>
                <th>{"Disease Type"}</th>

                <th>{"Time"}</th>
                <th>{"Date"}</th>
                <th>{"Prescription"}</th>
                <th>{"Action"}</th>
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
                    <td>{obj?.patient_name}</td>
                    <td> {obj?.disease_type}</td>
                    <td>{obj?.appointment_time}</td>
                    <td>
                      {obj?.appointment_date
                        ? new Date(obj?.appointment_date)
                            .toISOString()
                            .slice(0, 10)
                        : null}
                    </td>
                    <td>
                      {
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
                      }
                    </td>
                    <td>
                      <SelectItem
                        setData={setData}
                        changeStatus={handleAppointment}
                        setState={setState}
                        id={obj.appointment_id}
                        status={obj.status}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
        <div className={tableCSS.footerDiv}></div>

        {deleteState && (
          <DeletePopUp
            deleteFunction={handleAppointment}
            id={data.id}
            functionCall={getAllAppointment}
            deleteState={deleteState}
            setDeleteState={setState}
            access={"appointment"}
          />
        )}
      </div>
    </>
  );
};
export default UserPatientTable;
