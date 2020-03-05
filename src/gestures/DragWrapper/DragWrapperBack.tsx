import React, { useEffect, useState, useMemo, ReactElement } from "react";
import styles from "./common.module.scss";
import { useHistory } from "react-router-dom";
import { animated, useSprings } from "react-spring";
import { useDrag } from "react-use-gesture";
import clamp from "lodash.clamp";

type Props = {
  children: ReactElement;
  context: any; // change
};

const DragWrapper: React.FC<Props> = ({ children, context }) => {
  const [atTop, setAtTop] = useState(true);
  const { state, dispatch } = context;
  const { top } = state;
  const l = 3;
  const last = l - 1;
  const next = top + 1 > last ? 0 : top + 1;
  const history = useHistory();

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

  const topProps = {
    y: 0,
    scale: 1,
    opacity: 1,
    zIndex: 1002,
    display: "block",
    touchAction: "auto"
  };

  const nextProps = {
    y: 0,
    scale: 0.75,
    opacity: 0,
    zIndex: 1001,
    display: "block",
    touchAction: "none"
  };

  const restProps = {
    y: 1000,
    scale: 0.75,
    opacity: 0,
    zIndex: 1000,
    display: "block",
    touchAction: "none"
  };

  const [springs, set] = useSprings(l, i => {
    if (i === top) {
      return {
        ...topProps
      };
    }
    if (i === next) {
      return {
        ...nextProps
      };
    }
    return {
      ...restProps
    };
  });

  const bind = useDrag(
    ({ args: [index], cancel, first, last, down, movement: [_, my] }) => {
      if (atTop) {
        set(i => {
          if (i === top) {
            return {
              ...topProps,
              opacity: down ? clamp(1 - my * 0.0025, 0.5, 1) : 1,
              y: down ? my : 0,
              scale: down ? clamp(1 + my * 0.0025, 1, 2) : 1
            };
          }
          if (i === next) {
            return {
              ...nextProps,
              opacity: down ? clamp(0.5 + my * 0.0025, 0.5, 1) : 0,
              y: down ? clamp(-10 + my * 0.06, -10, 100) : 0,
              scale: down ? clamp(0.75 + my * 0.0025, 0.75, 1) : 0.75
            };
          }
          return {
            ...restProps
          };
        });

        if (my > 150 && !last) {
          history.goBack();
          dispatch({ type: "SET_TOP", payload: next });
          if (cancel) cancel();
        }
      }
    }
  );

  const Spring = useMemo(() => {
    return springs.map((props, i) => {
      const updateChildrenWithRoute = React.Children.map(
        children,
        (child: ReactElement) => {
          return React.cloneElement(child, {
            index: i
          });
        }
      );
      return (
        <animated.div
          {...bind(i)}
          key={i}
          className={styles.common}
          style={props}
        >
          <animated.div
            style={{
              rotateX: props.y.to(y => clamp(0 - y * 0.25, -55, 0)),
              transformOrigin: "center"
            }}
          >
            {updateChildrenWithRoute}
          </animated.div>
        </animated.div>
      );
    });
  }, [bind]);

  return <>{Spring}</>;
};

export default DragWrapper;
