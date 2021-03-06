import React from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../feature/user/userSlice";
import DashboardIcon from "@mui/icons-material/Dashboard";
const Homepage = () => {
  const navigate = useNavigate();
  const loggedInUser = useSelector(selectLoggedInUser);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          minHeight: "450",
          width: 500,
          backgroundColor: "background.paper",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          p: 2,
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h2"
          sx={(theme) => ({
            textAlign: "center",

            animation:
              "tracking-in-expand 0.7s cubic-bezier(0.215, 0.610, 0.355, 1.000) both",
            animationDelay: ".5s",
          })}
        >
          Welcome to
        </Typography>
        <Typography
          variant="h5"
          sx={(theme) => ({
            textAlign: "center",
            color: theme.palette.grey[400],
          })}
        >
          JIBANNAGAR DEGREE COLLEGE
        </Typography>
        <Divider sx={{ width: "100%", my: 1 }} />
        {loggedInUser ? (
          <Button
            variant="contained"
            aria-label="dashboard"
            color="primary"
            sx={{ display: "flex", alignItems: "center" }}
            onClick={() => navigate("dashboard")}
          >
            <DashboardIcon /> <Box component="span" sx={{ mr: 1 }} /> Goto
            Dashboard
          </Button>
        ) : (
          <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
            <Button
              variant="standard"
              color="primary"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button variant="standard" onClick={() => navigate("/register")}>
              Register
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Homepage;
