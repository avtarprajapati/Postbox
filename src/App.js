import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import "./SCSS/main.scss";

import { Home, Login, Register, Explore, Profile } from "./pages";
import history from "./routes/history";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/explore" component={Explore} />
          <PrivateRoute exact path="/profile" component={Profile} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
