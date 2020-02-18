import React, { ReactNode, useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useSpring, animated, useSprings } from "react-spring";
import { useDrag } from "react-use-gesture";
import clamp from "lodash.clamp";
import Card from "../Card/Card";

const DragWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const myRef = React.useRef(null);
  const history = useHistory();
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  });

  function scrollListener() {
    if (window.scrollY < 3) {
      setAtTop(true);
    } else {
      setAtTop(false);
    }
  }

  // const [props, set ] = useSpring(() => ({ x: 0, y: 0, scale: 1 }));
  const index = useRef(0);
  const [springs, set] = useSprings(2, i => ({
    x: 0,
    y: 0,
    // scale: 1 * i,
    // opacity: 1 * i
  }));
  const bind = useDrag(
    ({ args: [index], event, cancel, last, down, movement: [mx, my] }) => {
      if (atTop) {
        if (index === 1) {
        if (my < 150 && last && event?.type === "mouseup") {
          set(i => ({ x: 0, y: 0 }));
          event?.preventDefault();
          event?.stopPropagation();
        }
        if (my > 150 && !last) {
          history.goBack();
          cancel ? cancel() : console.log("nothing");
        }
        set(i => ({ x: down ? mx : 0, y: down ? my : 0 }));
      }
      }
    },
    {
      // domTarget: myRef,
      eventOptions: { passive: false }
    }
  );

  // React.useEffect(bind, [bind]);

  return (
    <>
      {springs.map(({x,y}, i) => {
        return (
          <animated.div
            // ref={myRef}
            {...bind(i)}
            key={i}
            className={'anim'}
            style={{
              position: "absolute",
              top: "0",
              left: "100px",
              x,
              y,
              scale: y.to(y => clamp(1 + y * 0.005, 1, 2)),
              opacity: y.to(y => clamp(1 - y * 0.008, 0.2, 1)),
              userSelect: y.to(v => (v > 0 ? "none" : "auto")),
              transformOrigin: "top center"
            }}
          >
            <Card />
          </animated.div>
        );
      })}
    </>
  );
};

export default DragWrapper;
