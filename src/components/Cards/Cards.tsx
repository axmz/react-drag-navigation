import React from 'react'
import data from "../../data";
import Card from "../Card/Card";
import { Link } from 'react-router-dom';

const Cards = () => {

  return (
    <>
        {data.map(item => (
            <Link key={item} to={`/${item}`}> 
              <Card>{item}</Card>
            </Link>
        ))}
    </>
  )
}

export default Cards