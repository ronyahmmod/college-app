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
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import { Container } from "@mui/system";
import Title from "../components/Title";
import { Formik } from "formik";

const EditProttoionForCorrectionApp = () => {
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
  console.log(updating);

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
                <Title>Edit prottoion for correction application</Title>

                <Box>
                  <Formik
                    initialValues={{
                      name: application.name,
                      fatherName: application.fatherName,
                      motherName: application.motherName,
                      gender: application.gender,
                      examYear: application.examYear,
                      session: application.session,
                      examResultType: application.examResultType,
                      examResult: application.examResult,
                      classRoll: application.classRoll,
                      examName: application.examName,
                      group: application.group,
                      mobile: application.mobile,
                      address: application.address,
                      readingClass: application.readingClass,
                      readingYear: application.readingYear,
                      passed: application.passed,
                      examRoll: application.examRoll,
                      examRegistration: application.examRegistration,
                      examGroup: application.examGroup,
                      examSession: application.examSession,
                      examBoard: application.examBoard,
                      changedName: application.changedName,
                      changedFatherName: application.changedFatherName,
                      changedMotherName: application.changedMotherName,
                      nameChanged: application.nameChanged,
                      fatherNameChanged: application.fatherNameChanged,
                      motherNameChanged: application.motherNameChanged,
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
                      setFieldValue,
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
                                name="classRoll"
                                label="Class roll"
                                value={values.classRoll}
                                onChange={handleChange}
                                required
                                fullWidth
                              />
                              <FormControl fullWidth required>
                                <InputLabel id="reading-class-label">
                                  Reading class
                                </InputLabel>
                                <Select
                                  labelId="reading-class-label"
                                  label="Reading class"
                                  name="readingClass"
                                  required
                                  value={values.readingClass}
                                  onChange={handleChange}
                                >
                                  <MenuItem value="hsc">HSC</MenuItem>
                                  <MenuItem value="degree">DEGREE</MenuItem>
                                  <MenuItem value="honours">HONOURS</MenuItem>
                                  <MenuItem value="bm">BM</MenuItem>
                                  <MenuItem value="bou">BOU</MenuItem>
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
                                  <MenuItem value="dtb">
                                    DIGITAL TECHNOLOGY IN BUSINESS
                                  </MenuItem>
                                  <MenuItem value="hrd">
                                    HUMAN RESOURCE DEVELOPMENT
                                  </MenuItem>
                                </Select>
                              </FormControl>

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
                            </Box>
                          </Grid>
                          <Grid item sm={12}>
                            <Divider sx={{ my: 2 }} />
                            <Title>
                              আপনি কি ইতোমধ্যেই এ কলেজ থেকে পাশ করে গেছেন?
                            </Title>
                            <Switch
                              checked={values.passed}
                              onChange={(e) => {
                                setFieldValue("passed", e.target.checked);
                              }}
                              sx={{ mb: 1 }}
                              inputProps={{ "aria-label": "controlled" }}
                            />
                            {values.passed && (
                              <Grid container spacing={2}>
                                <Grid item sm={12} md={6}>
                                  <Stack direction="column" gap={2}>
                                    <TextField
                                      name="examRoll"
                                      label="Exam roll"
                                      value={values.examRoll}
                                      onChange={handleChange}
                                      required
                                      fullWidth
                                    />
                                    <TextField
                                      name="examRegistration"
                                      type="text"
                                      placeholder="Place your final exam registration number"
                                      label="Exam Registration"
                                      value={values.examRegistration}
                                      onChange={handleChange}
                                      fullWidth
                                      required
                                    />
                                    <FormControl fullWidth required>
                                      <InputLabel id="exam-name-class-label">
                                        Exam name
                                      </InputLabel>
                                      <Select
                                        labelId="exam-name-class-label"
                                        label="Exam name"
                                        name="examName"
                                        required
                                        value={values.examName}
                                        onChange={handleChange}
                                      >
                                        <MenuItem value="hsc">HSC</MenuItem>
                                        <MenuItem value="degree">
                                          DEGREE
                                        </MenuItem>
                                        <MenuItem value="honours">
                                          HONOURS
                                        </MenuItem>
                                        <MenuItem value="bm">BM</MenuItem>
                                        <MenuItem value="bou">BOU</MenuItem>
                                      </Select>
                                    </FormControl>
                                    <FormControl fullWidth required>
                                      <InputLabel id="exam-group-label">
                                        Group/Subject/Trade
                                      </InputLabel>
                                      <Select
                                        labelId="exam-group-label"
                                        label="Group/Subject/Trade"
                                        name="examGroup"
                                        required
                                        value={values.examGroup}
                                        onChange={handleChange}
                                      >
                                        <MenuItem value="sc">SCIENCE</MenuItem>
                                        <MenuItem value="hu">
                                          HUMANITIES
                                        </MenuItem>
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
                                        <MenuItem value="dtb">
                                          DIGITAL TECHNOLOGY IN BUSINESS
                                        </MenuItem>
                                        <MenuItem value="hrd">
                                          HUMAN RESOURCE DEVELOPMENT
                                        </MenuItem>
                                      </Select>
                                    </FormControl>
                                    <TextField
                                      name="examSession"
                                      type="text"
                                      placeholder="Place your session"
                                      label="Exam session"
                                      value={values.examSession}
                                      onChange={handleChange}
                                      fullWidth
                                      required
                                    />
                                  </Stack>
                                </Grid>
                                <Grid item sm={12} md={6}>
                                  <Stack direction="column" gap={2}>
                                    <TextField
                                      name="examYear"
                                      type="text"
                                      placeholder="Place your passing year"
                                      label="Exam year"
                                      value={values.examYear}
                                      onChange={handleChange}
                                      fullWidth
                                      required
                                    />
                                    <FormControl fullWidth required>
                                      <InputLabel id="board-name">
                                        Exam board
                                      </InputLabel>
                                      <Select
                                        labelId="board-name"
                                        label="Exam board"
                                        name="examBoard"
                                        required
                                        value={values.examBoard}
                                        onChange={handleChange}
                                      >
                                        <MenuItem value="jessore">
                                          Jessore
                                        </MenuItem>
                                        <MenuItem value="dhaka">Dhaka</MenuItem>
                                        <MenuItem value="technical">
                                          Technical
                                        </MenuItem>
                                        <MenuItem value="comilla">
                                          Comilla
                                        </MenuItem>
                                        <MenuItem value="rajshahi">
                                          Rajshahi
                                        </MenuItem>
                                        <MenuItem value="chittagong">
                                          Chittagong
                                        </MenuItem>
                                        <MenuItem value="barisal">
                                          Barisal
                                        </MenuItem>
                                        <MenuItem value="sylhet">
                                          Sylhet
                                        </MenuItem>
                                        <MenuItem value="dinajpur">
                                          Dinajpur
                                        </MenuItem>
                                        <MenuItem value="madrasa">
                                          Madrasa
                                        </MenuItem>
                                        <MenuItem value="national">
                                          National University
                                        </MenuItem>
                                      </Select>
                                    </FormControl>
                                    <FormControl>
                                      <InputLabel id="result-type">
                                        Exam result type
                                      </InputLabel>
                                      <Select
                                        labelId="result-type"
                                        label="Exam result type"
                                        name="examResultType"
                                        required
                                        value={values.examResultType}
                                        onChange={handleChange}
                                      >
                                        <MenuItem value="cgpaOfFour">
                                          CGPA (out of 4)
                                        </MenuItem>
                                        <MenuItem value="gpaOfFive">
                                          GPA (out of 5)
                                        </MenuItem>
                                        <MenuItem value="class">CLASS</MenuItem>
                                        <MenuItem value="division">
                                          DIVISION
                                        </MenuItem>
                                      </Select>
                                    </FormControl>
                                    <TextField
                                      name="examResult"
                                      type="text"
                                      placeholder="Place your result"
                                      label="Exam result"
                                      value={values.examResult}
                                      onChange={handleChange}
                                      fullWidth
                                      required
                                    />
                                  </Stack>
                                </Grid>
                              </Grid>
                            )}
                            <Divider sx={{ my: 2 }} />
                            <Divider sx={{ my: 2 }} />
                            <Title>কি ধরণের সংশোধন করতে চান টিক দিন।</Title>
                            <Stack
                              direction={{ xs: "column", sm: "row" }}
                              spacing={2}
                              sx={{ my: { xs: 1, md: 1 } }}
                            >
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={values.nameChanged}
                                    onChange={(e) =>
                                      setFieldValue(
                                        "nameChanged",
                                        e.target.checked
                                      )
                                    }
                                  />
                                }
                                label="Name"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={values.fatherNameChanged}
                                    onChange={(e) =>
                                      setFieldValue(
                                        "fatherNameChanged",
                                        e.target.checked
                                      )
                                    }
                                  />
                                }
                                label="Father name"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={values.motherNameChanged}
                                    onChange={(e) =>
                                      setFieldValue(
                                        "motherNameChanged",
                                        e.target.checked
                                      )
                                    }
                                  />
                                }
                                label="Mother name"
                              />
                            </Stack>
                            <Stack
                              direction={{ xs: "column", sm: "row" }}
                              spacing={2}
                              sx={{ my: 2 }}
                            >
                              {values.nameChanged && (
                                <>
                                  <TextField
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    label="Student's name"
                                    required
                                    fullWidth
                                  />
                                  <TextField
                                    name="changedName"
                                    value={values.changedName}
                                    onChange={handleChange}
                                    label="Student's changed name"
                                    required
                                    fullWidth
                                  />
                                </>
                              )}
                            </Stack>
                            <Stack
                              direction={{ xs: "column", sm: "row" }}
                              spacing={2}
                              sx={{ my: 2 }}
                            >
                              {values.fatherNameChanged && (
                                <>
                                  <TextField
                                    name="fatherName"
                                    value={values.fatherName}
                                    onChange={handleChange}
                                    label="Student's father name"
                                    required
                                    fullWidth
                                  />
                                  <TextField
                                    name="changedFatherName"
                                    value={values.changedFatherName}
                                    onChange={handleChange}
                                    label="Student's changed father name"
                                    required
                                    fullWidth
                                  />
                                </>
                              )}
                            </Stack>
                            <Stack
                              direction={{ xs: "column", sm: "row" }}
                              spacing={2}
                              sx={{ my: 2 }}
                            >
                              {values.motherNameChanged && (
                                <>
                                  <TextField
                                    name="motherName"
                                    value={values.motherName}
                                    onChange={handleChange}
                                    label="Student's father name"
                                    required
                                    fullWidth
                                  />
                                  <TextField
                                    name="changedMotherName"
                                    value={values.changedMotherName}
                                    onChange={handleChange}
                                    label="Student's changed mother name"
                                    required
                                    fullWidth
                                  />
                                </>
                              )}
                            </Stack>
                            <Divider sx={{ my: 2 }} />
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

export default EditProttoionForCorrectionApp;
