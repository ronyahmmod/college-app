import React from "react";
import {
  Typography,
  Box,
  Divider,
  FormGroup,
  FormControlLabel,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Constrains } from "./Types";
import { useContext } from "react";
import ApplicationContext from "../../context/ApplicationContext";
const PartTwo = React.memo(() => {
  console.log("Part Two re render");
  // ONLY FOR TESTIN PERPOUSE
  const { state, dispatch } = useContext(ApplicationContext);

  const handleApplicationType = (event, newApplicationTypes) => {
    dispatch({
      type: "SET_APPLICATION_TYPES",
      payload: { applicationTypes: newApplicationTypes },
    });
  };

  const handlePassedChange = (event) => {
    dispatch({ type: "SET_PASSED", payload: { passed: event.target.checked } });
  };

  const handleReadingChange = (event) => {
    dispatch({
      type: "SET_ALLREADY_READING",
      payload: { reading: event.target.checked },
    });
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography>
        নিচের প্রশ্নগুলোর উত্তর শুধুমাত্র বর্তমান আবেদনের প্রেক্ষাপট অনুযায়ী
        দিতে হবে। যাতে আবেদনের ধরণ নির্বাচন করতে সুবিধা হয়।
      </Typography>
      <Divider />
      <FormGroup>
        <FormControlLabel
          control={
            <Switch checked={state.passed} onChange={handlePassedChange} />
          }
          label="আপনি কি ইতোমধ্যেই অত্র কলেজ হতে উত্তীর্ণ হয়েছেন?"
        />
      </FormGroup>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch checked={state.reading} onChange={handleReadingChange} />
          }
          label="আপনি কি অত্র কলেজে বর্তমানে অধ্যয়নরত আছেন?"
        />
      </FormGroup>
      <Divider />
      <Typography>
        আপনার উত্তরের উপর বিবেচনা করে আপনি নিচের এক অথবা একাধিক আবেদন করতে
        পারবেন।
      </Typography>
      <Divider />
      <ToggleButtonGroup
        onChange={handleApplicationType}
        value={state.applicationTypes}
      >
        <ToggleButton value={Constrains.applicationType.PROTTOION}>
          প্রত্যয়নপত্র
        </ToggleButton>
        <ToggleButton value={Constrains.applicationType.CERTIFICATE}>
          সনদপত্র
        </ToggleButton>
        <ToggleButton value={Constrains.applicationType.TESTIMONIAL}>
          প্রশংসাপত্র
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
});

export default PartTwo;
