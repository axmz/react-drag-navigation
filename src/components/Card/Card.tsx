import React, { ReactNode } from "react";
import "./Card-styles.scss";
import { useParams } from "react-router-dom";

interface Props {
  children?: ReactNode;
}

const Card: React.FC<Props> = ({ children }) => {
  const { id } = useParams();
  let content = '';
  let cls = 'Card__content'
  if (id) {
    content = id.repeat(390);
    cls = 'Card__content active'
  }
  return (
    <div className="Card__container">
      <div className={cls}>
        <div className="Card__number">
          {id ? (
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
