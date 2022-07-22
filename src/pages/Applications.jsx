import React, { useEffect, useState } from "react";
import { Alert, Box, Button, Container, Grid, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import Title from "../components/Title";
import {
  fetchApplications,
  selectAllApplications,
  selectApplicationError,
  selectApplicationsByUserId,
  selectApplicationStatus,
  setStatus,
} from "../feature/application/applicationSlice";
import ReplayIcon from "@mui/icons-material/Replay";
import ApprovalIcon from "@mui/icons-material/Approval";
import { selectLoggedInUser } from "../feature/user/userSlice";

// const Rows = [
//   { id: 1, col1: "Hello", col2: "World" },
//   { id: 2, col1: "DataGridPro", col2: "is Awesome" },
//   { id: 3, col1: "MUI", col2: "is Amazing" },
// ];

const Columns = [
  { field: "id", headerName: "Application Id", width: 200 },
  {
    field: "name",
    headerName: "Applicant Name",
    width: 200,
    valueGetter: (params) => params.row.name?.toUpperCase(),
  },
  { field: "date", headerName: "Application Date", width: 200 },
  { field: "roll", headerName: "Roll Number", width: 150 },
  { field: "registration", headerName: "Registration Number", width: 150 },
  { field: "passingYear", headerName: "Passing Year", width: 150 },
  {
    field: "board",
    headerName: "Board",
    width: 150,
    valueGetter: (params) => params.row.board.toUpperCase(),
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    valueGetter: (params) => params.row.status.toUpperCase(),
  },
  { field: "remarks", headerName: "Remarks", width: 150 },
];

const Applications = () => {
  const dispatch = useDispatch();

  const loggedInUser = useSelector(selectLoggedInUser);
  const allApplications = useSelector(selectAllApplications);
  const [stableUser, setStableUser] = useState(null);
  const userApplications = useSelector(
    selectApplicationsByUserId(stableUser && stableUser.id)
  );
  const status = useSelector(selectApplicationStatus);
  const error = useSelector(selectApplicationError);
  const [selectionModel, setSelectionModel] = useState([]);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchApplications());
    }
    setStableUser(loggedInUser);
  }, [status, dispatch, loggedInUser]);

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
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                {error && <Alert security="error">{error}</Alert>}
                <Title>Applications</Title>
                <Box
                  sx={{
                    display: "flex",
                    my: 1,
                    justifyContent: "flex-end",
                    px: 2,
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  {/* Actions */}
                  <Button
                    variant="contained"
                    color="secondary"
                    endIcon={<ApprovalIcon />}
                    onClick={() => alert(JSON.stringify(selectionModel))}
                    disabled={selectionModel.length <= 0}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    endIcon={<ReplayIcon />}
                    onClick={() => dispatch(setStatus("idle"))}
                    disabled={status === "loading"}
                  >
                    Reload
                  </Button>
                </Box>
                <Box sx={{ height: 600, width: "100%" }}>
                  {(status === "succeded") & Boolean(loggedInUser) && (
                    <DataGrid
                      rows={
                        loggedInUser.role === "user"
                          ? userApplications
                          : allApplications
                      }
                      columns={Columns}
                      checkboxSelection={true}
                      loading={status === "loading"}
                      selectionModel={selectionModel}
                      onSelectionModelChange={(newSelectionModel) => {
                        setSelectionModel(newSelectionModel);
                      }}
                      pageSize={pageSize}
                      onPageSizeChange={(newPageSize) =>
                        setPageSize(newPageSize)
                      }
                      rowsPerPageOptions={[5, 10, 20]}
                      pagination
                    />
                  )}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
};

export default Applications;
