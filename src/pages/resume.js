import * as React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import Seo from "../components/seo";
import ResumeLayout from "../components/layouts/ResumeLayout";

const Wrapper = styled.div`
  padding: 0 2rem;
  max-width: 120rem;
  margin: 0 auto;
  @media (max-width: 450px) {
    max-width: unset;
    margin: 6rem auto 0;
  }
`;

const Title = styled.h1`
  font-size: 13rem;
  font-weight: 900;
  margin: 0;
  padding: 0;
  word-break: keep-all;
  @media (max-width: 780px) {
    font-size: 10rem;
  }
  @media (max-width: 450px) {
    font-size: 8rem;
  }
`;

const ResumeBody = styled.div`
  margin-bottom: 20rem;
  .intro {
    margin: 1rem 0;
  }
  .icon-small {
    svg {
      width: 1.8rem;
    }
  }

  .project {
    .project-container {
      box-sizing: border-box;
      padding: 1rem 2rem;
      border-top: 1px solid ${props => props.theme.grayColor};

      .project-section {
        padding: 1rem 1rem;
        .period {
          word-spacing: 120%;
          font-weight: 100;
        }
        .project-list {
          margin-top: 1rem;
          ul {
            li {
              padding: 0;
              margin: 0;
            }
          }
        }
      }
      ul {
        margin: 1rem 0;
      }
      .project-stack {
        margin: 0 0.5rem;
        .project-stack-title {
          margin: 0.5rem 0;
        }
        span {
          img {
            border-radius: 0.4rem;
            margin: 0;
          }
        }
      }
    }
  }

  .resume-content {
    max-width: 120rem;
    margin: 0 auto;
    line-height: 1.8;
    font-size: 1.7rem;
    letter-spacing: -0.1rem;

    .contact-me {
      width: 100%;
      padding: 2rem;
      border-radius: 1rem;
      background-color: ${props => props.theme.grayColor_light};

      p {
        display: flex;
        align-items: center;
        span {
          margin-right: 0.5rem;
        }
        a {
          letter-spacing: normal;
          font-family: Arial, Helvetica, sans-serif;
          color: #000000;
          padding-bottom: 0.4rem;
          &:hover {
            font-weight: bold;
            color: ${props => props.theme.hlColor_dark};
          }
        }
      }
    }

    h1 {
      margin: 3rem 0;
      font-size: 4.2rem;
    }
    h2 {
      margin: 2rem 0;
      font-size: 3.8rem;
    }
    h3 {
      margin: 2rem 0;
      font-size: 3.2rem;
    }
    h4 {
      font-size: 2.4rem;
      margin: 1.8rem 0;
    }
    h5 {
      font-size: 1.7rem;
    }
    a {
      color: ${props => props.theme.hlColor};
      &:hover {
        color: ${props => props.theme.compColor};
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
  }
`;

const Resume = ({ data, location }) => {
  const { markdownRemark } = data;
  const { html } = markdownRemark;

  return (
    <ResumeLayout>
      <Seo title="이력서" />
      <Wrapper>
        <Title>이력서</Title>

        <ResumeBody>
          <div
            className="resume-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </ResumeBody>
      </Wrapper>
    </ResumeLayout>
  );
};

export default Resume;

export const pageQuery = graphql`
  query {
    markdownRemark(frontmatter: { slug: { eq: "/resume/" } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
