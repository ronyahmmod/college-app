import React from "react";
import { Box, Container, Grid, Paper } from "@mui/material";
import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../feature/user/userSlice";
import Title from "../components/Title";

const ApplicationForm = () => {
  const loggedInUser = useSelector(selectLoggedInUser);
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
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {loggedInUser && (
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                  component="form"
                >
                  <Title>Create New Application</Title>
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
