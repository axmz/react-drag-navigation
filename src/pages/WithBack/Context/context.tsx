import React, { useState, useReducer, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLastLocation } from "react-router-last-location";

// Reducer
const initialState = {
  currentRoute: '',
  lastLocation: "/",
  top: 0
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_LAST_LOCATION":
      return { ...state, lastLocation: action.payload };
    case "SET_TOP":
      return { ...state, top: action.payload };
    default:
      return state;
  }
};

// Context
export const Context = React.createContext<null | any>(null);

// Provider
export const Provider: React.FC<{}> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const location = useLocation();
  const lastLocation = useLastLocation();
  useEffect(() => {
    console.log('location', location)
    console.log('lastLocation', lastLocation)
    console.log('state', state)
    dispatch({type: "SET_LAST_LOCATION", payload: lastLocation})
    // dispatch({type: "SET_TOP", payload: top})
  },[location])

  // current route
  // const r = location.pathname.split("/");
  // const route = "/" + r[r.length - 1];
  // find route in arr
  // const index = arr.findIndex(obj => obj.route === route);
  // set top = index, in order to start cards at right index;
  // if (top !== index) {
  //   dispatch({ type: "SET_TOP", payload: index });
  // }
  const value = { state, dispatch };
  return <Context.Provider value={value}> {children} </Context.Provider>;
};
