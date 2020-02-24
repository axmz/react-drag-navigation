import React from "react";
import { Provider } from "./Context/context";
import DragWrapper from "./DragWrapper/DragWrapper";
import Card from "./Card/Card";

const WithoutTransition = () => {
  return (
    <Provider>
      <DragWrapper>
        <Card/>
      </DragWrapper>
    </Provider>
  );
};

export default WithoutTransition;
