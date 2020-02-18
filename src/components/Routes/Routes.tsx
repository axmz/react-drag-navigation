import React from "react";
import Cards from "../Cards/Cards";
import { useLocation, Switch, Route } from "react-router-dom";
import { useTransition, animated } from "react-spring";
import Card from "../Card/Card";

const Routes = () => {
  const location = useLocation();
  const transitions = useTransition(location, location => location.pathname, {
    from: { transform: "translate3d(0,-100px,0)", scale: 0.65, opacity: 0 },
    enter: { transform: "translate3d(0,0px,0)", scale: 1, opacity: 1 },
    leave: { transform: "translate3d(0,-100px,0)", scale: 0.65, opacity: 0 }
  });
  return (
    <div className='App__container'>
      {transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props}>
          <Switch location={item}>
            <Route path="/:id">
              <Card />
            </Route>
            <Route path="/">
              <Cards />
            </Route>
          </Switch>
        </animated.div>
      ))}
    </div>
  );
};

export default Routes;
