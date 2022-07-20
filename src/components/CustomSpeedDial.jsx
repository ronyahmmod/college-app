import React from "react";
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const CustomSpeedDial = () => {
  return (
    <SpeedDial
      ariaLabel="Application Spped Dial"
      sx={{ position: "absolute", bottom: 16, right: 16 }}
      icon={<SpeedDialIcon />}
    >
      <SpeedDialAction
        icon={<AddIcon />}
        tooltipTitle="Create a application"
        onClick={() => {
          alert("Implement Latter");
        }}
      />
    </SpeedDial>
  );
};

export default CustomSpeedDial;
