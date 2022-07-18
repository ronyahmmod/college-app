import React from "react";
import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";

function App() {
  return (
    <Box sx={{ backgroundColor: "inherit" }}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Box>
  );
}

export default App;
