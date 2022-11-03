import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { up } from "../../helper/render.helper";

const boards = [
  "jessore",
  "dhaka",
  "technical",
  "comilla",
  "rajshahi",
  "chittagong",
  "barisal",
  "sylhet",
  "dinajpur",
  "madrasa",
  "national",
  "bou",
];

const Boards = ({ name, value, handleChange }) => {
  return (
    <FormControl fullWidth required>
      <InputLabel id="boards">Select Board</InputLabel>
      <Select
        name={name}
        value={value}
        onChange={handleChange}
        label="Select Board"
        labelId="boards"
        required
      >
        {boards.map((board) => (
          <MenuItem key={uuidv4()} value={board}>
            {up(board)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Boards;
