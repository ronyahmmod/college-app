import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Button,
  Alert,
  Link,
} from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import React, { useEffect, useState } from "react";
import Credit from "../components/Credit";
import Layout from "../components/Layout";
import RecentApplications from "../components/RecentApplications";
import TodayChart from "../components/TodayChart";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLoggedInUser,
  selectUserIsActivated,
  selectUserRole,
} from "../feature/user/userSlice";
import {
  fetchApplications,
  selectApplicationStatus,
  selectTodaysApplications,
  selectTodaysApplicationsByUserId,
  setStatus,
} from "../feature/application/applicationSlice";
import { useNavigate } from "react-router-dom";

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
  const userRole = useSelector(selectUserRole);
  const todaysApplications = useSelector(selectTodaysApplications);
  const todaysApplicationById = useSelector(
    selectTodaysApplicationsByUserId(loggedInUser && loggedInUser.id)
  );
  const userIsActivated = useSelector(selectUserIsActivated);
  const navigate = useNavigate();
  console.log(userRole);

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
          <Container maxWidth="xl">
            <Grid container sx={{ my: 2 }}>
              <Grid item xs={12}>
                {!userIsActivated && (
                  <Paper>
                    <Alert severity="error">
                      Your account is not activated yet. To activate please
                      click{" "}
                      <Link
                        href="/dashboard/activateAcount"
                        onClick={(event) => {
                          event.preventDefault();
                          navigate("/dashboard/activateAcount");
                        }}
                      >
                        here
                      </Link>
                      .
                    </Alert>
                  </Paper>
                )}
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="secondary"
              endIcon={<ReplayIcon />}
              onClick={() => dispatch(setStatus("idle"))}
              disabled={status === "loading"}
              size="small"
              sx={{ mb: 1 }}
            >
              Reload
            </Button>
            <Grid container spacing={3}>
              {/* Today Graph */}
              {loggedInUser && userRole !== "user" && (
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
