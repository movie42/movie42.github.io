import * as React from "react";
import { graphql, Link } from "gatsby";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 0 2rem;
  max-width: 120rem;
  margin: 0 auto;
  @media ${props => props.theme.sizes.mobileL} {
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
    h1 {
      font-size: 13rem;
      letter-spacing: -0.3rem;
      line-height: 1.2;
      word-break: keep-all;
      font-weight: 900;
      color: ${props => props.theme.color.hlColor_light};
    }
    div {
      span:not(:first-child) {
        font-weight: 500;
        margin-left: 1rem;
        a {
          color: ${props => props.theme.color.hlColor};
          &:hover {
            color: ${props => props.theme.color.compColor};
          }
        }
      }
    }
    @media ${props => props.theme.sizes.mobileL} {
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
    h1 {
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
      color: ${props => props.theme.color.hlColor};
    }

    ol {
      list-style: none;
      counter-reset: li;
      li {
        counter-increment: li;
        &:before {
          content: counter(li);
          color: ${props => props.theme.color.hlColor_dark};
          display: inline-block;
          width: 1em;
          margin-left: -1em;
        }
        p {
          display: inline-block;
        }
        ul {
          counter-reset: unset;
          li {
            counter-increment: unset;
            &:before {
              content: "-";
              color: ${props => props.theme.color.hlColor_dark};
              display: inline-block;
              width: 1em;
              margin-left: -1em;
            }
          }
        }
      }
    }

    blockquote {
      position: relative;
      word-break: keep-all;
      margin: 1.2rem;
      padding: 1rem 4rem;
      border-radius: 0.2rem;
      background-color: ${props => props.theme.color.grayColor_light};
      &::after {
        position: absolute;
        top: 0;
        left: 0;
        width: 1rem;
        height: 100%;
        background-color: ${props => props.theme.color.hlColor_light};
        content: "";
      }
    }
    pre {
      margin: 1.2rem;
      padding: 1rem 2rem;
      background-color: ${props => props.theme.color.grayColor_light};
      code {
        background-color: ${props => props.theme.color.grayColor_light};
        color: ${props => props.theme.color.basicColor};
        text-shadow: none;
        .token {
          background-color: ${props => props.theme.color.grayColor_light};
          &.function {
            color: #0945d9;
          }
          &.keyword {
            color: #e6b402;
          }
          &.constant {
            color: #8002e6;
          }
          &.operator {
            color: #5299ff;
          }
          &.string {
            color: #00b738;
          }
          &.punctuation {
            color: #9e9e9e;
          }
          &.template-string {
            color: #006d3e;
          }
          &.comment {
            color: #b0b0b0;
          }
          &.attr-name {
            color: #007804;
          }
          &.tags {
            color: #d348ab;
          }
          &.boolean {
            color: #ff2b00;
          }
          &.literal-property {
            color: #6b0000;
            &.property {
              color: #6b0000;
            }
          }
        }
      }
    }
    @media ${props => props.theme.sizes.mobileL} {
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
    <>
      <Wrapper>
        <PostBody className="blog-post">
          <div className="inform-container">
            <h1>{frontmatter.title}</h1>
            <div>
              <span>{frontmatter.date}</span>
              <span>
                <Link to="/blog">목록</Link>
              </span>
            </div>
          </div>
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </PostBody>
      </Wrapper>
    </>
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
