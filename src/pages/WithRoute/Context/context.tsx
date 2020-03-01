import React, { useState } from "react";
import { useLocation } from "react-router-dom";

// Defaults
const defaultArr = [
  { route: "/0", called: false },
  { route: "/1", called: false },
  { route: "/2", called: false },
  { route: "/3", called: false },
  { route: "/4", called: false }
];
const setArr: any = () => {}

let top = 0;
const setTop: any = () => {}

const value = { arr: defaultArr, setArr, top, setTop };

// Context
export const Context = React.createContext(value);

// Provider
export const Provider: React.FC<{}> = ({ children }) => {
  const [top, setTop] = useState(0);
  const [arr, setArr] = useState(defaultArr);
  const location = useLocation();
  // current route
  const r = location.pathname.split( '/' )
  const route = '/'+ r[r.length-1];
  // find route in arr
  const index = arr.findIndex(obj => obj.route === route)
  // set top = index, in order to start cards at right index;
  if (top !== index) {
    setTop(index);
  }
  const value = { arr, setArr, top, setTop };
  return <Context.Provider value={value}> {children} </Context.Provider>;
};
