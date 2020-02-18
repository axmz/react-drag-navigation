import React, { ReactNode, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import { useDrag } from "react-use-gesture";
import clamp from "lodash.clamp";
import Card from "../Card/Card";

const DragWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const myRef = React.useRef(null);
  const history = useHistory();
  const [state, switchState] = useState(true);
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

  const [props, set] = useSpring(() => ({ x: 0, y: 0, scale: 1 }));
  const { x, y } = props;
  const bind = useDrag(
    ({ event, cancel, last, down, movement: [mx, my] }) => {
      if (atTop) {
        if (my < 150 && last && event?.type === "mouseup") {
          set({ x: 0, y: 0 });
          event?.preventDefault();
          event?.stopPropagation();
        }
        if (my > 150 && !last) {
          // history.goBack();
          cancel ? cancel() : console.log("nothing");
        }
        set({ x: down ? mx : 0, y: down ? my : 0 });
      }
    },
    {
      // domTarget: myRef,
      eventOptions: { passive: false }
    }
  );

  // React.useEffect(bind, [bind]);

  const front = {
    position: 'absolute' as "absolute",
    // x,
    y,
    scale: y.to(y => clamp(1 + y * 0.0025, 1, 2)),
    opacity: 1,
    // opacity: y.to(y => clamp(1 - y * 0.008, 0.2, 1)),
    userSelect: y.to(v => (v > 0 ? "none" : "auto")),
    transformOrigin: "top center",
    zIndex: 20,
    width: '350px'
  };

  const back = {
    position: 'absolute' as "absolute",
    top: '300px',
    y: y.to(y => clamp(0 - y * 2, -300, 100)),
    // scale: y.to(y => clamp(1 + y * 0.005, 1, 2)),
    opacity: y.to(y => clamp(0 + y * 0.008, 0.3, 1)),
    // opacity: 1,
    userSelect: y.to(v => (v > 0 ? "none" : "auto")),
    transformOrigin: "top center",
    zIndex: 10,
    width: '350px'
  };
  const style1 = state ? front : back;
  const style2 = state ? back : front;

  return (
    <>
      <animated.div {...bind()} style={style1}>
        <Card />
      </animated.div>
      <animated.div {...bind()} style={style2}>
        <Card />
      </animated.div>
    </>
  );
};

export default DragWrapper;
