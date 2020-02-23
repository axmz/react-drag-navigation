import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Card-styles.scss";
import { Context } from "../Context/context";

interface Props {
  route?: string;
  called?: boolean;
  index?: number;
}

const Card: React.FC<Props> = ({ index, children }) => {
  const { arr } = useContext(Context);
  const i = index!;
  const { route, called } = arr[i];
  const [status, setStatus] = useState('not called');
  useEffect(() => {
    if ( called ) {
      setStatus('...loading')
      setTimeout(() => {
        setStatus('loaded')
      }, 1300)
    }
  }, [called]);
  return (
    <Link to={`/without`}>
      <div className="Card__container">
        <div className="Card__content">
          <div className="Card__number">
            <div className="Card__number--small">{route}</div>
            <div className="Card__number--small">{status}</div>
            <div className="Card__number--small">{children}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
