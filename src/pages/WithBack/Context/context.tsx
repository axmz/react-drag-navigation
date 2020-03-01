import React, { useState, useReducer } from "react";
import { useLocation } from "react-router-dom";
import { useLastLocation } from "react-router-last-location";

// Defaults
const defaultArr = [
  { route: "/0", called: false },
  { route: "/1", called: false },
  { route: "/2", called: false }
];
const setArr: any = () => {};

let top = 0;
const setTop: any = () => {};

const value = { arr: defaultArr, setArr, top, setTop };

// Context
export const Context = React.createContext(value);

// Reducer
const initialState = {
  lastLocation: '/',
  top: 0
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_LAST_LOCATION":
      return {...state, lastLocation: action.payload};
    case "SET_TOP":
      return {...state, top: action.payload};
    default:
      return state
  }
};

// Provider
export const Provider: React.FC<{}> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [top, setTop] = useState(0);
  const [arr, setArr] = useState(defaultArr);
  const location = useLocation();
  const lastLocation = useLastLocation();
  console.log("last location", lastLocation);
  // current route
  const r = location.pathname.split("/");
  const route = "/" + r[r.length - 1];
  // find route in arr
  const index = arr.findIndex(obj => obj.route === route);
  // set top = index, in order to start cards at right index;
  if (top !== index) {
    setTop(index);
    // dispatch({type: "SET_TOP", payload: index})
  }
  // const value = { arr, setArr, top, setTop };
  // const value = {state, dispatch}
  return <Context.Provider value={value}> {children} </Context.Provider>;
};
