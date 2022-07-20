import React from "react";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../feature/user/userSlice";
import { Navigate } from "react-router-dom";

const AllreadyLoggedIn = ({ children }) => {
  const loggedInUser = useSelector(selectLoggedInUser);
  if (loggedInUser) {
    return <Navigate to="/dashboard" />;
  } else {
    return children;
  }
};

export default AllreadyLoggedIn;
