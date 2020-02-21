import React from "react";
import data from "../../../data";
import Card from "../Card/Card";
import { Link } from "react-router-dom";

const Cards = () => {
  return (
    <div>
      {data.map(item => (
        <Link key={item} to={`/with/${item}`}>
          <Card>{item}</Card>
        </Link>
      ))}
    </div>
  );
};

export default Cards;
