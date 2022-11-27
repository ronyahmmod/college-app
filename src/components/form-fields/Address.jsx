import { TextField } from "@mui/material";
import React from "react";

const Address = ({ name, value, handleChange }) => {
  return (
    <TextField
      name={name}
      value={value}
      onChange={handleChange}
      placeholder="Enter your proper address based on government issued documents."
      label="Address"
      fullWidth
      required
      multiline
      minRows={4}
    />
  );
};

export default Address;
