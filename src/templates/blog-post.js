import * as React from "react";
import { graphql, Link } from "gatsby";
import styled from "styled-components";
import Comments from "../gatsby-theme-nehalem/componets/comments";
import Seo from "../components/seo";
import BlogPostLayout from "../components/layouts/BlogPostLayout";

const Wrapper = styled.div`
  padding: 0 2rem;
  max-width: 120rem;
  margin: 0 auto;
  @media (max-width: 450px) {
    max-width: unset;
    margin: 6rem auto 0;
  }
`;

const PostBody = styled.div`
  padding: 2rem 0;
  .inform-container {
    font-size: 1.9rem;
    min-height: 20rem;
    margin-bottom: 5rem;
    overflow: hidden;
    h1 {
      font-size: 13rem;
      letter-spacing: -0.3rem;
      line-height: 1.2;
      word-break: keep-all;
      font-weight: 900;
      color: ${props => props.theme.hlColor_light};
    }
    div {
      span:not(:first-child) {
        font-weight: 500;
        margin-left: 1rem;
        a {
          color: ${props => props.theme.hlColor};
          &:hover {
            color: ${props => props.theme.compColor};
          }
        }
      }
    }
    @media (max-width: 450px) {
      min-height: 10rem;
      margin-bottom: 1rem;
      h1 {
        font-size: 7rem;
      }
    }
  }

  .blog-post-content {
    max-width: 102rem;
    margin: 0 auto;
    line-height: 1.8;
    font-size: 1.9rem;
    letter-spacing: -0.1rem;
    h1,
    h2,
    h3,
    h4,
    h5 {
      margin: 2rem 0;
    }
    h1 {
      color: #0070ff;
      font-size: 4.5rem;
    }
    h2 {
      font-size: 3.8rem;
    }
    h3 {
      font-size: 3.2rem;
    }
    h4 {
      font-size: 2.4rem;
    }
    h5 {
      font-size: 1.8rem;
    }
    a {
      color: ${props => props.theme.hlColor};
    }
    p {
      margin: 3rem 0;
    }

    ul {
      li {
        list-style: disc;
        ul {
          li {
            list-style: circle;
          }
        }
      }
    }
    ol {
      list-style: disc;
      counter-reset: li;
      li {
        position: relative;
        counter-increment: li;
        &:before {
          content: counter(li);
          color: ${props => props.theme.hlColor_dark};
          display: inline-block;
          width: 1em;
          margin-left: -1em;
        }
        &:after {
          position: absolute;
          bottom: 0.6rem;
          left: 0;
          content: ".";
          color: black;
          display: inline-block;
          width: 1em;
          margin: -0.7rem;
        }
        p {
          display: inline-block;
        }
        ul {
          counter-reset: unset;
          li {
            counter-increment: unset;
          }
        }
      }
    }
    code {
      padding: 0 0.7rem;
      font-family: "JetBrains Mono", monospace;
      font-size: 1.6rem;
      color: white;
      text-shadow: none;
      background-color: #1b1e2b;
    }

    blockquote {
      position: relative;
      word-break: keep-all;
      margin: 1.2rem;
      padding: 1rem 4rem;
      border-radius: 0.2rem;
      background-color: ${props => props.theme.grayColor_light};
      &::after {
        position: absolute;
        top: 0;
        left: 0;
        width: 0.8rem;
        height: 100%;
        background-color: ${props => props.theme.hlColor_light};
        content: "";
      }
    }

    pre {
      margin: 4rem 0;
      padding: 1rem 2rem;
      background-color: #1b1e2b;
      border-radius: 0.8rem;
      code {
        font-family: "JetBrains Mono", monospace;
        font-size: 1.6rem;
        letter-spacing: -0.01rem;
        background-color: #1b1e2b;
        color: ${props => props.theme.basicColor};
        text-shadow: none;
        color: #75beff;
        .token {
          background-color: #1b1e2b;
          color: #cccccc;
          &.function {
            color: #75beff;
          }
          &.function-variable {
            color: #f07178;
          }
          &.keyword {
            color: #c792ea;
          }
          &.constant {
            color: #8002e6;
          }
          &.operator {
            color: #c792ea;
          }

          &.punctuation {
            color: #cccccc;
          }
          &.template-string {
            color: #80cbc4;
          }
          &.string {
            color: #c3e88d;
          }
          &.number {
            color: #f07178;
          }
          &.boolean {
            color: #ffad33;
          }
          &.comment {
            font-style: italic;
            color: #cccccc80;
          }
          .attr-name {
            color: #c792ea;
          }
          .tag {
            color: #f14c4c;
          }
          .class-name {
            color: #ffad33;
          }

          &.literal-property {
            color: #ffad33;
            &.property {
              color: #ffad33;
            }
          }
        }
      }
    }
    @media (max-width: 450px) {
      h1,
      h2,
      h3,
      h4,
      h5 {
        line-height: 1.2;
      }
      h1 {
        font-size: 3.8rem;
      }
      h2 {
        font-size: 3.4rem;
      }
      h3 {
        font-size: 3rem;
      }
      h4 {
        font-size: 2.4rem;
      }
      h5 {
        font-size: 1.8rem;
      }
    }
  }
`;

function Template({ data }) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  return (
    <BlogPostLayout>
      <Seo title={frontmatter.title} />
      <Wrapper>
        <PostBody className="blog-post">
          <div className="inform-container">
            <h1>{frontmatter.title}</h1>
            <div>
              <span>{frontmatter.date}</span>
              <span>
                <Link to="/">목록</Link>
              </span>
            </div>
          </div>
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </PostBody>
        <Comments title={frontmatter.title} path={frontmatter.slug} />
      </Wrapper>
    </BlogPostLayout>
  );
}

export default Template;

export const pageQuery = graphql`
  query ($path: String!) {
    markdownRemark(frontmatter: { slug: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "YYYY년 MMMM DD일", locale: "ko-KR")
        tags
        slug
        title
      }
    }
  }
`;
