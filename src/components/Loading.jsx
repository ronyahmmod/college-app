import React from "react";
import Layout from "./Layout";
import { Backdrop, CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <Layout>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Layout>
  );
};

export default Loading;
