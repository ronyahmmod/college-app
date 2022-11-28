import React from "react";

import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Backdrop, CircularProgress } from "@mui/material";
import Title from "./Title";

import { format } from "date-fns";

import { useNavigate } from "react-router-dom";
import { renderApplicationType, up } from "../helper/render.helper";

export default function RecentApplications({ applications }) {
  const navigate = useNavigate();
  function preventDefault(event) {
    event.preventDefault();
    navigate("applications");
  }
  if (applications) {
    let rows = applications;
    if (applications.length >= 4) {
      rows = applications.slice(0, 3);
    }
    return (
      <React.Fragment>
        <Title>Recent Applications</Title>
        <Table size="small" sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Service Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Charge</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  {format(
                    new Date(
                      row.date.split(",")[0].split("/").reverse().join("-")
                    ),
                    "dd-MM-yyyy"
                  )}
                </TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  {renderApplicationType(row.applicationType)}
                </TableCell>
                <TableCell>{up(row.status)}</TableCell>
                <TableCell align="right">{row.fee || "OLD APP"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
          See more applications
        </Link>
      </React.Fragment>
    );
  } else {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
}
