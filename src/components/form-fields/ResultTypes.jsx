import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
const resultTypes = [
  { value: "cgpaOfFour", title: "CGPA (out of 4)" },
  { value: "gpaOfFive", title: "GPA (out of 5)" },
  { value: "class", title: "CLASS" },
  { value: "division", title: "DIVISION" },
];

const ResultTypes = ({ name, value, handleChange }) => {
  return (
    <FormControl fullWidth required>
      <InputLabel id="result-types">Result Types</InputLabel>
      <Select
        name={name}
        value={value}
        onChange={handleChange}
        required
        label="Result Types"
        labelId="result-types"
      >
        {resultTypes.map((type) => (
          <MenuItem key={uuidv4()} value={type.value}>
            {type.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ResultTypes;
