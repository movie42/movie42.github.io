import * as React from "react";
import Layout from "./src/components/Layout";
import "prismjs/themes/prism.css";

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}

export function wrapRootElement({ element }) {
  return <>{element}</>;
}
