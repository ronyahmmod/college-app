import { TextField } from "@mui/material";
import React from "react";

const MobileNumber = ({ name, value, handleChange }) => {
  return (
    <TextField
      name={name}
      value={value}
      onChange={handleChange}
      label="Mobile Number"
      placeholder="Enter your mobile number"
      required
      fullWidth
    />
  );
};

export default MobileNumber;
