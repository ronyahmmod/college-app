import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../feature/user/userSlice";
import { useTheme } from "@mui/material/styles";
import { useFormik } from "formik";
import Title from "../components/Title";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase.config";

const ApplicationForm = () => {
  const loggedInUser = useSelector(selectLoggedInUser);
  const theme = useTheme();
  const [file, setFile] = useState({
    file: null,
    fileName: "",
    thumb: null,
  });
  const [saveStatus, setSaveStatus] = useState(false);
  const handleFileChange = (e) => {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setFile({
        file: e.target.files[0],
        fileName: e.target.files[0].name,
        thumb: fileReader.result,
      });
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      roll: "",
      registration: "",
      passingYear: "",
      board: "",
      admitCard: "",
      applicationType: "",
      classRoll: "",
      lastExamName: "",
      group: "",
    },
    onSubmit: async (values, { resetForm }) => {
      // console.log(file);
      const newAppRef = doc(collection(db, "applications"));

      await setDoc(newAppRef, {
        ...values,
        date: Timestamp.fromDate(new Date()),
        studentId: loggedInUser.id,
        status: "submitted",
        remarks: "",
      });

      const storageRef = ref(
        storage,
        `app-attachements/${loggedInUser.id}-${newAppRef.id}.jpg`
      );
      uploadBytes(storageRef, file)
        .then((snapshot) => {
          setSaveStatus(true);
          resetForm();
          setFile({
            file: null,
            fileName: "",
            thumb: null,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });
  const {
    name,
    roll,
    registration,
    passingYear,
    board,
    applicationType,
    classRoll,
    lastExamName,
  } = formik.values;
  const { handleChange, handleSubmit, resetForm } = formik;
  const canSave = [
    name,
    roll,
    registration,
    passingYear,
    board,
    file.file,
    applicationType,
    classRoll,
    lastExamName,
  ].every(Boolean);
  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          flexDirection: "column",
          alignItems: "center",
          p: 2,
        }}
      >
        <Snackbar
          open={saveStatus}
          autoHideDuration={6000}
          message="Application save successfully. You see status of this application on list."
        />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {loggedInUser && (
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                    height: "auto",
                  }}
                  component="form"
                  onSubmit={handleSubmit}
                >
                  <Title>Create New Application</Title>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                          gap: 2,
                        }}
                      >
                        <TextField
                          name="name"
                          type="text"
                          placeholder="Place your name"
                          label="Students name"
                          value={name}
                          onChange={handleChange}
                          fullWidth
                          required
                        />
                        <TextField
                          name="roll"
                          type="text"
                          placeholder="Place your final exam roll number"
                          label="Exam Roll"
                          value={roll}
                          onChange={handleChange}
                          fullWidth
                          required
                        />
                        <TextField
                          name="registration"
                          type="text"
                          placeholder="Place your final exam registration number"
                          label="Exam Registration"
                          value={registration}
                          onChange={handleChange}
                          fullWidth
                          required
                        />
                        <TextField
                          name="passingYear"
                          type="text"
                          placeholder="Place your passing year"
                          label="Exam year"
                          value={passingYear}
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
                            value={board}
                            onChange={handleChange}
                          >
                            <MenuItem value="jessore">Jessore</MenuItem>
                            <MenuItem value="dhaka">Dhaka</MenuItem>
                            <MenuItem value="technical">Technical</MenuItem>
                            <MenuItem value="comilla">Comilla</MenuItem>
                            <MenuItem value="rajshahi">Rajshahi</MenuItem>
                            <MenuItem value="chittagong">Chittagong</MenuItem>
                            <MenuItem value="barisal">Barisal</MenuItem>
                            <MenuItem value="sylhet">Sylhet</MenuItem>
                            <MenuItem value="dinajpur">Dinajpur</MenuItem>
                            <MenuItem value="Madrasa">Madrasa</MenuItem>
                          </Select>
                        </FormControl>
                        <FormControl fullWidth required>
                          <InputLabel id="application-type">
                            Application Type
                          </InputLabel>
                          <Select
                            labelId="application-type"
                            label="Application Type"
                            name="applicationType"
                            required
                            value={applicationType}
                            onChange={handleChange}
                          >
                            <MenuItem value="certificate">Certificate</MenuItem>
                            <MenuItem value="testimonial">Testimonial</MenuItem>
                            <MenuItem value="prottoion">Prottoion</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                          gap: 2,
                          mb: 2,
                        }}
                      >
                        <TextField
                          name="classRoll"
                          type="text"
                          required
                          label="Class Roll"
                          value={classRoll}
                          onChange={handleChange}
                          placeholder="Enter your class roll"
                          fullWidth
                        />
                        <FormControl fullWidth required>
                          <InputLabel id="last-exam">Last Exam Name</InputLabel>
                          <Select
                            labelId="last-exam"
                            label="Last Exam Name"
                            name="lastExamName"
                            required
                            value={lastExamName}
                            onChange={handleChange}
                          >
                            <MenuItem value="ssc">SSC</MenuItem>
                            <MenuItem value="hsc">HSC</MenuItem>
                            <MenuItem value="degree">DEGREE</MenuItem>
                            <MenuItem value="honours">HONOURS</MenuItem>
                            <MenuItem value="bm">HSC BM</MenuItem>
                            <MenuItem value="bou">OPEN UNIVERSITY</MenuItem>
                          </Select>
                        </FormControl>

                        {/* <FormControl fullWidth required>
                          <InputLabel id="group">Group</InputLabel>
                          <Select
                            labelId="group"
                            label="Group"
                            name="group"
                            required
                            value={group}
                            onChange={handleChange}
                            fullWidth
                          >
                            {Boolean(lastExamName === "hsc") && (
                              <Box>
                                <MenuItem value="science">SCIENCE</MenuItem>
                                <MenuItem value="humanities">
                                  HUMANITIES
                                </MenuItem>
                                <MenuItem value="businessStudies">
                                  BUSINESS STUDIES
                                </MenuItem>
                              </Box>
                            )}
                          </Select>
                        </FormControl> */}
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                          gap: 2,
                        }}
                      >
                        <Alert severity="info">
                          Please attach last exam admit card.
                        </Alert>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            backgroundColor: theme.palette.grey[100],
                            p: 2,
                            borderRadius: 2,
                          }}
                        >
                          <Button variant="contained" component="label">
                            Upload
                            <input
                              type="file"
                              hidden
                              accept="image/*,.pdf"
                              name="admitCard"
                              required
                              onChange={handleFileChange}
                            />
                          </Button>
                          <Box
                            sx={{
                              img: {
                                height: 40,
                              },
                            }}
                          >
                            {file.thumb ? (
                              <img
                                src={file.thumb && file.thumb}
                                alt={file.fileName}
                              />
                            ) : (
                              <Typography> select an image</Typography>
                            )}
                          </Box>
                        </Box>
                        <Stack spacing={2} direction="row">
                          <Button
                            variant="contained"
                            type="submit"
                            disabled={!canSave}
                          >
                            Submit
                          </Button>
                          <Button
                            variant="contained"
                            type="reset"
                            color="error"
                            onClick={() => {
                              resetForm();
                              setFile({
                                file: null,
                                fileName: "",
                                thumb: null,
                              });
                            }}
                          >
                            Cancle
                          </Button>
                        </Stack>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
};

export default ApplicationForm;
