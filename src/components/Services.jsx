import React from "react";
import { Grid, Paper } from "@mui/material";
import CustomButton from "./CustomButton";
import Title from "./Title";

const Services = ({ services, title }) => {
  return (
    <Grid item sm={12}>
      <Title>{title}</Title>
      <Paper
        sx={{
          p: 2,
          my: 2,
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          alignContent: "stretch",
          justifyContent: "space-arround",
        }}
      >
        {services.map((service) => (
          <CustomButton
            key={service.id}
            title={service.title}
            Icon={service.icon}
            path={service.path}
            color="#ddd"
            backgroundColor="teal"
            tag={service.tag}
          />
        ))}
      </Paper>
    </Grid>
  );
};

export default Services;
