import { graphql } from "gatsby";
import * as React from "react";
import styled from "styled-components";
import Seo from "../components/seo";

const Wrapper = styled.div`
  padding: 0 2rem;
  max-width: 120rem;
  margin: 0 auto;
  @media (max-width: 1020px) {
    max-width: unset;
    padding: 9rem 2rem;
  }
`;

const ResumeBody = styled.div`
  padding: 2rem 0;
  .resume-content {
    max-width: 102rem;
    margin: 0 auto;
    line-height: 1.8;
    font-size: 1.9rem;
    letter-spacing: -0.1rem;
    h1 {
      font-size: 13rem;
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

    ol {
      list-style: none;
      counter-reset: li;
      li {
        counter-increment: li;
      }
      li::before {
        content: counter(li);
        color: ${props => props.theme.hlColor_dark};
        display: inline-block;
        width: 1em;
        margin-left: -1em;
      }
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
        width: 1rem;
        height: 100%;
        background-color: ${props => props.theme.hlColor_light};
        content: "";
      }
    }
    pre {
      margin: 1.2rem;
      padding: 1rem 2rem;
      background-color: ${props => props.theme.grayColor_light};
      code {
        background-color: ${props => props.theme.grayColor_light};
        color: ${props => props.theme.basicColor};
        text-shadow: none;
        .token {
          background-color: ${props => props.theme.grayColor_light};
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
  }
`;

const IndexPage = ({ data, location }) => {
  const { markdownRemark } = data;
  const { html } = markdownRemark;

  return (
    <>
      <Seo title="이력서" />
      <Wrapper>
        <ResumeBody>
          <div
            className="resume-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </ResumeBody>
      </Wrapper>
    </>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query {
    markdownRemark(frontmatter: { slug: { eq: "/" } }) {
      html
    }
  }
`;
