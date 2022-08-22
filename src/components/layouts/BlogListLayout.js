import * as React from "react";
import Layout from "./layout";
import { Main } from "./style";

const BlogListLayout = ({ children }) => {
  return (
    <Layout>
      <Main>{children}</Main>
    </Layout>
  );
};

export default BlogListLayout;
