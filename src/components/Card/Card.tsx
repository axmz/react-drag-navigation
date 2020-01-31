import React, { ReactNode, useEffect, useState } from "react";
import "./Card-styles.scss";
import { Link, useParams, useHistory } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import { useDrag } from "react-use-gesture";
import clamp from "lodash.clamp";

interface Props {
  children?: ReactNode;
}

const Card: React.FC<Props> = ({ children }) => {
  const { id } = useParams();
  const history = useHistory();
  const [atTop, setAtTop] = useState();
  let content = "";
  let cls = "Card__content";
  if (id) {
    content = id.repeat(390);
    cls = "Card__content active";
  }

  useEffect(() => {
    if (window.scrollY < 3) {
      setAtTop(true);
    }
  }, [setAtTop]);

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

  const [props, set, stop] = useSpring(() => ({ x: 0, y: 0, scale: 1 }));
  const { x, y, scale } = props;
  const bind = useDrag(({ down, movement: [mx, my] }) => {
    // set({ x:  mx , y:  my });
    if (atTop) {
      if (my > 250) {
        history.goBack();
      }
      set({ x: down ? mx : 0, y: down ? my : 0 });
    }
  });

  return (
    <animated.div
      {...bind()}
      style={{
        x,
        y,
        scale: y.to(y => clamp(1 + y * 0.005, 1, 2)),
        opacity: y.to(y => clamp(1 - y * 0.005, 0.1, 1)),
        userSelect: y.to(v => (v > 0 ? "none" : "auto")),
        transformOrigin: "top center"
        // touchAction: 'none'
      }}
    >
      <>
        {id ? (
          <Link to={`/`}>
            <div className="Card__container">
              <div className={cls}>
                <div className="Card__number">
                  <div className="Card__number--small">{content}</div>
                </div>
              </div>
            </div>
            <div className="Card__container">
              <div className={cls}>
                <div className="Card__number">
                  <div className="Card__number--small">{content}</div>
                </div>
              </div>
            </div>
            <div className="Card__container">
              <div className={cls}>
                <div className="Card__number">
                  <div className="Card__number--small">{content}</div>
                </div>
              </div>
            </div>
          </Link>
        ) : (
          <div className="Card__container">
            <div className={cls}>
              <div className="Card__number">
                <div className="Card__number--large">{children}</div>
              </div>
            </div>
          </div>
        )}
      </>
    </animated.div>
  );
};

export default Card;
