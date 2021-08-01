// import React from "react";
// import { Route, Redirect } from "react-router-dom";
// import { BackendUrl } from "../../BackendUrl";

// const PrivateRoute = ({ component: Component, ...props }) => {
//   return (
//     <Route
//       {...props}
//       render={(props) =>
//         localStorage.token ? (
//           <Component {...props} />
//         ) : (
//           <Redirect to={`${BackendUrl}/app/notes`} />
//         )
//       }
//     />
//   );
// };

// export default PrivateRoute;

import React from "react";
import { Redirect, Route } from "react-router";

const PrivateRoute = ({ children, ...props }) => {
  if (localStorage.getItem("token")) {
    return <Route {...props}>{children}</Route>;
  }
  return <Redirect to="/app/auth" />;
};

export default PrivateRoute;
