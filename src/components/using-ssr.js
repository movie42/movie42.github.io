import * as React from "react";
import { Link } from "gatsby";
import Seo from "./seo";

const UsingSSR = ({ serverData }) => {
  return (
    <>
      <Seo title="" />
      <h1>SSR page</h1>
      <p>Welcome to a server side rendered page with a random dog photo</p>
      <p>
        To learn more, head over to our{" "}
        <a href="https://www.gatsbyjs.com/docs/reference/rendering-options/server-side-rendering/">
          documentation about Server Side Rendering
        </a>
        .
      </p>
      <Link to="/">Go back to the homepage</Link>
    </>
  );
};

export default UsingSSR;
