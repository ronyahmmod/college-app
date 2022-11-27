import { Alert } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";

const TimeoutAlert = ({ children, ms, ...otherProps }) => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timerId = setTimeout(() => {
      setShow(false);
    }, ms);
    return () => {
      clearTimeout(timerId);
    };
  });
  return <>{show && <Alert {...otherProps}>{children}</Alert>}</>;
};

export default TimeoutAlert;
