import * as React from "react";
import Header from "../header";
import { ThemeProvider } from "styled-components";
import Globalstyle from "../GlobalStyle";
import { theme } from "../../theme/theme";

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
