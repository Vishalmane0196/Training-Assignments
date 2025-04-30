import React, { useEffect, useState } from "react";
import Calendar from "../Calender/Calender";
import { Doctor } from "src/components/Doctor/Doctor";
import appointmentCSS from "../../style/Appointment.module.css";
import { Slot } from "src/components/Slot/Slot";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getDoctor } from "src/redux/asyncThunkFuntions/user";
import { searchDoctor } from "src/redux/asyncThunkFuntions/user";
import { NoRecord } from "src/components/NoRecord/NoRecord";
const Appointment = () => {
  const dispatch = useDispatch();
  const [book, setBook] = useState(false);
  const [backUp, setBackUpData] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState(null);
  const [doctor, setDoctor] = useState("");
  const getDoctorsFunc = async () => {
    try {
      let response = await dispatch(getDoctor()).unwrap();
      setDoctors(response.data);
      setBackUpData(response.data);
    } catch (error) {
      toast.error(error);
    }
  };
  const getDoctorsSearchFun = async () => {
    if (doctor == "") {
      getDoctorsFunc();
      return;
    }
    try {
      let res = await dispatch(searchDoctor(doctor)).unwrap();
      setDoctors(res.data);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getDoctorsFunc();
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      getDoctorsSearchFun();
    }, 1000);
    return () => {
      clearTimeout(debounce);
    };
  }, [doctor]);

  return (
    <>
      <div className={appointmentCSS.breadcrumbs}>
        <div className={appointmentCSS.container2}>
          <ul className={appointmentCSS.breadcrumbs__list}>
            <li>
              <a> Dashboard</a>
            </li>
            <li>
              <a onClick={() => history.back()}>My Patient</a>
            </li>
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
          <h3>Pick Date</h3>
          <Calendar setDate={setDate} />
          <h3>Doctors</h3>
          <span className={appointmentCSS.search}>
            <input
              className={appointmentCSS.searchInput}
              type="text"
              onChange={(e) => {
                setDoctor(e.target.value);
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
                    key={index}
                    setBook={setBook}
                    name={object.name}
                    inTime={object.doctorInTime}
                    outTime={object.doctorOutTime}
                    specialist={object.specialization}
                    id={object.doctor_id}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
      {book && (
        <Slot
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
