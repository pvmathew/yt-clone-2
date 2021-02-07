import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "./AppContext";
// import Routes from "./Routes";

import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Upload from "./components/Upload";
import Results from "./components/Results";
import Video from "./components/Video";

import "semantic-ui-less/semantic.less";
import Page from "./components/Page";

export const Routes = () => (
  <>
    <Switch>
      <Route
        exact
        path="/login"
        title="Login"
        render={(props) => (
          <Page title="Login">
            <Login />
          </Page>
        )}
      />
      <Route
        exact
        path={["/", "/home"]}
        render={(props) => (
          <Page title="Home">
            <Home />
          </Page>
        )}
      />
      {/* <Route exact path="/register" component={Register} /> */}
      {/* <Route exact path={["/", "/home"]} component={Home} /> */}
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/upload" component={Upload} />
      <Route exact path="/results" component={Results} />
      <Route exact path="/video/:id" component={Video} />
    </Switch>
  </>
);

const App = () => (
  <Provider>
    <Router>
      <Routes />
    </Router>
  </Provider>
);

export default App;
