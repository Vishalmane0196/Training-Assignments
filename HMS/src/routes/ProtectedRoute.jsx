import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({
  children,
  isAdminProp = 0,
  isDoctorProp = 0,
}) => {
  const navigate = useNavigate();
  const { token, isAdmin, isDoctor } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      navigate("/account/user/login");
    } else if (
      parseInt(isAdmin) !== parseInt(isAdminProp) ||
      parseInt(isDoctor) !== parseInt(isDoctorProp)
    ) {
      if (parseInt(isAdmin) == 1) {
        navigate("/admin/dashboard/profile");
      } else if (isDoctor == 1) {
        navigate("/doctor/dashboard/profile");
      } else {
        navigate("/user/dashboard/profile");
      }
    }
  }, [token, isAdmin, isAdminProp, navigate]);

  return children;
};
