import React, { useContext } from "react";
import { Route } from "react-router-dom";
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
  return (
      <div className="Card__container">
        <div className="Card__content">
          <div className="Card__number">
            <div className="Card__number--small">
                <Route path={'/without' + route}>
                  <div>{` Route ${route} component` }</div>
                </Route>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Card;
