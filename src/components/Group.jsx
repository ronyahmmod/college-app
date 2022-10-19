import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
const groups = [
  { name: "sc", value: "SCIENCE" },
  { name: "hu", value: "HUMANITIES" },
  { name: "bs", value: "BUSINESS STUDIES" },
  { name: "ba", value: "BA" },
  { name: "bss", value: "BSS" },
  { name: "bbs", value: "BBS" },
  { name: "pol", value: "POLITICAL SCIENCE" },
  { name: "ban", value: "BANGLA" },
  { name: "hrm", value: "HUMAN RESOURCE MANAGEMENT" },
  { name: "co", value: "COMPUTER OPERATION" },
  { name: "sec", value: "SECRETERIEL SCIENCE" },
];
const Group = ({ changeHandler, value, ...otherProps }) => {
  return (
    <FormControl>
      <InputLabel id="group">Group/Subject/Trade</InputLabel>
      <Select
        labelId="group"
        label="Group/Subject/Trade"
        name="group"
        value={value}
        required
        onChange={changeHandler}
        {...otherProps}
      >
        {groups.map((group) => (
          <MenuItem key={uuidv4()} value={group.name}>
            {group.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Group;
