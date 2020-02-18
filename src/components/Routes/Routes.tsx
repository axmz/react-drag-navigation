import React from "react";
import Cards from "../Cards/Cards";
import { Route } from "react-router-dom";
import Card from "../Card/Card";
import AnimationWrapper from "../AnimationWrapper/AnimationWrapper";
import Test from "../Test/Test";

const Routes = () => {
  return (
    <div className="App__container">
      <AnimationWrapper>
        <Route exact path="/test">
          <Test />
        </Route>
        <Route path="/:id">
          <Card />
        </Route>
        <Route exact path="/">
          <Cards />
        </Route>
      </AnimationWrapper>
    </div>
  );
};

export default Routes;
