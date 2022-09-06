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
  Typography,
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
import { HiOutlineArrowRight } from "react-icons/hi";
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
                        href="/dashboard/updateMe"
                        onClick={(event) => {
                          event.preventDefault();
                          navigate("/dashboard/UpdateMe");
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

              {/* Action For User and Super */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    padding: {
                      xs: 2,
                      md: 6,
                    },
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: { xs: "center", md: "space-around" },
                    alignItems: "center",
                    gap: { xs: 2, md: 6 },
                  }}
                >
                  <Box
                    onClick={() => navigate("/dashboard/newapp")}
                    className="p-6 bg-teal-700 hover:bg-teal-500 cursor-pointer flex items-center justify-center flex-col rounded-sm text-slate-50 gap-2 h-full w-full md:h-[250px] md:w-[250px] "
                  >
                    <Typography
                      sx={{
                        fontSize: "32px",
                        fontWeight: 300,
                        textAlign: "center",
                      }}
                    >
                      New Application
                    </Typography>
                    <HiOutlineArrowRight className="h-12 w-12 animate-pulse" />
                  </Box>
                  <Box className="p-6 bg-red-700 hover:bg-red-500 cursor-pointer flex items-center justify-center flex-col rounded-sm text-slate-50 gap-2 h-full w-full md:h-[250px] md:w-[250px] ">
                    <Typography
                      sx={{
                        fontSize: "32px",
                        fontWeight: 300,
                        textAlign: "center",
                      }}
                    >
                      All Applications
                    </Typography>
                    <HiOutlineArrowRight className="h-12 w-12 animate-pulse" />
                  </Box>
                  <Box className="p-6 bg-sky-700 hover:bg-sky-500 cursor-pointer flex items-center justify-center flex-col rounded-sm text-slate-50 gap-2 h-full w-full md:h-[250px] md:w-[250px] ">
                    <Typography
                      sx={{
                        fontSize: "32px",
                        fontWeight: 300,
                        textAlign: "center",
                      }}
                    >
                      History
                    </Typography>
                    <HiOutlineArrowRight className="h-12 w-12 animate-pulse" />
                  </Box>
                </Paper>
              </Grid>
              {/* END CONTAINER */}
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
