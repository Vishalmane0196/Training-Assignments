import React, { useCallback, useEffect, useState } from "react";
import Calendar from "../Calender/Calender";
import { Doctor } from "src/components/Doctor/Doctor";
import appointmentCSS from "../../style/Appointment.module.css";
import { Slot } from "src/components/Slot/Slot";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getAppointmentDetails,
  getDoctor,
} from "src/redux/asyncThunkFuntions/user";
import { searchDoctor } from "src/redux/asyncThunkFuntions/user";
import { NoRecord } from "src/components/NoRecord/NoRecord";
import { useForm } from "react-hook-form";
import { Input } from "src/components/Input/Input";
import View from "src/components/ViewDetails/View";
import { setAppointmentId } from "src/redux/slices/appointment/bookSlice";
import { useNavigate } from "react-router-dom";

const Appointment = () => {
  const dispatch = useDispatch();
  const [book, setBook] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState(null);
  const [searchDoctorState, setSearchDoctor] = useState("");
  const [displayState, setDisplayState] = useState(false);
  const [diseaseInfo, setDiseaseInfo] = useState(null);
  const navigate = useNavigate();
  const { appointment_Id } = useSelector((state) => state.book);
  const {
    register,
    reset,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      disease_type: diseaseInfo?.disease_type || "",
      disease_description: diseaseInfo?.disease_description || "",
    },
  });

  const getDoctorsFunc = useCallback(async () => {
    try {
      let response = await dispatch(getDoctor()).unwrap();
      setDoctors(response.data);
    } catch (error) {
      toast.error(error);
    }
  }, []);

  const getDoctorsSearchFun = async () => {
    if (searchDoctorState == "") {
      getDoctorsFunc();
      return;
    }
    try {
      let res = await dispatch(searchDoctor(searchDoctorState)).unwrap();
      setDoctors(res.data);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getDoctorsFunc();

    return () => {
      dispatch(setAppointmentId(null));
    };
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      getDoctorsSearchFun();
    }, 1000);
    return () => {
      clearTimeout(debounce);
    };
  }, []);

  const getDiseaseInfoFun = async () => {
    if (appointment_Id === null) {
      return;
    } else {
      try {
        let response = await dispatch(
          getAppointmentDetails(appointment_Id)
        ).unwrap();
        console.log("schedule Data", response.data[0]);
        setDiseaseInfo({
          disease_type: response.data[0].disease_types || "",
          disease_description: response.data[0].disease_description || "",
        });
        setDate(response.data[0].appointment_date);
        reset({
          disease_type: response.data[0].disease_types || "",
          disease_description: response.data[0].disease_description || "",
        });
      } catch (error) {
        console.error(error);
      }
    }
  };
  useEffect(() => {
    getDiseaseInfoFun();
  }, []);

  return (
    <>
      <div className={appointmentCSS.breadcrumbs}>
        <div className={appointmentCSS.container2}>
          <ul className={appointmentCSS.breadcrumbs__list}>
            <li>
              <a> Dashboard</a>
            </li>
            <li>
              <a onClick={() => navigate("/mypatients")}>My Patient</a>
            </li>
            {appointment_Id !== null ? (
              <li>
                <a onClick={() => history.back()}>History</a>
              </li>
            ) : null}

            <li>
              <a>Booking</a>
            </li>
          </ul>
        </div>
      </div>
      <div className={appointmentCSS.container}>
        <h1>Booking Appointment</h1>
        <div className={appointmentCSS.line}></div>
        <div>
          <h3>Pick Date :</h3>
          <Calendar dateSelected={date} setDate={setDate} />
          <br />
          <h3>Disease Descriptions :</h3>
          <div className={appointmentCSS.diseaseContainer}>
            <Input
              label="Disease Type"
              require="Disease Type"
              register={register}
              trigger={trigger}
              maxlength={20}
              fieldName="disease_type"
              errors={errors}
              pattern={{
                message: "Invalid Pattern",
                value: /^[A-Za-z]{2,}(?:[ '-][A-Za-z]+)*$/,
              }}
              maxLength={15}
              type="text"
              placeholder="Enter Disease Name."
            />

            <Input
              label="Disease Description"
              require="Description require"
              register={register}
              trigger={trigger}
              fieldName="disease_description"
              errors={errors}
              pattern={{
                message: "Invalid Pattern",
                value: /^[A-Za-z]{2,}(?:[ '-][A-Za-z]+)*$/,
              }}
              type="text"
              placeholder="Enter Description."
            />
            <i
              title="view discription"
              onClick={() => {
                setDisplayState(true);
              }}
              className={`fa-solid fa-eye ${appointmentCSS.eye}`}
            ></i>
          </div>
          <h3>Select Doctors :</h3>
          <span className={appointmentCSS.search}>
            <input
              className={appointmentCSS.searchInput}
              type="text"
              onChange={(e) => {
                setSearchDoctor(e.target.value);
              }}
              placeholder="Search Doctor."
            />
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>

          {doctors.length == 0 ? (
            <div className={appointmentCSS.noRecord}>
              <NoRecord />
            </div>
          ) : null}
          {doctors == 0 ? null : (
            <div className={appointmentCSS.appointmentCardCover}>
              {doctors.map((object, index) => {
                return (
                  <Doctor
                    date={date}
                    key={index}
                    setBook={setBook}
                    name={object.name}
                    inTime={object.doctorInTime}
                    outTime={object.doctorOutTime}
                    specialist={object.specialization}
                    id={object.doctor_id}
                    valid={object}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>

      {displayState && (
        <View
          data={getValues("disease_description")}
          deleteState={displayState}
          setDeleteState={setDisplayState}
        />
      )}

      {book && (
        <Slot
          data={getValues()}
          date={date}
          doctors={doctors}
          setDate={setDate}
          book={book}
          setBook={setBook}
        />
      )}
    </>
  );
};

export default Appointment;
