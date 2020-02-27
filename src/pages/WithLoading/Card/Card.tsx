import React, { useState, useContext, useEffect } from "react";
import "./Card-styles.scss";
import { Context } from "../Context/context";

interface Props {
  index?: number;
}

const Card: React.FC<Props> = ({ index }) => {
  const ctx = useContext(Context);
  const { arr } = ctx;
  const i = index!;
  const { route, called } = arr[i];
  const [status, setStatus] = useState("not called");
  useEffect(() => {
    if (called) {
      setStatus("...loading");
      setTimeout(() => {
        setStatus("loaded");
      }, 1300);
    }
  }, [called]);
  return (
      <div className="Card__container">
        <div className="Card__content">
          <div className="Card__number">
            <div className="Card__number--small">{status}</div>
          </div>
        </div>
      </div>
  );
};

export default Card;
