import React from "react";
import {
  Container,
  Stepper,
  Step,
  StepButton,
  Box,
  Paper,
  Button,
} from "@mui/material";

const DesktopView = React.memo(
  ({ steps, activeStep, maxSteps, handleNext, handleBack, handleStep }) => {
    return (
      <Container
        maxWidth="xl"
        sx={{ my: 2, display: { xs: "none", md: "block" } }}
      >
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((step, index) => (
            <Step key={step.label} onClick={handleStep(index)}>
              <StepButton color="inherit">{step.label}</StepButton>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ flexGrow: 1 }}>
          <Paper
            square
            sx={{ minHeight: 255, width: "100%", my: 2, p: 4 }}
            elevation={0}
          >
            {/* Component Goes Here */}
            {steps[activeStep].component}
          </Paper>
        </Box>
        <Paper
          square
          sx={{
            width: "100%",
            my: 2,
            p: 1,
            display: "flex",
            justifyContent: "space-around",
          }}
          elevation={0}
        >
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          <Button disabled={activeStep === maxSteps - 1} onClick={handleNext}>
            Next
          </Button>
        </Paper>
      </Container>
    );
  }
);

export default DesktopView;
