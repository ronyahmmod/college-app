import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Button,
  Alert,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { green, grey, red } from "@mui/material/colors";
// import {useTheme} from '@mui/material/styles'

import Layout from "../components/Layout";
import {
  fetchUsers,
  selectAllUsers,
  selectLoggedInUser,
  selectUserByFieldValue,
  selectUserStatus,
  setStatus,
} from "../feature/user/userSlice";
import Loading from "../components/Loading";
import Authorization from "../components/Authorization";
import ReplayIcon from "@mui/icons-material/Replay";
import { format } from "date-fns/esm";

// function TablePaginationActions(props) {
//     const theme = useTheme();
//     const {count, page, rowsPerPage, onPageChange} = props;

//     const handleFirstPageButtonClick = event => {
//         onPageChange(event);
//     }

//     const handleBackButtonClick = event => {
//         onPageChange(event, page -1)
//     }

//     const handleNextButtonClick = event => {
//         onPageChange(event, page + 1)
//     }

//     const handleLastPageButtonClick = event => {
//         onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
//     }
// }

const renderUserStatus = (status) => {
  return (
    <Box
      sx={{
        backgroundColor: status ? green[600] : red[400],
        p: 0.4,
        borderRadius: 1,
        color: grey[200],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        textTransform: "capitalize",
      }}
    >
      {(status && status) || "Inactive"}
    </Box>
  );
};

const Users = () => {
  const status = useSelector(selectUserStatus);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);
  const [search, setSearch] = useState("");
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  const selectUser = (users, searchUsers, search) => {
    if (search) {
      return searchUsers;
    } else return users;
  };
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const loggedInUser = useSelector(selectLoggedInUser);
  const users = useSelector(selectAllUsers);
  const searchUser = useSelector(selectUserByFieldValue(search));
  const selectedUsers = selectUser(users, searchUser, search);
  if (
    loggedInUser &&
    loggedInUser.role !== "user" &&
    users &&
    selectedUsers &&
    status === "succeded"
  ) {
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
          <Container maxWidth="lg" sx={{ my: 4, mx: 2 }}>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
                <TextField
                  name="search"
                  placeholder="Search user email"
                  variant="standard"
                  sx={{ mr: 2 }}
                  onChange={handleSearchChange}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  endIcon={<ReplayIcon />}
                  onClick={() => dispatch(setStatus("idle"))}
                  disabled={status === "loading"}
                />
              </Box>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                {selectedUsers ? (
                  <>
                    <Paper
                      sx={{
                        p: 4,
                        display: "flex",
                        flexDirection: "column",
                        minHeight: 450,
                        height: 450,
                        overflow: "auto",
                        width: "100%",
                      }}
                    >
                      <Table sx={{ minWidth: 650 }} aria-label="user-table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Last logged in</TableCell>
                            <TableCell>Status</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {selectedUsers
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map((user) => (
                              <TableRow key={user.id}>
                                <TableCell>{user.displayName}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell sx={{ textTransform: "capitalize" }}>
                                  {user.role}
                                </TableCell>
                                <TableCell>
                                  {format(
                                    new Date(user.metadata.lastSignInTime),
                                    "PP"
                                  )}
                                </TableCell>
                                <TableCell>
                                  {renderUserStatus(
                                    (user.status && user.status) || null
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </Paper>
                    <Box component={Paper} sx={{ mt: 2, px: 3 }}>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 100]}
                        component="div"
                        count={users.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </Box>
                  </>
                ) : (
                  <Alert severity="warning">There is no user</Alert>
                )}
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Layout>
    );
  } else if (status === "loading") {
    return <Loading />;
  } else {
    return <Authorization />;
  }
};

export default Users;
