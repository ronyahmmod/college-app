import React from "react";
import {
  AppBar,
  Avatar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Button,
  Tooltip,
  Menu,
  MenuItem,
  Paper,
  MenuList,
  ListItemIcon,
} from "@mui/material";
import {
  AiOutlineSafetyCertificate,
  AiOutlineCode,
  AiOutlinePlusSquare,
  AiOutlineOrderedList,
  AiOutlineFileUnknown,
  AiOutlineClose,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import { Container } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoURL from "../assets/logos/college-logo.png";
import HoverableMenu from "./HoverableMenu";
import { useNavigate } from "react-router-dom";
import { selectLoggedInUser, selectUserRole } from "../feature/user/userSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import { getAuth } from "firebase/auth";
// import { useTheme } from "@mui/material/styles";

const services = [
  [
    "সকল শ্রেণির সনদপত্র/প্রশংসাপত্র",
    "/dashboard/newApplication",
    AiOutlineSafetyCertificate,
  ],
  [
    "প্রত্যয়ন পত্র অধ্যয়নরত শিক্ষার্থীদের জন্য",
    "/dashboard/prottoionforcurrent",
    AiOutlineCode,
  ],
  [
    "প্রত্যয়ন পত্র পাসকৃত শিক্ষার্থীদের জন্য",
    "/dashboard/prottoionforpassed",
    AiOutlineCode,
  ],
  [
    "প্রত্যয়ন পত্র সংশোধনের জন্য",
    "/dashboard/prottoionforcorrection",
    AiOutlineCode,
  ],
];

const Navbar = () => {
  const navigate = useNavigate();
  const loggedInUser = useSelector(selectLoggedInUser);
  const userRole = useSelector(selectUserRole);
  const auth = getAuth();
  //   const theme = useTheme();
  const [anchorElNav, setAnchorElNav] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(true);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(false);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar
            src={LogoURL}
            alt="College Logo"
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "roboto",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            JDC
          </Typography>
          {/* DISPLAY WHEN MOBILE VIEW */}
          <Box sx={{ display: { xs: "flex", md: "none" }, flexGrow: 1 }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            {/* TODO:IMPLEMENT MOBILE MENU BAR */}
            <Paper
              sx={{
                position: "fixed",
                top: 0,
                left: 0,
                bottom: 0,
                overflow: "auto",
                width: 360,
                display: anchorElNav ? "flex" : "none",
                zIndex: 1000,
                borderRadius: 0,
                p: 2,
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ width: "100%" }}>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <IconButton onClick={handleCloseNavMenu}>
                    <AiOutlineClose />
                  </IconButton>
                </Box>
                {userRole === "user" && (
                  <MenuList>
                    {services.map(([title, pageLocation, Icon]) => (
                      <MenuItem
                        key={title}
                        onClick={() => {
                          navigate(pageLocation);
                          handleCloseNavMenu();
                        }}
                      >
                        {Icon && (
                          <ListItemIcon>
                            <Icon className="w-6 h-6 text-teal-700" />
                          </ListItemIcon>
                        )}
                        <Typography sx={{ fontSize: 14 }}>{title}</Typography>
                      </MenuItem>
                    ))}
                  </MenuList>
                )}
                <MenuItem
                  onClick={() => {
                    navigate("/dashboard/applications");
                    handleCloseNavMenu();
                  }}
                >
                  <ListItemIcon>
                    <AiOutlineOrderedList className="w-6 h-6 text-teal-700" />
                  </ListItemIcon>
                  <Typography sx={{ fontSize: 14 }}>সকল আবেদনসমূহ</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/dashboard/users");
                    handleCloseNavMenu();
                  }}
                >
                  <ListItemIcon>
                    <AiOutlineUsergroupAdd className="w-6 h-6 text-teal-700" />
                  </ListItemIcon>
                  <Typography sx={{ fontSize: 14 }}>সকল ইউজার</Typography>
                </MenuItem>
              </Box>

              <Box>
                <Typography>
                  COPYRIGHT &copy; {new Date().getFullYear()} JIBANANAGAR DEGREE
                  COLLEGE. DEVELOPER: MD.RONY AHMMOD.
                </Typography>
              </Box>
            </Paper>
          </Box>

          <Avatar
            src={LogoURL}
            alt="College Logo"
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "roboto",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            JDC
          </Typography>
          {/* END: MOBILE VIEW */}

          {/* DESKTOP VIEW */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {/* TODO: IMPLEMENT DEXTOP HOVER MENU */}
            {userRole === "user" && (
              <HoverableMenu
                title="আবেদনের ধরন"
                menuItems={services}
                MenuIcon={AiOutlinePlusSquare}
              />
            )}

            <Button
              variant="standard"
              startIcon={<AiOutlineOrderedList className="w-6 h-6" />}
              onClick={() => navigate("/dashboard/applications")}
            >
              সকল আবেদনসমূহ
            </Button>
            {(userRole === "super" || userRole === "admin") && (
              <Button
                variant="standard"
                startIcon={<AiOutlineUsergroupAdd className="w-6 h-6" />}
                onClick={() => navigate("/dashboard/users")}
              >
                সকল ইউজার
              </Button>
            )}

            {userRole === "user" && (
              <Button
                variant="standard"
                startIcon={<AiOutlineFileUnknown className="w-6 h-6" />}
              >
                সাপোর্ট টিকেট
              </Button>
            )}
          </Box>
          {/* END DESKTOP VIEW */}

          {/* LOGGED IN USER */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
                <Avatar
                  alt={loggedInUser.displayName || "N"}
                  src={loggedInUser.photoURL || ""}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {[
                ["Profile", "/dashboard/details"],
                ["Account", "/dashboard/account"],
                ["Dashboard", "/dashboard"],
              ].map(([title, link]) => (
                <MenuItem
                  key={title}
                  onClick={() => {
                    handleCloseUserMenu();
                    navigate(link);
                  }}
                >
                  <Typography textAlign="center">{title}</Typography>
                </MenuItem>
              ))}
              <MenuItem
                onClick={() => {
                  auth.signOut();
                  navigate("/login");
                }}
              >
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
          {/* END LOGGED IN USER */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
