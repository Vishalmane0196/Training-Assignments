import React from "react";
import { Outlet } from "react-router-dom";

const Allpatient = () => {
  return (
    <div style={{ padding: "2rem",paddingBottom:"0" }}>
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
  );
};

export default Allpatient;
