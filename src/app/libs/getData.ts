import { getAllPosts, getPost } from "./readFile";

export const getData = ({ params }: { params: string }) => {
  const [findPost] = getAllPosts()
    .map(({ slug }) => getPost(slug))
    .filter((value) => value?.slug === params);

  return findPost;
};
