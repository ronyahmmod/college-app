import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCertType } from "../feature/ui/uiSlice";

const navigateTo = (path, tag, dispatch, navigate) => {
  if (tag === 0) {
    dispatch(setCertType({ certType: 0 }));
  } else if (tag === 1) {
    dispatch(setCertType({ certType: 1 }));
  } else if (tag === 2) {
    dispatch(setCertType({ certType: 2 }));
  }
  navigate(path);
};

const CustomButton = ({ color, backgroundColor, title, Icon, path, tag }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Paper
      sx={{
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        width: 300,
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
      onClick={() => navigateTo(path, tag, dispatch, navigate)}
    >
      <Box>
        <Icon sx={{ "&:hover": { color: color } }} />
      </Box>
      <Box>
        <Typography variant="body">{title}</Typography>
      </Box>
    </Paper>
  );
};

export default CustomButton;
