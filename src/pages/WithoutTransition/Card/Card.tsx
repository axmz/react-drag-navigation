import React, { ReactNode, ReactElement } from "react";
import { Link } from "react-router-dom";
import "./Card-styles.scss";
import {Status} from '../DragWrapper/DragWrapper4'

interface Props {
  status?: Status;
  route?: string;
}

const Card: React.FC<Props> = ({ children, status, route }) => {
  const s = status!
  const r = route!
  const {isLoading, isLoaded} = s
  return (
    <Link to={`/without`}>
      <div className="Card__container">
        <div className="Card__content">
          <div className="Card__number">
            <div className="Card__number--small">{isLoading ? 'loading' : '/'}</div>
            <div className="Card__number--small">{isLoaded ? 'loaded' : '/'}</div>
            <div className="Card__number--small">{r}</div>
            <div className="Card__number--small">{children}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
