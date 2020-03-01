import React, { useContext } from "react";
import { Route, useLocation, Link, Switch } from "react-router-dom";
import { Context } from "../Context/context";
import "./Card-styles.scss";

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
  console.log("i", index);
  console.log("last loc", lastLocation);
  console.log("route", pathname);
  const route =
    index === top ? (
      <Route path={"/with-back" + pathname}>
        <div>{`Route ${pathname} component`}</div>
      </Route>
      ) : (
        <div>{`Route ${lastLocation?.pathname} component`}</div>
    );

  return (
    <div className="Card__container">
      <div className="Card__content">
        <div className="Card__number">
          <div className="Card__number--small">
            <Link to={`/with-back/0`} className={"Card__content"}>0</Link>
            <Link to={`/with-back/1`} className={"Card__content"}>1</Link>
            <Link to={`/with-back/2`} className={"Card__content"}>2</Link>
            {route}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
