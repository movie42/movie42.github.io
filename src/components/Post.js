import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

const Wrapper = styled.li`
  cursor: pointer;
  height: 34rem;
  overflow: hidden;
  margin-bottom: 1.5rem;
  @media (max-width: 1020px) {
    border-bottom: 1px solid ${props => props.theme.grayColor};
    height: 27rem;
  }
  padding: 2rem;

  a {
    display: grid;
    height: inherit;
    h3 {
      word-spacing: -0.2rem;
      height: 14rem;
      font-weight: 300;
      overflow: hidden;
      font-size: 2.8rem;
      transition: all 0.3s ease-in-out;
      @media (max-width: 1020px) {
        height: unset;
      }
    }
    p {
      height: 15.2rem;
      line-height: 1.6;
      overflow: hidden;
    }
    .info_wrapper {
      align-self: end;
      .tags {
        ul {
          display: flex;
          flex-wrap: wrap;
          color: ${props => props.theme.grayColor_dark};
          margin: 1rem 0;
          li {
            &:not(:first-child) {
              margin-left: 0.5rem;
            }
          }
        }
      }
      @media (max-width: 1020px) {
        align-self: unset;
      }
    }
  }
  &:hover {
    background-color: ${props => props.theme.grayColor_light};
    a {
      h3 {
        word-spacing: -0.2rem;
        font-weight: 900;
        color: ${props => props.theme.hlColor};
        transition: all 0.3s ease-in-out;
      }
    }
    transition: all 0.3s ease-in-out;
  }
`;

const Post = ({ path, title, preview, date, tags }) => {
  return (
    <Wrapper>
      <Link to={path}>
        <h3>{title}</h3>
        <p>{preview}</p>
        <div className="info_wrapper">
          <div className="tags">
            <ul>
              {tags?.map(value => (
                <li key={value}>
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </div>
          <span>{date}</span>
        </div>
      </Link>
    </Wrapper>
  );
};

export default Post;
