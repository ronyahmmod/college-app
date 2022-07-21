import React from "react";

import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";

// Generate Order Data
function createData(id, date, name, serviceName, paymentStatus, charge) {
  return { id, date, name, serviceName, paymentStatus, charge };
}

const rows = [
  createData(
    0,
    "16 Mar, 2019",
    "Md. Rokibul Islam",
    "Testimonial",
    "Not Paid",
    200.0
  ),
  createData(1, "16 Mar, 2019", "Noyon Sheikh", "Prottoion", "Not Paid", 100.0),
  createData(2, "16 Mar, 2019", "Tom Scholz", "Testimonial", "Not Paid", 200.0),
  createData(
    3,
    "16 Mar, 2019",
    "Michael Jackson",
    "Prottoion",
    "Not Pain",
    100.0
  ),
  createData(
    4,
    "15 Mar, 2019",
    "Bruce Springsteen",
    "Testimonial",
    "Not Paid",
    200.0
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function RecentApplications() {
  return (
    <React.Fragment>
      <Title>Recent Applications</Title>
      <Table size="small" sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Service Name</TableCell>
            <TableCell>Payment Status</TableCell>
            <TableCell align="right">Charge</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.serviceName}</TableCell>
              <TableCell>{row.paymentStatus}</TableCell>
              <TableCell align="right">{`$${row.charge}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more applications
      </Link>
    </React.Fragment>
  );
}
