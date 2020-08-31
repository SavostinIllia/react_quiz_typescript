import React, { ReactNode } from "react";
import styled from "styled-components";
import Drawer from "../../components/Navigation/Drawer";

type LayoutProps = {
  children: ReactNode;
};

const LayoutContainer = styled.div``;

const LayoutChildrenWrapper = styled.main`
  max-height: 100vh;
  overflow: hidden;
`;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Drawer />
      <LayoutChildrenWrapper>{children}</LayoutChildrenWrapper>
    </LayoutContainer>
  );
};

export default Layout;
