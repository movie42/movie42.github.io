import * as React from "react";
import Header from "./Header";
import styled from "styled-components";

const Main = styled.main`
  min-height: 80vh;
`;

const Layout = ({ children, location }) => {
  return (
    <>
      <Header location={location} />
      <Main>{children}</Main>
    </>
  );
};

export default Layout;
