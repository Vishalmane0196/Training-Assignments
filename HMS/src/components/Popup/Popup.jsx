import React, { useEffect, useState } from "react";
import styles from "src/style/Popup.module.css";
import avatarImage from "src/assets/wait.jpg";

const Popup = () => {
  const [countDown, setCountdown] = useState(2);
  useEffect(() => {
    if (countDown === 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countDown]);

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <img src={avatarImage} alt="Avatar" className={styles.image} />
        <h3>Please Complete All Steps</h3>
        <p>
          {`You need to complete all 4 steps in the form.Redirecting please
          wait...${countDown}`}
        </p>
      </div>
    </div>
  );
};

export default Popup;
