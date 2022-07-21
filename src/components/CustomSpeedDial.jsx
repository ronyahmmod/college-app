import React from "react";
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
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
        tooltipTitle="Create a application"
        onClick={() => {
          navigate("newapplication");
        }}
      />
    </SpeedDial>
  );
};

export default CustomSpeedDial;
