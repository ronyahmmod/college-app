import React from "react";
import { Box, Typography, Divider, Button } from "@mui/material";

const PartFour = React.memo(() => {
  console.log("Re render Part Four");
  return (
    <Box>
      <Typography>নিচের ফাইলগুলো আপলোড করুন</Typography>
      <Divider />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          my: 1,
        }}
      >
        <Typography>প্রবেশপত্র আপলোড করুন</Typography>
        <Button variant="contained" component="label">
          Upload
          <input type="file" hidden accept="image/*" />
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          my: 1,
        }}
      >
        <Typography>আপনার ছবি আপলোড করুন</Typography>
        <Button variant="contained" component="label">
          Upload
          <input type="file" hidden accept="image/*" />
        </Button>
      </Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          my: 1,
          mt: 8,
        }}
      >
        <Button variant="contained" color="secondary">
          Preiview
        </Button>
        <Button color="error" variant="contained">
          Cancel
        </Button>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </Box>
  );
});

export default PartFour;
