import React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";

const Title = ({ children, ...otherProps }) => {
  return (
    <Typography
      component="h2"
      variant="h6"
      color="primary"
      gutterBottom
      {...otherProps}
    >
      {children}
    </Typography>
  );
};

Title.propTypes = {
  children: PropTypes.node,
};

export default Title;
