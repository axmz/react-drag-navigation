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
import Card from "../../../components/Card/Card";
import styles from "./drag.module.scss";
import { useHistory } from "react-router-dom";

const DragWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [atTop, setAtTop] = useState(true);
  const arr = [1, 2, 3];
  const l = arr.length;
  const last = l - 1;
  const top = useRef(0);
  const history = useHistory();

  const next = useCallback(() => {
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
              // x: down ? mx : 0,
              y: down ? my : 0,
              scale: down ? clamp(1 + my * 0.0025, 1, 2) : 1,
              // filter: down ? `brightness(${clamp(1 - my * 0.001, 0.7, 1) * 100}%)`: 'none',
              //   userSelect: y.to(v => (v > 0 ? "none" : "auto")),
              display: "block",
              zIndex: 1002
            };
          }
          if (i === next()) {
            return {
              y: down ? clamp(0 - my * 2, 0, 100) : 0,
              //   y: y.to(y => clamp(0 - y * 2, -200, 100)),
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
          history.push("/test/1");
          console.log("go back");
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
          </animated.div>
        );
      })}
    </>
  );
};

export default DragWrapper;
