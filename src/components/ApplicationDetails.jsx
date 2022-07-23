import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { selectApplicationById } from "../feature/application/applicationSlice";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

const ApplicationDetails = ({ id }) => {
  const applicationDetails = useSelector(selectApplicationById(id))[0];
  const [loadedImage, setLoadedImage] = useState(null);
  useEffect(() => {
    const storage = getStorage();
    const imageRef = ref(
      storage,
      `app-attachements/${applicationDetails.studentId}-${applicationDetails.id}.jpg`
    );
    getDownloadURL(imageRef)
      .then((url) => {
        setLoadedImage(url);
      })
      .catch((error) => {
        setLoadedImage(null);
      });
  });
  const theme = useTheme();
  const DetailsMenuItem = ({ content }) => {
    return (
      <Box
        sx={{
          backgroundColor: theme.palette.grey[100],
          p: 1,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <strong>Dear Sir,</strong>
        <Typography>
          I am <strong>{content.name}</strong>. I have passed{" "}
          <strong>{content.lastExamName || "------"}</strong> on{" "}
          <strong>{content.passingYear}</strong>. My roll number:{" "}
          <strong>{content.roll}</strong> and registration number:{" "}
          <strong>{content.registration}</strong>. Please accept my request.
        </Typography>
        <strong>Your sincerely</strong>
        <strong>{content.address || "-----"}</strong>
        <strong>{content.mobile || "xxxxx-xxxxxx"}</strong>
        {/* <Typography variant="h5" sx={{ textAlign: "left" }}>{`Dear sir,
         I am ${content.name}. I was passed on ${
          content.lastExamName || "---"
        } examination. My roll: ${content.roll}, registration: ${
          content.registration
        } and exam year: ${
          content.passingYear
        }. Please accept my application.`}</Typography> */}
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
                img: {
                  height: 300,
                },
              }}
            >
              <img src={loadedImage} alt={applicationDetails.name} />
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default ApplicationDetails;
