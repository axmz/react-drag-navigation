import React from "react";
import Cards from "../../components/Cards/Cards";
import { Route } from "react-router-dom";
import Card from "../../components/Card/Card";
import AnimationWrapper from "./AnimationWrapper/AnimationWrapper";

const WithTransition = () => {
  return (
    <div className="App__container">
      <AnimationWrapper>
        <Route exact path="/:id">
          <Card />
        </Route>
        <Route exact path="/">
          <Cards />
        </Route>
      </AnimationWrapper>
    </div>
  );
};

export default WithTransition;
