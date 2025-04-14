import React, { useEffect, useState } from "react";
import Calendar from "../Calender/Calender";
import { Doctor } from "src/components/Doctor/Doctor";
import appointmentCSS from "../../style/Appointment.module.css";
import { Slot } from "src/components/Slot/Slot";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getDoctor } from "src/redux/asyncThunkFuntions/user";

const Appointment = () => {
  const dispatch = useDispatch();
  const [book, setBook] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState(null);
  const getDoctorsFunc = async () => {
    try {
      let response = await dispatch(getDoctor()).unwrap();
      setDoctors(response.data);
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    getDoctorsFunc();
  }, []);
  return (
    <>
      <div className={appointmentCSS.container}>
        <h1>Booking Appointment</h1>
        <div className={appointmentCSS.line}></div>
        <div>
          <h3>Pick Date</h3>
          <Calendar setDate={setDate} />
          <h3>Doctors</h3>
          <div className={appointmentCSS.appointmentCardCover}>
            {doctors.map((object, index) => {
              return (
                <Doctor
                  key={index}
                  setBook={setBook}
                  name={object.name}
                  inTime={object.doctorInTime}
                  outTime = {object.doctorOutTime}
                  specialist={object.specialization}
                  id={object.doctor_id}
                />
              );
            })}
          </div>
        </div>
      </div>
      {book && (
        <Slot date={date} doctors={doctors} setDate={setDate} book={book} setBook={setBook} />
      )}
    </>
  );
};

export default Appointment;
