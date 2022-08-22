import * as React from "react";
import Layout from "./layout";
import { Main } from "./style";

const BlogPostLayout = ({ children }) => {
  return (
    <Layout>
      <Main>{children}</Main>
    </Layout>
  );
};

export default BlogPostLayout;
