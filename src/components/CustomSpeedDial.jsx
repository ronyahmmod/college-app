import React from "react";
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { useNavigate } from "react-router-dom";
const CustomSpeedDial = () => {
  const navigate = useNavigate();
  return (
    <SpeedDial
      ariaLabel="Application Spped Dial"
      sx={{ position: "fixed", bottom: 16, right: 16 }}
      icon={<SpeedDialIcon />}
    >
      <SpeedDialAction
        icon={<AddIcon />}
        tooltipTitle="Create a application for testimonial or certificate"
        onClick={() => {
          navigate("newapplication");
        }}
      />
      <SpeedDialAction
        icon={<PostAddIcon />}
        tooltipTitle="Create a application for prottoion sonod"
        onClick={() => {
          navigate("prottoions");
        }}
      />
    </SpeedDial>
  );
};

export default CustomSpeedDial;
