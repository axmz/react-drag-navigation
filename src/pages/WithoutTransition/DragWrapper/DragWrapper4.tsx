import React, {
  useEffect,
  useState,
  useMemo,
  ReactElement
} from "react";
import { animated, useSprings } from "react-spring";
import { useDrag } from "react-use-gesture";
import clamp from "lodash.clamp";
import styles from "./drag.module.scss";

type Props = {
  children: ReactElement;
};

export type Status = {
  isLoading: boolean;
  isLoaded: boolean;
};

const DragWrapper: React.FC<Props> = ({ children }) => {
  const [atTop, setAtTop] = useState(true);
  const arr = [{ route: "/", called: false }, { route: "/1", called: false }, { route: "/2", called: false }];
  // const [ arr, setArr ] = useState([{ route: "/" }, { route: "/1" }, { route: "/2" }]);
  const l = arr.length;
  const last = l - 1;
  const [top, setTop] = useState(0);
  const [status, setStatus] = useState<Status>({
    isLoading: false,
    isLoaded: false
  });

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
    y: 0,
    scale: 1,
    opacity: 1,
    zIndex: 1002,
    display: "block",
    touchAction: "auto"
  };

  const nextStyle = {
    y: 0,
    scale: 0.75,
    opacity: 0,
    zIndex: 1001,
    display: "block",
    touchAction: "none"
  };

  const otherStyle = {
    y: 0,
    scale: 0.75,
    opacity: 0,
    zIndex: 1000,
    display: "block",
    touchAction: "none"
  };

  const [springs, set] = useSprings(l, i => {
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
    ({ args: [index], cancel, last, down, movement: [_, my] }) => {
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
          // setArr([...arr, {route: '/3'}])
          // arr.push({route: '/3'})
          // history.push(`/without/${index}`);
          // history.goBack();
        }
      }
    }
  );
  console.log("render phase");

  const Spring = useMemo(() => {
    console.log("Spring");
    return springs.map((props, i) => {
      const updateChildrenWithRoute = React.Children.map(
        children,
        (child: ReactElement, idx) => {
          return React.cloneElement(child, {
            ...arr[i]
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
  }, [status, bind]);

  return <>{Spring}</>;
};

export default DragWrapper;
