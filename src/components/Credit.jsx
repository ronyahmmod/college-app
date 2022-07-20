import { Link, Typography, Box } from "@mui/material";
import React from "react";

const Credit = () => {
  return (
    <>
      <Typography variant="h6" color="primary">
        Todays Credit
      </Typography>
      <Typography component="p" variant="h4">
        3,024.00 BDT
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 19 Jul, 2022
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
};

export default Credit;
