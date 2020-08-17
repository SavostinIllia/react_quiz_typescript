import React, { useState } from "react";
import MenuToggle from "./MenuToggle";
import styled from "styled-components";
import classNames from "classnames";
import BackDrop from "./BackDrop";
import { NavLink } from "react-router-dom";

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
const DrawerNavigationLinksArray = styled.ul``;
const DrawerNavigationLinksWrapper = styled.li`
  display: block;
  margin: 20px 0;
  padding: 0 20px;
`;
const DrawerNavigationLinks = styled(NavLink)`
  font-size: 45px;
  font-weight: 600;
  color: #192a56;
  text-decoration: none;
  transition: 0.3s ease-in-out;

  &:hover {
    opacity: 0.7;
    transition: 0.3s ease-in-out;
  }
  &.link-active {
    opacity: 0.7;
  }
`;

const Drawer: React.FC = () => {
  const [menuToggle, setMenuToggle] = useState<boolean>(false);

  const navigationLinks: Array<QuizLinks> = [
    { to: "/", label: "List", exact: true },
    { to: "/auth", label: "Auth", exact: false },
    { to: "/quiz-creator", label: "Quiz Creator", exact: false },
  ];

  const DrawerClasses = classNames({
    close: !menuToggle,
  });

  const onMenuToggle = () => {
    setMenuToggle(!menuToggle);
  };

  const renderLinks = (navigationLinks: any) => {
    return (
      <DrawerNavigationLinksArray>
        {navigationLinks.map((link: any, i: number) => {
          return (
            <DrawerNavigationLinksWrapper key={i}>
              <DrawerNavigationLinks
                to={link.to}
                exact={link.exact}
                onClick={() => onMenuToggle()}
                activeClassName={"link-active"}
              >
                {link.label}
              </DrawerNavigationLinks>
            </DrawerNavigationLinksWrapper>
          );
        })}
      </DrawerNavigationLinksArray>
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
