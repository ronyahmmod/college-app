import React from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Constrains } from "./Types";
import { FieldArray } from "formik";

const AcademicInformation = ({
  handleNext,
  handleBack,
  values,
  handleChange,
}) => {
  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <FormControlLabel
          label="Are you now reading in this college?"
          control={
            <Checkbox
              name="isReading"
              checked={values.isReading}
              onChange={handleChange}
            />
          }
        />
        {values.isReading && (
          <React.Fragment>
            <Typography>Present class information.</Typography>
            <Divider />
            <Grid container spacing={2}>
              <Grid
                item
                sm={12}
                md={6}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                <FormControl required fullWidth>
                  <InputLabel id="present-class-label">
                    Chose your class
                  </InputLabel>
                  <Select
                    labelId="present-class-label"
                    label="Chose your class"
                    name="presentClass"
                    value={values.presentClass}
                    onChange={handleChange}
                  >
                    <MenuItem value={Constrains.presentClass.HSC}>HSC</MenuItem>
                    <MenuItem value={Constrains.presentClass.HSCBM}>
                      HSC BM
                    </MenuItem>
                    <MenuItem value={Constrains.presentClass.HSCBOU}>
                      HSC BOU
                    </MenuItem>
                    <MenuItem value={Constrains.presentClass.DEGREE}>
                      DEGREE
                    </MenuItem>
                    <MenuItem value={Constrains.presentClass.DEGREEBOU}>
                      DEGREE BOU
                    </MenuItem>
                    <MenuItem value={Constrains.presentClass.HONOURS}>
                      HONOURS
                    </MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  name="presentClassRoll"
                  id="presentClassRoll"
                  label="Class roll"
                  placeholder="Enter your class roll"
                  fullWidth
                  required
                  value={values.presentClassRoll}
                  onChange={handleChange}
                />

                <FormControl fullWidth required>
                  <InputLabel id="present-group-label">
                    Group/Subject/Trade
                  </InputLabel>
                  <Select
                    labelId="present-group-label"
                    label="Group/Subject/Trade"
                    name="presentGroup"
                    value={values.presentGroup}
                  >
                    <MenuItem value={Constrains.group.SCIENCE}>
                      SCIENCE
                    </MenuItem>
                    <MenuItem value={Constrains.group.BUSINESS_STUDIES}>
                      BUSINESS STUDIES
                    </MenuItem>
                    <MenuItem value={Constrains.group.HUMANITIES}>
                      HUMANITIES
                    </MenuItem>
                    <MenuItem value={Constrains.group.COMPUTER_OPERATION}>
                      COMPUTER OPERATION
                    </MenuItem>
                    <MenuItem value={Constrains.group.SECRETERIAL_SCIENCE}>
                      SECRETERIAL SCIENCE
                    </MenuItem>
                    <MenuItem value={Constrains.group.DIGITAL_TECHNOLOGY}>
                      DIGITAL TECHNOLOGY
                    </MenuItem>
                    <MenuItem
                      value={Constrains.group.HUMAN_RESOURCE_MANAGEMENT}
                    >
                      HUMAN RESOURCE MANAGEMENT
                    </MenuItem>
                    <MenuItem value={Constrains.group.BOU_HUMANITIES}>
                      BOU HUMANITIES
                    </MenuItem>
                    <MenuItem value={Constrains.group.BA}>BA</MenuItem>
                    <MenuItem value={Constrains.group.BSS}>BSS</MenuItem>
                    <MenuItem value={Constrains.group.BBS}>BBS</MenuItem>
                    <MenuItem value={Constrains.group.BOU_BA_BSS}>
                      BOU BA/BBS
                    </MenuItem>
                    <MenuItem value={Constrains.group.BANGLA}>BANGLA</MenuItem>
                    <MenuItem value={Constrains.group.POLITICAL_SCIENCE}>
                      POLITICAL SCIENCE
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                item
                sm={12}
                md={6}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                <TextField
                  name="presentSession"
                  id="presentSession"
                  placeholder="Session"
                  label="Session"
                  helperText="Example: 2019-2020"
                  required
                  fullWidth
                  value={values.presentSession}
                  onChange={handleChange}
                />

                <FormControl fullWidth required>
                  <InputLabel id="present-academic-year-label">
                    Accademic year
                  </InputLabel>
                  <Select
                    name="presentAcademicYear"
                    labelId="present-academic-year-label"
                    label="Academic year"
                    value={values.presentAcademicYear}
                    onChange={handleChange}
                  >
                    <MenuItem value={Constrains.academicYear.XI}>XI</MenuItem>
                    <MenuItem value={Constrains.academicYear.XII}>XII</MenuItem>
                    <MenuItem value={Constrains.academicYear.FIRST_YEAR}>
                      1ST
                    </MenuItem>
                    <MenuItem value={Constrains.academicYear.SECOND_YEAR}>
                      2ND
                    </MenuItem>
                    <MenuItem value={Constrains.academicYear.THIRD_YEAR}>
                      3RD
                    </MenuItem>
                    <MenuItem value={Constrains.academicYear.FOURTH_YEAR}>
                      4TH
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </React.Fragment>
        )}

        <FormControlLabel
          label="Are you passed from this college?"
          control={
            <Checkbox
              name="isPassed"
              checked={values.isPassed}
              onChange={handleChange}
            />
          }
        />

        {values.isPassed && (
          <React.Fragment>
            <Typography>
              Information about your last examination that you have passed.
            </Typography>
            <Divider />
            <FieldArray name="examinations">
              {({ insert, remove, push }) => (
                <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
                  {values.examinations.length > 0 &&
                    values.examinations.map((examination, index) => (
                      <Grid
                        container
                        columnSpacing={1}
                        key={index}
                        sx={{ borderBottom: "1.5px solid #eee", p: 2, my: 2 }}
                      >
                        <Grid
                          item
                          sm={12}
                          md={6}
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                          }}
                        >
                          <FormControl fullWidth required>
                            <InputLabel id={`exam-name-${index}-label`}>
                              Exam name
                            </InputLabel>
                            <Select
                              name={`examinations[${index}].name`}
                              value={examination.name}
                              onChange={handleChange}
                              labelId={`exam-name-${index}-label`}
                              label="Exam name"
                            >
                              <MenuItem value={Constrains.presentClass.HSC}>
                                HSC
                              </MenuItem>
                              <MenuItem value={Constrains.presentClass.HSCBM}>
                                HSC BM
                              </MenuItem>
                              <MenuItem value={Constrains.presentClass.HSCBOU}>
                                HSC BOU
                              </MenuItem>
                              <MenuItem value={Constrains.presentClass.DEGREE}>
                                DEGREE
                              </MenuItem>
                              <MenuItem
                                value={Constrains.presentClass.DEGREEBOU}
                              >
                                DEGREE BOU
                              </MenuItem>
                              <MenuItem value={Constrains.presentClass.HONOURS}>
                                HONOURS
                              </MenuItem>
                            </Select>
                          </FormControl>
                          <TextField
                            name={`examinations[${index}].roll`}
                            value={examination.roll}
                            onChange={handleChange}
                            label="Exam roll"
                            placeholder="Enter exam roll"
                            required
                            fullWidth
                          />
                          <TextField
                            name={`examinations[${index}].registration`}
                            value={examination.registration}
                            onChange={handleChange}
                            label="Exam registration"
                            placeholder="Enter exam registration"
                            required
                            fullWidth
                          />
                          <TextField
                            name={`examinations[${index}].year`}
                            value={examination.year}
                            onChange={handleChange}
                            label="Exam year"
                            placeholder="Enter exam registration"
                            required
                            fullWidth
                          />
                        </Grid>

                        <Grid
                          item
                          sm={12}
                          md={6}
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                          }}
                        >
                          <FormControl fullWidth required>
                            <InputLabel id={`exam-group${index}-label`}>
                              Group/Subject/Trade
                            </InputLabel>
                            <Select
                              labelId={`exam-group${index}-label`}
                              label="Group/Subject/Trade"
                              name={`examinations[${index}].group`}
                              value={examination.group}
                              onChange={handleChange}
                            >
                              <MenuItem value={Constrains.group.SCIENCE}>
                                SCIENCE
                              </MenuItem>
                              <MenuItem
                                value={Constrains.group.BUSINESS_STUDIES}
                              >
                                BUSINESS STUDIES
                              </MenuItem>
                              <MenuItem value={Constrains.group.HUMANITIES}>
                                HUMANITIES
                              </MenuItem>
                              <MenuItem
                                value={Constrains.group.COMPUTER_OPERATION}
                              >
                                COMPUTER OPERATION
                              </MenuItem>
                              <MenuItem
                                value={Constrains.group.SECRETERIAL_SCIENCE}
                              >
                                SECRETERIAL SCIENCE
                              </MenuItem>
                              <MenuItem
                                value={Constrains.group.DIGITAL_TECHNOLOGY}
                              >
                                DIGITAL TECHNOLOGY
                              </MenuItem>
                              <MenuItem
                                value={
                                  Constrains.group.HUMAN_RESOURCE_MANAGEMENT
                                }
                              >
                                HUMAN RESOURCE MANAGEMENT
                              </MenuItem>
                              <MenuItem value={Constrains.group.BOU_HUMANITIES}>
                                BOU HUMANITIES
                              </MenuItem>
                              <MenuItem value={Constrains.group.BA}>
                                BA
                              </MenuItem>
                              <MenuItem value={Constrains.group.BSS}>
                                BSS
                              </MenuItem>
                              <MenuItem value={Constrains.group.BBS}>
                                BBS
                              </MenuItem>
                              <MenuItem value={Constrains.group.BOU_BA_BSS}>
                                BOU BA/BBS
                              </MenuItem>
                              <MenuItem value={Constrains.group.BANGLA}>
                                BANGLA
                              </MenuItem>
                              <MenuItem
                                value={Constrains.group.POLITICAL_SCIENCE}
                              >
                                POLITICAL SCIENCE
                              </MenuItem>
                            </Select>
                          </FormControl>
                          <FormControl fullWidth required>
                            <InputLabel id={`exam-board-${index}-label`}>
                              Board
                            </InputLabel>
                            <Select
                              name={`examinations[${index}].board`}
                              value={examination.board}
                              onChange={handleChange}
                              label="Board"
                              labelId={`exam-board-${index}-label`}
                            >
                              <MenuItem value={Constrains.board.JESSORE}>
                                JESSORE
                              </MenuItem>
                              <MenuItem value={Constrains.board.TECHNICAL}>
                                TECHNICAL
                              </MenuItem>
                              <MenuItem
                                value={Constrains.board.NATIONAL_UNIVERSITY}
                              >
                                NATIONAL UNIVERSITY
                              </MenuItem>
                              <MenuItem
                                value={Constrains.board.OPEN_UNIVERSITY}
                              >
                                OPEN UNIVERSITY
                              </MenuItem>
                            </Select>
                          </FormControl>
                          <FormControl required fullWidth>
                            <InputLabel id={`result-type-${index}-label`}>
                              Result type
                            </InputLabel>
                            <Select
                              name={`examinations[${index}].resultType`}
                              onChange={handleChange}
                              label="Result type"
                              labelId={`result-type-${index}-label`}
                            >
                              <MenuItem
                                value={Constrains.resultType.GPA_OUT_OF_FIVE}
                              >
                                GPA (Out of 5)
                              </MenuItem>
                              <MenuItem
                                value={Constrains.resultType.CGPA_OUT_OF_FOUR}
                              >
                                CGPA (Out of 4)
                              </MenuItem>
                              <MenuItem value={Constrains.resultType.CLASS}>
                                CLASS
                              </MenuItem>
                              <MenuItem value={Constrains.resultType.DIVISION}>
                                DIVISION
                              </MenuItem>
                            </Select>
                          </FormControl>
                          <TextField
                            name={`examinations[${index}].result`}
                            value={examination.result}
                            label="Result"
                            onChange={handleChange}
                            placeholder="Result"
                            required
                            fullwidth
                          />
                          {values.examinations.length > 1 && (
                            <Button
                              variant="contained"
                              color="error"
                              fullWidth={false}
                              sx={{ alignSelf: "center" }}
                              size="large"
                              onClick={() => remove(index)}
                            >
                              Remove
                            </Button>
                          )}
                        </Grid>
                      </Grid>
                    ))}
                  <Box sx={{ my: 1 }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() =>
                        push({
                          name: "",
                          roll: "",
                          registration: "",
                          year: "",
                          board: "",
                          result: "",
                        })
                      }
                    >
                      Add new examination
                    </Button>
                  </Box>
                </Box>
              )}
            </FieldArray>
          </React.Fragment>
        )}
      </Box>
      <Box>
        <Button onClick={handleNext}>Next</Button>{" "}
        <Button onClick={handleBack}>Back</Button>
      </Box>
    </Box>
  );
};

export default AcademicInformation;
