import React, { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import "./Card-styles.scss";

interface Props {
  children?: ReactNode;
}

const Card: React.FC<Props> = ({ children }) => {
  const { id } = useParams();
  let content = "";
  let cls = "Card__content";
  if (id) {
    content = id.repeat(390);
    cls = "Card__content active";
  }

  return (
    <>
      {id ? (
        <Link to={`/with`}>
          <div className="Card__container">
            <div className={cls}>
              <div className="Card__number">
                <div className="Card__number--small">{content}</div>
              </div>
            </div>
          </div>
          <div className="Card__container">
            <div className={cls}>
              <div className="Card__number">
                <div className="Card__number--small">{content}</div>
              </div>
            </div>
          </div>
          <div className="Card__container">
            <div className={cls}>
              <div className="Card__number">
                <div className="Card__number--small">{content}</div>
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <div className="Card__container">
          <div className={cls}>
            <div className="Card__number">
              <div className="Card__number--large">{children}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;