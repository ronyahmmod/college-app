import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const CustomButton = ({
  color,
  backgroundColor,
  title,
  description,
  Icon,
  path,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Paper
      sx={{
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 2,
        p: 2,
        flexGrow: 1,
        transition: theme.transitions.create("all", {
          duration: "250ms",
        }),
        "&:hover": {
          backgroundColor: backgroundColor,
          color: color,
        },
      }}
      onClick={() => navigate(path)}
    >
      <Box>
        <Icon
          sx={{ height: "200px", width: "200px", "&:hover": { color: color } }}
        />
      </Box>
      <Box>
        <Typography variant="h5">{title}</Typography>
        <Typography>{description}</Typography>
      </Box>
    </Paper>
  );
};

export default CustomButton;
