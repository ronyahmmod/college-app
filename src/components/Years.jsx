import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

const years = [
  { name: "xi", value: "XI" },
  { name: "xii", value: "XII" },
  { name: "1st", value: "1ST" },
  { name: "2nd", value: "2ND" },
  { name: "3rd", value: "3RD" },
  { name: "4th", value: "4TH" },
];
const Years = ({ changeHandler, value, ...otherProps }) => {
  return (
    <FormControl>
      <InputLabel id="year">Year</InputLabel>
      <Select
        labelId="year"
        label="Year"
        name="readingYear"
        value={value}
        required
        onChange={changeHandler}
        {...otherProps}
      >
        {years.map((classVal) => (
          <MenuItem key={uuidv4()} value={classVal.name}>
            {classVal.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Years;
