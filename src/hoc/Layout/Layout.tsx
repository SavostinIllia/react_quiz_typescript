import React, { Component, ReactNode } from "react";
import styled from "styled-components";
import Drawer from "../../components/Navigation/Drawer";

type LayoutProps = {
  children: ReactNode;
};

const LayoutContainer = styled.div`
  min-height: 100vh;
  overflow: hidden;
`;

const LayoutChildrenWrapper = styled.main``;

class Layout extends Component<LayoutProps> {
  render() {
    return (
      <LayoutContainer>
        <Drawer />
        <LayoutChildrenWrapper>{this.props.children}</LayoutChildrenWrapper>
      </LayoutContainer>
    );
  }
}

export default Layout;
