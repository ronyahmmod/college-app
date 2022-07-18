import React from "react";
import { Box, Typography } from "@mui/material";
import { ReactComponent as PlugLogo } from "../assets/logos/plug-circle-minus-solid.svg";

const PageNotFound = () => (
  <Box
    sx={{
      margin: "0 auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <Box
      sx={(theme) => ({
        backgroundColor: theme.palette.background.paper,
        height: "auto",
        minWidth: 360,
        display: "flex",
        flexDirection: "column",
        minHeight: 400,
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        borderRadius: 2,
        svg: {
          height: 100,
          fill: theme.palette.error.dark,
        },
      })}
    >
      <PlugLogo />
      <Typography
        variant="h5"
        sx={(theme) => ({
          textAlign: "center",
          color: theme.palette.grey[400],
          my: 2,
        })}
      >
        404 Page not found 😢
      </Typography>
    </Box>
  </Box>
);

export default PageNotFound;
