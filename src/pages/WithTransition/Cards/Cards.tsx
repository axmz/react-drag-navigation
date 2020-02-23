import React, {useEffect} from "react";
import data from "../../../data";
import Card from "../Card/Card";
import { Link } from "react-router-dom";

const Cards = () => {
  useEffect(() => {
  window.scrollTo(0, 0)
}, [])
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
