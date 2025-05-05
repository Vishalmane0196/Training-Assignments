import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Dashboard from "src/pages/Dashboard/Dashboard";
import UserDashboard from "src/pages/Dashboard/UserDashboard";
export const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { token, isAdmin, isDoctor, isSuper } = useSelector(
    (state) => state.auth
  );

  if (!token) {
    navigate("/account/user/login");
  } else {
    if (parseInt(isAdmin || isSuper) == 1) {
      return <Dashboard />;
    } else if (isDoctor == 1) {
      return <UserDashboard access={"doctor"} />;
    } else {
      return <UserDashboard />;
    }
  }
};
