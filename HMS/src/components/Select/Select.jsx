import React, { useState } from "react";
import styles from "src/style/Select.module.css";
export const Select = ({ value, onChange, options }) => {
  const [status, setStatus] = useState(false);
  const handleChange = (option) => {
    onChange(option);
    setStatus(false);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.main} onClick={() => setStatus(true)}>
          {value || "Select Gender"}
          {status && (
            <div className={styles.mainOptions}>
              <div
                className={styles.mainOption}
                onClick={() => handleChange("Male")}
              >
                Male{" "}
              </div>
              <div
                className={styles.mainOption}
                onClick={() => handleChange("Female")}
              >
                Female
              </div>
              <div
                className={styles.mainOption}
               
              >
                Other
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
