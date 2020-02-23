import React  from "react";
import { Link } from "react-router-dom";
import "./Card-styles.scss";

interface Props {
  route?: string;
  called?: boolean;
}

const Card: React.FC<Props> = ({ children, route, called }) => {
  const r = route!;
  return (
    <Link to={`/without`}>
      <div className="Card__container">
        <div className="Card__content">
          <div className="Card__number">
            <div className="Card__number--small">{r}</div>
            <div className="Card__number--small">{called ? 'loading' : 'not called'}</div>
            <div className="Card__number--small">{children}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
