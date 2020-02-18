import React from "react";
import Cards from "../Cards/Cards";
import { Route } from "react-router-dom";
import Card from "../Card/Card";
import AnimationWrapper from "../AnimationWrapper/AnimationWrapper";

const Routes = () => {
  return (
    <div className="App__container">
      <AnimationWrapper>
        <Route path="/:id">
          <Card />
        </Route>
        <Route path="/">
          <Cards />
        </Route>
      </AnimationWrapper>
    </div>
  );
};

export default Routes;
