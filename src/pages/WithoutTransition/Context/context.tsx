import React, { useState } from "react";

const defaultArr = [
  { route: "/without/", called: true },
  { route: "/without/1", called: false },
  { route: "/without/2", called: false }
];
const setArr: any = () => {}
const value = { arr: defaultArr, setArr };

export const Context = React.createContext(value);

export const Provider: React.FC<{}> = ({ children }) => {
  const [arr, setArr] = useState(defaultArr);
  const value = { arr, setArr };
  return <Context.Provider value={value}> {children} </Context.Provider>;
};
