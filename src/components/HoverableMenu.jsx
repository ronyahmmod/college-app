import React from "react";
import {
  Box,
  Button,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

const HoverableMenu = ({ title, menuItems, MenuIcon }) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        "&:hover > #service-menu": {
          display: "flex",
        },
      }}
    >
      <Button
        variant="standard"
        size="large"
        startIcon={<MenuIcon className="w-6 h-6 text-slate-50" />}
      >
        {title}
      </Button>
      <Paper
        sx={{
          width: "auto",
          position: "absolute",
          top: 30,

          display: "none",
        }}
        component="div"
        id="service-menu"
      >
        <MenuList>
          {menuItems.map(([title, pageLocation, Icon]) => (
            <MenuItem key={title} onClick={() => navigate(pageLocation)}>
              {Icon && (
                <ListItemIcon>
                  <Icon className="w-6 h-6 text-teal-700" />
                </ListItemIcon>
              )}
              <ListItemText>{title}</ListItemText>
            </MenuItem>
          ))}
        </MenuList>
      </Paper>
    </Box>
  );
};

export default HoverableMenu;
