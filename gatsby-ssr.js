import * as React from "react";
import Layout from "./src/components/Layout";
import "prismjs/themes/prism.css";
import GlobalStyle from "./src/components/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { theme } from "./src/theme/theme";

export function wrapPageElement({ element, props }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Layout {...props}>{element}</Layout>
      </ThemeProvider>
    </>
  );
}

export function wrapRootElement({ element }) {
  return <>{element}</>;
}
