import React, { useState, useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
} from "@mui/material";
import Layout from "../components/Layout";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase.config";
import { DataGrid } from "@mui/x-data-grid";
import { renderGroup, up } from "../helper/render.helper";
import DeleteMenu from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

function upString(params) {
  return up(params.row.class);
}

function renderGroupText(params) {
  return renderGroup(params.row.group);
}

function renderReadingYear(params) {
  return up(params.row.readingYear);
}

function upVoter(params) {
  return up(params.row.voterNumber);
}

const columns = [
  {
    field: "voterNumber",
    headerName: `Voter number`,
    width: 230,
    headerAlign: "center",
    valueGetter: upVoter,
  },
  {
    field: "studentName",
    headerName: `Student's name`,
    width: 200,
    headerAlign: "center",
  },
  {
    field: "fatherName",
    headerName: "Father name",
    width: 200,
    headerAlign: "center",
  },
  {
    field: "motherName",
    headerName: "Mother name",
    width: 200,
    headerAlign: "center",
  },
  {
    field: "class",
    headerName: "Class",
    width: 100,
    headerAlign: "center",
    valueGetter: upString,
  },
  {
    field: "classRoll",
    headerName: "Class roll",
    width: 100,
    headerAlign: "center",
  },
  {
    field: "group",
    headerName: "Group",
    width: 130,
    headerAlign: "center",
    valueGetter: renderGroupText,
  },
  {
    field: "session",
    headerName: "Session",
    width: 130,
    headerAlign: "center",
  },
  {
    field: "readingYear",
    headerName: "Year",
    width: 130,
    headerAlign: "center",
    valueGetter: renderReadingYear,
  },
  {
    field: "mobile",
    headerName: "Mobile number",
    width: 120,
    headerAlign: "center",
  },
  {
    field: "address",
    headerName: "Address",
    width: 500,
    headerAlign: "center",
  },
];

const Students = () => {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [students, setStudents] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [selectionModel, setSelectionModel] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const disableActionButton = (selectionModel) => {
    if (selectionModel.length > 0 && selectionModel.length < 2) {
      return false;
    }
    return true;
  };

  const deleteStudent = async (id) => {
    try {
      await deleteDoc(doc(db, "students", id));
      setStatus("idle");
      setOpen(false);
    } catch (error) {
      setError(error);
    }
  };

  const loadContent = () => {
    if (error) {
      return (
        <Alert severity="error">
          Error occured. Error message: {error.message}
        </Alert>
      );
    } else if (students && students.length <= 0) {
      return (
        <Alert severity="info">There is no data in students collection.</Alert>
      );
    } else if (students) {
      return (
        <Box sx={{ height: "100%", maxWidth: "100%", width: "100%" }}>
          <DataGrid
            rows={students}
            columns={columns}
            loading={status === "loading"}
            checkboxSelection
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            onSelectionModelChange={(newSelectionModel) =>
              setSelectionModel(newSelectionModel)
            }
          />
          ;
        </Box>
      );
    }
  };
  useEffect(() => {
    async function loadData() {
      try {
        if (status === "idle") {
          const querySnapshot = await getDocs(collection(db, "students"));
          const students = [];
          querySnapshot.forEach((doc) =>
            students.push({ id: doc.id, ...doc.data() })
          );
          setStudents(students);
          setStatus("succeded");
        }
      } catch (error) {
        setError(error);
        setStudents(null);
        setStatus("failed");
      }
    }
    loadData();
  }, [status]);
  return (
    <Layout>
      <Container maxWidth="lg" sx={{ my: 3 }}>
        {/* Delete Alert */}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Be alert! Serious operation.
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you want to delete: [{selectionModel[0]}] ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button
              color="error"
              onClick={() => deleteStudent(selectionModel[0])}
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
        {/* End */}

        <Paper sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid item sm={12}>
              <ButtonGroup disabled={disableActionButton(selectionModel)}>
                <Button
                  color="error"
                  endIcon={<DeleteMenu />}
                  onClick={() => setOpen(true)}
                >
                  Delete
                </Button>
                <Button
                  endIcon={<EditIcon />}
                  onClick={() =>
                    navigate(
                      `/dashboard/edit-student-form/${selectionModel[0]}`
                    )
                  }
                >
                  Edit
                </Button>
                <Button>Details</Button>
              </ButtonGroup>
            </Grid>

            <Grid
              item
              sm={12}
              sx={{
                height: "500px",
                "& .app-header": { backgroundColor: "rgba(255, 7,0,0.55)" },
              }}
            >
              {loadContent()}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Layout>
  );
};

export default Students;
