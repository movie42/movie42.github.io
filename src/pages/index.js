import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { graphql } from "gatsby";
import Post from "../components/Post";
import Seo from "../components/Seo";
import { BlogListLayout } from "../components/Layout";

const Wrapper = styled.div`
  padding: 0 2rem;
  max-width: 120rem;
  margin: 0 auto;
  @media (max-width: 450px) {
    margin: 6rem auto 0;
  }
`;

const Title = styled.h1`
  font-size: 13rem;
  font-weight: 900;
  margin: 0;
  padding: 0;
  @media (max-width: 450px) {
    font-size: 10rem;
  }
`;

const InfomContainer = styled.div`
  p {
    margin: 0;
    padding: 0;
  }
`;

const Contents = styled.div`
  ul {
    display: grid;
    grid-template-columns: repeat(3, 3fr);
    padding: 0;
    margin: 0 auto;
  }

  @media (max-width: 1020px) {
    ul {
      grid-template-columns: unset;
    }
  }
`;

const TagsContainer = styled.div`
  width: 100%;
  margin: 3rem 0;
  h3 {
    margin-bottom: 1rem;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
    margin-left: -0.4rem;
    li {
      margin-left: 0.4rem;
      margin-bottom: 0.4rem;
    }
  }
`;

const TagButton = styled.button`
  font-size: 1.8rem;
  cursor: pointer;
  color: ${props => props.theme.whiteColor};
  background-color: ${props =>
    props.selected ? props.theme.hlColor : props.theme.grayColor_dark};
  font-weight: ${props => (props.selected ? 900 : 500)};
  padding: 0.5rem 1rem;
  border-radius: 3rem;
  border: 0;
  min-width: 10rem;
  &:hover {
    color: ${props => props.theme.hlColor};
    background-color: ${props => props.theme.grayColor_light};
  }
`;

const IndexPage = ({ data, ...props }) => {
  const [selectItem, setSelectItem] = useState({
    tag: "",
    itemList: [],
  });

  const { allMarkdownRemark } = data;
  const { edges, group } = allMarkdownRemark;

  useEffect(() => {
    if (selectItem.tag === "") {
      setSelectItem(prev => ({ ...prev, itemList: edges }));
    }
  }, [selectItem.itemList, selectItem.tag, edges]);

  const handleTagsList = e => {
    const target = e.target;
    const tagName = target.dataset.id;

    if (tagName === "reset") {
      setSelectItem(prev => ({
        ...prev,
        tag: "reset",
        itemList: edges,
      }));
      return;
    }
    const [selectTagList] = group.filter(value => value.fieldValue === tagName);
    setSelectItem(prev => ({
      ...prev,
      tag: selectTagList.fieldValue,
      itemList: selectTagList.edges,
    }));
  };

  return (
    <BlogListLayout>
      <Seo title="블로그" />
      <Wrapper>
        <InfomContainer>
          <Title>블로그</Title>
          <p>개발을 하면서 겪은 소소한 것들</p>
          <TagsContainer>
            <h3>태그</h3>
            <ul>
              <li key="reset">
                <TagButton
                  type="button"
                  onClick={handleTagsList}
                  data-id="reset"
                  selected={selectItem.tag === "reset"}
                >
                  초기화
                </TagButton>
              </li>
              {group
                ?.filter(value => value.fieldValue !== "이력서")
                .map(value => (
                  <li key={value.fieldValue}>
                    <TagButton
                      type="button"
                      onClick={handleTagsList}
                      data-id={value.fieldValue}
                      selected={selectItem.tag === value.fieldValue}
                    >{`${value.fieldValue} ${value.totalCount}`}</TagButton>
                  </li>
                ))}
            </ul>
          </TagsContainer>
        </InfomContainer>
        <Contents>
          <ul>
            {selectItem?.itemList
              .filter(item => item.node.frontmatter.slug !== "/")
              .map(post => {
                return (
                  <Post
                    key={post.node.id}
                    path={post.node.frontmatter.slug}
                    title={post.node.frontmatter.title}
                    date={post.node.frontmatter.date}
                    preview={post.node.excerpt}
                    tags={post.node.frontmatter.tags}
                  />
                );
              })}
          </ul>
        </Contents>
      </Wrapper>
    </BlogListLayout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query Blog {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
        edges {
          node {
            frontmatter {
              slug
              date(formatString: "YYYY년 MMMM DD일", locale: "ko-KR")
              title
              tags
            }
            excerpt(format: PLAIN, pruneLength: 500)
            id
          }
        }
      }
      edges {
        node {
          id
          excerpt(format: PLAIN, pruneLength: 500)
          frontmatter {
            date(formatString: "YYYY년 MMMM DD일", locale: "ko-KR")
            slug
            title
            tags
          }
        }
      }
    }
  }
`;
