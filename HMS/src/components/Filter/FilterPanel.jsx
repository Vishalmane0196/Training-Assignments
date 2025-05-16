import React, { useState } from "react";
import styles from "src/style/FilterPanel.module.css";

const Notes = ["Observation", "Prescription"];
const Appointment = ["Today", "Tomorrow", "Upcoming"];
const statuses = ["Pending", "Scheduled", "Completed", "Cancelled"];

const FilterPanel = ({ data, setData, setFilterStatus, searchBackUpData }) => {
  const [status, setStatus] = useState(
    JSON.parse(localStorage.getItem("filterData"))?.status || []
  );
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("filterData"))?.notes || []
  );
  const [appointment, setAppointments] = useState(
    JSON.parse(localStorage.getItem("filterData"))?.appointment || []
  );

  const toggleStatus = (value) => {
    setStatus((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  };
  const handleSaveFilter = () => {
    if (notes.length == 0 && status.length == 0 && appointment.length == 0) {
      setFilterStatus(false);
      return;
    }
    localStorage.setItem(
      "filterData",
      JSON.stringify({
        status: status,
        notes: notes,
        appointment: appointment,
      })
    );
    let searchFilterArray = [...notes, ...status, ...appointment];

    let y = data.filter((e) => {
      return Object.values(e).some((values) => {
        let status = searchFilterArray.includes(String(values));
        let observation = notes.includes("Observation");
        let prescription = notes.includes("Prescription");
        if (observation) {
          observation = e.observation == null ? false : true;
        }
        if (prescription) {
          prescription = e.prescription_id == null ? false : true;
        }

        let today = appointment.includes("Today");
        let tomorrow = appointment.includes("Tomorrow");
        let upcoming = appointment.includes("Upcoming");
        console.log(new Date(e.appointment_date).getDate());
        console.log(new Date().getDate());
        if (today) {
          today =
            new Date(e.appointment_date).getDate() == new Date().getDate()
              ? true
              : false;
        }
        if (tomorrow) {
          tomorrow =
            new Date(e.appointment_date).getDate() == new Date().getDate() + 1
              ? true
              : false;
        }
        if (upcoming) {
          upcoming =
            new Date(e.appointment_date).getDate() >= new Date().getDate() + 2
              ? true
              : false;
        }

        if (status) {
          return true;
        } else if (observation || prescription) {
          return true;
        } else if (today || tomorrow || upcoming) {
          return true;
        }
        return false;
      });
    });
    setFilterStatus(false);
    setData(y);
  };
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.sectionReset}>
          {" "}
          <label className={styles.label}>Medical Notes</label>
          <label
            onClick={() => {
              setData(searchBackUpData);
              setFilterStatus(false);
              setNotes([]);
              setAppointments([]);
              setStatus([]);
              localStorage.removeItem("filterData");
            }}
            className={styles.reset}
            htmlFor=""
          >
            reset all
          </label>
        </div>

        <div className={styles.tags}>
          {Notes.map((epic) => (
            <label
              key={epic}
              onClick={() =>
                setNotes((pre) => {
                  return pre.includes(epic)
                    ? pre.filter((e) => e !== epic)
                    : [...pre, epic];
                })
              }
              htmlFor={epic}
              className={styles.filterLabelTag}
            >
              <span
                key={epic}
                className={notes.includes(epic) ? styles.tag : styles.noTag}
              >
                {epic}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <label className={styles.label}>Appointment</label>
        <div className={styles.tags}>
          {Appointment.map((assignee) => (
            <label
              onClick={() =>
                setAppointments((pre) => {
                  return pre.includes(assignee)
                    ? pre.filter((e) => e !== assignee)
                    : [...pre, assignee];
                })
              }
              htmlFor={assignee}
              key={assignee}
              className={styles.filterLabelTag}
            >
              <span
                key={assignee}
                className={
                  appointment.includes(assignee) ? styles.tag : styles.noTag
                }
              >
                {assignee}{" "}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <label className={styles.label}>Status</label>
        <div className={styles.checkboxGroup}>
          {statuses.map((s) => (
            <label key={s} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={status.includes(s)}
                onChange={() => toggleStatus(s)}
              />
              {s}
            </label>
          ))}
        </div>
      </div>

      <div className={styles.footer}>
        <button
          onClick={() => {
            setFilterStatus(false);
          }}
          className={styles.cancel}
        >
          Cancel
        </button>
        <button onClick={handleSaveFilter} className={styles.save}>
          Save
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
