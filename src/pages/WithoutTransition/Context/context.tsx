import React, { useState } from "react";

const arr = [
  { route: "/", called: false },
  { route: "/1", called: false },
  { route: "/2", called: false }
];
const setArr: any = () => {}
const value = { arr, setArr };

export const Context = React.createContext(value);

export const Provider: React.FC<{}> = ({ children }) => {
  const [arr, setArr] = useState([
    { route: "/", called: false },
    { route: "/1", called: false },
    { route: "/2", called: false }
  ]);
  const value = { arr, setArr };
  return <Context.Provider value={value}> {children} </Context.Provider>;
};
