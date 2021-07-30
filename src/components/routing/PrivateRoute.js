import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...props }) => {
  return (
    <Route
      {...props}
      render={(props) =>
        localStorage.token ? <Component {...props} /> : <Redirect to="/app/auth" />
      }
    />
  );
};

export default PrivateRoute;
