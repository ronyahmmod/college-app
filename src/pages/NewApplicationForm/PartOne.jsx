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
import { useFormik } from "formik";

const customValidate = (state) => (values, props) => {
  const errors = {};
  if (!values.name) {
    errors.name = "শিক্ষার্থীর নাম অবশ্যই পূরণ করতে হবে!";
  }
  if (!values.fatherName) {
    errors.fatherName = "পিতার নাম অবশ্যই পূরণ করতে হবে!";
  }
  if (!values.motherName) {
    errors.motherName = "মাতার নাম অবশ্যই পূরণ করতে হবে!";
  }
  if (!values.gender) {
    errors.gender = "লিঙ্গ নির্বাচন করতে হবে!";
  }
  if (!values.presentAddress) {
    errors.presentAddress = "বর্তমান ঠিকানা উল্লেখ করতে হবে!";
  }
  if (!values.permanentAddress && !state.addressIsSame) {
    errors.permanentAddress = "স্থায়ী ঠিকানা উল্লেখ করতে হবে!";
  }

  if (!values.mobileNumber) {
    errors.mobileNumber = "মোবাইল নম্বর সংযুক্ত করতে হবে!";
  } else if (
    values.mobileNumber.length < 11 ||
    values.mobileNumber.length > 11
  ) {
    errors.mobileNumber = "মোবাইল নম্বর ১১ সংখ্যার হতে হবে!";
  }

  return errors;
};

const PartOne = () => {
  console.log("Part one re render");
  const { state, dispatch } = useContext(ApplicationContext);
  // FORM PART-1 STATE
  const formState = useFormik({
    initialValues: {
      name: "",
      fatherName: "",
      motherName: "",
      gender: Constrains.gender.MALE,
      presentAddress: "",
      permanentAddress: "",
      mobileNumber: "",
      altMobileNumber: "",
    },
    validate: customValidate(state),
  });
  // END OF FORM PART-1 STATE
  const {
    name,
    fatherName,
    motherName,
    gender,
    presentAddress,
    permanentAddress,
    mobileNumber,
    altMobileNumber,
  } = formState.values;
  const { handleChange, handleBlur, errors, touched } = formState;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        name="name"
        id="name"
        value={name}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Enter name"
        label="আপনার নাম লিখুন"
        fullWidth
        required
        error={errors.name && touched.name}
        helperText={errors.name && touched.name ? errors.name : ""}
      />
      <TextField
        name="fatherName"
        id="fatherName"
        value={fatherName}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Enter father name"
        label="আপনার পিতার নাম লিখুন"
        fullWidth
        required
        error={errors.fatherName && touched.fatherName}
        helperText={
          errors.fatherName && touched.fatherName ? errors.fatherName : ""
        }
      />
      <TextField
        name="motherName"
        id="motherName"
        value={motherName}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Enter mother name"
        label="আপনার মায়ের নাম লিখুন"
        fullWidth
        required
        error={errors.motherName && touched.motherName}
        helperText={
          errors.motherName && touched.motherName ? errors.motherName : ""
        }
      />

      <FormControl fullWidth required>
        <InputLabel id="gender-label">লিঙ্গ নির্বাচন করুন</InputLabel>
        <Select
          labelId="gender-label"
          name="gender"
          label="লিঙ্গ নির্বাচন করুন"
          value={gender}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.gender && touched.gender}
          helperText={errors.gender && touched.gender ? errors.gender : ""}
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
        required
        multiline
        fullWidth
        value={presentAddress}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.presentAddress && touched.presentAddress}
        helperText={
          errors.presentAddress && touched.presentAddress
            ? errors.presentAddress
            : "EXAMPLE: VILLAGE: JIBANNAGAR HASPATAL PARA, POST OFFICE: JIBANAGAR, POUROSHOVA: JIBANNAGAR, WORD NO: 07, CHUADANGA"
        }
      />
      <TextField
        name="permanentAddress"
        id="permanentAddress"
        placeholder="ফরম্যাটঃ গ্রাম/মহল্লা, ডাকঘর, পৌরসভা/ইউনিয়ন/সিটি কর্পোরেশন, ওয়ার্ড নম্বর, জেলার নাম"
        label="স্থায়ী ঠিকানা"
        fullWidth
        required
        multiline
        disabled={state.addressIsSame}
        value={state.addressIsSame ? presentAddress : permanentAddress}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.permanentAddress && touched.permanentAddress}
        helperText={
          errors.permanentAddress && touched.permanentAddress
            ? errors.permanentAddress
            : "EXAMPLE: VILLAGE: JIBANNAGAR HASPATAL PARA, POST OFFICE: JIBANAGAR, POUROSHOVA: JIBANNAGAR, WORD NO: 07, CHUADANGA"
        }
      />
      <Divider />
      <TextField
        name="mobileNumber"
        id="mobileNumber"
        label="মোবাইল নম্বর"
        required
        placeholder="মোবাইল নম্বর যুক্ত করুন"
        fullWidth
        value={mobileNumber}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.mobileNumber && touched.mobileNumber}
        helperText={
          errors.mobileNumber && touched.mobileNumber ? errors.mobileNumber : ""
        }
      />
      <TextField
        name="altMobileNumber"
        id="altMobileNumber"
        label="বিকল্প মোবাইল নম্বর"
        fullWidth
        placeholder="বিকল্প মোবাইল নম্বর যুক্ত করুন"
        value={altMobileNumber}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </Box>
  );
};

export default PartOne;
