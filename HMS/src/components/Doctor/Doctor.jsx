import React from "react";
import doctorCSS from "../../style/Doctor.module.css";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setBookDoctorId } from "src/redux/slices/appointment/bookSlice";
export const Doctor = ({ name,specialist,id,setBook}) => {
  const dispatch = useDispatch();
  const handleDoctorBookId = () =>{
    setBook(true);
    dispatch(setBookDoctorId(id))
  }
  return (
    <>
      <div className={doctorCSS.card} onClick={handleDoctorBookId}>
        <div className={doctorCSS.leftSection}>
          <div className={doctorCSS.avatarCover}>
            <img src='https://png.pngtree.com/png-clipart/20230813/original/pngtree-flat-illustration-of-a-male-doctor-avatar-upper-body-in-youth-vector-picture-image_10580735.png' className={doctorCSS.avatar} alt="" />
          </div>
          <div className={doctorCSS.info}>
            {" "}
            <h2>{name}</h2>
            <h3>{specialist}</h3>
            <p>Time: 10:00 am - 06:00 pm</p>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};

Doctor.prototype ={
  name:PropTypes.string.isRequired,
  specialist : PropTypes.string.isRequired,
  id:PropTypes.number.isRequired,
  setBook : PropTypes.func
}