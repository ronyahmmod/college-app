import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { format } from "date-fns/esm";
import React from "react";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import { selectLoggedInUser } from "../feature/user/userSlice";
import { up } from "../helper/render.helper";
import UnknownUserURL from "../assets/images/unknown.jpg";
import { useNavigate } from "react-router-dom";

const MobileCardContent = ({ title, content }) => (
  <Box>
    <Typography gutterBottom variant="h5" component="div">
      {title}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {content}
    </Typography>
  </Box>
);

const Details = () => {
  const loggedInUser = useSelector(selectLoggedInUser);
  const navigate = useNavigate();
  // console.log(loggedInUser);

  if (loggedInUser) {
    return (
      <Layout>
        <Container
          maxWidth="md"
          sx={{
            mx: "auto",
            mt: 10,
            mb: 2,
            display: { xs: "none", md: "flex" },
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 4,
                  display: "flex",
                  flexDirection: "column",
                  minHeight: 450,
                  position: "relative",
                  boxShadow: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 1,
                    position: "absolute",
                    top: "-2%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",

                    zIndex: 1000,
                  }}
                >
                  {/* Header */}
                  <Avatar
                    sx={{
                      height: 80,
                      width: 80,
                    }}
                    src={loggedInUser.photoURL && loggedInUser.photoURL}
                    alt={loggedInUser.displayName?.toUpperCase()}
                  />
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Table sx={{ minWidth: 450 }} aria-label="user-details">
                    <TableBody>
                      <TableRow>
                        <TableCell>Full Name</TableCell>
                        <TableCell>
                          {(loggedInUser.displayName &&
                            loggedInUser.displayName.toUpperCase()) ||
                            `You did'nt set your name.`}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Email</TableCell>
                        <TableCell>
                          {(loggedInUser.email && loggedInUser.email) ||
                            `You did'nt set your email.`}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>User Role</TableCell>
                        <TableCell>
                          {loggedInUser.role && loggedInUser.role.toUpperCase()}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Email Verified</TableCell>
                        <TableCell>
                          {loggedInUser.emailVerified
                            ? "Email is verified"
                            : "Email is not verified"}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Mobile Number</TableCell>
                        <TableCell>
                          {loggedInUser.phoneNumber
                            ? loggedInUser.phoneNumber
                            : "You did'nt update your mobile number"}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Last Sign In</TableCell>
                        <TableCell>
                          {loggedInUser.metadata?.lastSignInTime
                            ? loggedInUser.metadata.lastSignInTime
                            : format(
                                new Date(loggedInUser.createdAt),
                                "dd/MM/yyyy"
                              )}
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell>Address</TableCell>
                        <TableCell>
                          {(loggedInUser.address && loggedInUser.address) ||
                            "You are not set your address."}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <Box sx={{ mt: 1 }}>
                    <Button onClick={() => navigate("/dashboard/updateMe")}>
                      Update User
                    </Button>
                    <Button color="error">Delete User</Button>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>

        {/* MOBILE DEVICE */}
        <Container
          maxWidth="sm"
          sx={{ display: { xs: "flex", md: "none" }, my: 2 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card sx={{ maxWidth: 325 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={UnknownUserURL}
                  alt="User"
                />
                <CardContent
                  sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                  <MobileCardContent
                    title="Name"
                    content={
                      loggedInUser.displayName
                        ? loggedInUser.displayName
                        : "Unknown"
                    }
                  />
                  <MobileCardContent
                    title="Email"
                    content={
                      loggedInUser.email ? loggedInUser.email : "Unknown"
                    }
                  />
                  <MobileCardContent
                    title="User Role"
                    content={up(loggedInUser.role)}
                  />
                  <MobileCardContent
                    title="Is Activate"
                    content={
                      loggedInUser.isActivated
                        ? loggedInUser.isActivated
                        : "Not Activate"
                    }
                  />

                  <MobileCardContent
                    title="Email Varified"
                    content={
                      loggedInUser.phoneNumber
                        ? loggedInUser.phoneNumber
                        : "You did'nt update your mobile number"
                    }
                  />
                  <MobileCardContent
                    title="Address"
                    content={
                      (loggedInUser.address && loggedInUser.address) ||
                      "You are not set your address."
                    }
                  />
                </CardContent>

                <CardActions>
                  <Button
                    size="small"
                    onClick={() => navigate("/dashboard/updateMe")}
                  >
                    Update User
                  </Button>
                  <Button size="small" color="error">
                    Delete User
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Layout>
    );
  } else return <Loading />;
};

export default Details;
