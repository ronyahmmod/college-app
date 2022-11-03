import React from "react";
import { Alert, Paper } from "@mui/material";
import { userServices } from "./userServices";
import Services from "./Services";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../feature/user/userSlice";

const FallbackUI = ({ error, errorInfo }) => {
  const loggedInUser = useSelector(selectLoggedInUser);
  if (loggedInUser.role === "user") {
    return (
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
        {error && <Alert severity="error">{error.toString()}</Alert>}
        <Alert severity="info">{errorInfo.componentStack}</Alert>
        <Services
          services={userServices}
          title="Error occured but I am smart! 😊"
        />
      </Paper>
    );
  } else {
    return <Alert severity="error">{error && error.toString()}</Alert>;
  }
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    console.log(error);
    console.log(errorInfo);
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <FallbackUI error={this.state.error} errorInfo={this.state.errorInfo} />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
