import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser, deleteUser } from "./userSlice";
import {
  AiOutlineFolderOpen,
  AiOutlineDelete,
  AiOutlineArrowDown,
} from "react-icons/ai";

const UserActionMenu = ({ actions, actionHandler }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        color="secondary"
        endIcon={<AiOutlineArrowDown />}
      >
        User Role
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {actions.map((action, index) => (
          <MenuItem
            onClick={() => {
              actionHandler(action, dispatch);
              handleClose();
            }}
            key={index}
          >
            {action}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

// DEFINING COLUMNS
const defineColumns = (dispatch) => [
  {
    field: "id",
    headerName: "ID",
    width: 300,
    renderCell: (params) => <strong>{params.value}</strong>,
    hideable: false,
  },
  {
    field: "displayName",
    headerName: "Name",
    width: 250,
    cellClassName: "uppercase",
    valueFormatter: (params) => params.value || "Unknown",
  },
  {
    field: "email",
    headerName: "Email",
    width: 250,
  },
  {
    field: "role",
    headerName: "Role",
    width: 100,
    renderCell: (params) => (
      <strong
        className={`bg-sky-600 p-2 w-full h-full flex justify-center items-center rounded-sm ${
          params.value === "user"
            ? "text-slate-50 bg-teal-600"
            : "text-slate-50"
        } uppercase`}
      >
        {params.value}
      </strong>
    ),
  },
  {
    headerName: "Actions",
    field: "uid",
    width: 300,
    renderCell: (params) => (
      <Box sx={{ display: "flex" }}>
        <IconButton color="primary" onClick={() => alert(params.row.id)}>
          <AiOutlineFolderOpen />
        </IconButton>
        <IconButton
          color="error"
          onClick={() => {
            dispatch(deleteUser({ id: params.row.id }));
          }}
        >
          <AiOutlineDelete />
        </IconButton>
        <UserActionMenu
          actions={["User", "Admin", "Super"]}
          actionHandler={(action, dispatch) => {
            const id = params.row.id;
            dispatch(
              updateUser({
                uid: id,
                fieldName: "role",
                fieldValue: action.toLowerCase(),
              })
            );
          }}
        />
      </Box>
    ),
  },
];

const CustomUsers = ({ users, loadingStatus }) => {
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  //   console.log(users);

  return (
    <Container maxWidth="lg" sx={{ mb: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper sx={{ overflow: "auto" }}>
            <Box sx={{ height: 500, width: 2000 }}>
              <DataGrid
                rows={users}
                columns={defineColumns(dispatch)}
                components={{ Toolbar: GridToolbar }}
                checkboxSelection={true}
                page={page}
                onPageChange={(newPage) => setPage(newPage)}
                pageSize={10}
                rowsPerPageOptions={[5, 10, 25]}
                pagination
                loading={loadingStatus === "pending"}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CustomUsers;
