import React from "react";
import { Box, Button, Alert, Link } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

const AttachFiles = ({
  handleNext,
  handleBack,
  handleApplicantPhoto,
  photo,
  imgSrc,
  handleRemoveApplicantPhoto,
}) => {
  console.log(photo);

  return (
    <Box>
      <Alert severity="warning">
        Please attach your portrait (Width: 120 x Height: 150) and Max Size:
        120kb. If you want to resize image, you can use{" "}
        <Link href="https://resizing.app/">Resize App</Link>
      </Alert>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          my: 2,
          flexDirection: "column",
        }}
      >
        <Box sx={{ border: "1px solid #ddd", p: 3, my: 1 }}>
          {imgSrc ? (
            <img src={imgSrc} alt="user" height="150px" width="120px" />
          ) : (
            <AccountBoxIcon
              sx={{
                height: "150px",
                width: "120px",
                color: "teal",
              }}
            />
          )}
        </Box>
        {imgSrc ? (
          <Button
            variant="contained"
            color="error"
            onClick={handleRemoveApplicantPhoto}
          >
            Remove photo
          </Button>
        ) : (
          <Button variant="contained" component="label">
            Upload your photo
            <input
              type="file"
              hidden
              accept="image/*"
              name="admitCard"
              required
              onChange={handleApplicantPhoto}
            />
          </Button>
        )}
      </Box>

      <Box>
        <Button onClick={handleNext}>Next</Button>{" "}
        <Button onClick={handleBack}>Back</Button>
      </Box>
    </Box>
  );
};

export default AttachFiles;
