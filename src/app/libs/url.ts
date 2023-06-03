import { getAllPosts, getPost } from "./readFile";

export const getPageURL = () => {
  const data = getAllPosts().map(({ slug }) => {
    const file = getPost(slug);
    return {
      ...file
    };
  });

  const newDate = data.sort((a, b) => {
    return new Date(b?.date).valueOf() - new Date(a?.date).valueOf();
  });

  return newDate;
};
