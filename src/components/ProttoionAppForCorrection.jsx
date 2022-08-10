import React, { useState } from "react";
import { useFormik } from "formik";
import Layout from "./Layout";
import FormComposer from "../utils/FormComposer";
import {
  Container,
  Grid,
  Paper,
  Alert,
  Box,
  Button,
  Snackbar,
  CircularProgress,
  Backdrop,
  Typography,
  Divider,
  Switch,
  Stack,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import Title from "./Title";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../feature/user/userSlice";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { db, storage } from "../firebase.config";
import { ref, uploadBytes } from "firebase/storage";

const ProttoionAppForCorrection = () => {
  const prottoion = new FormComposer("prottoionforcorrection");
  const theme = useTheme();
  const loggedInUser = useSelector(selectLoggedInUser);
  const [loading, setLoading] = useState(false);
  const [selectName, setSelectName] = useState(false);
  const [selectFatherName, setSelectFatherName] = useState(false);
  const [selectMotherName, setSelectMotherName] = useState(false);

  const handleSelectNameChange = (event) => {
    setSelectName(event.target.checked);
  };
  const handleSelectFatherNameChange = (event) => {
    setSelectFatherName(event.target.checked);
  };
  const handleSelectMotherNameChange = (event) => {
    setSelectMotherName(event.target.checked);
  };

  const canSave = [selectName, selectFatherName, selectMotherName].some(
    Boolean
  );
  const [file, setFile] = useState({
    file: null,
    fileName: "",
    thumb: null,
  });
  const [saveStatus, setSaveStatus] = useState(false);
  const handleCloseSnackbar = () => {
    setSaveStatus(false);
  };
  const handleFileChange = (event) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setFile({
        file: event.target.files[0],
        fileName: event.target.files[0].name,
        thumb: fileReader.result,
      });
    };
    fileReader.readAsDataURL(event.target.files[0]);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      fatherName: "",
      motherName: "",
      gender: "",
      classRoll: "",
      readingClass: "",
      session: "",
      group: "",
      readingYear: "",
      mobile: "",
      address: "",
      passed: false,
      examRoll: "",
      examRegistration: "",
      examName: "",
      examYear: "",
      examResult: "",
      examBoard: "",
      examGroup: "",
      examSession: "",
      examResultType: "",
      changedName: "",
      changedMotherName: "",
      changedFatherName: "",
    },

    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      const newAppRef = doc(collection(db, "applications"));

      await setDoc(newAppRef, {
        ...values,
        date: Timestamp.fromDate(new Date()),
        studentId: loggedInUser.id,
        status: "submitted",
        fileExtension: file.file.name.split(".").pop(),
        remarks: "",
        applicationType: "psis",
        fatherNameChanged: selectFatherName,
        nameChanged: selectName,
        motherNameChanged: selectMotherName,
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
  prottoion
    .addTextField(
      "name",
      formik.values.name,
      "Enter your full name",
      "Students name",
      true,
      true,
      {},
      formik.handleChange
    )
    .addTextField(
      "fatherName",
      formik.values.fatherName,
      "Enter your father name",
      "Father name",
      true,
      true,
      undefined,
      formik.handleChange
    )
    .addTextField(
      "motherName",
      formik.values.motherName,
      "Enter your mother name",
      "Mother name",
      true,
      true,
      undefined,
      formik.handleChange
    )
    .addSelectItem(
      "gender",
      formik.values.gender,
      "Enter your gender",
      "Gender",
      "gender",
      [
        { itemKey: "male", value: "Male" },
        { itemKey: "female", value: "Female" },
        { itemKey: "other", value: "Other" },
      ],
      true,
      true,
      undefined,
      formik.handleChange
    )
    .addTextField(
      "classRoll",
      formik.values.classRoll,
      "Enter your reading class roll",
      "Class roll",
      true,
      true,
      undefined,
      formik.handleChange
    )
    .addSelectItem(
      "readingClass",
      formik.values.readingClass,
      "Enter reading class name",
      "Class name",
      "class-name",
      [
        { itemKey: "hsc", value: "HSC" },
        { itemKey: "degree", value: "DEGREE" },
        { itemKey: "honours", value: "HONOURS" },
        { itemKey: "bm", value: "BM" },
        { itemKey: "bou", value: "BOU" },
      ],
      true,
      true,
      undefined,
      formik.handleChange
    )
    .addTextField(
      "session",
      formik.values.session,
      "Enter session",
      "Session",
      true,
      true,
      undefined,
      formik.handleChange
    )
    .addSelectItem(
      "group",
      formik.values.group,
      "Enter group",
      "Group",
      "group-label",
      [
        { itemKey: "sc", value: "SCIENCE" },
        { itemKey: "hu", value: "HUMANITIES" },
        { itemKey: "bs", value: "BUSINESS STUDIES" },
        { itemKey: "ba", value: "BA" },
        { itemKey: "bss", value: "BSS" },
        { itemKey: "bbs", value: "BBS" },
        { itemKey: "bbs", value: "BBS" },
        { itemKey: "pol", value: "POLITICAL SCIENCE" },
        { itemKey: "ban", value: "BANGLA" },
        { itemKey: "hrm", value: "HUMAN RESOURCE MANAGEMENT" },
        { itemKey: "co", value: "COMPUTER OPERATION" },
      ],
      true,
      true,
      undefined,
      formik.handleChange
    )
    .addSelectItem(
      "readingYear",
      formik.values.readingYear,
      "Enter current year",
      "Current year",
      "current-year",
      [
        { itemKey: "xi", value: "XI" },
        { itemKey: "xii", value: "XII" },
        { itemKey: "1st", value: "1ST" },
        { itemKey: "2nd", value: "2ND" },
        { itemKey: "3rd", value: "3RD" },
        { itemKey: "4th", value: "4th" },
      ],
      true,
      true,
      undefined,
      formik.handleChange
    )
    .addTextField(
      "mobile",
      formik.values.mobile,
      "Enter current mobile number",
      "Mobile number",
      true,
      true,
      undefined,
      formik.handleChange
    )
    .addTextField(
      "address",
      formik.values.address,
      "Enter your present address with this format: [Village, Post Office, UP/Thana, Pouro/City/Metro, District]",
      "Enter present address",
      true,
      true,
      { multiline: true, rows: 4 },
      formik.handleChange
    )
    .addTextField(
      "examRoll",
      formik.values.examRoll,
      "Enter exam roll as admit card",
      "Exam roll",
      true,
      false,
      undefined,
      formik.handleChange
    )
    .addTextField(
      "examRegistration",
      formik.values.examRegistration,
      "Enter exam registration",
      "Exam Registration",
      true,
      false,
      undefined,
      formik.handleChange
    )
    .addSelectItem(
      "examName",
      formik.values.examName,
      "Exam name",
      "Exam name",
      "exam-name",
      [
        { itemKey: "hsc", value: "HSC" },
        { itemKey: "degree", value: "DEGREE" },
        { itemKey: "honours", value: "HONOURS" },
        { itemKey: "bm", value: "HSC BM" },
        { itemKey: "bou", value: "OPEN UNIVERSITY" },
      ],
      true,
      false,
      undefined,
      formik.handleChange
    )
    .addSelectItem(
      "examGroup",
      formik.values.examGroup,
      "Group/Subject/Trade",
      "Group/Subject/Trade",
      "group-label-passed",
      [
        { itemKey: "sc", value: "SCIENCE" },
        { itemKey: "hu", value: "HUMANITIES" },
        { itemKey: "bs", value: "BUSINESS STUDIES" },
        { itemKey: "ba", value: "BA" },
        { itemKey: "bss", value: "BSS" },
        { itemKey: "bbs", value: "BBS" },
        { itemKey: "bbs", value: "BBS" },
        { itemKey: "pol", value: "POLITICAL SCIENCE" },
        { itemKey: "ban", value: "BANGLA" },
        { itemKey: "hrm", value: "HUMAN RESOURCE MANAGEMENT" },
        { itemKey: "co", value: "COMPUTER OPERATION" },
      ],
      true,
      true,
      undefined,
      formik.handleChange
    )
    .addTextField(
      "examSession",
      formik.values.examSession,
      "Session",
      "Session",
      true,
      true,
      undefined,
      formik.handleChange
    )
    .addTextField(
      "examYear",
      formik.values.examYear,
      "Year",
      "Year",
      true,
      true,
      undefined,
      formik.handleChange
    )
    .addSelectItem(
      "examBoard",
      formik.values.examBoard,
      "Board/University",
      "Board",
      "exam-board",
      [
        { itemKey: "jessore", value: "Jessore" },
        { itemKey: "dhaka", value: "Dhaka" },
        { itemKey: "technical", value: "Technical" },
        { itemKey: "comilla", value: "Comilla" },
        { itemKey: "rajshahi", value: "Rajshahi" },
        { itemKey: "chittagong", value: "Chittagong" },
        { itemKey: "barisal", value: "Barisal" },
        { itemKey: "sylhet", value: "Sylhet" },
        { itemKey: "dinajpur", value: "Dinajpur" },
        { itemKey: "madrasa", value: "Madrasa" },
        { itemKey: "national", value: "National University" },
        { itemKey: "bou", value: "Bangladesh Open University" },
      ],
      true,
      true,
      undefined,
      formik.handleChange
    )
    .addSelectItem(
      "examResultType",
      formik.values.examResultType,
      "Result Type",
      "Result Type",
      "result-type",
      [
        { itemKey: `cgpaOfFour`, value: "CGPA (out of 4)" },
        { itemKey: `gpaOfFive`, value: "GPA (out of 5)" },
        { itemKey: `class`, value: "CLASS" },
        { itemKey: `division`, value: "DIVISION" },
      ],
      true,
      true,
      undefined,
      formik.handleChange
    )
    .addTextField(
      "examResult",
      formik.values.examResult,
      "Result",
      "Result",
      true,
      true,
      undefined,
      formik.handleChange
    )
    .addTextField(
      "changedName",
      formik.values.changedName,
      "Enter changed value carefuly",
      "Changed Name",
      true,
      true,
      undefined,
      formik.handleChange
    )
    .addTextField(
      "changedFatherName",
      formik.values.changedFatherName,
      "Enter changed value carefuly",
      "Changed Father Name",
      true,
      true,
      undefined,
      formik.handleChange
    )
    .addTextField(
      "changedMotherName",
      formik.values.changedMotherName,
      "Enter changed value carefuly",
      "Changed Mother Name",
      true,
      true,
      undefined,
      formik.handleChange
    );
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
      <Container
        maxWidth="lg"
        sx={{ mx: "auto", my: 2 }}
        component="form"
        onSubmit={formik.handleSubmit}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper sx={{ display: "flex", flexDirection: "column", p: 2 }}>
              <Alert severity="warning" sx={{ color: grey[700], mb: 3 }}>
                আবেদন করার পূর্বে অবশ্যই সকল তথ্য যাচাই-বাছাই করে নিবেন। সকল
                তথ্য সর্বশেষ পরীক্ষার তথ্য অনুযায়ী হতে হবে। একবার আবেদন সাবমিট
                হয়ে গেলে পরিবর্তনের সুযোগ নেই। ভুল তথ্যের জন্য আপনার আবেদনটি
                বাতিল করা হবে।
              </Alert>
              <Title sx={{ textAlign: "center" }}>
                ডক্যুমেন্ট কারেকশনের জন্য প্রত্যয়ন পত্র গ্রহণের আবেদন ফরম।
              </Title>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    {prottoion.renderSpecificFields([
                      "name",
                      "fatherName",
                      "motherName",
                      "gender",
                      "classRoll",
                      "readingClass",
                    ])}
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    {prottoion.renderSpecificFields([
                      "session",
                      "group",
                      "readingYear",
                      "mobile",
                      "address",
                    ])}
                  </Box>
                </Grid>
              </Grid>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Title>আপনি কি ইতোমধ্যেই এ কলেজ থেকে পাশ করে গেছেন?</Title>
                  <Switch
                    checked={formik.values.passed}
                    onChange={(e) => {
                      formik.setFieldValue("passed", e.target.checked);
                    }}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </Grid>
                {formik.values.passed && (
                  <Grid item xs={12}>
                    <Stack direction="column" gap={2}>
                      {prottoion.renderSpecificFields([
                        "examRoll",
                        "examRegistration",
                        "examName",
                        "examGroup",
                        "examSession",
                        "examYear",
                        "examResultType",
                        "examResult",
                        "examBoard",
                      ])}
                    </Stack>
                  </Grid>
                )}
              </Grid>
              <Divider sx={{ my: 2 }} />
              <Grid contianer spacing={2}>
                <Grid item xs={12}>
                  <Title>কি ধরণের সংশোধন করতে চান টিক দিন।</Title>
                  <Stack direction="row" spacing={2} sx={{ my: 1 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectName}
                          onChange={handleSelectNameChange}
                        />
                      }
                      label="Name"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectFatherName}
                          onChange={handleSelectFatherNameChange}
                        />
                      }
                      label="Fathe name"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectMotherName}
                          onChange={handleSelectMotherNameChange}
                        />
                      }
                      label="Mother name"
                    />
                  </Stack>
                  <Stack spacing={2}>
                    {selectName && (
                      <Stack direction="row" spacing={2}>
                        {prottoion.renderSpecificFields(["name"])}
                        {prottoion.renderSpecificFields(["changedName"])}
                      </Stack>
                    )}
                    {selectFatherName && (
                      <Stack direction="row" spacing={2}>
                        {prottoion.renderSpecificFields(["fatherName"])}
                        {prottoion.renderSpecificFields(["changedFatherName"])}
                      </Stack>
                    )}
                    {selectMotherName && (
                      <Stack direction="row" spacing={2}>
                        {prottoion.renderSpecificFields(["motherName"])}
                        {prottoion.renderSpecificFields(["changedMotherName"])}
                      </Stack>
                    )}
                  </Stack>
                </Grid>
              </Grid>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12}>
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
                        py: 2,
                        px: 1,
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
                            height: 200,
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
                          formik.resetForm();
                          setFile({
                            file: null,
                            fileName: "",
                            thumb: null,
                          });
                          setSelectName(false);
                          setSelectFatherName(false);
                          setSelectMotherName(false);
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
        </Grid>
      </Container>
    </Layout>
  );
};

export default ProttoionAppForCorrection;
