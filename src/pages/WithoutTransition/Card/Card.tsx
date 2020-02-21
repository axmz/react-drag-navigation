import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import "./Card-styles.scss";

interface Props {
  children?: ReactNode;
}

const Card: React.FC<Props> = ({ children }) => {
  return (
    <Link to={`/without`}>
      <div className="Card__container">
        <div className="Card__content">
          <div className="Card__number">
            <div className="Card__number--large">{children}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
