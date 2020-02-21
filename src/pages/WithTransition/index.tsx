import React from "react";
import Cards from "./Cards/Cards";
import { Route } from "react-router-dom";
import Card from "./Card/Card";
import AnimationWrapper from "./AnimationWrapper/AnimationWrapper";

const WithTransition = () => {
  return (
      <AnimationWrapper>
        <Route exact path="/with">
          <Cards />
        </Route>
        <Route exact path="/with/:id">
          <Card />
        </Route>
      </AnimationWrapper>
  );
};

export default WithTransition;
