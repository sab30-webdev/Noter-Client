import React from "react";
import Notes from "./components/Notes";
import Note from "./components/Note";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PageNotFound from "./components/NotFound/Notfound"
import { Route, Switch,Redirect,Link } from "react-router-dom";
import PrivateRoute from "./components/routing/PrivateRoute";
import { ThemeProvider, CSSReset, Text, theme } from "@chakra-ui/core";
import { GrNotes } from "react-icons/gr";

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Link to="/app/notes">
      <Text fontSize="5xl" color="White" margin="5">
          <GrNotes className="brand-logo" /> Noter
      </Text>
      </Link>
      <Switch>
        <Redirect exact from="/" to="/app/auth" />
        <Route exact path="/app" render={(props) => <Register {...props} />} />
        <Route exact path="/app/auth" render={(props) => <Login {...props} />} />
        <PrivateRoute exact path="/app/notes" component={Notes} />
        <PrivateRoute exact path="/app/notes/:id" component={Note} />
        <Route path="*" component={PageNotFound} />
      </Switch>
    </ThemeProvider>
  );
};

export default App;
