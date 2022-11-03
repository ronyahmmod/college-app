import { TextField } from "@mui/material";
import React from "react";

const RequiredTextField = ({ name, value, handleChange, ...otherProps }) => {
  return (
    <TextField
      name={name}
      value={value}
      onChange={handleChange}
      required
      fullWidth
      {...otherProps}
    />
  );
};

export default RequiredTextField;
