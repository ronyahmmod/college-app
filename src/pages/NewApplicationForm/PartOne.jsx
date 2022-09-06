import React, { useContext } from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { Constrains } from "./Types";
import ApplicationContext from "../../context/ApplicationContext";
const PartOne = React.memo(() => {
  console.log("Part one re render");
  const { state, dispatch, formFields, changeHandler } =
    useContext(ApplicationContext);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        name="name"
        id="name"
        value={formFields.name}
        onChange={changeHandler}
        placeholder="Enter name"
        label="আপনার নাম লিখুন"
        fullWidth
        required
      />
      <TextField
        name="fatherName"
        id="fatherName"
        value={formFields.fatherName}
        onChange={changeHandler}
        placeholder="Enter father name"
        label="আপনার পিতার নাম লিখুন"
        fullWidth
        required
      />
      <TextField
        name="motherName"
        id="motherName"
        value={formFields.motherName}
        onChange={changeHandler}
        placeholder="Enter mother name"
        label="আপনার মায়ের নাম লিখুন"
        fullWidth
        required
      />

      <FormControl fullWidth required>
        <InputLabel id="gender-label">লিঙ্গ নির্বাচন করুন</InputLabel>
        <Select
          labelId="gender-label"
          name="gender"
          label="লিঙ্গ নির্বাচন করুন"
          value={formFields.gender}
          onChange={changeHandler}
        >
          <MenuItem value={Constrains.gender.MALE}>Male</MenuItem>
          <MenuItem value={Constrains.gender.FEMALE}>Female</MenuItem>
          <MenuItem value={Constrains.gender.OTHERS}>Others</MenuItem>
        </Select>
      </FormControl>

      {/* ADDRESS */}
      <Divider />
      <Typography sx={{ pl: 2 }}>ঠিকানা</Typography>
      <Divider />
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={state.addressIsSame}
              onChange={(event) => {
                dispatch({
                  type: "SET_ADDRESS_IS_SAME",
                  payload: { addressIsSame: event.target.checked },
                });
              }}
            />
          }
          label="বর্তমান ও স্থায়ী ঠিকানা কি একই?"
        />
      </FormGroup>
      <TextField
        name="presentAddress"
        id="presentAddress"
        placeholder="ফরম্যাটঃ গ্রাম/মহল্লা, ডাকঘর, পৌরসভা/ইউনিয়ন/সিটি কর্পোরেশন, ওয়ার্ড নম্বর, জেলার নাম"
        label="বর্তমান ঠিকানা"
        helperText=" EXAMPLE: VILLAGE: JIBANNAGAR HASPATAL PARA, POST OFFICE: JIBANAGAR, POUROSHOVA: JIBANNAGAR, WORD NO: 07, CHUADANGA"
        required
        multiline
        fullWidth
        value={formFields.presentAddress}
        onChange={changeHandler}
      />
      <TextField
        name="parmanentAddress"
        id="parmanentAddress"
        placeholder="ফরম্যাটঃ গ্রাম/মহল্লা, ডাকঘর, পৌরসভা/ইউনিয়ন/সিটি কর্পোরেশন, ওয়ার্ড নম্বর, জেলার নাম"
        label="স্থায়ী ঠিকানা"
        helperText=" EXAMPLE: VILLAGE: JIBANNAGAR HASPATAL PARA, POST OFFICE: JIBANAGAR, POUROSHOVA: JIBANNAGAR, WORD NO: 07, CHUADANGA"
        fullWidth
        required
        multiline
        disabled={state.addressIsSame}
        value={formFields.parmanentAddress}
        onChange={changeHandler}
      />
      <Divider />
      <TextField
        name="mobileNumber"
        id="mobileNumber"
        label="মোবাইল নম্বর"
        required
        placeholder="মোবাইল নম্বর যুক্ত করুন"
        fullWidth
        value={formFields.mobileNumber}
        onChange={changeHandler}
      />
      <TextField
        name="altMobileNumber"
        id="altMobileNumber"
        label="বিকল্প মোবাইল নম্বর"
        fullWidth
        placeholder="বিকল্প মোবাইল নম্বর যুক্ত করুন"
        value={formFields.altMobileNumber}
        onChange={changeHandler}
      />
    </Box>
  );
});

export default PartOne;
