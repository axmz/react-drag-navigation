import React  from "react";
import { Provider } from "./Context/context";
import Card from "./Card/Card";
import DragSettings from "./DragSettings/DragSettings";

const WithLoading = () => {
  return (
    <Provider>
      <DragSettings>
        <Card/>
      </DragSettings>
    </Provider>
  );
};

export default WithLoading;
