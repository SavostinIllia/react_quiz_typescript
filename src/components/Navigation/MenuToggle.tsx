import React from "react";
import styled from "styled-components";
import classNames from "classnames";

interface MenuToggleProps {
  menuToggle: boolean;
  onClickHandler(): void;
}

const MenuBar = styled.i`
  position: fixed;
  left: 25px;
  top: 30px;
  font-size: 25px;
  transition: all 0.3s ease-in-out;
  color: var(--whiteTextColor);
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
  &.fa-bars {
    left: 25px;
  }
  &.fa-times {
    left: 370px;
  }
`;

const MenuToggle: React.FC<MenuToggleProps> = ({
  menuToggle,
  onClickHandler,
}) => {
  const MenuBarClasses = classNames({
    fa: "fa",
    "fa-bars": !menuToggle,
    "fa-times": menuToggle,
  });

  return (
    <>
      <MenuBar className={MenuBarClasses} onClick={() => onClickHandler()} />
    </>
  );
};
export default MenuToggle;
