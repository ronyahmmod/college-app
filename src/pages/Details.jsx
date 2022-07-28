import {
  Avatar,
  Box,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import { selectLoggedInUser } from "../feature/user/userSlice";

const Details = () => {
  const loggedInUser = useSelector(selectLoggedInUser);

  if (loggedInUser) {
    return (
      <Layout>
        <Container maxWidth="md" sx={{ mx: "auto", mt: 10, mb: 2 }}>
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
                    src={loggedInUser.photoURL}
                    alt={loggedInUser.id}
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
                          {(loggedInUser.email &&
                            loggedInUser.email.toUpperCase()) ||
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
                          {loggedInUser.metadata.lastSignInTime &&
                            loggedInUser.metadata.lastSignInTime}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Created At</TableCell>
                        <TableCell>
                          {loggedInUser.metadata.creationTime &&
                            loggedInUser.metadata.creationTime}
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
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Layout>
    );
  } else return <Loading />;
};

export default Details;
