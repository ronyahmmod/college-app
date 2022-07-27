import React from "react";
import { getAuth } from "firebase/auth";
import { useLocation, Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const auth = getAuth();
  const location = useLocation();

  if (!auth.currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAuth;
