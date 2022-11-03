import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { useEffect } from "react";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import {
  Alert,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { Container } from "@mui/system";
import Title from "../components/Title";
import { Formik } from "formik";

const EditCertificateApp = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [application, setApplication] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [updated, setUpdated] = useState(false);

  // LOAD APPLICATION WITH ID
  useEffect(() => {
    // console.log("Effect runs");
    async function fetchData() {
      setLoading(true);
      const docRef = doc(db, "applications", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setApplication(docSnap.data());
        setLoading(false);
      } else {
        setApplication({});
      }
    }
    fetchData();
    // console.log(application);
  }, [id]);

  //   UPDATE APPLICATION

  async function updateData(values) {
    setUpdating(true);
    const docRef = doc(db, "applications", id);
    await updateDoc(docRef, values);
    setUpdating(false);
    setUpdated(true);
  }

  if (loading) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  } else if (!loading && !application) {
    return (
      <Layout>
        <Alert severity="error">There is no application with this {id}</Alert>
      </Layout>
    );
  } else if (application) {
    return (
      <Layout>
        <Container maxWidth="xl" sx={{ m: 2 }}>
          <Grid container spacing={2}>
            <Grid item sm={12}>
              <Paper
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  padding: 10,
                }}
              >
                {updated && (
                  <Alert severity="success">Update successfully.</Alert>
                )}
                <Title>Edit certificate/testimonial application</Title>

                <Box>
                  <Formik
                    initialValues={{
                      name: application.name,
                      fatherName: application.fatherName,
                      motherName: application.motherName,
                      gender: application.gender,
                      roll: application.roll,
                      registration: application.registration,
                      passingYear: application.passingYear,
                      session: application.session,
                      board: application.board,
                      resultType: application.resultType,
                      result: application.result,
                      applicationType: application.applicationType,
                      classRoll: application.classRoll,
                      lastExamName: application.lastExamName,
                      group: application.group,
                      mobile: application.mobile,
                      address: application.address,
                    }}
                    onSubmit={(values, actions) => {
                      setTimeout(() => {
                        // alert(JSON.stringify(values, null, 2));
                        updateData(values);
                        actions.setSubmitting(false);
                      }, 0);
                    }}
                  >
                    {({
                      handleBlur,
                      handleChange,
                      handleReset,
                      handleSubmit,
                      values,
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                          <Grid item sm={12} md={6}>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                              }}
                            >
                              <TextField
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                label="Student's name"
                                required
                                fullWidth
                              />
                              <TextField
                                name="fatherName"
                                label="Father's name"
                                value={values.fatherName}
                                onChange={handleChange}
                                required
                                fullWidth
                              />
                              <TextField
                                name="motherName"
                                label="Mother's name"
                                value={values.motherName}
                                onChange={handleChange}
                                required
                                fullWidth
                              />
                              <FormControl fullWidth required>
                                <InputLabel id="gender">Gender</InputLabel>
                                <Select
                                  labelId="gender"
                                  label="Gender"
                                  name="gender"
                                  required
                                  value={values.gender}
                                  onChange={handleChange}
                                >
                                  <MenuItem value="male">MALE</MenuItem>
                                  <MenuItem value="female">FEMALE</MenuItem>
                                  <MenuItem value="other">OTHER</MenuItem>
                                </Select>
                              </FormControl>
                              <TextField
                                name="roll"
                                label="Exam roll"
                                value={values.roll}
                                onChange={handleChange}
                                required
                                fullWidth
                              />
                              <TextField
                                name="registration"
                                type="text"
                                placeholder="Place your final exam registration number"
                                label="Exam Registration"
                                value={values.registration}
                                onChange={handleChange}
                                fullWidth
                                required
                              />
                              <TextField
                                name="passingYear"
                                type="text"
                                placeholder="Place your passing year"
                                label="Exam year"
                                value={values.passingYear}
                                onChange={handleChange}
                                fullWidth
                                required
                              />
                              <TextField
                                name="session"
                                type="text"
                                placeholder="Place your session"
                                label="Exam session"
                                value={values.session}
                                onChange={handleChange}
                                fullWidth
                                required
                              />
                              <FormControl fullWidth required>
                                <InputLabel id="board-name">Board</InputLabel>
                                <Select
                                  labelId="board-name"
                                  label="Board"
                                  name="board"
                                  required
                                  value={values.board}
                                  onChange={handleChange}
                                >
                                  <MenuItem value="jessore">Jessore</MenuItem>
                                  <MenuItem value="dhaka">Dhaka</MenuItem>
                                  <MenuItem value="technical">
                                    Technical
                                  </MenuItem>
                                  <MenuItem value="comilla">Comilla</MenuItem>
                                  <MenuItem value="rajshahi">Rajshahi</MenuItem>
                                  <MenuItem value="chittagong">
                                    Chittagong
                                  </MenuItem>
                                  <MenuItem value="barisal">Barisal</MenuItem>
                                  <MenuItem value="sylhet">Sylhet</MenuItem>
                                  <MenuItem value="dinajpur">Dinajpur</MenuItem>
                                  <MenuItem value="madrasa">Madrasa</MenuItem>
                                  <MenuItem value="national">
                                    National University
                                  </MenuItem>
                                </Select>
                              </FormControl>
                              <FormControl>
                                <InputLabel id="result-type">
                                  Result Type
                                </InputLabel>
                                <Select
                                  labelId="result-type"
                                  label="Result Type"
                                  name="resultType"
                                  required
                                  value={values.resultType}
                                  onChange={handleChange}
                                >
                                  <MenuItem value="cgpaOfFour">
                                    CGPA (out of 4)
                                  </MenuItem>
                                  <MenuItem value="gpaOfFive">
                                    GPA (out of 5)
                                  </MenuItem>
                                  <MenuItem value="class">CLASS</MenuItem>
                                  <MenuItem value="division">DIVISION</MenuItem>
                                </Select>
                              </FormControl>
                            </Box>
                          </Grid>
                          <Grid item sm={12} md={6}>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                              }}
                            >
                              <TextField
                                name="result"
                                type="text"
                                placeholder="Place your result"
                                label="Exam result"
                                value={values.result}
                                onChange={handleChange}
                                fullWidth
                                required
                              />

                              <FormControl fullWidth required>
                                <InputLabel id="application-type">
                                  Application Type
                                </InputLabel>
                                <Select
                                  labelId="application-type"
                                  label="Application Type"
                                  name="applicationType"
                                  required
                                  value={values.applicationType}
                                  onChange={handleChange}
                                >
                                  <MenuItem value="certificate">
                                    Certificate
                                  </MenuItem>
                                  <MenuItem value="testimonial">
                                    Testimonial
                                  </MenuItem>
                                  <MenuItem value="certificate-testimonial">
                                    Certificate & Testimonial, Marksheet
                                  </MenuItem>
                                  {/* <MenuItem value="prottoion">Prottoion</MenuItem> */}
                                </Select>
                              </FormControl>
                              <TextField
                                name="classRoll"
                                type="text"
                                required
                                label="Class Roll"
                                value={values.classRoll}
                                onChange={handleChange}
                                placeholder="Enter your class roll"
                                fullWidth
                              />
                              <FormControl fullWidth required>
                                <InputLabel id="last-exam">
                                  Last Exam Name
                                </InputLabel>
                                <Select
                                  labelId="last-exam"
                                  label="Last Exam Name"
                                  name="lastExamName"
                                  required
                                  value={values.lastExamName}
                                  onChange={handleChange}
                                >
                                  {/* <MenuItem value="ssc">SSC</MenuItem> */}
                                  <MenuItem value="hsc">HSC</MenuItem>
                                  <MenuItem value="degree">DEGREE</MenuItem>
                                  <MenuItem value="honours">HONOURS</MenuItem>
                                  <MenuItem value="bm">HSC BM</MenuItem>
                                  <MenuItem value="bou">
                                    OPEN UNIVERSITY
                                  </MenuItem>
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
                                  <MenuItem value="bs">
                                    BUSINESS STUDIES
                                  </MenuItem>
                                  <MenuItem value="ba">BA</MenuItem>
                                  <MenuItem value="bss">BSS</MenuItem>
                                  <MenuItem value="bbs">BBS</MenuItem>
                                  <MenuItem value="pol">
                                    POLITICAL SCIENCE
                                  </MenuItem>
                                  <MenuItem value="ban">BANGLA</MenuItem>
                                  <MenuItem value="hrm">
                                    HUMAN RESOURCE MANAGEMENT
                                  </MenuItem>
                                  <MenuItem value="co">
                                    COMPUTER OPERATION
                                  </MenuItem>
                                </Select>
                              </FormControl>

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
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                  flex: 1,
                                  px: 2,
                                }}
                              >
                                <Button variant="contained" type="submit">
                                  Update
                                </Button>
                              </Box>
                            </Box>
                          </Grid>
                        </Grid>
                      </form>
                    )}
                  </Formik>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Layout>
    );
  }
};

export default EditCertificateApp;
