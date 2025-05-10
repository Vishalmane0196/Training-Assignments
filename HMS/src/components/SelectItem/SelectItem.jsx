import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "src/style/HoverMenu.module.css";

const SelectItem = ({ obj }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.dropdown}>
        <div className={styles.menu}>
          <div
            onClick={() => {
              navigate(
                `/appointment/prescription?id=${obj.appointment_id}&edit=${obj.prescription_id}`
              );
            }}
            className={styles.item}
          >
            {obj?.prescription_id ? "Edit Prescription" : "Add Prescription"}
          </div>
          <div onClick={() => {}} className={styles.item}>
            {obj?.observation ? "Edit Observation" : "Add Observation"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectItem;
