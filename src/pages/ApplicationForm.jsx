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
  Backdrop,
  CircularProgress,
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
import { grey } from "@mui/material/colors";
import { selectCertType } from "../feature/ui/uiSlice";
import { resulation } from "../utils/resulation";
import Group from "../components/Group";

const initialCertType = (certType) => {
  if (certType === 0) {
    return "certificate";
  } else if (certType === 1) {
    return "testimonial";
  } else if (certType === 2) {
    return "certificate-testimonial";
  } else if (!certType) {
    return "";
  } else {
    return "";
  }
};

const defineFee = (applicationType) => {
  if (applicationType === "testimonial") {
    return resulation.fees.testimonial;
  } else if (applicationType === "certificate") {
    return resulation.fees.certificate;
  } else if (applicationType === "certificate-testimonial") {
    return resulation.fees.certificate + resulation.fees.testimonial;
  }
};

const ApplicationForm = () => {
  const loggedInUser = useSelector(selectLoggedInUser);
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const certType = useSelector(selectCertType);
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
      applicationType: initialCertType(certType),
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
        fee: defineFee(
          values.applicationType
        ) /* ALERT: BECAUSE CERTIFICATE and TESTIMONIAL FEES ARE SAME */,
        remarks: "",
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
    applicationType,
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
    applicationType,
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
          onClose={handleCloseSnackbar}
          message="Application save successfully. You see status of this application on list."
        />
        <Backdrop
          open={loading}
          sx={{ color: "#fff", zIndex: theme.zIndex.drawer + 4000 }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
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
                  <Alert severity="warning" sx={{ color: grey[700], mb: 3 }}>
                    আবেদন করার পূর্বে অবশ্যই সকল তথ্য যাচাই-বাছাই করে নিবেন। সকল
                    তথ্য সর্বশেষ পরীক্ষার তথ্য অনুযায়ী ইংরেজিতে পূরণ করতে হবে।
                    একবার আবেদন সাবমিট হয়ে গেলে পরিবর্তনের সুযোগ নেই। ভুল তথ্যের
                    জন্য আপনার আবেদনটি বাতিল করা হবে। Testimonial এর সাথে মূল
                    মার্কশিট এবং ভর্তি মার্কশিট পাওয়া যাবে।
                  </Alert>
                  <Title sx={{ textAlign: "center" }}>
                    সনদপত্র/প্রসংশাপত্র গ্রহণের আবেদন ফরম।
                  </Title>
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
                          helperText="ছাত্র/ছাত্রীর নাম। যেমনঃ MD. MILLAT HOSSAIN"
                          value={name}
                          onChange={handleChange}
                          fullWidth
                          required
                        />
                        <TextField
                          name="fatherName"
                          type="text"
                          placeholder="Place your father name"
                          label="Students father name"
                          helperText="ছাত্র/ছাত্রীর পিতার নাম। যেমনঃ MD. ABDUR RAHMAN"
                          value={fatherName}
                          onChange={handleChange}
                          fullWidth
                          required
                        />
                        <TextField
                          name="motherName"
                          type="text"
                          placeholder="Place your mother name"
                          label="Students mother name"
                          helperText="ছাত্র/ছাত্রীর মাতার নাম। যেমনঃ HARISA KHATUN"
                          value={motherName}
                          onChange={handleChange}
                          fullWidth
                          required
                        />
                        <FormControl fullWidth required>
                          <InputLabel id="gender">Gender</InputLabel>
                          <Select
                            labelId="gender"
                            label="Gender"
                            name="gender"
                            required
                            value={gender}
                            onChange={handleChange}
                          >
                            <MenuItem value="male">MALE</MenuItem>
                            <MenuItem value="female">FEMALE</MenuItem>
                            <MenuItem value="other">OTHER</MenuItem>
                          </Select>
                        </FormControl>
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
                        <Group changeHandler={handleChange} value={group} />
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
                            <MenuItem value="gpaOfFive">
                              GPA (out of 5)
                            </MenuItem>
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
                            disabled={
                              certType === 0 || certType === 1 || certType === 2
                            }
                          >
                            <MenuItem value="certificate">Certificate</MenuItem>
                            <MenuItem value="testimonial">
                              Testimonial & Marksheets
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
                          value={classRoll}
                          onChange={handleChange}
                          placeholder="Enter your class roll"
                          fullWidth
                        />

                        <TextField
                          name="mobile"
                          type="text"
                          required
                          label="Current Mobile Number"
                          value={mobile}
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
                          value={address}
                          onChange={handleChange}
                          placeholder="Enter your present address with this format: [Village, Post Office, UP/Thana, Pouro/City/Metro, District]"
                          fullWidth
                        />
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
                              accept="image/*"
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
