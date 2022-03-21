const path = require("path");

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`);
  const resumeTemplate = path.resolve(`src/pages/index.js`);

  const result = await graphql(`
    {
      postsRemark: allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 1000
      ) {
        edges {
          node {
            id
            html
            excerpt(format: PLAIN, pruneLength: 1000)
            frontmatter {
              date
              slug
              tags
              title
            }
          }
        }
      }

      resumeRemark: markdownRemark(frontmatter: { slug: { eq: "/" } }) {
        html
        frontmatter {
          date(formatString: "YYYY년 MMMM DD일", locale: "ko-KR")
          title
          tags
          slug
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const posts = result.data.postsRemark.edges;

  posts.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.slug,
      component: blogPostTemplate,
    });
  });

  const resume = result.data.resumeRemark;

  createPage({
    path: resume.frontmatter.slug,
    component: resumeTemplate,
  });
};
