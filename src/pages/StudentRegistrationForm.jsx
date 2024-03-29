import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import Layout from "../components/Layout";
import Title from "../components/Title";
import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import TimeoutAlert from "../components/TimeoutAlert";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../feature/user/userSlice";
import { useNavigate } from "react-router-dom";
import Group from "../components/Group";
import Classes from "../components/Classes";
import Years from "../components/Years";

const StudentRegistrationForm = () => {
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);
  const [wait, setWait] = useState(false);
  const loggedInUser = useSelector(selectLoggedInUser);
  const navigate = useNavigate();
  return (
    <Layout>
      <Container maxWidth="lg" sx={{ my: 3 }}>
        <Formik
          initialValues={{
            studentName: "",
            studentNameBan: "",
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
          onSubmit={async (values, { resetForm }) => {
            try {
              const docRef = doc(collection(db, "students"));
              setWait(true);
              await setDoc(docRef, {
                ...values,
                voterNumber: `${values.classRoll}-${
                  values.class
                }-${values.session.split("-").join("")}-${values.readingYear}`,
                createdAt: Date.now(),
                submittedBy: loggedInUser,
              });
              setSaved(true);
              setWait(false);
              resetForm();
              setError(null);
            } catch (error) {
              setError(error);
              setSaved(false);
              setWait(false);
              //   console.log(error);
            }
          }}
        >
          {({ values, handleChange, handleSubmit, resetForm }) => (
            <Paper sx={{ p: 2 }} component="form" onSubmit={handleSubmit}>
              {saved && (
                <TimeoutAlert ms={3000} severity="success">
                  Data saved successfully.
                </TimeoutAlert>
              )}
              {error && (
                <Alert severity="error">
                  Error occured try again latter. Error message: {error.message}
                </Alert>
              )}
              {wait && <Alert severity="info">Please wait</Alert>}
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
                      value={values.studentName}
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
                    <Classes
                      changeHandler={handleChange}
                      value={values.class}
                    />

                    <TextField
                      name="classRoll"
                      label="Class Roll"
                      placeholder="Class Roll"
                      value={values.classRoll}
                      onChange={handleChange}
                      required
                      fullWidth
                    />
                    <Group changeHandler={handleChange} value={values.group} />
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
                    value={values.studentNameBan}
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
                  <Years
                    changeHandler={handleChange}
                    value={values.readingYear}
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
                    <Button variant="contained" type="submit" disabled={wait}>
                      Submit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      type="reset"
                      onClick={resetForm}
                    >
                      Cancle
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => navigate("/dashboard/all-students")}
                    >
                      Student List
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
