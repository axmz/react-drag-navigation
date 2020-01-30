import React from "react";
import "./App.css";
import Cards from "./components/Cards/Cards";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Card from "./components/Card/Card";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/:id">
            <Card />
          </Route>
          <Route path="/">
            <Cards />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
