import React, { ReactNode } from "react";
import { useLocation, Switch } from "react-router-dom";
import { useTransition, animated } from "react-spring";

interface Props {
  children: ReactNode;
}

const TransitionWrapper: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  const transitions = useTransition(location, location => location.pathname, {
    initial: { transform: "translate3d(0,0px,0rem)", scale: 1, opacity: 1 },
    from: { transform: "translate3d(0,100px,0rem)", scale: 1, opacity: 1 },
    enter: { transform: "translate3d(0,0,0)", scale: 1, opacity: 1 },
    leave: { transform: "translate3d(0,100px,0)", scale: 0.1, opacity: 0 }
  });

  return (
    <>
      {transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props}>
            <Switch location={item}>{children}</Switch>
        </animated.div>
      ))}
    </>
  );
};

export default TransitionWrapper;
