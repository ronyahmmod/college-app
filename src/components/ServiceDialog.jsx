import {
  Button,
  Container,
  Dialog,
  DialogTitle,
  Grid,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import React from "react";
import ApplicationDetails from "./ApplicationDetails";

const ServiceDialog = ({ id, handleClose, open, serviceName }) => {
  const renderingComponent = (serviceName, id) => {
    switch (serviceName) {
      case "details":
        return <ApplicationDetails id={id} />;

      default:
        return <Typography>Nothing Selected</Typography>;
    }
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="service-dialog"
      aria-describedby="service-dialog-description"
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle>Please take some attention before go.</DialogTitle>

      <Container maxWidth="lg" sx={{ mb: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 4,
                display: "flex",
                flexDirection: "column",
                height: "auto",
              }}
            >
              {renderingComponent(serviceName, id)}
            </Paper>
          </Grid>
          <Box sx={{ p: 3 }}>
            <Button variant="contained" color="primary" onClick={handleClose}>
              Close
            </Button>
          </Box>
        </Grid>
      </Container>
    </Dialog>
  );
};

export default ServiceDialog;
