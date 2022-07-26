import React from "react";
import { Link, Typography, Box } from "@mui/material";
import { format } from "date-fns";

const parsingTodaysCredit = (applications) => {
  // extracting applications amount and to an array
  const filteredApprovedApplications = applications.filter(
    (app) => app.status === "Done"
  );
  const payments = filteredApprovedApplications.map((app) => {
    if (app.applicationType === "prottoion") return 100;
    else if (app.applicationType === "certificate") return 200;
    else if (app.applicationType === "testimonial") return 200;
    return 0;
  });
  if (payments) {
    return payments.reduce((prev, next) => prev + next, 0);
  } else {
    return 0;
  }
};

const Credit = ({ applications }) => {
  let credit = 0;
  if (applications) {
    credit = parsingTodaysCredit(applications);
    return (
      <>
        <Typography variant="h6" color="primary">
          Todays Credit
        </Typography>
        <Typography component="p" variant="h4">
          <strong>{credit}</strong> BDT
        </Typography>
        <Typography color="text.secondary" sx={{ flex: 1 }}>
          {format(new Date(), "PP")}
        </Typography>
        <Box>
          <Link
            color="primary"
            href="#"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            View balance
          </Link>
        </Box>
      </>
    );
  }
};

export default Credit;
