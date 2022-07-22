import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import CustomSpeedDial from "../components/CustomSpeedDial";
import Sidebar from "../components/Sidebar";
import { selectLoggedInUser } from "../feature/user/userSlice";

const Dashboard = () => {
  const loggedInUser = useSelector(selectLoggedInUser);
  return (
    <div>
      <Sidebar />
      {loggedInUser && loggedInUser.role === "user" && <CustomSpeedDial />}

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
