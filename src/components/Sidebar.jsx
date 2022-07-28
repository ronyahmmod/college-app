import React, { useState } from "react";
import AppConfig from "../app.config";
import { styled } from "@mui/material/styles";
import { Box, Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ArticleIcon from "@mui/icons-material/Article";
import GroupIcon from "@mui/icons-material/Group";
import PatternIcon from "@mui/icons-material/Pattern";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { selectLoggedInUser } from "../feature/user/userSlice";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import SidebarMenuItem from "./SidebarMenuItem";

// Sidebar Wraper
const SidebarWrapper = styled("div")(({ theme }) => ({
  position: "fixed",
  bottom: 0,
  top: 0,
  backgroundColor: theme.palette.background.paper,
  width: AppConfig.panelWidth,
  borderRight: `1px solid ${theme.palette.grey[100]}`,
  display: "flex",
  zIndex: 3,
}));

const Sidebar = () => {
  const loggedInUser = useSelector(selectLoggedInUser);
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("home");

  const logoutHandler = () => () => {
    const auth = getAuth();
    auth.signOut().then(() => {
      navigate("/login");
    });
  };

  const openApplicationsHandler = () => () => {
    navigate("applications");
    setActiveMenu("applications");
  };
  return (
    <SidebarWrapper sx={{ displayPrint: "none" }}>
      <Box
        sx={{
          display: "flex",
          maxWidth: "100%",
          flexDirection: "column",
          boxSizing: "border-box",
          pt: 2,
          flexShrink: 0,
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box
          sx={{
            minHeight: 0,
            display: "flex",
            flexGrow: 1,
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          {loggedInUser && (
            <Box sx={{ mb: 2, cursor: "pointer" }}>
              {/* Profile */}

              <Avatar
                src={loggedInUser.photoURL}
                alt={loggedInUser.displayName}
                onClick={() => navigate("/dashboard/details")}
              />
            </Box>
          )}

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* Menu */}
            <SidebarMenuItem
              isActive={activeMenu === "home"}
              Icon={HomeIcon}
              clickHandler={() => {
                navigate("/dashboard/");
                setActiveMenu("home");
              }}
            />
            {loggedInUser && loggedInUser.role !== "user" && (
              <>
                <SidebarMenuItem Icon={NotificationsIcon} />
                <SidebarMenuItem Icon={WhatsAppIcon} />
                <SidebarMenuItem Icon={AttachMoneyIcon} />
                <SidebarMenuItem
                  Icon={GroupIcon}
                  isActive={activeMenu === "users"}
                  clickHandler={() => {
                    navigate("/dashboard/users");
                    setActiveMenu("users");
                  }}
                />
                <SidebarMenuItem Icon={PatternIcon} />
              </>
            )}

            <SidebarMenuItem
              Icon={ArticleIcon}
              clickHandler={openApplicationsHandler()}
              isActive={Boolean(activeMenu === "applications")}
            />
            <SidebarMenuItem Icon={DarkModeIcon} />
            <SidebarMenuItem Icon={SettingsIcon} />
            <SidebarMenuItem Icon={LogoutIcon} clickHandler={logoutHandler()} />
          </Box>
        </Box>
      </Box>
    </SidebarWrapper>
  );
};

export default Sidebar;
