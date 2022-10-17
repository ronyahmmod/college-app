import {
  Box,
  Button,
  ButtonGroup,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import Layout from "../components/Layout";
import Title from "../components/Title";

const StudentRegistrationForm = () => {
  return (
    <Layout>
      <Container maxWidth="xl" sx={{ my: 3 }}>
        <Formik
          initialValues={{
            studentName: "",
            studnetNameBan: "",
            fatherName: "",
            fatherNameBan: "",
            motherName: "",
            motherNameBan: "",
            class: "",
            classRoll: "",
            session: "",
            readingYear: "",
            group: "",
            address: "",
            mobile: "",
            gurdianMobile: "",
          }}
          onSubmit={(values) => {
            alert(JSON.stringify(values));
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <Paper sx={{ p: 2 }} component="form" onSubmit={handleSubmit}>
              <Title>Student Registration Form</Title>
              <Grid container spacing={2} sx={{ my: 2 }}>
                <Grid item sm={6}>
                  {/* PART-1 */}
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <TextField
                      name="studentName"
                      label="Student's name in english"
                      placeholder="Student name in english"
                      value={values.studnetName}
                      onChange={handleChange}
                      required
                      fullWidth
                    />
                    <TextField
                      name="fatherName"
                      label="Father's name in english"
                      placeholder="Father's name in english"
                      value={values.fatherName}
                      onChange={handleChange}
                      required
                      fullWidth
                    />
                    <TextField
                      name="motherName"
                      label="Mother's name in english"
                      placeholder="Mother's name in english"
                      value={values.motherName}
                      onChange={handleChange}
                      required
                      fullWidth
                    />
                    <FormControl fullWidth required>
                      <InputLabel id="class-name-label">Class Name</InputLabel>
                      <Select
                        labelId="class-name-label"
                        label="Class Name"
                        name="class"
                        required
                        value={values.class}
                        onChange={handleChange}
                      >
                        {/* <MenuItem value="ssc">SSC</MenuItem> */}
                        <MenuItem value="hsc">HSC</MenuItem>
                        <MenuItem value="degree">DEGREE</MenuItem>
                        <MenuItem value="honours">HONOURS</MenuItem>
                        <MenuItem value="bm">HSC BM</MenuItem>
                        <MenuItem value="bou">OPEN UNIVERSITY</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl fullWidth required>
                      <InputLabel id="group">
                        Last Group/Subject/Trade
                      </InputLabel>
                      <Select
                        labelId="group"
                        label="Last Group/Subject/Trade Name"
                        name="group"
                        required
                        value={values.group}
                        onChange={handleChange}
                      >
                        <MenuItem value="sc">SCIENCE</MenuItem>
                        <MenuItem value="hu">HUMANITIES</MenuItem>
                        <MenuItem value="bs">BUSINESS STUDIES</MenuItem>
                        <MenuItem value="ba">BA</MenuItem>
                        <MenuItem value="bss">BSS</MenuItem>
                        <MenuItem value="bbs">BBS</MenuItem>
                        <MenuItem value="pol">POLITICAL SCIENCE</MenuItem>
                        <MenuItem value="ban">BANGLA</MenuItem>
                        <MenuItem value="hrm">
                          HUMAN RESOURCE MANAGEMENT
                        </MenuItem>
                        <MenuItem value="co">COMPUTER OPERATION</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      name="session"
                      type="text"
                      placeholder="Place your session"
                      label="Session"
                      value={values.session}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                    <FormControl fullWidth required>
                      <InputLabel id="reading-year-label">
                        Current year
                      </InputLabel>
                      <Select
                        labelId="reading-year-label"
                        label="Current year"
                        name="readingYear"
                        required
                        value={values.readingYear}
                        onChange={handleChange}
                      >
                        <MenuItem value="xi">XI</MenuItem>
                        <MenuItem value="xii">XII</MenuItem>
                        <MenuItem value="1st">1ST</MenuItem>
                        <MenuItem value="2nd">2ND</MenuItem>
                        <MenuItem value="3rd">3RD</MenuItem>
                        <MenuItem value="4th">4th</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid
                  item
                  sm={6}
                  sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                  {/* PART-2 */}
                  <TextField
                    name="studentNameBan"
                    label="Student's name in bangla"
                    placeholder="Student name in bangla"
                    value={values.studnetNameBan}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                  <TextField
                    name="fatherNameBan"
                    label="Father's name in bangla"
                    placeholder="Father's name in bangla"
                    value={values.fatherNameBan}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                  <TextField
                    name="motherNameBan"
                    label="Mother's name in bangla"
                    placeholder="Mother's name in bangla"
                    value={values.motherNameBan}
                    onChange={handleChange}
                    required
                    fullWidth
                  />

                  <TextField
                    name="mobile"
                    type="text"
                    required
                    label="Current Mobile Number"
                    value={values.mobile}
                    onChange={handleChange}
                    placeholder="Enter your current mobile number"
                    fullWidth
                  />
                  <TextField
                    name="address"
                    type="text"
                    required
                    multiline
                    rows={4}
                    label="Pressent address"
                    value={values.address}
                    onChange={handleChange}
                    placeholder="Enter your present address with this format: [Village, Post Office, UP/Thana, Pouro/City/Metro, District]"
                    fullWidth
                  />
                </Grid>
                <Grid item sm={12}>
                  {/* BUTTONS */}
                  <ButtonGroup>
                    <Button variant="contained" type="submit">
                      Submit
                    </Button>
                    <Button variant="contained" color="error" type="reset">
                      Cancle
                    </Button>
                  </ButtonGroup>
                </Grid>
              </Grid>
            </Paper>
          )}
        </Formik>
      </Container>
    </Layout>
  );
};

export default StudentRegistrationForm;
