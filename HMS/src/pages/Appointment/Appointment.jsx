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
  const handleBookStatus = () => {
    setBook((pre) => !pre);
  };
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
          <Calendar />
          <h3>Doctors</h3>
          <div className={appointmentCSS.appointmentCardCover}>
            {doctors.map((object, index) => {
              return (
                <Doctor
                  key={index}
                  setBook={setBook}
                  name={object.name}
                  specialist={object.specialization}
                  id={object.doctor_id}
                />
              );
            })}

            <Doctor name={"Dr Rakesh"} specialist={"Node"} setBook={setBook} />
            <Doctor name={"Dr Vishal"} specialist={"React"} setBook={setBook} />
            <Doctor name={"Dr Prerna"} specialist={"Node"} setBook={setBook} />
            <Doctor name={"Dr Anshita"} specialist={"React"} setBook={setBook} />
            <Doctor name={"Dr Karan"} specialist={"React"} setBook={setBook} />
            <Doctor name={"Dr Vaishnavi"} specialist={"Node"} setBook={setBook} />

          </div>
        </div>
      </div>
      {book && <Slot book={book} setBook={setBook} />}
    </>
  );
};

export default Appointment;
