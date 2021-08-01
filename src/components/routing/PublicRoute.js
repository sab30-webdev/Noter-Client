import React from "react";
import { Redirect, Route } from "react-router";

const PublicRoute = ({ children, ...props }) => {
  if (!localStorage.getItem("token")) {
    return <Route {...props}>{children}</Route>;
  }
  return <Redirect to="/app/notes" />;
};

export default PublicRoute;
