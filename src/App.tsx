import React, { useEffect } from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import WithTransition from "./pages/WithTransition";
import WithoutTransition from "./pages/WithoutTransition";

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
              <WithoutTransition />
            </Route>
            <Route exact path="/">
              <Link to="/with">With Transition</Link>
              <Link to="/without">Without Transition</Link>
            </Route>
          </Switch>
        </Router>
    </div>
  );
};

export default App;
