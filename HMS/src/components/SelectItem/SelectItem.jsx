import React from "react";

import styles from "src/style/HoverMenu.module.css";

const SelectItem = ({ setData, id, status, changeStatus, setState }) => {
  return (
    <div className={styles.container}>
      <div className={styles.dropdown}>
        <button className={styles.button}>{status} </button>
        <div className={styles.menu}>
          <div
            className={status == "Pending" ? styles.itemActive : styles.item}
          >
            Pending
          </div>
          <div
            onClick={() => {
              setData({ id: id, status: "Scheduled" });
              changeStatus();
            }}
            className={status == "Scheduled" ? styles.itemActive : styles.item}
          >
            Scheduled
          </div>
          <div
            onClick={() => {
              setState(true);
              setData({ id: id, status: "Cancelled" });
              changeStatus();
            }}
            className={status == "Cancelled" ? styles.itemActive : styles.item}
          >
            Cancelled
          </div>
          <div
            onClick={() => {
              setData({ id: id, status: "Completed" });
              changeStatus();
            }}
            className={status == "Completed" ? styles.itemActive : styles.item}
          >
            Completed
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectItem;
