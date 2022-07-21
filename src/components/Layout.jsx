import React from "react";
import { styled } from "@mui/material/styles";
import AppConfig from "../app.config";

const LayoutWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  left: AppConfig.panelWidth,
  width: `calc(100% - ${AppConfig.panelWidth})`,
  maxWidth: `calc(100% - ${AppConfig.panelWidth})`,
}));

const Layout = ({ children }) => {
  return <LayoutWrapper>{children}</LayoutWrapper>;
};

export default Layout;
