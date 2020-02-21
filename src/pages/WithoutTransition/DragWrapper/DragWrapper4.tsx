import React, { ReactNode, useEffect, useState, useRef, useMemo } from "react";
import { animated, useSprings } from "react-spring";
import { useHistory } from "react-router-dom";
import { useDrag } from "react-use-gesture";
import clamp from "lodash.clamp";
import Card from "../../WithoutTransition/Card/Card";
import styles from "./drag.module.scss";
  const whyDidYouRender = require("@welldone-software/why-did-you-render");
  whyDidYouRender(React);

type Props = { children: ReactNode } & { whyDidYouRender?: any };
const DragWrapper: React.FC<Props> = ({ children }) => {
  const [atTop, setAtTop] = useState(true);
  const arr = [1, 2, 3];
  const l = arr.length;
  const last = l - 1;
  const [top, setTop] = useState(0);
  const history = useHistory();

  const next = top + 1 > last ? 0 : top + 1;
  // const next = useMemo(() => {
  //   const next = top + 1 > last ? 0 : top + 1;
  //   console.log("next", next);
  //   return next;
  // }, [top]);
  console.log("render");
  console.log("next", next);

  useEffect(() => {
    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  }, []);

  function scrollListener() {
    if (window.scrollY < 3) {
      setAtTop(true);
    } else {
      setAtTop(false);
    }
  }

  const topStyle = {
    // top: `${i * 100}px`,
    y: 0,
    scale: 1,
    opacity: 1,
    zIndex: 1002,
    display: "block"
  };

  const nextStyle = {
    // top: `${i * 100}px`,
    y: 0,
    scale: 0.75,
    opacity: 1,
    zIndex: 1001,
    display: "block"
  };

  const otherStyle = {
    // top: `${i * 100}px`,
    y: 0,
    scale: 0.75,
    opacity: 1,
    zIndex: 100,
    display: "block"
  };

  const [springs, set] = useSprings(3, i => {
    if (i === top) {
      return {
        ...topStyle
      };
    }
    if (i === next) {
      return {
        ...nextStyle
      };
    }
    return {
      ...otherStyle
    };
  });

  const bind = useDrag(
    ({ args: [index], event, cancel, last, down, movement: [mx, my] }) => {
      if (atTop) {
        set(i => {
          if (i === top) {
            return {
              ...topStyle,
              // filter: down ? `brightness(${clamp(1 - my * 0.001, 0.7, 1) * 100}%)`: 'none',
              // userSelect: y.to(v => (v > 0 ? "none" : "auto")),
              y: down ? my : 0,
              scale: down ? clamp(1 + my * 0.0025, 1, 2) : 1
            };
          }
          if (i === next) {
            return {
              ...nextStyle,
              y: down ? clamp(0 - my * 2, -10, 100) : 0,
              scale: down ? clamp(0.75 + my * 0.0025, 0.75, 1) : 0.75
            };
          }
          return {
            ...otherStyle
            // opacity: 0,
          };
        });
        // exit
        if (my > 150 && !last) {
          // set(i => {
          //   if (i === top) {
          //     return {
          //       zIndex: 100
          //       // display: 'none'
          //     };
          //   }
          //   return {};
          // });
          setTop(next);
          if (cancel) cancel();
          // history.push("/without");
        }
      }
    }
  );

  return (
    <>
      {springs.map((props, i) => {
        return (
          <animated.div
            {...bind()}
            key={i}
            className={styles.common}
            style={props}
          >
            <Card>{i}</Card>
            {/* {children} */}
            {/* {children ? React.cloneElement(children as HTMLDivElement, { children: i }) : null} */}
          </animated.div>
        );
      })}
    </>
  );
};

(DragWrapper as any).whyDidYouRender = true;
export default DragWrapper;
