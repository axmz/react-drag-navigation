import React from "react";
import { Switch, Route } from "react-router-dom";
import Test from "./Test/Test";

const WithoutTransition = () => {
  return (
    <Switch>
      <Route path="/">
        <Test />
      </Route>
     </Switch>
  );
};

export default WithoutTransition;
