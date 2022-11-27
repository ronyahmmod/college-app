import { TextField } from "@mui/material";
import React from "react";

const Session = ({ name, value, handleChange }) => {
  return (
    <TextField
      name={name}
      value={value}
      onChange={handleChange}
      label="Session"
      placeholder="Enter session"
      required
      fullWidth
    />
  );
};

export default Session;
