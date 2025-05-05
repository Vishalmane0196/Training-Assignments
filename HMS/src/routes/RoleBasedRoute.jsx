import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const RoleBasedRoute = ({ element, role }) => {
  const navigate = useNavigate();
  const { isAdmin, isDoctor, isSuper } = useSelector((state) => state.auth);
  let authorization =
    isAdmin || isSuper ? "admin" : isDoctor ? "doctor" : "user";
  if (!role.includes(authorization)) {
    return navigate("/unauthorize");
  }
  return element;
};
