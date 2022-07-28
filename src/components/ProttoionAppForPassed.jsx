import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Box,
  Alert,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Typography,
  Button,
  Snackbar,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import Layout from "./Layout";
import { grey } from "@mui/material/colors";
import Title from "./Title";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../feature/user/userSlice";
import { useFormik } from "formik";
import { doc, collection, setDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { storage, db } from "../firebase.config";

const ProttoionAppForPassed = () => {
  const loggedInUser = useSelector(selectLoggedInUser);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState({
    file: null,
    fileName: "",
    thumb: null,
  });
  const [saveStatus, setSaveStatus] = useState(false);
  const handleCloseSnackbar = () => {
    setSaveStatus(false);
  };
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
      fatherName: "",
      motherName: "",
      roll: "",
      registration: "",
      passingYear: "",
      board: "",
      admitCard: "",
      applicationType: "",
      classRoll: "",
      lastExamName: "",
      group: "",
      mobile: "",
      address: "",
      result: "",
      resultType: "",
      gender: "",
      session: "",
    },
    onSubmit: async (values, { resetForm }) => {
      // console.log(file);
      setLoading(true);
      const newAppRef = doc(collection(db, "applications"));

      await setDoc(newAppRef, {
        ...values,
        date: Timestamp.fromDate(new Date()),
        studentId: loggedInUser.id,
        status: "submitted",
        fileExtension: file.file.name.split(".").pop(),
        remarks: "",
        applicationType: "psps",
      });

      const storageRef = ref(
        storage,
        `app-attachements/${newAppRef.id}.${file.file.name.split(".").pop()}`
      );
      uploadBytes(storageRef, file.file)
        .then((snapshot) => {
          setSaveStatus(true);
          resetForm();
          setFile({
            file: null,
            fileName: "",
            thumb: null,
          });
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    },
  });
  const {
    name,
    fatherName,
    motherName,
    roll,
    registration,
    passingYear,
    board,
    classRoll,
    lastExamName,
    mobile,
    address,
    result,
    resultType,
    group,
    gender,
    session,
  } = formik.values;
  const { handleChange, handleSubmit, resetForm } = formik;
  const canSave = [
    name,
    fatherName,
    motherName,
    roll,
    registration,
    passingYear,
    board,
    file.file,
    classRoll,
    lastExamName,
    mobile,
    address,
    result,
    resultType,
    group,
    gender,
    session,
  ].every(Boolean);
  const theme = useTheme();
  return (
    <Layout>
      <Snackbar
        open={saveStatus}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Application save successfully. You see status of this application on list."
      />
      <Backdrop
        open={loading}
        sx={{ color: "#fff", zIndex: theme.zIndex.drawer + 4000 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container maxWidth="lg" sx={{ mx: "auto", mt: 4, mb: 2 }}>
        <Grid container>
          <Grid item xs={12}>
            <Paper
              sx={{
                minHeight: 400,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexGrow: 1,
                  flexDirection: "column",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Alert severity="warning" sx={{ color: grey[700], mb: 3 }}>
                  আবেদন করার পূর্বে অবশ্যই সকল তথ্য যাচাই-বাছাই করে নিবেন। সকল
                  তথ্য সর্বশেষ পরীক্ষার তথ্য অনুযায়ী হতে হবে। একবার আবেদন সাবমিট
                  হয়ে গেলে পরিবর্তনের সুযোগ নেই। ভুল তথ্যের জন্য আপনার আবেদনটি
                  বাতিল করা হবে।
                </Alert>
                <Title sx={{ alignSelef: "flex-start" }}>
                  Application for allready passed from this college.
                </Title>
                <Grid
                  container
                  sx={{ py: 2, flex: 1, px: 2 }}
                  spacing={2}
                  component="form"
                  onSubmit={handleSubmit}
                >
                  <Grid item xs={6}>
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
                        placeholder="Place your full name"
                        label="Students name"
                        value={name}
                        onChange={handleChange}
                        required
                        fullWidth
                      />
                      <TextField
                        name="fatherName"
                        placeholder="Place your father's name"
                        label="Student father's name"
                        value={fatherName}
                        onChange={handleChange}
                        required
                        fullWidth
                      />
                      <TextField
                        name="motherName"
                        placeholder="Place your mother's name"
                        label="Student mother's name"
                        value={motherName}
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
                          value={gender}
                          onChange={handleChange}
                          required
                        >
                          <MenuItem value="male">MALE</MenuItem>
                          <MenuItem value="female">FEMALE</MenuItem>
                          <MenuItem value="other">OTHER</MenuItem>
                        </Select>
                      </FormControl>
                      <TextField
                        name="classRoll"
                        placeholder="Place your class roll"
                        label="Class roll"
                        value={classRoll}
                        onChange={handleChange}
                        required
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
                          {/* <MenuItem value="ssc">SSC</MenuItem> */}
                          <MenuItem value="hsc">HSC</MenuItem>
                          <MenuItem value="degree">DEGREE</MenuItem>
                          <MenuItem value="honours">HONOURS</MenuItem>
                          <MenuItem value="bm">HSC BM</MenuItem>
                          <MenuItem value="bou">OPEN UNIVERSITY</MenuItem>
                        </Select>
                      </FormControl>
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
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        gap: 2,
                      }}
                    >
                      <TextField
                        name="session"
                        type="text"
                        placeholder="Place your session"
                        label="Exam session"
                        value={session}
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
                          value={group}
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
                          <MenuItem value="madrasa">Madrasa</MenuItem>
                          <MenuItem value="national">
                            National University
                          </MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl>
                        <InputLabel id="result-type">Result Type</InputLabel>
                        <Select
                          labelId="result-type"
                          label="Result Type"
                          name="resultType"
                          required
                          value={resultType}
                          onChange={handleChange}
                        >
                          <MenuItem value="cgpaOfFour">
                            CGPA (out of 4)
                          </MenuItem>
                          <MenuItem value="gpaOfFive">GPA (out of 5)</MenuItem>
                          <MenuItem value="class">CLASS</MenuItem>
                          <MenuItem value="division">DIVISION</MenuItem>
                        </Select>
                      </FormControl>
                      <TextField
                        name="result"
                        type="text"
                        placeholder="Place your result"
                        label="Exam result"
                        value={result}
                        onChange={handleChange}
                        fullWidth
                        required
                      />
                      <TextField
                        name="mobile"
                        type="text"
                        required
                        label="Current Mobile Number"
                        placeholder="Enter your current mobile number"
                        fullWidth
                        value={mobile}
                        onChange={handleChange}
                      />
                      <TextField
                        name="address"
                        type="text"
                        required
                        multiline
                        rows={4}
                        label="Pressent address"
                        placeholder="Enter your present address with this format: [Village, Post Office, UP/Thana, Pouro/City/Metro, District]"
                        fullWidth
                        value={address}
                        onChange={handleChange}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        gap: 2,
                        mt: 2,
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
                            accept="image/*"
                            name="admitCard"
                            onChange={handleFileChange}
                            required
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
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default ProttoionAppForPassed;
