import React, { useContext } from "react";
import { Route, useLocation, Link, Switch } from "react-router-dom";
import { Context } from "../Context/context";
import styles from "./styles.module.scss";

interface Props {
  route?: string;
  called?: boolean;
  index?: number;
}

const Card: React.FC<Props> = ({ index }) => {
  const ctx = useContext(Context);
  const { state } = ctx!;
  const { lastLocation, top } = state;
  const location = useLocation();
  const r = location.pathname.split("/");
  let pathname = "/" + r[r.length - 1];

  const root = (
    <>
      <div>{`This is root component`}</div>
      <br />
      <Link to={`/with-back/child`} className={styles.content} style={{textDecoration: 'underline'}}>
        Link to child component
      </Link>
    </>
  );

  const child =
    index === top ? (
      <>
        <div>{`This is ${pathname} component`}</div>
        <br />
        <div>Drag down to go back</div>
      </>
    ) : (
      <>{root}</>
    );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.number}>
          <div className={styles['number--small']}>
            <Switch>
              <Route exact path={"/with-back"}>
                {root}
              </Route>
              <Route path={"/with-back" + pathname}>{child}</Route>
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
