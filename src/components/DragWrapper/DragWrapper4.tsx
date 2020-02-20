import React, {
  ReactNode,
  useEffect,
  useState,
  useRef,
  useCallback
} from "react";
import { animated, useSprings } from "react-spring";
import { useDrag } from "react-use-gesture";
import clamp from "lodash.clamp";
import Card from "../Card/Card";
import styles from "./drag.module.scss";

const DragWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [atTop, setAtTop] = useState(true);
  const arr = [1, 2, 3];
  const l = arr.length;
  const last = l - 1;
  const top = useRef(0);

  const next = useCallback(() => {
    // console.log("works");
    // console.log("top", top);
    return top.current + 1 > last ? 0 : top.current + 1;
  }, [top.current]);

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

  const [springs, set] = useSprings(3, i => {
    // common props, put them separately in class
    if (i === top.current) {
      return {
        // top: `${i * 100}px`,
        y: 0,
        scale: 1,
        opacity: 1,
        zIndex: 1002,
        display: "block"
      };
    }
    if (i === next()) {
      return {
        y: 0,
        // top: `${i * 100}px`,
        scale: 0.5,
        opacity: 1,
        display: "block",
        zIndex: 1001
      };
    }
    return {
      // top: `${i * 100}px`,
      y: 0,
      scale: 0.5,
      opacity: 1,
      zIndex: 1000,
      display: "none"
    };
  });

  const bind = useDrag(
    ({ args: [index], event, cancel, last, down, movement: [mx, my] }) => {
      if (atTop) {
        // other cases
        set(i => {
          if (i === top.current) {
            return {
              x: down ? mx : 0,
              y: down ? my : 0,
              scale: down ? clamp(1 + my * 0.0025, 1, 2) : 1,
              // filter: down ? `brightness(${clamp(1 - my * 0.001, 0.7, 1) * 100}%)`: 'none',
              display: "block",
              zIndex: 1002
            };
          }
          if (i === next()) {
            return {
              y: down ? clamp(0 - my * 2, 0, 100) : 0,
              // top: `${i * 100}px`,
              opacity: 1,
              scale: down ? clamp(0.5 + my * 0.0025, 0.5, 1) : 0.5,
              display: "block",
              zIndex: 1001
            };
          }
          return {
            display: "none",
            zIndex: 1000
          };
        });

        // exit
        if (my > 150 && !last) {
          if (cancel) cancel();
          top.current = next();
        }
      }
    }
  );

  // const front = {
  //   display,
  //   // x,
  //   y,
  //   scale: y.to(y => clamp(1 + y * 0.0025, 1, 2)),
  //   opacity,
  //   filter: y.to(y => `brightness(${clamp(1 - y * 0.001, 0.7, 1) * 100}%)`),
  //   // opacity: y.to(y => clamp(1 - y * 0.008, 0.2, 1)),
  //   userSelect: y.to(v => (v > 0 ? "none" : "auto")),
  //   transformOrigin: "top center",
  //   position: "absolute" as "absolute",
  //   zIndex: 20,
  //   width: "350px"
  // };

  // const back = {
  //   position: "absolute" as "absolute",
  //   top: "200px",
  //   y: y.to(y => clamp(0 - y * 2, -200, 100)),
  //   scale: y.to(y => clamp(0.5 + y * 0.0025, 0.5, 1)),
  //   opacity: y.to(y => clamp(0 + y * 0.008, 0.3, 1)),
  //   userSelect: y.to(v => (v > 0 ? "none" : "auto")),
  //   transformOrigin: "top center",
  //   zIndex: 10,
  //   width: "350px"
  // };

  // const style1 = state ? front : back;
  // const style2 = state ? back : front;

  // springs.map(s => console.log(s));

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
          </animated.div>
        );
      })}
    </>
  );
};

export default DragWrapper;
