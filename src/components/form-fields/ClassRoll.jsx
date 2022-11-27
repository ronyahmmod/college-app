import { TextField } from "@mui/material";
import React from "react";

const ClassRoll = ({ name, value, handleChange }) => {
  return (
    <TextField
      name={name}
      value={value}
      onChange={handleChange}
      label="Class Roll"
      placeholder="Enter class roll"
      required
      fullWidth
    />
  );
};

export default ClassRoll;
