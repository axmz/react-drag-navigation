import React, { useContext } from "react";
import { Route, useLocation, Link } from "react-router-dom";
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
  let { route } = arr[i];
  return (
      <div className="Card__container">
        <div className="Card__content">
          <div className="Card__number">
            <div className="Card__number--small">
                <Route path={'/with-back' + route}>
                  <Link to={`/with-back/0`} className={'Card__content'}>0</Link>
                  <Link to={`/with-back/1`} className={'Card__content'}>1</Link>
                  <Link to={`/with-back/2`} className={'Card__content'}>2</Link>
                  <div>{`Route ${route} component`}</div>
                </Route>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Card;
