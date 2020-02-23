import React from "react";
import DragWrapper from "../DragWrapper/DragWrapper4";
import Card from "../../WithoutTransition/Card/Card";
import { Switch, Route, useLocation } from "react-router-dom";
import { Provider } from "../Context/context";

const Test = () => {
  const location = useLocation();
  console.log(location);
  return (
    <Provider>
      <DragWrapper>
        <Card>
          {/* <Switch>
            <Route path="/without/1">
              <div>Route 1 component</div>
            </Route>
            <Route path="/without/2">
              <div>Route 2 component</div>
            </Route>
            <Route path="/without">
              <div>Route 0 component</div>
            </Route>
          </Switch> */}
        </Card>
      </DragWrapper>
    </Provider>
  );
};

export default Test;
