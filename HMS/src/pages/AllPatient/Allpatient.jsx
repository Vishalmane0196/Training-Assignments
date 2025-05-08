import React from "react";
import { Outlet } from "react-router-dom";
import viewPatientCSS from "../../style/ViewPatient.module.css";
const Allpatient = () => {
  return (
    <>
      <div className={viewPatientCSS.breadcrumbs}>
        <div className={viewPatientCSS.container2}>
          <ul className={viewPatientCSS.breadcrumbs__list}>
            <li>
              <a> Dashboard</a>
            </li>
            <li>
              <a onClick={() => history.back()}>
                {window.location.href.includes("mypatients")
                  ? "My Patients"
                  : "All Patient"}
              </a>
            </li>
            <li>
              <a>View Patient</a>
            </li>
          </ul>
        </div>
      </div>
      <div style={{ padding: "2rem", paddingBottom: "0" }}>
        <h1
          style={{
            fontWeight: 600,
            margin: 0,
            marginBottom: "1rem",
            paddingLeft: "9px",
          }}
        >
          {" "}
          Patient Profile
        </h1>
        <Outlet />
      </div>
    </>
  );
};

export default Allpatient;
