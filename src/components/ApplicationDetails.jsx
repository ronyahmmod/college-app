import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { selectApplicationById } from "../feature/application/applicationSlice";
import Title from "./Title";

const ApplicationDetails = ({ id }) => {
  const applicationDetails = useSelector(selectApplicationById(id))[0];
  const theme = useTheme();
  const DetailsMenuItem = ({ content }) => (
    <Box
      sx={{
        backgroundColor: theme.palette.grey[100],
        p: 1,
        borderRadius: 2,
      }}
    >
      <Typography variant="h6">{content}</Typography>
    </Box>
  );

  const DetailsMenu = (applications) => {
    return (
      <Box>
        {Object.keys(applications).map((key, index) => (
          <DetailsMenuItem content={applications[key]} key={index} />
        ))}
      </Box>
    );
  };

  return (
    <Box>
      {applicationDetails && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Title>Application Details</Title>
            <DetailsMenu applications={applicationDetails} />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default ApplicationDetails;
