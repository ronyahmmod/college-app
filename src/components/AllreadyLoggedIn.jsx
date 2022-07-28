import React from "react";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../feature/user/userSlice";
import { Navigate, useLocation } from "react-router-dom";

const AllreadyLoggedIn = ({ children }) => {
  const loggedInUser = useSelector(selectLoggedInUser);
  const location = useLocation();
  // console.log(location);
  if (loggedInUser) {
    return (
      <Navigate
        to={location.state ? location.state.from.pathname : "/dashboard"}
        state={{ from: location }}
        replace
      />
    );
  } else {
    return children;
  }
};

export default AllreadyLoggedIn;
