import React, { ReactNode } from "react";
import styled from "styled-components";
import Drawer from "../../components/Navigation/Drawer";
import AuthProvider from "../../context/authcontext/Authcontext";

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
    <AuthProvider>
      <LayoutContainer>
        <Drawer />
        <LayoutChildrenWrapper>{children}</LayoutChildrenWrapper>
      </LayoutContainer>
    </AuthProvider>
  );
};

export default Layout;
