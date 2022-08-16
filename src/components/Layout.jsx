import React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppConfig from "../app.config";
import { green, grey, red } from "@mui/material/colors";
import { Link, Typography } from "@mui/material";

const LayoutWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  top: AppConfig.navbarHeight,
  width: "100%",
  maxWidth: "100%",
}));

const Copyright = styled("div")(({ theme }) => ({
  backgroundColor: alpha(green[700], 0.9),
  color: grey[100],
  padding: theme.spacing(2),
  // position: "fixed",
  // left: 0,
  // bottom: 0,
  // right: 0,
}));

const Layout = ({ children, print }) => {
  return (
    <LayoutWrapper sx={{ top: print ? 0 : AppConfig.navbarWidth }}>
      {children}
      <Copyright sx={{ displayPrint: "none" }}>
        <Typography textAlign="center" variant="body1">
          &copy; Jibannagar Degree College. This app designed and maintained by
          <Link
            sx={{
              ml: 0.4,
              color: red[100],
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
