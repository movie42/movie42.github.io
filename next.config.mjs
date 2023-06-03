/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/",
  output: "export",
  experimental: {
    mdxRs: true
  }
};

import withMDX from "@next/mdx";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

export default withMDX(nextConfig)({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeAutolinkHeadings, rehypePrism, rehypeSlug]
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  }
});
