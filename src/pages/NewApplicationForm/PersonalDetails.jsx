import React from "react";
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Constrains } from "./Types";

const PersonalDetails = ({ handleNext, handleBack, values, handleChange }) => {
  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          name="name"
          placeholder="Enter students name"
          label="Enter name"
          value={values.name}
          onChange={handleChange}
          required
        />
        <TextField
          name="fatherName"
          placeholder="Enter students father name"
          label="Enter father name"
          value={values.fatherName}
          onChange={handleChange}
          required
        />
        <TextField
          name="motherName"
          placeholder="Enter students mother name"
          label="Enter mother name"
          value={values.motherName}
          onChange={handleChange}
          required
        />
        <FormControl required>
          <InputLabel id="gender-label">Gender</InputLabel>
          <Select
            labelId="gender-label"
            value={values.gender}
            label="Gender"
            name="gender"
            onChange={handleChange}
          >
            <MenuItem value={Constrains.gender.MALE}>MALE</MenuItem>
            <MenuItem value={Constrains.gender.FEMALE}>FEMALE</MenuItem>
            <MenuItem value={Constrains.gender.OTHERS}>OTHERS</MenuItem>
          </Select>
        </FormControl>
        <TextField
          name="presentAddress"
          label="Present address"
          multiline
          rows={4}
          placeholder="Enter present address"
          value={values.presentAddress}
          onChange={handleChange}
          required
        />
        <TextField
          name="permanentAddress"
          label="Permanent address"
          multiline
          rows={4}
          placeholder="Enter permanent address"
          value={values.permanentAddress}
          onChange={handleChange}
          required
        />
        <TextField
          name="mobileNumber"
          label="Mobile number"
          placeholder="Enter mobile number"
          value={values.mobileNumber}
          onChange={handleChange}
          required
        />
        <TextField
          name="altMobileNumber"
          label="Alternative Mobile number"
          placeholder="Enter alternative mobile number"
          value={values.altMobileNumber}
          onChange={handleChange}
          required
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Button onClick={handleNext}>Next</Button>{" "}
        <Button onClick={handleBack}>Back</Button>
      </Box>
    </Box>
  );
};

export default PersonalDetails;
