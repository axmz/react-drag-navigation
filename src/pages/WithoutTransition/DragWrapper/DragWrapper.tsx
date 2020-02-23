import React, {
  useEffect,
  useState,
  useMemo,
  ReactElement,
  useContext
} from "react";
import { animated, useSprings } from "react-spring";
import { useDrag } from "react-use-gesture";
import clamp from "lodash.clamp";
import styles from "./drag.module.scss";
import { Context } from "../Context/context";
import { useHistory } from "react-router-dom";

type Props = {
  children: ReactElement;
};

const DragWrapper: React.FC<Props> = ({ children }) => {
  console.log("render phase");
  const [atTop, setAtTop] = useState(true);
  const ctx = useContext(Context);
  const { arr, setArr } = ctx;
  // const arr = [
  //   { route: "/", called: false },
  //   { route: "/1", called: false },
  //   { route: "/2", called: false }
  // ];
  const l = arr.length;
  const last = l - 1;
  const [top, setTop] = useState(0);
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
    touchAction: "auto",
    onStart: () => {}
  };

  const nextProps = {
    y: 0,
    scale: 0.75,
    opacity: 0,
    zIndex: 1001,
    display: "block",
    touchAction: "none",
    onStart: () => {}
  };

  const restProps = {
    y: 0,
    scale: 0.75,
    opacity: 0,
    zIndex: 1000,
    display: "block",
    touchAction: "none",
    onStart: () => {}
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
        if (first) {
          const tempArr = [...arr]
          tempArr[next].called=true

          setArr(tempArr)
        }

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
              y: down ? clamp(0 - my * 2, -10, 100) : 0,
              scale: down ? clamp(0.75 + my * 0.0025, 0.75, 1) : 0.75
            };
          }
          return {
            ...restProps
          };
        });

        if (my > 150 && !last) {
          setTop(next);
          if (cancel) cancel();
          console.log(history)
          history.push(arr[next].route)
        }
      }
    }
  );

  const Spring = useMemo(() => {
    console.log("Spring");
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
          {updateChildrenWithRoute}
        </animated.div>
      );
    });
  }, [bind]);

  return <>{Spring}</>;
};

export default DragWrapper;
