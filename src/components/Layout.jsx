import React from "react";
import { styled } from "@mui/material/styles";
import AppConfig from "../app.config";

const LayoutWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  left: AppConfig.panelWidth,
}));

const Layout = ({ children }) => {
  return <LayoutWrapper>{children}</LayoutWrapper>;
};

export default Layout;
