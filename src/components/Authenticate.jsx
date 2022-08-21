import React from "react";
import {
  Dialog,
  DialogTitle,
  Box,
  Paper,
  ButtonGroup,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { selectLoggedInUser, selectUserRole } from "../feature/user/userSlice";

const Authenticate = ({ whose, children }) => {
  const loggedInUser = useSelector(selectLoggedInUser);
  const userRole = useSelector(selectUserRole);
  const location = useLocation();
  const navigate = useNavigate();
  if (!loggedInUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else if (!whose.includes(userRole)) {
    return (
      <Dialog open={true}>
        <DialogTitle sx={{ color: "red", fontSize: { xs: 12, md: 16 } }}>
          Un authorize access denied!
        </DialogTitle>
        <Box>
          <Paper sx={{ p: 1 }}>
            <ButtonGroup sx={{ display: "flex", justifyContent: "center" }}>
              <Button size="small" onClick={() => navigate("/dashboard")}>
                Dashboard
              </Button>
              <Button size="small" color="error" onClick={() => navigate(-1)}>
                Back
              </Button>
            </ButtonGroup>
          </Paper>
        </Box>
      </Dialog>
    );
  }
  return children;
};

export default Authenticate;
