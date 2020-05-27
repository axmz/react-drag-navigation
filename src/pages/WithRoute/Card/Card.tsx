import React, { useContext, useEffect } from "react";
import { Route } from "react-router-dom";
import { Context } from "../Context/context";
import styles from "./styles.module.scss";

interface Props {
  route?: string;
  called?: boolean;
  index?: number;
}

const Card: React.FC<Props> = ({ index }) => {
  // console.log('rf')
  const { arr, top } = useContext(Context);
  const i = index!;
  const { route } = arr[i];
  const last = arr.length - 1;
  const next = top + 1 > last ? 0 : top + 1;
  const { route: nextRoute } = arr[next];
  
  const comp = () => {
    if (i === top) {
      return <div>{` Route ${route} component`}</div>;
    }
    if (i === next) {
      return <div>{` Route ${nextRoute} component`}</div>;
    } else {
      return <></>;
    }
  };

  return (
    <div className={styles.container}>
      {/* {console.log('return')} */}
      <div className={styles.content}>
        <div className={styles.number}>
          <div className={styles["number--small"]}>
            <Route path={"/with-route" + route}>{comp}</Route>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
