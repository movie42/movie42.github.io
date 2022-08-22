import * as React from "react";
import Header from "./Headers";
import styled, { ThemeProvider } from "styled-components";
import Globalstyle from "./GlobalStyle";
import { theme } from "../theme/theme";

const Main = styled.main`
  min-height: 80vh;
`;

const Layout = ({ children }) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Globalstyle />
        <Header />
        {children}
      </ThemeProvider>
    </>
  );
};

export default Layout;

export const BlogListLayout = ({ children }) => {
  return (
    <Layout>
      <Main>{children}</Main>
    </Layout>
  );
};

export const BlogPostLayout = ({ children }) => {
  return (
    <Layout>
      <Main>{children}</Main>
    </Layout>
  );
};

export const ResumeLayout = ({ children }) => {
  return (
    <Layout>
      <Main>{children}</Main>
    </Layout>
  );
};
