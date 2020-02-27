import React, { useEffect } from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import WithTransition from "./pages/WithTransition";
import WithRoute from "./pages/WithRoute";
import WithLoading from "./pages/WithLoading";
import WithBack from "./pages/WithBack";

const App: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="App">
        <Router>
          <Switch>
            <Route path="/with">
              <WithTransition />
            </Route>
            <Route path="/with-route">
              <WithRoute />
            </Route>
            <Route path="/with-loading">
              <WithLoading />
            </Route>
            <Route path="/with-back">
              <WithBack />
            </Route>
            <Route exact path="/">
              <Link to="/with">With transition</Link>
              <Link to="/with-route/0">With route</Link>
              <Link to="/with-loading/0">With loading</Link>
              <Link to="/with-back/">With back</Link>
            </Route>
          </Switch>
        </Router>
    </div>
  );
};

export default App;
