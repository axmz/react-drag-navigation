import React from "react";
import { Switch, Route } from "react-router-dom";
import Test from "./Test/Test";

const WithoutTransition = () => {
  return (
    <div className="App__container">
    <Switch>
      <Route  path="/">
        <Test />
      </Route>
     </Switch>
     </div>
  );
};

export default WithoutTransition;
