import React from "react";
import { Disqus, CommentCount } from "gatsby-plugin-disqus";

const Comments = ({ siteUrl, path, title }) => {
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
