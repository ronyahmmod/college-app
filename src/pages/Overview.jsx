import { Box, Container, Grid, Paper } from "@mui/material";
import React from "react";
import Credit from "../components/Credit";
import Layout from "../components/Layout";
import RecentApplications from "../components/RecentApplications";
import TodayChart from "../components/TodayChart";

const Overview = () => {
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
            {/* Today Graph */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                }}
              >
                <TodayChart />
              </Paper>
            </Grid>
            {/* Today Statics */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                }}
              >
                {/* Deposit */}
                <Credit />
              </Paper>
            </Grid>

            {/* Current Applications */}
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  overflowX: "auto",
                }}
              >
                {/* Recent applications */}
                <RecentApplications />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
};

export default Overview;
