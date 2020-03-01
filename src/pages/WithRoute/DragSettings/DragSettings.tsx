import React, { useContext } from "react";
import { Context } from "../Context/context";
import DragWrapper from "../../../gestures/DragWrapper/DragWrapper";
import Card from "../Card/Card";

const DragSettings: React.FC<{}> = () => {
  const ctx = useContext(Context);
  return (
    <DragWrapper context={ctx}>
      <Card />
    </DragWrapper>
  );
};

export default DragSettings;
