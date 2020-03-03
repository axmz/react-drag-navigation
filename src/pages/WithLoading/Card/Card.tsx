import React, { useState, useContext, useEffect } from "react";
import styles from "./styles.module.scss";
import { Context } from "../Context/context";

interface Props {
  index?: number;
}

const Card: React.FC<Props> = ({ index }) => {
  const ctx = useContext(Context);
  const { arr } = ctx;
  const i = index!;
  const { called } = arr[i];
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
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.number}>
          <div className={styles["number--small"]}>{status}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
