import fs from "fs";
import dayjs from "dayjs";
import { sync } from "glob";
import matter from "gray-matter";
import path from "path";
import { BASE_PATH } from "./constant";

const BASE_FILE_PATH = "/markdown-pages";
const POST_PATH = path.join(process.cwd(), `src/app${BASE_FILE_PATH}`);

interface PostMatter {
  title: string;
  description: string;
  tags: string[];
  draft?: boolean;
  date: string;
}
export interface Post extends PostMatter {
  slug: string;
  content: string;
  wordCount: number;
}
export const getPost = (postPath: string): Post | undefined => {
  const file = fs.readFileSync(postPath, { encoding: "utf8" });
  const { content, data } = matter(file);
  const grayMatter = data as PostMatter;

  if (grayMatter.draft) {
    return;
  }

  return {
    ...grayMatter,
    tags: grayMatter.tags.filter(Boolean),
    date: dayjs(grayMatter.date).format("YYYY-MM-DD"),
    content,
    slug: `${BASE_PATH}/${postPath
      .split("/")
      .findLast((value) => value)
      ?.replace(".mdx", "")}`,
    wordCount: content.split(/\s+/gu).length
  };
};
export const getAllPosts = () => {
  const postPaths: string[] = sync(`${POST_PATH}/**/*.mdx`);

  return postPaths.map((path) => {
    return {
      slug: path
    };
  });
};
