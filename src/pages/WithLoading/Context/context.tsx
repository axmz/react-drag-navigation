import React, { useState } from "react";

const defaultArr = [
  { route: "/0", called: true },
  { route: "/1", called: false },
  { route: "/2", called: false },
  { route: "/3", called: false },
  { route: "/4", called: false }
];
const setArr: any = () => {}
const value = { arr: defaultArr, setArr };

export const Context = React.createContext(value);

export const Provider: React.FC<{}> = ({ children }) => {
  const [arr, setArr] = useState(defaultArr);
  const value = { arr, setArr };
  return <Context.Provider value={value}> {children} </Context.Provider>;
};
