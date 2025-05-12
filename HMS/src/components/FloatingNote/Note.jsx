import React from "react";
import styles from "src/style/Note.module.css";
export const Note = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <div class={`${styles.noData} ${styles.float}`}>
          <i className={`fa fa-caret-left fa-md ${styles.arrow}`}></i>
          <p>
            <i className={`fa ${styles.faWarning}`}></i>Kindly complete all
            steps.
          </p>
        </div>
      </div>
    </>
  );
};
