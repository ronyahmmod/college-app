import React from "react";
import { Constrains } from "../pages/NewApplicationForm/Types";
const ApplicationContext = React.createContext({
  passed: false,
  applicationType: Constrains.applicationType.CERTIFICATE,
});

export default ApplicationContext;
