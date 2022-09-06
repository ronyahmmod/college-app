import React from "react";
import {
  Container,
  Box,
  Paper,
  Typography,
  MobileStepper,
  Button,
} from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useTheme } from "@mui/material/styles";

const MobileView = React.memo(
  ({ steps, activeStep, maxSteps, handleNext, handleBack }) => {
    const theme = useTheme();
    return (
      <Container
        maxWidth="xl"
        sx={{ my: 2, display: { xs: "flex", md: "none" } }}
      >
        <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
          <Paper
            square
            elevation={0}
            sx={{
              display: "flex",
              alignItems: "center",
              height: 50,
              pl: 2,
              bgcolor: "background.default",
            }}
          >
            <Typography>{steps[activeStep].label}</Typography>
          </Paper>
          <Paper
            square
            sx={{ minHeight: 255, maxWidth: 400, width: "100%", my: 2, p: 1 }}
            elevation={0}
          >
            {/* Component Goes Here */}
            {steps[activeStep].component}
          </Paper>
          <MobileStepper
            variant="text"
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                Next
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
        </Box>
      </Container>
    );
  }
);

export default MobileView;
