import React from "react";
import { Disqus } from "gatsby-plugin-disqus";

const Comments = ({ path, title }) => {
  let disqusConfig = {
    identifier: path,
    title,
  };
  return (
    <>
      <Disqus config={disqusConfig} />
    </>
  );
};

export default Comments;
