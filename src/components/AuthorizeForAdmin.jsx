import React from "react";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../feature/user/userSlice";
import { useNavigate } from "react-router-dom";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
const AuthorizeForAdmin = ({ children }) => {
  const loggedInUser = useSelector(selectLoggedInUser);
  const navigate = useNavigate();
  if (loggedInUser && loggedInUser.role !== "user") {
    return children;
  } else {
    return (
      <Dialog open={true}>
        <DialogTitle>BAD REQUEST 🎈🎈🎈. THIS ROUTE IS NOT FOR YOU</DialogTitle>
        <DialogContent>
          <Button onClick={() => navigate("/dashboard")}>Goto Dahsboard</Button>
        </DialogContent>
      </Dialog>
    );
  }
};

export default AuthorizeForAdmin;
