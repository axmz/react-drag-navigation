import React, { ReactNode } from "react";
import "./Card-styles.scss";
import { useParams } from "react-router-dom";

interface Props {
  children?: ReactNode;
}

const Card: React.FC<Props> = ({ children }) => {
  const { id } = useParams();
  let content = null;
  if (!children && id) {
    content = id?.repeat(390);
  }
  return (
    <div className="Card__container">
      <div className="Card__content">
        <div className="Card__number">
          {content ? (
            <div className="Card__number--small">{content}</div>
          ) : (
            <div className="Card__number--large">{children}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
