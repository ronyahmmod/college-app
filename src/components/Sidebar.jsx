import React from "react";
import AppConfig from "../app.config";
import { styled, alpha } from "@mui/material/styles";
import { Box, Badge, Avatar } from "@mui/material";
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

const MenuInnerItem = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create("backgroundColor"),
  transitionDuration: theme.transitions.duration.complex,
  position: "relative",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    // opacity: theme.palette.action.hoverOpacity,
    cursor: "pointer",
  },
}));

const MenuItem = ({
  isActive,
  Icon,
  singleButton,
  notifications,
  clickHandler,
}) => (
  <Box
    sx={{
      display: "flex",
      position: "relative",
      width: "100%",
      alignItems: "center",
    }}
    onClick={clickHandler ? (e) => clickHandler(e) : null}
  >
    {isActive && (
      <Box
        component="span"
        sx={{
          borderLeft: "6px solid #333",
          borderColor: "primary.main",
          borderRadius: 4,
          height: "30px",
          display: "block",
          position: "absolute",
          left: -17,
        }}
      />
    )}

    <MenuInnerItem
      sx={(theme) => {
        if (singleButton) {
          return {
            px: 1,
            py: 0.5,
            backgroundColor: theme.palette.action.hover,
            "&:hover": {
              backgroundColor: alpha(theme.palette.action.hover, 0.2),
            },
          };
        } else {
          return {
            px: 1,
            py: 0.5,
          };
        }
      }}
    >
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {notifications > 0 ? (
          <Badge badgeContent={notifications} color="primary">
            <Icon
              sx={{
                color: `${isActive ? "primary.main" : ""}`,
                height: 30,
                width: 30,
              }}
            />
          </Badge>
        ) : (
          <Icon
            sx={{
              color: `${isActive ? "primary.main" : ""}`,
              height: 30,
              width: 30,
            }}
          />
        )}
      </Box>
    </MenuInnerItem>
  </Box>
);

const Sidebar = () => {
  const loggedInUser = useSelector(selectLoggedInUser);
  const navigate = useNavigate();
  const logoutHandler = () => () => {
    const auth = getAuth();
    auth.signOut();
    navigate("/login");
  };
  return (
    <SidebarWrapper>
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
                src={loggedInUser.photoUrl}
                alt={loggedInUser.displayName}
              />
            </Box>
          )}

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* Menu */}
            <MenuItem isActive Icon={HomeIcon} />
            <MenuItem Icon={NotificationsIcon} notifications={4} />
            <MenuItem Icon={WhatsAppIcon} notifications={2} />
            <MenuItem Icon={ArticleIcon} />
            <MenuItem Icon={AttachMoneyIcon} />
            <MenuItem Icon={GroupIcon} />
            <MenuItem Icon={PatternIcon} />
            <MenuItem Icon={DarkModeIcon} />
            <MenuItem Icon={SettingsIcon} />
            <MenuItem Icon={LogoutIcon} clickHandler={logoutHandler()} />
          </Box>
        </Box>
      </Box>
    </SidebarWrapper>
  );
};

export default Sidebar;
