import React, { ReactNode } from "react";
import TransitionWrapper from "../TransitionWrapper/TransitionWrapper";
import DragWrapper from "../DragWrapper/DragWrapper";

interface Props {
  children: ReactNode;
}

const AnimationWrapper: React.FC<Props> = ({ children }) => {
  return (
    <TransitionWrapper>
      <DragWrapper>
        {children}
      </DragWrapper>
    </TransitionWrapper>
  );
};

export default AnimationWrapper;
