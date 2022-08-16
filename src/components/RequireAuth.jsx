import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../feature/user/userSlice";

const RequireAuth = ({ children }) => {
  const loggedInUser = useSelector(selectLoggedInUser);
  const location = useLocation();

  if (!loggedInUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAuth;
