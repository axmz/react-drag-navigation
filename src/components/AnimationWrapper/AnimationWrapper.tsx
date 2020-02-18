import React, { ReactNode } from "react";
import TransitionWrapper from "../TransitionWrapper/TransitionWrapper";
import DragWrapper from "../DragWrapper/DragWrapper";

interface Props {
  children: ReactNode;
}

const AnimationWrapper: React.FC<Props> = ({ children }) => {
  return (
    <DragWrapper>
      <TransitionWrapper>{children}</TransitionWrapper>
    </DragWrapper>
  );
};

export default AnimationWrapper;
