import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { up } from "../../helper/render.helper";

const years = ["xi", "xii", "1st", "2nd", "3rd", "4th"];

const AcademicYear = ({ name, value, handleChange }) => {
  return (
    <FormControl required fullWidth>
      <InputLabel id="academic-year">Academic Year</InputLabel>
      <Select
        labelId="academic-year"
        label="Academic Year"
        name={name}
        required
        value={value}
        onChange={handleChange}
      >
        {years.map((year) => (
          <MenuItem key={uuidv4()} value={year}>
            {up(year)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default AcademicYear;
