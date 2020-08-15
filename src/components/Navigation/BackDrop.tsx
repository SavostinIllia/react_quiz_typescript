import React from "react";
import styled from "styled-components";

interface BackDropProps {
  onClickHandler(): void;
}

const BackDropWrapper = styled.div`
  position: fixed;
  z-index: 50;
  background: rgba(0, 0, 0, 0.7);
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`;

const BackDrop: React.FC<BackDropProps> = ({ onClickHandler }) => {
  return <BackDropWrapper onClick={() => onClickHandler()}></BackDropWrapper>;
};
export default BackDrop;
