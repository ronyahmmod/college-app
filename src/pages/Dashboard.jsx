import React from "react";
import { Outlet } from "react-router-dom";
import CustomSpeedDial from "../components/CustomSpeedDial";
import Sidebar from "../components/Sidebar";
const Dashboard = () => {
  return (
    <div>
      <Sidebar />
      <CustomSpeedDial />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
