import React, { useEffect } from "react";

import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { useSelector } from "react-redux";
import {
  fetchApplications,
  // selectTodaysApplications,
  selectTodaysApplicationsByUserId,
} from "../feature/application/applicationSlice";
import { useDispatch } from "react-redux";
import { format } from "date-fns";
import { selectLoggedInUser } from "../feature/user/userSlice";

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
  const loggedInUser = useSelector(selectLoggedInUser);
  const todaysApplications = useSelector(
    selectTodaysApplicationsByUserId(loggedInUser && loggedInUser.id)
  );
  console.log(todaysApplications);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchApplications());
  }, []);
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
          {todaysApplications
            ? todaysApplications.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    {format(new Date(row.date), "yyyy-MM-dd")}
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.applicationType}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell align="right">200</TableCell>
                </TableRow>
              ))
            : "You have no application today"}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more applications
      </Link>
    </React.Fragment>
  );
}
