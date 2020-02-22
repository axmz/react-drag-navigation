import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import "./Card-styles.scss";
import {Status} from '../DragWrapper/DragWrapper4'

interface Props {
  children?: ReactNode;
  status?: Status;
}

const Card: React.FC<Props> = ({ children, status }) => {
  const s = status!
  return (
    <Link to={`/without`}>
      <div className="Card__container">
        <div className="Card__content">
          <div className="Card__number">
            <span>{s.isLoaded ? 'loaded' : 'not loaded'}</span>
            <div className="Card__number--large">{children}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
