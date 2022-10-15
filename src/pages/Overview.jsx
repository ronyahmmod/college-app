import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Button,
} from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import React, { useEffect, useState } from "react";
import Credit from "../components/Credit";
import Layout from "../components/Layout";
import RecentApplications from "../components/RecentApplications";
import TodayChart from "../components/TodayChart";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../feature/user/userSlice";
import {
  fetchApplications,
  selectApplicationStatus,
  selectTodaysApplications,
  selectTodaysApplicationsByUserId,
  setStatus,
} from "../feature/application/applicationSlice";
import { userServices } from "../components/userServices";
import Services from "../components/Services";

const Overview = () => {
  const status = useSelector(selectApplicationStatus);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchApplications());
    }
  }, [status, dispatch]);
  const [open, setOpen] = useState(false);

  const loggedInUser = useSelector(selectLoggedInUser);
  const todaysApplications = useSelector(selectTodaysApplications);
  const todaysApplicationById = useSelector(
    selectTodaysApplicationsByUserId(loggedInUser && loggedInUser.id)
  );

  if (loggedInUser && todaysApplications) {
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
              {loggedInUser && loggedInUser.role !== "user" && (
                <>
                  <Grid item xs={12} md={8} lg={9}>
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        height: 240,
                      }}
                    >
                      <TodayChart applications={todaysApplications} />
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
                      <Credit applications={todaysApplications} />
                    </Paper>
                  </Grid>
                </>
              )}

              {/* TODO: Services */}
              {loggedInUser.role === "user" && (
                <Services services={userServices} title="Services" />
              )}

              {/* Current Applications */}

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="secondary"
                  endIcon={<ReplayIcon />}
                  onClick={() => dispatch(setStatus("idle"))}
                  disabled={status === "loading"}
                ></Button>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    overflowX: "auto",
                  }}
                >
                  {/* Recent applications */}
                  <RecentApplications
                    applications={
                      loggedInUser.role === "user"
                        ? todaysApplicationById
                        : todaysApplications
                    }
                  />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Layout>
    );
  }
  if (status === "loading") {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={() => setOpen(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
};

export default Overview;
