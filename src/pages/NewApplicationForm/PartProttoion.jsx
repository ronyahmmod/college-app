import React from "react";
import {
  Divider,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
  TextField,
} from "@mui/material";
import {
  LocalizationProvider,
  DesktopDatePicker,
  MobileDatePicker,
} from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useContext } from "react";
import ApplicationContext from "../../context/ApplicationContext";
import { Constrains } from "./Types";

const PartProttoion = React.memo(() => {
  console.log("Part prottoion re render");
  const { state, dispatch } = useContext(ApplicationContext);
  const handleProttoionCategoryChange = (event) => {
    dispatch({
      type: "SET_PROTTOION_CATEGORY",
      payload: { prottoionCategory: event.target.value },
    });
  };
  return (
    <>
      <Divider />
      <Typography sx={{ pl: 2 }}>প্রত্যয়নপত্র সংক্রান্ত</Typography>
      <Divider />

      <FormControl required fullWidth>
        <FormLabel id="prottoion-category-label">
          প্রত্যয়নপত্র কি কাজে ব্যবহার করবেন?
        </FormLabel>
        <RadioGroup
          name="prottoionCategory"
          aria-labelledby="prottoion-category-label"
          value={state.prottoionCategory}
          onChange={handleProttoionCategoryChange}
        >
          <FormControlLabel
            value={Constrains.prottoionCategory.GENERAL}
            control={<Radio />}
            label="সাধারণ"
          />
          <FormControlLabel
            value={Constrains.prottoionCategory.CORRECTION}
            control={<Radio />}
            label="সংশোধন সংক্রান্ত"
          />
          <FormControlLabel
            value={Constrains.prottoionCategory.PASSPORT}
            control={<Radio />}
            label="পাসপোর্ট/ভিসা সংক্রান্ত"
          />
        </RadioGroup>
      </FormControl>

      {/* CORRECTION */}

      {Boolean(
        state.prottoionCategory ===
          String(Constrains.prottoionCategory.CORRECTION)
      ) && (
        <>
          <Divider />
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.correctionCategory.nameCorrection}
                  onChange={(event) => {
                    dispatch({
                      type: "SET_CORRECTION_CATEGORY",
                      payload: {
                        fieldName: "nameCorrection",
                        value: event.target.checked,
                      },
                    });
                  }}
                />
              }
              label="নাম সংশোধন"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.correctionCategory.fatherNameCorrection}
                  onChange={(event) => {
                    dispatch({
                      type: "SET_CORRECTION_CATEGORY",
                      payload: {
                        fieldName: "fatherNameCorrection",
                        value: event.target.checked,
                      },
                    });
                  }}
                />
              }
              label="পিতার নাম সংশোধন"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.correctionCategory.motherNameCorrection}
                  onChange={(event) => {
                    dispatch({
                      type: "SET_CORRECTION_CATEGORY",
                      payload: {
                        fieldName: "motherNameCorrection",
                        value: event.target.checked,
                      },
                    });
                  }}
                />
              }
              label="মাতার নাম সংশোধন"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.correctionCategory.ageCorrection}
                  onChange={(event) => {
                    dispatch({
                      type: "SET_CORRECTION_CATEGORY",
                      payload: {
                        fieldName: "ageCorrection",
                        value: event.target.checked,
                      },
                    });
                  }}
                />
              }
              label="বয়স সংশোধন"
            />
          </FormGroup>
          {[
            state.correctionCategory.nameCorrection,
            state.correctionCategory.fatherNameCorrection,
            state.correctionCategory.motherNameCorrection,
            state.correctionCategory.ageCorrection,
          ].some(Boolean) && <Divider />}
          {state.correctionCategory.nameCorrection && (
            <>
              <TextField
                name="name"
                disabled
                required
                fullWidth
                value="Nehal Hossen"
                label="বর্তমান নাম"
                color="secondary"
              />
              <TextField
                name="changedName"
                required
                fullWidth
                placeholder="যে নাম চেঞ্জ করতে চান লিখুন"
                label="পরিবর্তিত নাম"
                id="changedName"
              />
            </>
          )}

          {state.correctionCategory.fatherNameCorrection && (
            <>
              <TextField
                name="fatherName"
                disabled
                required
                fullWidth
                value="Saydur Rahman"
                label="বর্তমান পিতার নাম"
                color="error"
              />
              <TextField
                name="changedFatherName"
                required
                fullWidth
                placeholder="যে নাম চেঞ্জ করতে চান লিখুন"
                label="পরিবর্তিত পিতার নাম"
                id="changedFatherName"
              />
            </>
          )}

          {state.correctionCategory.motherNameCorrection && (
            <>
              <TextField
                name="motherName"
                disabled
                required
                fullWidth
                value="Sagorika Khatun"
                label="বর্তমান মাতার নাম"
                color="error"
              />
              <TextField
                name="changedMotherName"
                required
                fullWidth
                placeholder="যে নাম চেঞ্জ করতে চান লিখুন"
                label="পরিবর্তিত মাতার নাম"
                id="changedMotherName"
              />
            </>
          )}

          {state.correctionCategory.ageCorrection && (
            <>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  label="বর্তমান জন্ম তারিখ"
                  inputFormat="DD/MM/YYYY"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      fullWidth
                      name="currentBirthDate"
                      sx={{ display: { xs: "none", md: "block" } }}
                    />
                  )}
                />

                <MobileDatePicker
                  label="বর্তমান জন্ম তারিখ"
                  inputFormat="DD/MM/YYYY"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      name="currentBirthDate"
                      fullWidth
                      sx={{ display: { xs: "block", md: "none" } }}
                    />
                  )}
                />
                <DesktopDatePicker
                  label="পরিবর্তিত জন্ম তারিখ"
                  inputFormat="DD/MM/YYYY"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      fullWidth
                      name="changedBirthDate"
                      sx={{ display: { xs: "none", md: "block" } }}
                    />
                  )}
                />

                <MobileDatePicker
                  label="পরিবর্তিত জন্ম তারিখ"
                  inputFormat="DD/MM/YYYY"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      name="changedBirthDate"
                      fullWidth
                      sx={{ display: { xs: "block", md: "none" } }}
                    />
                  )}
                />
              </LocalizationProvider>
            </>
          )}
        </>
      )}

      {state.prottoionCategory ===
        String(Constrains.prottoionCategory.PASSPORT) && (
        <>
          <Divider />
          <TextField
            name="destinationCountry"
            id="destinationCountry"
            label="দেশের নাম"
            helperText="Example: India"
            placeholder="যে দেশে যাচ্ছেন তার নাম লিখুন"
            required
            fullWidth
          />
          <TextField
            name="causeOfJourny"
            id="causeOfJourny"
            label="যাওয়ার কারণ"
            placeholder="যে কারণে যাচ্ছেন লিখুন"
            multiline
            required
            fullWidth
          />
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DesktopDatePicker
              label="যাওয়ার তারিখ"
              inputFormat="DD/MM/YYYY"
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  fullWidth
                  name="journyDate"
                  sx={{ display: { xs: "none", md: "block" } }}
                />
              )}
            />

            <MobileDatePicker
              label="যাওয়ার তারিখ"
              inputFormat="DD/MM/YYYY"
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  name="journyDate"
                  fullWidth
                  sx={{ display: { xs: "block", md: "none" } }}
                />
              )}
            />
          </LocalizationProvider>
        </>
      )}
    </>
  );
});

export default PartProttoion;
