import React, { useEffect } from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import WithTransition from "./pages/WithTransition";
import WithRoute from "./pages/WithRoute";
import WithLoading from "./pages/WithLoading";

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
            <Route path="/without">
              <WithRoute />
            </Route>
            <Route path="/with-loading">
              <WithLoading />
            </Route>
            <Route path="/with-back">
              <WithLoading />
            </Route>
            <Route exact path="/">
              <Link to="/with">With transition</Link>
              <Link to="/without/0">With route</Link>
              <Link to="/with-loading/0">With loading</Link>
              <Link to="/with-back/">With back</Link>
            </Route>
          </Switch>
        </Router>
    </div>
  );
};

export default App;
