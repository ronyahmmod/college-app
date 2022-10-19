import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
const classes = [
  { name: "hsc", value: "HSC" },
  { name: "degree", value: "DEGREE" },
  { name: "honours", value: "HONOURS" },
  { name: "bm", value: "HSC BM" },
  { name: "bou", value: "OPEN UNIVERSITY" },
];
const Classes = ({ changeHandler, value, ...otherProps }) => {
  return (
    <FormControl>
      <InputLabel id="class">Class Name</InputLabel>
      <Select
        labelId="class"
        label="Class Name"
        name="class"
        value={value}
        required
        onChange={changeHandler}
        {...otherProps}
      >
        {classes.map((classVal) => (
          <MenuItem key={uuidv4()} value={classVal.name}>
            {classVal.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Classes;
