import React, { ReactNode, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import { useDrag } from "react-use-gesture";
import clamp from "lodash.clamp";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks
} from "body-scroll-lock";

const DragWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const myRef = React.useRef<HTMLDivElement>(null);
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

  const [props, set] = useSpring(() => ({ x: 0, y: 0, scale: 1 }));
  const { x, y } = props;
  const bind = useDrag(
    ({ cancel, last, down, movement: [mx, my], delta: [dx, dy] }) => {
      if (atTop) {
        // if (myRef.current && down && my > 0 && dy <= 0) {
        //   disableBodyScroll(myRef.current);
        // } else {
        //   clearAllBodyScrollLocks();
        // }
        set({ x: down ? mx : 0, y: down ? my : 0 });
        if (my > 150 && !last) {
          history.goBack();
          cancel ? cancel() : console.log("nothing");
        }
      }
    },
    {
      domTarget: myRef,
      eventOptions: { passive: false }
    }
  );

  React.useEffect(bind, [bind]);

  return (
    <animated.div
      ref={myRef}
      style={{
        x,
        y,
        scale: y.to(y => clamp(1 + y * 0.005, 1, 2)),
        opacity: y.to(y => clamp(1 - y * 0.008, 0.2, 1)),
        userSelect: y.to(v => (v > 0 ? "none" : "auto")),
        transformOrigin: "top center"
      }}
    >
      {children}
    </animated.div>
  );
};

export default DragWrapper;
