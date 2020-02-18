import React from "react";
import Cards from "../Cards/Cards";
import { Route } from "react-router-dom";
import Card from "../Card/Card";
import TransitionWrapper from "../TransitionWrapper/TransitionWrapper";

const Routes = () => {
  return (
    <div className="App__container">
      <TransitionWrapper>
        <Route path="/:id">
          <Card />
        </Route>
        <Route path="/">
          <Cards />
        </Route>
      </TransitionWrapper>
    </div>
  );
};

export default Routes;
