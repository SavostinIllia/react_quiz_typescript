import React from "react";
import styled, { keyframes } from "styled-components";

interface PopupProps {
  popupText: string;
}

const popup = keyframes`
  0%{
    opacity: 0;
  }
  70%{
    opacity: 1;
  }
  100%{
    opacity: 0
  }
`;

const PopupSection = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 200px;
  background: #192a56;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  color: #55b083;
  z-index: 10;
  border-radius: 10px;
  animation: ${popup} 1.5s forwards;
`;

const RegistartionPopup: React.FC<PopupProps> = ({ popupText }) => {
  return <PopupSection>{popupText}</PopupSection>;
};
export default RegistartionPopup;
