import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { up } from "../../helper/render.helper";
const genders = ["male", "female", "other"];

const Gender = ({ name, value, handleChange }) => {
  return (
    <FormControl fullWidth required>
      <InputLabel id="gender">Gender</InputLabel>
      <Select
        labelId="gender"
        label="Gender"
        name={name}
        required
        value={value}
        onChange={handleChange}
      >
        {genders.map((gender) => (
          <MenuItem key={uuidv4()} value={gender}>
            {up(gender)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Gender;
