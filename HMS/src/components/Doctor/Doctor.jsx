import React from "react";
import doctorCSS from "../../style/Doctor.module.css";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setBookDoctor } from "src/redux/slices/appointment/bookSlice";
export const Doctor = ({ outTime, inTime, name, specialist, id, setBook }) => {
  const dispatch = useDispatch();
  const handleDoctorBookId = () => {
    setBook(true);
    dispatch(
      setBookDoctor({
        inTime: inTime,
        id: id,
        specialist: specialist,
        name: name,
        outTime: outTime,
      })
    );
  };
  return (
    <>
      <div className={doctorCSS.card} onClick={handleDoctorBookId}>
        <div className={doctorCSS.leftSection}>
          <div className={doctorCSS.avatarCover}>
            <img
              src="https://png.pngtree.com/png-clipart/20230813/original/pngtree-flat-illustration-of-a-male-doctor-avatar-upper-body-in-youth-vector-picture-image_10580735.png"
              className={doctorCSS.avatar}
              alt=""
            />
          </div>
          <div className={doctorCSS.info}>
            {" "}
            <h2>{`Dr. ${name}`}</h2>
            <h3>{specialist}</h3>
            <p>{`Time: ${inTime.slice(0, 5)}  - ${outTime.slice(0, 5)} `}</p>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};

Doctor.prototype = {
  name: PropTypes.string.isRequired,
  specialist: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  setBook: PropTypes.func,
  outTime: PropTypes.string,
  inTime: PropTypes.string,
};
