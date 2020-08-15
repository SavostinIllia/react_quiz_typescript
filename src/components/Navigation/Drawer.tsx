import React, { useState } from "react";
import MenuToggle from "./MenuToggle";
import styled from "styled-components";
import classNames from "classnames";
import BackDrop from "./BackDrop";

const DrawerNavigation = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  background: #eee;
  width: 100%;
  max-width: 350px;
  transition: 0.3s ease-in-out;
  box-shadow: inset -40px -4px 74px -43px rgba(0, 0, 0, 0.75);
  z-index: 100;
  &.close {
    left: -400px;
  }
`;
const DrawerNavigationLinks = styled.a`
  display: block;
  margin: 20px 0;
  font-size: 45px;
  font-weight: 600;
  padding: 0 20px;
  color: #192a56;
  text-decoration: none;
  transition: 0.3s ease-in-out;

  &:hover {
    opacity: 0.7;
    transition: 0.3s ease-in-out;
  }
`;

const Drawer: React.FC = () => {
  const [menuToggle, setMenuToggle] = useState<boolean>(false);
  const [navigationLinks, setNavigationLinks] = useState<number[]>([1, 2, 3]);
  const DrawerClasses = classNames({
    close: !menuToggle,
  });
  const onMenuToggle = () => {
    setMenuToggle(!menuToggle);
  };
  const renderLinks = (navigationLinks: number[]) => {
    return (
      <ul>
        {navigationLinks.map((link, i) => {
          return (
            <li key={i}>
              <DrawerNavigationLinks href="#">
                Link {link}
              </DrawerNavigationLinks>
            </li>
          );
        })}
      </ul>
    );
  };
  return (
    <>
      <DrawerNavigation className={DrawerClasses}>
        {renderLinks(navigationLinks)}
        <MenuToggle menuToggle={menuToggle} onClickHandler={onMenuToggle} />
      </DrawerNavigation>

      {menuToggle ? <BackDrop onClickHandler={onMenuToggle} /> : null}
    </>
  );
};
export default Drawer;
