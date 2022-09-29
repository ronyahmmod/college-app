import {
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Box,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import Title from "../components/Title";
import {
  selectLoggedInUser,
  selectUserUpdateStatus,
  updateUser,
} from "../feature/user/userSlice";

export const EditableTextField = ({
  fieldName,
  initialValue,
  uid,
  activeField,
  handleActiveFieldChange,
  ...otherProps
}) => {
  const [value, setValue] = useState(initialValue);
  const dispatch = useDispatch();
  const [toggleEdit, setToggleEdit] = useState(false);
  const updateStatus = useSelector(selectUserUpdateStatus);
  const handleChange = (event) => setValue(event.target.value);
  if (activeField === fieldName && updateStatus === "loading") {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  } else if (updateStatus === "rejected") {
    return (
      <Box>
        <Alert severity="error">Error occured.</Alert>
      </Box>
    );
  }
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {toggleEdit ? (
        <>
          <TextField
            size="small"
            name={fieldName}
            value={value}
            onChange={handleChange}
            {...otherProps}
          />
          <Button
            size="small"
            onClick={() => {
              dispatch(
                updateUser({
                  uid: uid,
                  fieldName: fieldName,
                  fieldValue: value,
                })
              );
              setToggleEdit(false);
            }}
          >
            Change
          </Button>
        </>
      ) : (
        <>
          <strong>{value}</strong>
          <Button
            onClick={() => {
              setToggleEdit(true);
              handleActiveFieldChange(fieldName);
            }}
          >
            Edit
          </Button>
        </>
      )}
    </Box>
  );
};

export const EditableUploadField = ({ multiple, initialValue }) => {
  // const [files, setFiles] = useState(multiple ? [] : initialValue);
  return (
    <Box>
      {/* MAIN WRAPPER */}
      <Box>
        <Button variant="contained" component="label">
          Upload
          <input
            hidden
            accept="image/*"
            multiple={multiple ? true : false}
            type="file"
          />
        </Button>
      </Box>
    </Box>
  );
};

const UpdateMe = () => {
  const loggedInUser = useSelector(selectLoggedInUser);
  const [activeField, setActiveField] = useState("");
  const handleActiveFieldChange = (fieldName) => setActiveField(fieldName);
  console.log(loggedInUser);
  return (
    <Layout>
      <Container maxWidth="lg" sx={{ my: 1 }}>
        <Grid container>
          <Grid item sm={12}>
            <Paper sx={{ p: 2 }}>
              <Title>Update your information</Title>
              <Divider />
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ width: 200 }}>
                      <strong>Name</strong>
                    </TableCell>
                    <TableCell>
                      <EditableTextField
                        fieldName="displayName"
                        initialValue={loggedInUser.displayName}
                        uid={loggedInUser.id}
                        activeField={activeField}
                        handleActiveFieldChange={handleActiveFieldChange}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ width: 200 }}>
                      <strong>Mobile Number</strong>
                    </TableCell>
                    <TableCell>
                      <EditableTextField
                        fieldName="phoneNumber"
                        activeField={activeField}
                        handleActiveFieldChange={handleActiveFieldChange}
                        initialValue={
                          loggedInUser.phoneNumber || "Not assigned"
                        }
                        uid={loggedInUser.id}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ width: 200 }}>
                      <strong>Address</strong>
                    </TableCell>
                    <TableCell>
                      <EditableTextField
                        fieldName="address"
                        activeField={activeField}
                        handleActiveFieldChange={handleActiveFieldChange}
                        initialValue={loggedInUser.address || "Not assigned"}
                        uid={loggedInUser.id}
                        fullWidth
                        multiline
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ width: 200 }}>
                      <strong>Photo</strong>
                    </TableCell>
                    <TableCell>
                      <EditableUploadField
                        initialValue={loggedInUser.photoUrl}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default UpdateMe;
