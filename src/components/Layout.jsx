import React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppConfig from "../app.config";
import { green, grey } from "@mui/material/colors";
import { Link, Typography } from "@mui/material";

const LayoutWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  left: AppConfig.panelWidth,
  width: `calc(100% - ${AppConfig.panelWidth})`,
  maxWidth: `calc(100% - ${AppConfig.panelWidth})`,
}));

const Copyright = styled("div")(({ theme }) => ({
  backgroundColor: alpha(green[700], 0.9),
  color: grey[100],
  padding: theme.spacing(2),
}));

const Layout = ({ children, print }) => {
  return (
    <LayoutWrapper sx={{ left: print ? 0 : AppConfig.panelWidth }}>
      {children}
      <Copyright sx={{ displayPrint: "none" }}>
        <Typography textAlign="center" variant="body1">
          &copy; Jibannagar Degree College. This app designed and maintained by
          <Link
            sx={{
              ml: 0.4,
              "&:hover": {
                color: grey[200],
              },
            }}
            href="https://www.ronyahmmod.com"
          >
            MD. RONY AHMMOD.
          </Link>
        </Typography>
      </Copyright>
    </LayoutWrapper>
  );
};

export default Layout;
