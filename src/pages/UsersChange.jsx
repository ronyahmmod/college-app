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
  Stack,
  Menu,
  MenuItem,
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
  selectUserRole,
  selectUserStatus,
  setStatus,
  updateUser,
} from "../feature/user/userSlice";
import Loading from "../components/Loading";
import Authorization from "../components/Authorization";
import ReplayIcon from "@mui/icons-material/Replay";
import { format } from "date-fns/esm";

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
  // SETINGS FOR CHANGE USER ROLE MENU OPEN
  const [anchorRoleMenu, setAnchorRoleMenu] = useState(false);
  const openRoleMenu = Boolean(anchorRoleMenu);
  const handleClickRoleMenu = (event) => setAnchorRoleMenu(event.currentTarget);
  const handleCloseRoleMenu = () => setAnchorRoleMenu(null);
  // END: SETINGS FOR CHANGE USER ROLE MENU OPEN
  const userRole = useSelector(selectUserRole);
  const [search, setSearch] = useState("");
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  const selectUser = (users, searchUsers, search) => {
    // if (search) {
    //   return searchUsers;
    // } else return users;
    return users;
  };
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const loggedInUser = useSelector(selectLoggedInUser);
  const users = useSelector(selectAllUsers);
  const searchUser = useSelector(selectUserByFieldValue(search));
  const selectedUsers = selectUser(users, searchUser, search);
  console.log(selectedUsers);
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
                  placeholder="Search "
                  variant="standard"
                  sx={{ mr: 2, flexBasis: "30%" }}
                  onChange={handleSearchChange}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  endIcon={<ReplayIcon />}
                  onClick={() => {
                    dispatch(setStatus("idle"));
                    setSearch("");
                  }}
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
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Last logged in</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {selectedUsers
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map((user) => {
                              console.log(`${user.email} -> ${user.id}`);
                              return (
                                <TableRow key={user.id}>
                                  <TableCell>{user.id}</TableCell>
                                  <TableCell>{user.displayName}</TableCell>
                                  <TableCell>{user.email}</TableCell>
                                  <TableCell
                                    sx={{ textTransform: "capitalize" }}
                                  >
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
                                  {userRole === "super" && (
                                    <TableCell>
                                      <Stack direction="row" spacing={1}>
                                        <Button
                                          variant="contained"
                                          id="role-change-button"
                                          aria-controls={
                                            openRoleMenu
                                              ? "user-role-change-menu"
                                              : "undefined"
                                          }
                                          aria-haspopup="true"
                                          aria-expanded={
                                            openRoleMenu ? true : undefined
                                          }
                                          onClick={handleClickRoleMenu}
                                        >
                                          Change Role
                                        </Button>
                                        <Menu
                                          id="user-role-change-menu"
                                          anchorEl={anchorRoleMenu}
                                          open={openRoleMenu}
                                          onClose={handleCloseRoleMenu}
                                          aria-haspopup="true"
                                          anchorOrigin={{
                                            vertical: "bottom",
                                            horizontal: "right",
                                          }}
                                          transformOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                          }}
                                          MenuListProps={{
                                            "aria-labelledby":
                                              "role-change-button",
                                          }}
                                        >
                                          <MenuItem
                                            onClick={() => {
                                              dispatch(
                                                updateUser({
                                                  uid: user.id,
                                                  fieldName: "role",
                                                  fieldValue: "user",
                                                })
                                              );
                                              handleCloseRoleMenu();
                                            }}
                                          >
                                            User
                                          </MenuItem>
                                          <MenuItem
                                            onClick={() => {
                                              dispatch(
                                                updateUser({
                                                  uid: user.id,
                                                  fieldName: "role",
                                                  fieldValue: "admin",
                                                })
                                              );
                                              handleCloseRoleMenu();
                                            }}
                                          >
                                            Admin
                                          </MenuItem>
                                          <MenuItem
                                            onClick={() => {
                                              dispatch(
                                                updateUser({
                                                  uid: user.id,
                                                  fieldName: "role",
                                                  fieldValue: "super",
                                                })
                                              );
                                              handleCloseRoleMenu();
                                            }}
                                          >
                                            Super Admin
                                          </MenuItem>
                                        </Menu>
                                      </Stack>
                                    </TableCell>
                                  )}
                                </TableRow>
                              );
                            })}
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
