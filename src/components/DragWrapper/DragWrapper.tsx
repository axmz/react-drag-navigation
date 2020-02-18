import React, { ReactNode, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import { useDrag } from "react-use-gesture";
import clamp from "lodash.clamp";

const DragWrapper: React.FC<{children: ReactNode}> = ({children}) => {
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

  const [props, set ] = useSpring(() => ({ x: 0, y: 0, scale: 1 }));
  const { x, y } = props;
  const bind = useDrag(
    ({ event, cancel, last, down, movement: [mx, my] }) => {
      if (atTop) {
        // console.log("my", my);
        // console.log("last", last);
        // console.log("event", event);
        if (my < 150 && last && event?.type === "mouseup") {
          set({ x: 0, y: 0 });
          event?.preventDefault();
          event?.stopPropagation();
        }
        if (my > 150 && !last) {
          history.goBack();
          cancel ? cancel() : console.log("nothing");
        }
        set({ x: down ? mx : 0, y: down ? my : 0 });
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
