import React from "react";
import { Outlet } from "react-router-dom";
import viewPatientCSS from "../../style/ViewPatient.module.css";
import { Breadcrumb } from "src/components/Breadcrum/Breadcrumb";
const Allpatient = () => {
  return (
    <>
      <Breadcrumb />
      <div style={{ padding: "2rem", paddingTop: "1rem", paddingBottom: "0" }}>
        <h1
          style={{
            fontWeight: 600,
            margin: 0,
            fontSize: "1.5rem",
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
