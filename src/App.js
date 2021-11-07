import React, { useState } from "react";
import Notes from "./components/Notes/Notes";
import Note from "./components/Note/Note";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PageNotFound from "./components/NotFound/Notfound";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import PrivateRoute from "./components/routing/PrivateRoute";
import PublicRoute from "./components/routing/PublicRoute";
import { ThemeProvider, CSSReset, Text, theme } from "@chakra-ui/core";
import { GrNotes } from "react-icons/gr";
import { setAuthToken } from "./utils/setAuthToken";

export const UserContext = React.createContext();

const App = () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const [username, setUsername] = useState(null);

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Link to="/app/notes">
          <Text fontSize="5xl" color="White" margin="5">
            <GrNotes className="brand-logo" /> Noter
          </Text>
        </Link>
        <Switch>
          <Redirect exact from="/" to="/app/auth" />
          <PublicRoute exact path="/app">
            <Register />
          </PublicRoute>
          <PublicRoute exact path="/app/auth">
            <Login />
          </PublicRoute>
          <PrivateRoute exact path="/app/notes">
            <Notes />
          </PrivateRoute>
          <PrivateRoute exact path="/app/notes/:id">
            <Note />
          </PrivateRoute>
          <Route path="*" component={PageNotFound} />
        </Switch>
      </ThemeProvider>
    </UserContext.Provider>
  );
};

export default App;
