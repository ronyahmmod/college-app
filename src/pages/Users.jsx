import React, { useEffect } from "react";
import Layout from "../components/Layout";
import CustomUsers from "../feature/user/CustomUsers";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  selectAllUsers,
  selectUserStatus,
} from "../feature/user/userSlice";
import Loading from "../components/Loading";
import { Box, Button, Container, Grid, Paper } from "@mui/material";
import { AiOutlineReload } from "react-icons/ai";
const Users = () => {
  const userStatus = useSelector(selectUserStatus);
  //   console.log(userStatus);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(fetchUsers());
    }
  }, [userStatus, dispatch]);
  const users = useSelector(selectAllUsers);

  if (userStatus === "loading") {
    return <Loading />;
  } else if (userStatus === "succeded") {
    return (
      <Layout>
        <Container maxWidth="lg" sx={{ my: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Box>
                  <Button
                    endIcon={<AiOutlineReload />}
                    onClick={() => dispatch(fetchUsers())}
                  >
                    Refresh
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
        <CustomUsers users={users} loadingStatus={userStatus} />
      </Layout>
    );
  }
};

export default Users;
