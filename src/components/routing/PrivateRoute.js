import React from "react";
import { Redirect, Route } from "react-router";

const PrivateRoute = ({ children, ...props }) => {
  if (localStorage.getItem("token")) {
    return <Route {...props}>{children}</Route>;
  }
  return <Redirect to="/app/auth" />;
};

export default PrivateRoute;
