import React, { useEffect, useState } from "react";
import {
  Alert,
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
import Layout from "../components/Layout";
import Title from "../components/Title";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import TimeoutAlert from "../components/TimeoutAlert";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../feature/user/userSlice";
import { useNavigate, useParams } from "react-router-dom";

const EditStudentForm = () => {
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);
  const [wait, setWait] = useState(false);
  const [student, setStudent] = useState(null);
  const loggedInUser = useSelector(selectLoggedInUser);
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    async function loadData() {
      try {
        const docRef = doc(db, "students", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setStudent({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        setError(error);
      }
    }
    loadData();
  }, [id]);

  console.log(error);

  if (!student) {
    return (
      <Layout>
        <Container maxWidth="lg" sx={{ my: 3 }}>
          <Paper>
            <Alert severity="error">
              There is no student found. Try again or go back to list.
            </Alert>
          </Paper>
        </Container>
      </Layout>
    );
  }
  return (
    <Layout>
      <Container maxWidth="lg" sx={{ my: 3 }}>
        <Formik
          initialValues={{
            studentName: student.studentName,
            studentNameBan: student.studentNameBan,
            fatherName: student.fatherName,
            fatherNameBan: student.fatherNameBan,
            motherName: student.motherName,
            motherNameBan: student.motherNameBan,
            class: student.class,
            classRoll: student.classRoll,
            session: student.session,
            readingYear: student.readingYear,
            group: student.group,
            address: student.address,
            mobile: student.mobile,
            gurdianMobile: student.gurdianMobile,
          }}
          onSubmit={async (values, { resetForm }) => {
            try {
              const docRef = doc(db, "students", id);
              setWait(true);
              await updateDoc(docRef, {
                ...values,
                editedBy: loggedInUser,
                timestamp: serverTimestamp(),
              });
              setSaved(true);
              setWait(false);
              setError(null);
            } catch (error) {
              setError(error);
              setSaved(false);
              setWait(false);
              //   console.log(error);
            }
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <Paper sx={{ p: 2 }} component="form" onSubmit={handleSubmit}>
              {saved && (
                <TimeoutAlert ms={3000} severity="success">
                  Data update successfully.
                </TimeoutAlert>
              )}
              {error && (
                <Alert severity="error">
                  Error occured try again latter. Error message: {error.message}
                </Alert>
              )}
              {wait && <Alert severity="info">Please wait</Alert>}
              <Title>
                Student edit form of voter number: {student.voterNumber}
              </Title>
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

                    <TextField
                      name="classRoll"
                      label="Class Roll"
                      placeholder="Class Roll"
                      value={values.classRoll}
                      onChange={handleChange}
                      required
                      fullWidth
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
                        <MenuItem value="dtb">
                          DIGITAL TECHNOLOGY IN BUSINESS
                        </MenuItem>
                        <MenuItem value="hrd">
                          HUMAN RESOURCE DEVELOPMENT
                        </MenuItem>
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
                </Grid>
                <Grid item sm={12}>
                  {/* BUTTONS */}
                  <ButtonGroup>
                    <Button variant="contained" type="submit" disabled={wait}>
                      Update
                    </Button>
                    <Button variant="contained" color="error" type="reset">
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

export default EditStudentForm;
