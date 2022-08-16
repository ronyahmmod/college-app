import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
// import CustomSpeedDial from "../components/CustomSpeedDial";
import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
import { selectLoggedInUser } from "../feature/user/userSlice";

const Dashboard = () => {
  const loggedInUser = useSelector(selectLoggedInUser);
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Navbar user={loggedInUser} />
      <div>
        <Outlet />
      </div>
    </Box>
  );
};

export default Dashboard;
