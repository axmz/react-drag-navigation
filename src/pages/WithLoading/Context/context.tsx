import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const defaultArr = [
  { route: "/0", called: false },
  { route: "/1", called: false },
  { route: "/2", called: false },
  { route: "/3", called: false },
  { route: "/4", called: false }
];
const setArr: any = () => {};
let top = 0 as  number | null;
const setTop: any = () => {};

const value = { arr: defaultArr, setArr, top, setTop };

export const Context = React.createContext(value);


export const Provider: React.FC<{}> = ({ children }) => {
  const [top, setTop] = useState<number | null>(null);
  const [arr, setArr] = useState(defaultArr);
  const location = useLocation();
  // current route
  const r = location.pathname.split("/");
  const route = "/" + r[r.length - 1];
  // find route in arr
  const index = arr.findIndex(obj => obj.route === route);
  // set top = index, in order to start cards at right index;
  if (top !== index) {
    setTop(index);
  }
  // mark current (top) card as called;
  if (top) {
    const objCopy = {...arr[top]}
    objCopy.called = true;
    const arrCopy = [ ...arr ]
    arrCopy[top] = objCopy;
    arr[top].called = true;
    if (arr[top].called !== true) {
      setArr(arrCopy);
      }
    }

  const value = { arr, setArr, top, setTop };
  return <Context.Provider value={value}> {children} </Context.Provider>;
};
