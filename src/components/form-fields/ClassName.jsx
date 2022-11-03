import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { v4 as uuidv4 } from "uuid";

const classes = [
  { value: "hsc", title: "HSC" },
  { value: "degree", title: "DEGREE" },
  { value: "honours", title: "HONOURS" },
  { value: "bm", title: "BM" },
  { value: "bou", title: "BOU" },
];

const ClassName = ({ name, value, handleChange }) => {
  return (
    <FormControl fullWidth required>
      <InputLabel id="classes">Select Class</InputLabel>
      <Select
        labelId="classes"
        label="Select Class"
        name={name}
        required
        value={value}
        onChange={handleChange}
      >
        {classes.map((className) => (
          <MenuItem key={uuidv4()} value={className.value}>
            {className.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ClassName;
