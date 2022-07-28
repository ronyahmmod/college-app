import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Grid,
  Link,
  Stack,
  TextField,
  Tooltip,
  Typography,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllApplications,
  selectApplicationById,
  setStatus,
} from "../feature/application/applicationSlice";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useFormik } from "formik";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { selectLoggedInUser } from "../feature/user/userSlice";
import { format } from "date-fns";
const ApplicationDetails = ({ id }) => {
  const applicationDetails = useSelector(selectApplicationById(id))[0];
  const allApplications = useSelector(selectAllApplications);
  const loggedInUser = useSelector(selectLoggedInUser);

  const [loadedImage, setLoadedImage] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const theme = useTheme();
  // Formdata formik part
  const formik = useFormik({
    initialValues: {
      payslip: "",
      payslipDate: Date.now(),
      remarks: "",
    },
    onSubmit: async (values, { resetForm }) => {
      //   alert(values.payslipDate.toString());

      const { payslip } = values;
      let foundedApplication = null;
      if (payslip) {
        foundedApplication = allApplications.filter(
          (app) => app.payslip === payslip
        )[0];
      }
      if (foundedApplication) {
        alert(`This payslip already used`);
        return;
      }
      const docRef = doc(db, "applications", applicationDetails.id);
      if (canUpadate) {
        await updateDoc(docRef, {
          ...values,
          status: "Done",
          approvedBy: loggedInUser,
        });
      } else if (canReject) {
        await updateDoc(docRef, {
          ...values,
          status: "Rejected",
          approvedBy: loggedInUser,
        });
      }
      setUpdated(true);

      dispatch(setStatus("idle"));
    },
  });
  const { payslip, payslipDate, remarks } = formik.values;

  const canUpadate = [payslip, payslipDate, remarks].every(Boolean);
  const canReject = [remarks, !payslip, payslipDate].every(Boolean);
  //   const canPostPaySlip = [applicationAlreadyPaidByPayslip].every(Boolean);

  const { handleSubmit, handleChange, setFieldValue } = formik;
  useEffect(() => {
    const storage = getStorage();
    const imageRef = ref(
      storage,
      `app-attachements/${applicationDetails.id}.${applicationDetails.fileExtension}`
    );
    setLoading(true);
    getDownloadURL(imageRef)
      .then((url) => {
        setLoadedImage(url);
        setLoading(false);
      })
      .catch((error) => {
        setLoadedImage(null);
      });
  }, [updated, applicationDetails]);
  const DetailsMenuItem = ({ content }) => {
    return (
      <Box
        sx={{
          backgroundColor: theme.palette.grey[100],
          p: 3,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <strong>Dear Sir,</strong>
        <Typography>
          I am <strong>{content.name.toUpperCase()}</strong>. I have passed{" "}
          <strong>
            {(content.lastExamName && content.lastExamName.toUpperCase()) ||
              "------"}
          </strong>{" "}
          on <strong>{content.passingYear}</strong>. My roll number:{" "}
          <strong>{content.roll}</strong> and registration number:{" "}
          <strong>{content.registration}</strong>. Please accept my request.
        </Typography>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
            width: "80%",
          }}
        >
          <strong>Your sincerely</strong>
          <strong>{content.name.toUpperCase()}</strong>
          <strong>{content.address || "-----"}</strong>
          <strong>{content.mobile || "xxxxx-xxxxxx"}</strong>
        </Box>
      </Box>
    );
  };

  const DetailsMenu = ({ applications }) => {
    return (
      <Box>
        <DetailsMenuItem content={applications} />
      </Box>
    );
  };

  return (
    <Box>
      {applicationDetails && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <DetailsMenu applications={applicationDetails} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                border: `1px solid ${theme.palette.grey[100]}`,
                p: 1,
                img: {
                  height: 250,
                  width: "100%",
                  objectFit: "contain",
                },
              }}
            >
              <Backdrop
                sx={{ color: "#fff", zIndex: theme.zIndex.drawer + 1 }}
                open={loading}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
              <Link href={loadedImage} target="_blank">
                <Tooltip title="Click to view new tab" arrow>
                  <img src={loadedImage} alt={applicationDetails.name} />
                </Tooltip>
              </Link>
            </Box>
          </Grid>
          {applicationDetails && applicationDetails.payslip ? (
            <Grid item xs={12}>
              <Alert severity="success">
                This application allready approved by{" "}
                <strong>{applicationDetails.approvedBy.email}</strong>. Payslip
                number: <strong>{applicationDetails.payslip}</strong> payslip
                date: <strong>{applicationDetails.payslipDate}</strong>. Thanks
                admin for your job. [Principal, JDC]
              </Alert>
            </Grid>
          ) : applicationDetails && applicationDetails.status === "Rejected" ? (
            <Grid item xs={12}>
              <Alert severity="error">
                This application allready rejected by{" "}
                <strong>{applicationDetails.approvedBy.email}</strong> for{" "}
                <strong>{applicationDetails.remarks}</strong>. Thanks admin for
                your job. [Principal, JDC]
              </Alert>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Stack
                direction="row"
                spacing={2}
                justifyContent="flex-end"
                component="form"
                onSubmit={handleSubmit}
              >
                <TextField
                  name="payslip"
                  label="Payslip"
                  placeholder="Enter payslip"
                  value={payslip}
                  onChange={handleChange}
                />

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Payslip Date"
                    name="payslipDate"
                    value={payslipDate}
                    onChange={(newValue) =>
                      setFieldValue("payslipDate", format(newValue, "P"))
                    }
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <TextField
                  name="remarks"
                  label="Remarks"
                  placeholder="Enter remarks shortly"
                  value={remarks}
                  onChange={handleChange}
                  sx={{ flexGrow: 1 }}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  disabled={!canUpadate}
                >
                  Approve
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  type="submit"
                  disabled={!canReject}
                >
                  Reject
                </Button>
              </Stack>
            </Grid>
          )}
        </Grid>
      )}
    </Box>
  );
};

export default ApplicationDetails;
