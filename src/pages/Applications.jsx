import React, { useEffect, useState } from "react";
import { Alert, Box, Button, Container, Grid, Paper } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import Title from "../components/Title";
import {
  fetchApplications,
  // selectAllApplications,
  selectApplicationError,
  selectApplicationsByUserId,
  selectApplicationStatus,
  selectSortedApplicationByAppDate,
  setStatus,
} from "../feature/application/applicationSlice";
import ReplayIcon from "@mui/icons-material/Replay";
import ApprovalIcon from "@mui/icons-material/Approval";
import BlockIcon from "@mui/icons-material/Block";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";
import PrintIcon from "@mui/icons-material/Print";
import { selectLoggedInUser } from "../feature/user/userSlice";
import ServiceDialog from "../components/ServiceDialog";
import { useNavigate } from "react-router-dom";
import { renderApplicationType } from "../helper/render.helper";
// const Rows = [
//   { id: 1, col1: "Hello", col2: "World" },
//   { id: 2, col1: "DataGridPro", col2: "is Awesome" },
//   { id: 3, col1: "MUI", col2: "is Amazing" },
// ];

const Applications = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectLoggedInUser);
  const [serviceOpen, setServiceOpen] = useState(false);
  const handleServiceClose = () => setServiceOpen(false);
  const [serviceName, setServiceName] = useState("");
  const [id, setId] = useState(null);
  const navigate = useNavigate();

  const columnDefiner = () => {
    if (loggedInUser && loggedInUser.role !== "user") {
      return [
        {
          field: "id",
          headerName: "Application ID",
          width: 200,
        },
        {
          field: "name",
          headerName: "Applicant Name",
          width: 200,
          valueGetter: (params) => params.row.name?.toUpperCase(),
        },
        { field: "date", headerName: "Application Date", width: 200 },
        {
          field: "roll",
          headerName: "Roll Number",
          width: 100,
          valueGetter: (params) =>
            (params.row.roll && params.row.roll) ||
            (params.row.examRoll && params.row.examRoll) ||
            "N/A",
        },
        {
          field: "registration",
          headerName: "Registration Number",
          width: 150,
          valueGetter: (params) =>
            (params.row.registration && params.row.registration) ||
            (params.row.examRegistration && params.row.examRegistration) ||
            "N/A",
        },
        {
          field: "passingYear",
          headerName: "Passing Year",
          width: 100,
          valueGetter: (params) =>
            (params.row.passingYear && params.row.passingYear) ||
            (params.row.examYear && params.row.examYear) ||
            "N/A",
        },
        {
          field: "board",
          headerName: "Board",
          width: 100,
          valueGetter: (params) =>
            (params.row.board && params.row.board.toUpperCase()) ||
            (params.row.examBoard && params.row.examBoard.toUpperCase()) ||
            "N/A",
        },
        {
          field: "applicationType",
          headerName: "Application Type",
          width: 250,
          valueGetter: (params) =>
            renderApplicationType(params.row.applicationType),
        },
        {
          field: "status",
          headerName: "Status",
          width: 100,
          valueGetter: (params) => params.row.status.toUpperCase(),
        },
        { field: "remarks", headerName: "Remarks", width: 300 },
        {
          field: "actions",
          type: "actions",
          width: 200,
          getActions: (params) => [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Details"
              onClick={() => {
                switch (params.row.applicationType) {
                  case "certificate":
                  case "testimonial":
                  case "certificate-testimonial":
                    navigate(`/dashboard/editcertificateapp/${params.id}`);
                    break;
                  case "psis":
                    navigate(
                      `/dashboard/editprottoionforcorrectionapp/${params.id}`
                    );
                    break;
                  case "pscs":
                    navigate(
                      `/dashboard/editprottoionforcurrentapp/${params.id}`
                    );
                    break;
                  case "psps":
                    navigate(
                      `/dashboard/editprottoionforpassedapp/${params.id}`
                    );
                    break;
                  default:
                    alert("Nothing selected");
                    break;
                }
              }}
              color="primary"
            />,
            <GridActionsCellItem
              icon={<PrintIcon />}
              label="Print Application"
              onClick={() =>
                navigate(`/dashboard/print-application/${params.id}`)
              }
              color="primary"
            />,
            <GridActionsCellItem
              icon={<InfoIcon />}
              label="Details"
              onClick={() => {
                setId(params.id);
                setServiceOpen(true);
                setServiceName("details");
              }}
              color="secondary"
            />,
            <GridActionsCellItem
              icon={<BlockIcon />}
              label="Reject"
              onClick={() => alert(params.id)}
              color="error"
            />,
            <GridActionsCellItem
              icon={<ApprovalIcon />}
              label="Approve"
              onClick={() => {
                if (
                  params.row.status === "Done" &&
                  params.row.applicationType === "testimonial"
                ) {
                  navigate(`/dashboard/render/${params.id}/testimonial`);
                } else if (
                  params.row.status === "Done" &&
                  params.row.applicationType === "certificate-testimonial"
                ) {
                  navigate(`/dashboard/render/${params.id}/testimonial`);
                } else if (
                  params.row.status === "Done" &&
                  (params.row.applicationType === "psps" ||
                    params.row.applicationType === "pscs" ||
                    params.row.applicationType === "psis")
                ) {
                  navigate(`/dashboard/render/${params.id}/prottoion`);
                } else if (
                  params.row.status === "Done" &&
                  params.row.applicationType === "certificate"
                ) {
                  alert(
                    "Certificate is rendered only by consern Board/University"
                  );
                } else if (params.row.status !== "Done") {
                  alert(
                    "This application is either under process nor rejected!"
                  );
                }
              }}
              color="primary"
            />,
          ],
        },
      ];
    } else {
      return [
        {
          field: "id",
          headerName: "Application ID",
          width: 200,
        },
        {
          field: "name",
          headerName: "Applicant Name",
          width: 200,
          valueGetter: (params) => params.row.name?.toUpperCase(),
        },
        { field: "date", headerName: "Application Date", width: 200 },
        {
          field: "roll",
          headerName: "Roll Number",
          width: 100,
          valueGetter: (params) =>
            (params.row.roll && params.row.roll) ||
            (params.row.examRoll && params.row.examRoll) ||
            "N/A",
        },
        {
          field: "registration",
          headerName: "Registration Number",
          width: 150,
          valueGetter: (params) =>
            (params.row.registration && params.row.registration) ||
            (params.row.examRegistration && params.row.examRegistration) ||
            "N/A",
        },
        {
          field: "passingYear",
          headerName: "Passing Year",
          width: 100,
          valueGetter: (params) =>
            (params.row.passingYear && params.row.passingYear) ||
            (params.row.examYear && params.row.examYear) ||
            "N/A",
        },
        {
          field: "board",
          headerName: "Board",
          width: 100,
          valueGetter: (params) =>
            (params.row.board && params.row.board.toUpperCase()) ||
            (params.row.examBoard && params.row.examBoard.toUpperCase()) ||
            "N/A",
        },
        {
          field: "applicationType",
          headerName: "Application Type",
          width: 250,
          valueGetter: (params) =>
            renderApplicationType(params.row.applicationType),
        },
        {
          field: "status",
          headerName: "Status",
          width: 100,
          valueGetter: (params) => params.row.status.toUpperCase(),
        },
        { field: "remarks", headerName: "Remarks", width: 300 },
        {
          field: "actions",
          type: "actions",
          width: 150,
          getActions: (params) => [
            <GridActionsCellItem
              icon={<PrintIcon />}
              label="Print Application"
              onClick={() =>
                navigate(`/dashboard/print-application/${params.id}`)
              }
              color="primary"
            />,
          ],
        },
      ];
    }
  };
  const Columns = columnDefiner();
  const allApplications = useSelector(selectSortedApplicationByAppDate);
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
      // throw new Error("Fuck", { cause: "Minus" });
    }
    setStableUser(loggedInUser);
  }, [status, dispatch, loggedInUser]);
  if (Boolean(loggedInUser))
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
          {/* Service Dialog */}
          <ServiceDialog
            open={serviceOpen}
            handleClose={handleServiceClose}
            serviceName={serviceName}
            id={id}
          />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4, mx: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 4, display: "flex", flexDirection: "column" }}>
                  {error && <Alert security="error">{error}</Alert>}
                  <Title>Applications</Title>
                  <Box
                    sx={{
                      display: "flex",
                      my: 1,
                      justifyContent: "flex-end",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    {/* Actions */}
                    {loggedInUser.role !== "user" && (
                      <>
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
                          endIcon={<BlockIcon />}
                          onClick={() => alert(JSON.stringify(selectionModel))}
                          disabled={selectionModel.length <= 0}
                        >
                          Reject
                        </Button>
                      </>
                    )}

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
                  <Box sx={{ height: 400, maxWidth: "100%" }}>
                    {status === "succeded" && Boolean(loggedInUser) && (
                      <DataGrid
                        initialState={{
                          // sorting: {
                          //   sortModel: [{ field: "date", sort: "dsc" }],
                          // },
                          pinnedColumns: { left: ["actions"] },
                        }}
                        rows={
                          loggedInUser.role === "user"
                            ? userApplications
                            : allApplications
                        }
                        columns={Columns}
                        checkboxSelection={
                          loggedInUser && loggedInUser.role !== "user"
                        }
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
