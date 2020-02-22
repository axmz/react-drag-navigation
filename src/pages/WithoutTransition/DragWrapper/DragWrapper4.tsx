import React, { ReactNode, useEffect, useState, useRef, useMemo } from "react";
import { animated, useSprings } from "react-spring";
import { useHistory } from "react-router-dom";
import { useDrag } from "react-use-gesture";
import clamp from "lodash.clamp";
import Card from "../../WithoutTransition/Card/Card";
import styles from "./drag.module.scss";

type Props = {
  children: ReactNode;
};
const DragWrapper: React.FC<Props> = ({ children }) => {
  const [atTop, setAtTop] = useState(true);
  const arr = [1, 2, 3];
  const l = arr.length;
  const last = l - 1;
  const [top, setTop] = useState(0);
  const history = useHistory();

  const next = top + 1 > last ? 0 : top + 1;

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
    display: "block",
    touchAction: "auto",
  };

  const nextStyle = {
    // top: `${i * 100}px`,
    y: 0,
    scale: 0.75,
    opacity: 0,
    zIndex: 1001,
    display: "block",
    touchAction: "none",
  };

  const otherStyle = {
    // top: `${i * 100}px`,
    y: 0,
    scale: 0.75,
    opacity: 0,
    zIndex: 1000,
    display: "block",
    touchAction: "none",
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

  const bind = useDrag(({ cancel, last, down, movement: [_, my] }) => {
    if (atTop) {
      set(i => {
        if (i === top) {
          return {
            ...topStyle,
            opacity: down ? clamp(1 - my * 0.0025, 0.5, 1) : 1,
            y: down ? my : 0,
            scale: down ? clamp(1 + my * 0.0025, 1, 2) : 1
          };
        }
        if (i === next) {
          return {
            ...nextStyle,
            opacity: down ? clamp(0.5 + my * 0.0025, 0.5, 1) : 0,
            y: down ? clamp(0 - my * 2, -10, 100) : 0,
            scale: down ? clamp(0.75 + my * 0.0025, 0.75, 1) : 0.75
          };
        }
        return {
          ...otherStyle
        };
      });
      // exit
      if (my > 150 && !last) {
        setTop(next);
        if (cancel) cancel();
        // history.push("/without");
      }
    }
  });

  const Spring = useMemo(() => {
    return springs.map((props, i) => {
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
    });
  }, []);

  return <>{Spring}</>;
};

export default DragWrapper;
