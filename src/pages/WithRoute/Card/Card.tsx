import React, { useContext } from "react";
import { Route, useLocation } from "react-router-dom";
import { Context } from "../Context/context";
import "./Card-styles.scss";

interface Props {
  route?: string;
  called?: boolean;
  index?: number;
}

const Card: React.FC<Props> = ({ index }) => {
  const { arr } = useContext(Context);
  const i = index!;
  const { route } = arr[i];
  const location = useLocation();
  const r = location.pathname.split( '/' )
  const last = '/'+ r[r.length-1]
  return (
      <div className="Card__container">
        <div className="Card__content">
          <div className="Card__number">
            <div className="Card__number--small">
                <Route path={'/with-route' + last || route}>
                  <div>{` Route ${last || route} component` }</div>
                </Route>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Card;
