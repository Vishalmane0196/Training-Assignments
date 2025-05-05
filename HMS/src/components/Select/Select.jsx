import { color } from "framer-motion";
import React, { useState, useRef } from "react";
import styles from "src/style/Select.module.css";

export const Select = ({ value, onChange, ...rest }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const subMenuTimeoutRef = useRef(null);

  const handleChange = (option) => {
    onChange(option);
    setIsOpen(false);
    setShowSubMenu(false);
  };

  const handleOtherEnter = () => {
    clearTimeout(subMenuTimeoutRef.current);
    setShowSubMenu(true);
  };

  const handleOtherLeave = () => {
    subMenuTimeoutRef.current = setTimeout(() => setShowSubMenu(false), 300);
  };

  return (
    <div className={styles.container} {...rest}>
      <div
        className={styles.main}
        style={value == "" ? { color: "#797777" } : { color: "black" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {value || "Select Gender"}

        {isOpen && (
          <div className={styles.mainOptions}>
            <div
              className={styles.mainOption}
              onClick={() => handleChange("Male")}
            >
              Male
            </div>
            <div
              className={styles.mainOption}
              onClick={() => handleChange("Female")}
            >
              Female
            </div>
            <div
              className={`${styles.mainOption} ${styles.other}`}
              onMouseEnter={handleOtherEnter}
              onMouseLeave={handleOtherLeave}
            >
              Other
              {showSubMenu && (
                <div className={styles.mainOptionsSecond}>
                  <div
                    className={styles.mainOption}
                    onClick={() => handleChange("Non-binary")}
                  >
                    Non-Binary
                  </div>
                  <div
                    className={styles.mainOption}
                    onClick={() => handleChange("Transgender")}
                  >
                    Transgender
                  </div>
                  <div
                    className={styles.mainOption}
                    onClick={() => handleChange("Queer")}
                  >
                    Queer
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
