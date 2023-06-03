import styled from "styled-components";

export const Wrapper = styled.li`
  box-sizing: border-box;
  cursor: pointer;
  height: 100%;
  min-height: 40rem;
  overflow: hidden;
  margin-bottom: 1.5rem;
  padding: 2rem;
  a {
    text-decoration: none;
    display: grid;
    height: inherit;
    h3 {
      display: -webkit-box;
      height: 9rem;
      overflow: hidden;
      vertical-align: top;
      text-overflow: ellipsis;
      word-break: break-all;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      font-size: 2.8rem;
      line-height: 1.5;
      word-spacing: -0.2rem;
      font-weight: 300;
      white-space: normal;
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
          color: ${(props) => props.theme.grayColor_dark};
          margin: 1rem 0;
          li {
            &:not(:first-child) {
              margin-left: 0.5rem;
            }
          }
        }
      }
    }
  }
  &:hover {
    background-color: ${(props) => props.theme.grayColor_light};
    a {
      h3 {
        word-spacing: -0.2rem;
        font-weight: 900;
        color: ${(props) => props.theme.hlColor};
        transition: all 0.3s ease-in-out;
      }
    }
    transition: all 0.3s ease-in-out;
  }

  @media (max-width: 1020px) {
    border-bottom: 1px solid ${(props) => props.theme.grayColor};
    height: unset;
    a {
      h3 {
        height: unset;
        margin-bottom: 2rem;
      }
    }
  }
`;
