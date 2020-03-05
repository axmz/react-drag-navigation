import React from "react";
import { Provider } from "./Context/context";
import { LastLocationProvider } from "react-router-last-location";

import Card from "./Card/Card";
import DragSettings from "./DragSettings/DragSettings";
import TransitionWrapper from "./TransitionWrapper";

const WithBack = () => {
  return (
    <LastLocationProvider>
      <Provider>
        {/* <TransitionWrapper> */}
          <DragSettings>
            <Card />
          </DragSettings>
        {/* </TransitionWrapper> */}
      </Provider>
    </LastLocationProvider>
  );
};

export default WithBack;
