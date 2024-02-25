import React, { useState } from "react";
import FormComposer from "../utils/FormComposer";
import { useFormik } from "formik";
import Layout from "../components/Layout";
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
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../feature/user/userSlice";
import { doc, collection, setDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase.config";
import { resulation } from "../utils/resulation";
import Title from "../components/Title";

// name, fatherName, motherName, gender, classRoll, readingClass, session, group, readingYear, mobile, address,admit
const ProttoionAppForCurrent = () => {
  const prottoion = new FormComposer("prottoionforcurrent");
  const theme = useTheme();
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
      gender: "",
      classRoll: "",
      readingClass: "",
      session: "",
      group: "",
      readingYear: "",
      mobile: "",
      address: "",
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
        applicationType: "pscs",
        fee: resulation.fees.prottoion,
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
      {},
      formik.handleChange
    )
    .addTextField(
      "classRoll",
      formik.values.classRoll,
      "Enter your reading class roll",
      "Enter your class roll",
      true,
      true,
      {},
      formik.handleChange
    )
    .addSelectItem(
      "readingClass",
      formik.values.readingClass,
      "Enter reading class name",
      "Enter reading class name",
      "reading-class",
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
      "Enter group",
      "group-lable",
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
        { itemKey: "dtb", value: "DIGITAL TECHNOLOGY IN BUSINESS" },
        { itemKey: "hrd", value: "HUMAN RESOURCE DEVELOPMENT" },
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
    );
  // console.log(prottoion.fields);
  // console.log(prottoion.renderSpecificFields(["name", "fatherName"]));
  // if (formik.values)
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
      <Container maxWidth="lg" sx={{ mx: "auto", my: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper
              sx={{ display: "flex", flexDirection: "column", p: 2 }}
              component="form"
              onSubmit={formik.handleSubmit}
            >
              <Alert severity="warning" sx={{ color: grey[700], mb: 3 }}>
                আবেদন করার পূর্বে অবশ্যই সকল তথ্য যাচাই-বাছাই করে নিবেন। সকল
                তথ্য সর্বশেষ পরীক্ষার তথ্য অনুযায়ী হতে হবে। একবার আবেদন সাবমিট
                হয়ে গেলে পরিবর্তনের সুযোগ নেই। ভুল তথ্যের জন্য আপনার আবেদনটি
                বাতিল করা হবে।
              </Alert>
              <Title sx={{ textAlign: "center" }}>
                যারা এ কলেজ বর্তমানে অধ্যয়নরত তাদের আবেদন ফরম।
              </Title>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
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
                <Grid item xs={12} md={6}>
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
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box
                    sx={{
                      mt: 2,
                      display: "flex",
                      justifyContent: "flex-end",
                      pr: 5,
                      gap: 2,
                    }}
                  >
                    <Button type="submit">Submit</Button>
                    <Button
                      type="reset"
                      color="error"
                      onClick={formik.handleReset}
                    >
                      Reset
                    </Button>
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

export default ProttoionAppForCurrent;
