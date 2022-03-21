import * as React from "react";
import GlobalStyle from "./GlobalStyle";
import Header from "./Header";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../theme/theme";

const Main = styled.main`
  min-height: 80vh;
`;

const Layout = ({ children, location }) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header location={location} />
        <Main>{children}</Main>
      </ThemeProvider>
    </>
  );
};

export default Layout;
