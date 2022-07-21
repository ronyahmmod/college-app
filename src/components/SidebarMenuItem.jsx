import React from "react";
import { styled, alpha } from "@mui/material/styles";
import { Box, Badge } from "@mui/material";

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

const SidebarMenuItem = ({
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

export default SidebarMenuItem;
