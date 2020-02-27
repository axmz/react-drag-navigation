import React  from "react";
import { Provider } from "./Context/context";

import Card from "./Card/Card";
import DragSettings from "./DragSettings/DragSettings";

const WithBack = () => {
  return (
    <Provider>
      <DragSettings>
        <Card/>
      </DragSettings>
    </Provider>
  );
};

export default WithBack;
