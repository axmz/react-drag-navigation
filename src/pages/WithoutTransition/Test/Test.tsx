import React from "react";
import DragWrapper from "../DragWrapper/DragWrapper4";
import Card from "../../WithoutTransition/Card/Card";
import { Switch, Route, useLocation } from "react-router-dom";

const Test = () => {
  const location = useLocation();
  console.log(location);
  return (
    <DragWrapper>
      <Card>
        <Switch>
          <Route path="/without/1">
            <div>Component from route 1</div>
          </Route>
          <Route path="/without/2">
            <div>Component from route 2</div>
          </Route>
          <Route path="/without">
            <div>Component from route 0</div>
          </Route>
        </Switch>
      </Card>
    </DragWrapper>
  );
};

export default Test;
