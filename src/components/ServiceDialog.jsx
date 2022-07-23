import {
  Container,
  Dialog,
  Grid,
  Paper,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import React from "react";
import ApplicationDetails from "./ApplicationDetails";
import CloseIcon from "@mui/icons-material/Close";

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 3,
        }}
      >
        <Typography variant="h5" color="error">
          Please pay some attention before go. Action can not reversabl.
        </Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>

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
        </Grid>
      </Container>
    </Dialog>
  );
};

export default ServiceDialog;
